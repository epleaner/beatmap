define(function(require) {
    'use strict';

    var AlbumCollection = require('collections/albumCollection');
    var LastfmAPI = require('models/api/lastfmAPI');
    var SpotifyAPI = require('models/api/spotifyAPI');

    /* Return a model class definition */
    return Backbone.Model.extend({

        initialize: function() {
            this._albumsInGrid = new AlbumCollection();

            this._getSpotifyAlbums();
        },

        defaults: function() {
            //  Must require ArtistCollection here to avoid circular dependency issues
            var ArtistCollection = require('collections/artistCollection');

            return {
                name: 'Artist name not available',
                topAlbums: new AlbumCollection(),
                spotifyAlbums: new AlbumCollection(),
                similarArtists: new ArtistCollection(),
            };
        },

        getTopAlbums: function() {
            this._topAlbumsPending = true;

            this._topAlbumsPromise = LastfmAPI.getTopAlbums({
                success: this._onGetTopAlbumsSuccess.bind(this),
                error: this._onGetTopAlbumsError.bind(this),
                ajaxDataOptions: {
                    artist: this.attributes.name
                }
            });

            return this._topAlbumsPromise;
        },

        getSimilar: function() {
            this._getSimilarPromise = LastfmAPI.getSimilarArtists({
                success: this._onGetSimilarSuccess.bind(this),
                error: this._onGetSimilarError.bind(this),
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

            this._spotifyAlbumsPromise.done(this._mergeSpotifyLastfmAlbums.bind(this));

            this._topAlbumsPending = false;
            this._topAlbumsRetrieved = true;
        },

        _onGetSimilarSuccess: function(response) {
            //  Must require ArtistCollection here to avoid circular dependency issues
            //  todo: avoid requiring this multiple times in one file
            var ArtistCollection = require('collections/artistCollection');

            this.set('similarArtists', new ArtistCollection(response));

            Beatmap.channels.artist.vent.trigger('getSimilarArtistSuccess', this.attributes.similarArtists);
        },

        _onGetSpotifyAlbumsSuccess: function(response) {
            this.set('spotifyAlbums', new AlbumCollection(response));

            if (this._topAlbumsRetrieved) {
                this._mergeSpotifyLastfmAlbums();
            }
        },

        _onGetTopAlbumsError: function(response) {
            console.log('get top albums error', response);
            Beatmap.channels.artist.vent.trigger('getTopAlbumsError', response);
        },

        _onGetSimilarError: function(response) {
            Beatmap.channels.artist.vent.trigger('getSimilarArtistError', response);
        },

        _onGetSpotifyAlbumsError: function(response) {
            debugger;
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
        },

        _getSpotifyAlbums: function() {
            this._spotifyAlbumsPromise = SpotifyAPI.getArtistAlbums({
                success: this._onGetSpotifyAlbumsSuccess.bind(this),
                error: this._onGetSpotifyAlbumsError.bind(this),
                ajaxDataOptions: {
                    q: this.attributes.name,
                }
            });

            return this._spotifyAlbumsPromise;
        },

        _mergeSpotifyLastfmAlbums: function() {
            var spotifyAlbums = this.attributes.spotifyAlbums.models;
            var lastfmAlbums = this.attributes.topAlbums.models;

            var mergeAlbumInfo = function(lastfmAlbum, spotifyAlbum) {
                lastfmAlbum.set('spotifyURL', spotifyAlbum.attributes.external_urls.spotify);
                lastfmAlbum.set('spotifyID', spotifyAlbum.attributes.id);
                lastfmAlbum.set('spotifyImages', spotifyAlbum.attributes.images);
                lastfmAlbum.set('spotifyURI', spotifyAlbum.attributes.uri);
            };

            var findSpotifyMatch = function(lastfmAlbum) {
                var match = _.find(spotifyAlbums, function(spotifyAlbum) {
                    return spotifyAlbum.attributes.name === lastfmAlbum.attributes.name;
                });
                if (match) {
                    lastfmAlbum.mergeSpotifyData(match);
                }
            };

            _.each(lastfmAlbums, findSpotifyMatch);
        }

    });
});
