define(['text!template/loadingView.html'], function(Template) {
    var LoadingView = Backbone.Marionette.ItemView.extend({
         template: _.template(Template),

         className: "row",

         ui: {
            loadingAnimation: "#preloader-img"
         },

         initialize: function() {
            console.log("Loading view being initialized");
         },

         onRender: function() {
            console.log("Loading view being rendered");
         }

         // modelEvents: {
         //     'collectionReadyForUpdate': 'updateCollection'
         // },

         // //  Used as the view to render each model in the collection
         // childView: AlbumView,

         // //  These options are passed to each child view during construction
         // childViewOptions: {},

         // //  specify a jQuery selector to put the `childView` instances into
         // // childViewContainer: 'scrolling-grid',

         // //  Prefixed before child view events 
         // childViewEventPrefix: "album:",

         // // This callback will be called whenever a child is rendered or emits a `render` event
         // childEvents: {
         //     render: function(childView) {
         //         this.onChildRender(childView);
         //     }
         // },

         //  Used when collection has no children
         // getEmptyView: function() {
         //     if ( this.isLoading )
         //         return LoadingView;
         //     else if ( /*no results*/ )
         //         return NoResultView;
         // },

         // //  Logic to calculate if the view should be rendered as empty
         // isEmpty: function() {

         // },

         // //  Passed to the empty view's constructor
         // emptyViewOptions: {
         //     foo: "bar"
         // },

         // onBeforeRender: function() {

         // },

         // onRender: function() {
         //     var self = this;

         //     $('.infinite-container').waypoint('infinite');
         // },

         // onBeforeDestroy: function() {

         // },

         // onDestroy: function() {

         // },

         // onBeforeAddChild: function() {

         // },

         // onAddChild: function() {
         //     if(this.isLoading)
         //     {
         //         this.isLoading = false;
         //         $('#search-status').html('showing results for "' + this.model.get("searchValue") + '"');
         //     }
         // },

         // onBeforeRemoveChild: function() {

         // },

         // onRemoveChild: function() {

         // },

         // /*  Child event callbacks   */

         // onChildRender: function(childView) {

         // },

         // //  Event handler for model's collectionReadyForUpdate event
         // //  Add models to collection, updating items if they are already present in collection
         // updateCollection: function(models) {
         //     this.collection.add(models, {
         //         merge: true
         //     });
         // }

    });

    return LoadingView;
});
