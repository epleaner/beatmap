define(function(require) {
    'use strict';

    var LoadingView = require('views/item/loadingView');
    var NoResultsView = require('views/item/noResultsView');
    var AlbumView = require('views/item/albumView');

    var AlbumCollection = require('collections/albumCollection');
    var AlbumGridTemplate = require('text!tmpl/collection/albumGridView_tmpl.html');

    var LastfmAPI = require('models/api/lastfmAPI');
    var SpotifyAPI = require('models/api/spotifyAPI');

    /* Return a ItemView class definition */
    return Backbone.Marionette.CompositeView.extend({
        className: 'search-results-container',

        template: _.template(AlbumGridTemplate),

        //  todo: why would this not work
        // model: AlbumGrid,
        // collection: AlbumCollection,

        childView: AlbumView,

        childViewContainer: '.search-results',

        ui: {
            'loadMore': 'button.load-more-button',
            'createPlaylist': 'button.create-playlist-button'
        },

        events: {
            'click @ui.loadMore': '_loadMore',
            'click @ui.createPlaylist': '_createPlaylist',
        },

        modelEvents: {
            'change': 'render',
            'search': '_startSearch'
        },

        initialize: function() {
            this._setupAppVentListeners();

            // this.model = new AlbumGrid();
            this.collection = new AlbumCollection();
        },

        //  Used when collection has no children
        getEmptyView: function() {
            if (this.model.get('searchLoading')) {
                return LoadingView;
            } else if (this.model.get('noResults')) {
                return NoResultsView;
            }
        },

        onAddChild: function(albumView) {
            if (this.model.get('searchLoading')) {
                this._doneLoading();
            }

            //  get more detailed info for album being shown
            albumView.model.getInfo();
        },

        /*  Private methods */

        _setupAppVentListeners: function() {
            Beatmap.channels.searchBar.vent.on('search', this._startSearch.bind(this));

            Beatmap.channels.artist.vent.on('showAlbum', this._addAlbumToCollection.bind(this));

            Beatmap.channels.artist.vent.on('getSimilarArtistError', this._onNoResults.bind(this));
        },

        //  When a model has an album ready to be shown, add it to the collection
        _addAlbumToCollection: function(album) {
            this.collection.add(album, {
                merge: true
            });
        },

        _startSearch: function() {
            this.collection.reset();
            this._startLoading();
        },

        _loadMore: function() {
            this.model.loadMore();
        },

        _createPlaylist: function() {
            var spotifyAlbums = _.filter(this.collection.models, 
                function(album) { 
                    return album.get('spotifyID') !== ''; 
                }
            );

            var spotifyIDs = _.map(spotifyAlbums, 
                function(album) { 
                    return album.get('spotifyID'); 
                } 
            );

            var deferreds = [];
            var allTracks = [];

            _.each(spotifyIDs, function(id) {
                deferreds.push(SpotifyAPI.getAlbumTracks({
                    id: id,
                    success: function(tracks) {
                        allTracks.push(tracks);
                    },
                    error: function() {console.log('error getting tracks for id', id);},
                    complete: function() {},
                    ajaxDataOptions: {}
                }));
            });

            $.when.apply($,deferreds).then(
                function () { 
                    allTracks = _.flatten(allTracks);
                    console.log('all spotify tracks for search results retrieved!');
                }
            );

        },

        _onNoResults: function(response) {
            this._doneLoading();
            this.model.set('noResults', true);

            //  have to call render to show no results view
            this.render();

            //  handle specific error messages differently here
            if (response.error) {
                console.log(response.message);

                if (response.error === LastfmAPI.errorCodes.InvalidParameters) {}
            }
        },

        _startLoading: function() {
            this.model.set('searchLoading', true);
            this.model.set('searchComplete', false);
            this.model.set('noResults', false);
        },

        _doneLoading: function() {
            this.model.set('searchLoading', false);
            this.model.set('searchComplete', true);
        }
    });

});
