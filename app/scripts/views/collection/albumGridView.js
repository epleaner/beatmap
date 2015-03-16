define(function(require) {
    'use strict';

    var LoadingView = require('views/item/loadingView');
    var NoResultsView = require('views/item/noResultsView');
    var AlbumView = require('views/item/albumView');
    var AlbumGrid = require('models/albumGrid');
    var AlbumCollection = require('collections/albumCollection');
    var AlbumGridTemplate = require('hbs!tmpl/collection/albumGridView_tmpl');

    var LastfmAPI = require('models/api/lastfmAPI');

    /* Return a ItemView class definition */
    return Backbone.Marionette.CompositeView.extend({
        className: 'search-results-container',

        template: AlbumGridTemplate,

        //  todo: why would this not work
        // model: AlbumGrid,
        // collection: AlbumCollection,

        childView: AlbumView,

        childViewContainer: '.search-results',

        ui: {
            'loadMore': 'button.load-more-button'
        },

        events: {
            'click @ui.loadMore': '_loadMore',
        },

        modelEvents: {
            'change': 'render'
        },

        initialize: function() {
            this._setupAppVentListeners();

            this.model = new AlbumGrid();
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
