define(function(require) {
    'use strict';

    var LoadingView = require('views/item/loadingView');
    var NoResultsView = require('views/item/noResultsView');
    var AlbumView = require('views/item/albumView');

    var AlbumCollection = require('collections/albumCollection');
    var AlbumGridTemplate = require('text!tmpl/collection/albumGridView_tmpl.html');

    var LastfmAPI = require('models/api/lastfmAPI');

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
            'createPlaylist': 'button.create-playlist-button'
        },

        events: {
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

        emptyViewOptions: function() {
            return {
                query: this.model.get('searchQuery')
            };
        },

        onAddChild: function(albumView) {
            if (this.model.get('searchLoading')) {
                this._doneLoading();
            } else if(this.collection.length === 3) {
                this._scrollToResults();
            }

            //  get more detailed info for album being shown
            albumView.model.getInfo();
        },

        onRender: function() {
            this._setupScrollEvent();
            this._preventButtonFocus();
        },

        /*  Private methods */

        _setupAppVentListeners: function() {
            Beatmap.channels.searchBar.vent.on('search', this._startSearch.bind(this));

            Beatmap.channels.artist.vent.on('showAlbum', this._addAlbumToCollection.bind(this));

            Beatmap.channels.artist.vent.on('getSimilarArtistError', this._onNoResults.bind(this));
        },

        //  Setup infinite scroll
        _setupScrollEvent: function() {
            $(window).scroll(function () { 
                if ($(window).scrollTop() + $(window).height() === $(document).height()) {
                    if(this.collection.length) {
                        this._loadMore();
                    }
                }
          }.bind(this));
        },

        //  http://stackoverflow.com/questions/23443579/how-to-stop-buttons-from-staying-depressed-with-bootstrap-3
        //  This stops the button from staying focused, which causes style issues
        _preventButtonFocus: function() {
            this.ui.createPlaylist.mouseup(function(){
                $(this).blur();
            });
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
            this.model.createPlaylist(this.collection.models);
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
        },

        _scrollToResults: function() {
            $(('html,body')).animate({
                scrollTop: '200'
            }, 750);
        }
    });

});
