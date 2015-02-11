define([
	'backbone',
	'model/album'
],
function( Backbone, Album ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		model: Album,

		//	no sorting
		comparator: false,

		initialize: function() {
			console.log("initialize a Albumcollection collection");
		}
	});
});