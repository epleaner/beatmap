define(function() {
    var Album = Backbone.Model.extend({
        defaults: function() {
            return {
                artist: {
                    name: "Artist info not available"
                },

                name: "Album info not available",

                artworkUrl: "images/blankalbumart.png",

                altText: "Album loading"
            };
        },

        initialize: function() {
            this._setAlbumArtwork();
            

            //	bug: Why is this not displaying properly in the html?
            var altText = this.get('artist').name + ': ' + this.get('name');
            this.set('altText', altText);

            this._setYoutubeLink();
        },

        _setAlbumArtwork: function() {
            //  Get url of XL album artwork
            if (this.get('image')) {
                var artworkUrl = _.where(this.get('image'), {
                    size: 'extralarge'
                }).shift()['#text'];

                if (artworkUrl === 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png')
                    artworkUrl = 'images/blankalbumart.png';
                
                this.set('artworkUrl', artworkUrl);
            }
        },

        _setYoutubeLink: function() {
            var linkBase = "https://www.youtube.com/results?search_query=";
            var search = this.get('name') + ' ' + this.get('artist').name + ' ' + 'full album';
            search = search.split(' ').join('+');

            console.log(linkBase + search);
            this.set('youtubeLink', linkBase + search);
        }
    });

    return Album;
});
