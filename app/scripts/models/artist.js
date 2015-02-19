define(function(require) {
    'use strict';

    var AlbumCollection = require('collections/albumCollection');
    var LastfmAPI = require('models/lastfmAPI');

    /* Return a model class definition */
    return Backbone.Model.extend({

        initialize: function() {
            this._albumsInGrid = new AlbumCollection();
        },

        defaults: function() {
            //  Must require ArtistCollection here to avoid circular dependency issues
            var ArtistCollection = require('collections/artistCollection');

            return {
                name: 'Artist name not available',
                topAlbums: new AlbumCollection(),
                similarArtists: new ArtistCollection(),
            };
        },

        getTopAlbums: function() {
            this._topAlbumsPending = true;

            this._topAlbumsPromise = LastfmAPI.getTopAlbums({
                success: this._onGetTopAlbumsSuccess.bind(this),
                error: this._onError.bind(this),
                ajaxDataOptions: {
                    artist: this.attributes.name
                }
            });

            return this._topAlbumsPromise;
        },

        getSimilar: function() {
            this._getSimilarPromise = LastfmAPI.getSimilarArtists({
                success: this._onGetSimilarSuccess.bind(this),
                error: this._onError.bind(this),
                ajaxDataOptions: {
                    artist: this.attributes.name
                }
            });

            return this._getSimilarPromise;
        },

        getAlbum: function() {
            //  Top albums are not currently being fetched, and have not been fetched yet, so fetch them
            if (!this._topAlbumsPending && !this._topAlbumsRetrieved) {
                return this.getTopAlbums().done(this.getAlbum.bind(this));
            }
            //  Currently fetching top albums, so wait until fetch is done to get an album
            else if (this._topAlbumsPending) {
                return this._topAlbumsPromise.done(this.getAlbum.bind(this));
            }
            //  Artist has no albums or artist has shown all albums
            else if (this._topAlbumsRetrieved && !this._hasAlbumsAvailable()) {
                Beatmap.channels.artist.vent.trigger('noAlbums', this);
                return null;
            }
            //  Artist has an album to show
            else {
                var album = this._getUnshownAlbum();

                Beatmap.channels.artist.vent.trigger('showAlbum', album);

                return album;
            }
        },

        /*  Private attributes and methods */
        _albumsInGrid: undefined,
        _fetchPromise: undefined,
        _topAlbumsPending: false,
        _topAlbumsRetrieved: false,

        _hasAlbumsAvailable: function() {
            return this.get('topAlbums').length !== 0 && this._albumsInGrid.length < this.get('topAlbums').length;
        },

        _onGetTopAlbumsSuccess: function(response) {
            this.set('topAlbums', new AlbumCollection(response));

            this._topAlbumsPending = false;
            this._topAlbumsRetrieved = true;
        },

        _onGetSimilarSuccess: function(response) {
            this.attributes.similarArtists.set(response);

            Beatmap.channels.artist.vent.trigger('getSimilarArtistSuccess', this.attributes.similarArtists);
        },

        _onError: function(response) {
            console.log('response error:', response.message);
        },

        _getUnshownAlbum: function() {
            //  Albums that have not been shown yet
            var availableAlbums = _.without(this.get('topAlbums').models, this._albumsInGrid);

            //  Randomly pick one
            var randomAlbum = _.shuffle(availableAlbums).shift();

            //  Keep track of what has been shown
            //  todo: this should happen as an event callback
            this._albumsInGrid.add(randomAlbum);

            return randomAlbum;
        }

    });
});
