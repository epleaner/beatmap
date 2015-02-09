define(['text!template/gridView.html', 'view/albumView', 'view/loadingView', 'view/noResultView'], function(GridViewTemplate, AlbumView, LoadingView, NoResultView) {
    var GridView = Backbone.Marionette.CompositeView.extend({
        template: _.template(GridViewTemplate),

        className: 'row',

        modelEvents: {
            'albumReady': '_onAlbumReady'
        },

        initialize: function() {
            this.isLoading = false;
        },

        //  Used as the view to render each model in the collection
        childView: AlbumView,

        //  Prefixed before child view events 
        childViewEventPrefix: "album:",

        //  Used when collection has no children
        getEmptyView: function() {
            if (this.isLoading) {
                return LoadingView;
            }
            // else if ( /*no results*/ )
            //     return NoResultView;
        },

        onRender: function() {
            // $('.infinite-container').waypoint('infinite');
        },

        //  todo: handle search results better (templating?)
        onAddChild: function() {
            if (this.isLoading) {
                this.isLoading = false;
                $('#load-more').prop('hidden', false);
                $('#search-status').html('showing results for "' + this.model.get("searchValue") + '"');
            }
        },

        loadMore: function() {
            this.model.loadMore();
        },

        //  When a model has an album ready to be shown, add it to the collection
        _onAlbumReady: function(album) {
            this.collection.add(album, {
                merge: true
            });
        },
    });

    return GridView;
});
