define([
        'views/item/albumView',
        'models/albumGrid',
        'collections/albumCollection'
    ],
    function(AlbumView, AlbumGridModel, AlbumCollection) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.CollectionView.extend({
            className: 'row',

            childView: AlbumView,

            modelEvents: {
                'albumReady': '_addAlbumToCollection'
            },

            initialize: function(options) {
                console.log("initialize a Albumgridview CollectionView");
                this.options = options || {};

                this._setupAppVentListeners();

                this.model = new AlbumGridModel();
                this.collection = new AlbumCollection();
                this._isLoading = true;
            },

            //  Used when collection has no children
            // todo: investigate why this is being called twice
            getEmptyView: function() {
                if (this._isLoading) {
                    console.log('currently loading');
                    // return this;
                }
                // else if ( /*no results*/ )
                //     return NoResultView;
            },

            //  todo: handle search results better (templating?)
            onAddChild: function() {
                console.log('child added');
                if (this._isLoading) {
                    this._isLoading = false;
                    // $('#load-more').prop('hidden', false);
                    // $('#search-status').html('showing results for "' + this.model.get("searchValue") + '"');
                }
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function() {},

            /*	Private methods	*/

            _setupAppVentListeners: function() {
                Beatmap.channels.searchBar.vent.on('search', this._startSearch.bind(this));
            },

            //  When a model has an album ready to be shown, add it to the collection
            //	todo: give model the collection to add directly
            _addAlbumToCollection: function(album) {
                console.log('adding item to album grid view collection');
                this.collection.add(album, {
                    merge: true
                });
            },

            _startSearch: function() {
            	this.collection.reset();
            	this._loading = true;
            },

            //	todo: this should not happen in the model
            _loadMore: function() {
                this.model.loadMore();
            },
        });

    });
