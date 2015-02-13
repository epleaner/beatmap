define([
        'backbone',
        'views/item/albumView'
    ],
    function(Backbone, AlbumView) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.CollectionView.extend({
            className: 'row',

            childView: AlbumView,

            modelEvents: {
                'albumReady': '_addAlbumToCollection'
            },

            initialize: function() {
                console.log("initialize a Albumgridview CollectionView");

                this._isLoading = true;
            },

            //  Used when collection has no children
            getEmptyView: function() {
                if (this._isLoading) {
                    console.log('currently loading');
                    return this;
                }
                // else if ( /*no results*/ )
                //     return NoResultView;
            },

            //  todo: handle search results better (templating?)
            onAddChild: function() {
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

            //  When a model has an album ready to be shown, add it to the collection
            //	todo: give model the collection to add directly
            _addAlbumToCollection: function(album) {
                this.collection.add(album, {
                    merge: true
                });
            },

            //	todo: this should not happen in the model
            _loadMore: function() {
                this.model.loadMore();
            },
        });

    });
