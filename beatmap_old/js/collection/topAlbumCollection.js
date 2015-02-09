define(['collection/albumCollection'], function(AlbumCollection) {
    var TopAlbumCollection = AlbumCollection.extend({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums',

    	_query: {
            autocorrect: 1,
            format: 'json',
            api_key: "138f4284e02f7192bc7657b7534bbdb3"
        },

        _limitAlbum: 10,

        _baseArtist: null,

        initialize: function(opts) {
            this._baseArtist = opts.artist;
        },

        fetch: function() {
            var $query = $.extend({}, this._query, {
                artist: this._baseArtist.get('name')
            });
            return Backbone.Collection.prototype.fetch.call(this, {data: $query});
        },

        parse: function(response) {
            return response.topalbums.album || [];
        }


    });

    return TopAlbumCollection;
});
