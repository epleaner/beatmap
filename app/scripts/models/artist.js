define(function(require) {
    'use strict';

    var AlbumCollection = require('collections/albumCollection');
    var LastfmAPI = require('models/lastfmAPI');

    /* Return a model class definition */
    return Backbone.Model.extend({
        initialize: function() {
            console.log("initialize a Artist model");

            this.set('_albumsInGrid', new AlbumCollection([], {
                artist: this.get('name')
            }));
        },

        defaults: function() {
            return {
                name: "Artist name not available",

                topAlbums: undefined,

                relatedArtists: [],

                _albumsInGrid: undefined,

                _limitAlbum: 3,

                _fetchPromise: undefined,
            };
        },

        getTopAlbums: function() {
            return LastfmAPI.getTopAlbums({
                success: this._onGetTopAlbumsSuccess.bind(this),
                error: this._onError.bind(this),
                ajaxDataOptions: {
                    artist: this.attributes.name
                }
            });
        },

        getAlbum: function() {
            //  Currently fetching, so wait until fetch is done to get another album
            if (this.get('_fetchPromise') !== undefined && this.get('_fetchPromise').state() === 'pending') {

                this.get('_fetchPromise').done(this.getAlbum.bind(this));

                return this.get('_fetchPromise');
            }

            //  Not currently fetching, and has not fetched yet, so fetch
            else if (this.get('_fetchPromise') === undefined) {

                this.set('_fetchPromise', this.getTopAlbums());
                this.get('_fetchPromise').done(this.getAlbum.bind(this));

                return this.get('_fetchPromise');
            }

            //  Artist has no albums or artist has shown all albums
            else if (this.get('topAlbums').length === 0 || this.get('_albumsInGrid').length === this.get('topAlbums').length) {
                this.trigger('noAlbums', this);
            }

            //  Return an album
            else {
                var album = this._getUnshownAlbum();
                this.trigger('showAlbum', album);
            }
        },

        _onGetTopAlbumsSuccess: function(response) {
            this.set('topAlbums', new AlbumCollection(response));
        },

        _onError: function(response) {
            console.error(response);
        },

        _getUnshownAlbum: function() {
            //  Get albums that have not been shown yet
            var availableAlbums = _.without(this.get('topAlbums').models, this.get('_albumsInGrid'));

            //  Randomly pick one
            var randomAlbum = _.shuffle(availableAlbums).shift();

            //  Keep track of what has been shown
            this.get('_albumsInGrid').add(randomAlbum);

            return randomAlbum;
        }

    });
});
