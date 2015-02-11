define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log('initialize a Album model');

			this._setXlArtwork();
			this._setAltText();
			this._setYoutubeLink();
		},

		defaults: {
			artworkUrl: 'images/blankalbumart.png',
			artist: {
				name: 'Artist name unknown'
			},
			name: 'Album name unknown'
		},

		_setXlArtwork: function() {
			var artworkUrl;

			if (this.get('image')) {
                artworkUrl = _.where(this.get('image'), {
                    size: 'extralarge'
                }).shift()['#text'];

                if (artworkUrl === 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png') {
                    artworkUrl = 'images/blankalbumart.png';
                }
                
                this.set('artworkUrl', artworkUrl);
            }
		},

		_setAltText: function() {
			//	bug: Why is this not displaying properly in the html?
            var altText = this.get('artist').name + ': ' + this.get('name');
            this.set('altText', altText);
		},

		_setYoutubeLink: function() {
            var linkBase = 'https://www.youtube.com/results?search_query=';

            var search = this.get('name') + ' ' + this.get('artist').name + ' ' + 'full album';
            search = search.split(' ').join('+');

            this.set('youtubeLink', linkBase + search);
        }

    });
});