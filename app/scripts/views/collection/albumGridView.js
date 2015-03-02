define(function(require) {
        'use strict';

        var LoadingView = require('views/item/loadingView');
        var AlbumView = require('views/item/albumView');
        var AlbumGrid = require('models/albumGrid');
        var AlbumCollection = require('collections/albumCollection');

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
            // todo: investigate why this is being called twice and if that is an issue
            getEmptyView: function() {
                if (this._isLoading) {
                    return LoadingView;
                }
                // else if ( /*no results*/ )
                //     return NoResultView;
            },

            onAddChild: function() {
                if (this._isLoading) {
                    this._isLoading = false;
                }
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function() {
                this._isLoading = true;
            },

            /*	Private methods	*/

            _setupAppVentListeners: function() {
                Beatmap.channels.searchBar.vent.on('search', this._startSearch.bind(this));
                Beatmap.channels.artist.vent.on('showAlbum', this._addAlbumToCollection.bind(this));
            },

            //  When a model has an album ready to be shown, add it to the collection
            _addAlbumToCollection: function(album) {
                this.collection.add(album, {
                    merge: true
                });
            },

            _startSearch: function() {
            	this.collection.reset();
            	this._loading = true;
            }
        });

    });
