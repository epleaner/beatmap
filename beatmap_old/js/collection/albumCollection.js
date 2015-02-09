define(['model/album'], function (Album) {
	var AlbumCollection = Backbone.Collection.extend({
		model: Album,

		comparator: false
	});

	return AlbumCollection;
});