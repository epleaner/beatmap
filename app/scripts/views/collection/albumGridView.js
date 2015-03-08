define(function(require) {
    'use strict';

    var LoadingView = require('views/item/loadingView');
    var NoResultsView = require('views/item/noResultsView');
    var AlbumView = require('views/item/albumView');
    var AlbumGrid = require('models/albumGrid');
    var AlbumCollection = require('collections/albumCollection');

    var LastfmAPI = require('models/lastfmAPI');

    /* Return a ItemView class definition */
    return Backbone.Marionette.CollectionView.extend({
        className: 'row',

        //  todo: why would this not work
        // model: AlbumGrid,
        // collection: AlbumCollection,

        childView: AlbumView,

        initialize: function() {
            this._setupAppVentListeners();

            this.model = new AlbumGrid();
            this.collection = new AlbumCollection();
        },

        //  Used when collection has no children
        getEmptyView: function() {
            if (this._isLoading) {
                return LoadingView;
            } else if (this._noResults) {
                return NoResultsView;
            }
        },

        onAddChild: function(albumView) {
            if (this._isLoading) {
                this._isLoading = false;
            }

            //  get more detailed info for album being shown
            albumView.model.getInfo();
        },

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {
            this._isLoading = true;
            this._noResults = false;
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
            this._isLoading = true;
            this.collection.reset();
        },

        _onNoResults: function(response) {
            this._isLoading = false;
            this._noResults = true;

            //  have to call render to show no results view
            this.render();

            //  handle specific error messages differently here
            if (response.error) {
                console.log(response.message);

                if (response.error === LastfmAPI.errorCodes.InvalidParameters) {}
            }

        }
    });

});
