define(function(require) {
    'use strict';

    // todo: these should be stored somewhere better maybe?
    var defaultLastfmAlbumArtwork = 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png';
    var defaultLocalAlbumArtwork = 'images/blankalbumart.png';
    var youtubeSearchBase = 'https://www.youtube.com/results?search_query=';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			this._setXlArtwork();
			this._setAltText();
			this._setYoutubeLink();
		},

		defaults: {
			artworkUrl: 'images/blankalbumart.png',
			artist: {
				name: 'Artist name unknown'
			},
			name: 'Album name unknown',
			youtubeLink: ''
		},

		_setXlArtwork: function() {
			var artworkUrl;

			if (this.get('image')) {
				//	gets the filepath of the extra large image 
                artworkUrl = _.where(this.get('image'), {
                    size: 'extralarge'
                }).shift()['#text'];

                if (artworkUrl === defaultLastfmAlbumArtwork) {
                    artworkUrl = defaultLocalAlbumArtwork;
                }
                
                this.set('artworkUrl', artworkUrl);
            }
		},

		_setAltText: function() {
			//	bug: Why is this not displaying properly in the html?
            var altText = this.get('artist').name + ' – ' + this.get('name');
            this.set('altText', altText);
		},

		_setYoutubeLink: function() {
            var searchString = this.get('name') + ' ' + this.get('artist').name + ' ' + 'full album';
            searchString = searchString.split(' ').join('+');

            this.set('youtubeLink', youtubeSearchBase + searchString);
        }

    });
});