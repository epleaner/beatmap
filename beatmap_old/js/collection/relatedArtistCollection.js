define(['collection/artistCollection'], function(ArtistCollection) {
    var RelatedArtistCollection = ArtistCollection.extend({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar',
        _query: {
            autocorrect: 1,
            format: 'json',
            api_key: "138f4284e02f7192bc7657b7534bbdb3"
        },

        _limitArtist: 100,

        _baseArtist: null,

        initialize: function(opts) {
            this._baseArtist = opts.artist;
        },

        fetch: function() {
            var $query = $.extend({}, this._query, {
                artist: this._baseArtist
            });
            return Backbone.Collection.prototype.fetch.call(this, {data: $query});
        },

        parse: function(response) {
            return response.similarartists.artist;
        }
    });

    return RelatedArtistCollection;
});
