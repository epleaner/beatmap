define(['model/artist'], function (Artist) {
	var ArtistCollection = Backbone.Collection.extend({
		model: Artist
	});

	return ArtistCollection;
});