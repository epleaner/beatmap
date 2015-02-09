define(['collection/artistCollection', 'collection/relatedArtistCollection'], function(ArtistCollection, RelatedArtistCollection) {
    var GridModel = Backbone.Model.extend({

        defaults: function() {
            return {
                _initialAlbumCount: 16,
                _loadMoreCount: 8,

                _relatedArtists: undefined,
                _availableArtists: undefined,
            };
        },

        artistSearch: function(params) {
            this.set('_relatedArtists', new RelatedArtistCollection(params));
            this.listenTo(this.get('_relatedArtists'), 'showAlbum', this._onShowAlbum.bind(this));
            this.listenTo(this.get('_relatedArtists'), 'noAlbums', this._onArtistNoAlbums.bind(this));

            var deferred = this.get('_relatedArtists').fetch();
            deferred.done(this._onFetchRelatedArtists.bind(this));
        },

        //  TODO: redo this to be more Backbone-esque
        _onShowAlbum: function(album) {
            this.trigger('albumReady', album);
        },

        _onFetchRelatedArtists: function() {
            this.set('_availableArtists', new ArtistCollection(
                this.get('_relatedArtists').models));

            this._initialShow();
        },

        _initialShow: function() {
            //  will return enough artists to show initial albums
            var initialArtistsToShow = this._randomArtists(
                this.get('_availableArtists'),
                this.get('_initialAlbumCount'));

            _.each(initialArtistsToShow, this._getAlbumForArtist.bind(this));
        },

        loadMore: function() {
            var artistsToShow = this._randomArtists(
                this.get('_availableArtists'),
                this.get('_loadMoreCount'));

            _.each(artistsToShow, this._getAlbumForArtist.bind(this));
        },

        //  Tells artist to get album and handles response
        _getAlbumForArtist: function(artist) {
            var response = artist.getAlbum();

            //  getAlbum can result in a fetch for top albums, which will return a promise
            if ($(response).is($.Deferred)) {
                //  Handle promise here
            }
        },

        // If artist has no albums to show, remove this artist from availableArtists and get new album
        _onArtistNoAlbums: function(artist) {
            this.get('_availableArtists').remove(artist);

            var newArtist = this._randomArtist(this.get('_availableArtists'));
            this._getAlbumForArtist(newArtist);
        },

        //  Randomly selects an amount of artists from collection
        _randomArtists: function(artists, amount) {
            var random = [];

            for (var count = 0; count < amount; count++) {
                random.push(_.shuffle(artists.models).shift());
            }

            return random;
        },

        //  Randomly select one artist from collection
        _randomArtist: function(artists) {
            return _.shuffle(artists.models).shift();
        }

    });

    return GridModel;
});
