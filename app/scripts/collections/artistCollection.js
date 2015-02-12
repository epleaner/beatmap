define([
	'backbone',
	'model/artist',
],
function( Backbone, Artist ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		model: Artist,

		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar',

		initialize: function(options) {
			console.log("initialize a Artistcollection collection");

			this.options = options || {};
            this._baseArtist = options.artist;
		},

		fetch: function() {
            var $query = $.extend({}, this._query, {
                artist: this._baseArtist
            });
            return Backbone.Collection.prototype.fetch.call(this, {data: $query});
        },

        parse: function(response) {
            return response.similarartists.artist;
        },

		_query: {
            autocorrect: 1,
            format: 'json',
            api_key: "138f4284e02f7192bc7657b7534bbdb3"
        },

        _limitArtist: 100,

        _baseArtist: null,

        
	});
});