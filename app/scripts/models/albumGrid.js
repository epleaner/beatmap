define(function(require) {
    'use strict';

    var Artist = require('models/artist');
    var ArtistCollection = require('collections/artistCollection');

    /* Return a model class definition */
    return Backbone.Model.extend({
        initialize: function() {
            this._setupAppVentListeners();
        },

        defaults: function() {
            return {
                searchArtist: undefined,
            };
        },

        _initialAlbumCount: 16,
        _loadMoreCount: 8,
        _availableArtists: undefined,

        _setupAppVentListeners: function() {
            //  Search bar channel
            Beatmap.channels.searchBar.vent.on('search', this._artistSearch.bind(this));

            //  Artist channel
            Beatmap.channels.artist.vent.on('getSimilarArtistSuccess', this._onGetSimilarArtistsSuccess.bind(this));
            Beatmap.channels.artist.vent.on('noAlbums', this._onArtistNoAlbums.bind(this));
        },

        _artistSearch: function(artistName) {
            console.log("grid model searching for", artistName);

            var artist = new Artist({
                name: artistName
            });

            this.set('searchArtist', artist);
            artist.getSimilar();
        },

        _onGetSimilarArtistsSuccess: function(response) {
            this._availableArtists = this.attributes.searchArtist.get('similarArtists').clone();

            this._showInitialArtists();
        },

        _showInitialArtists: function() {
            //  will return enough artists to show initial albums
            var initialArtistsToShow = this._randomArtists(
                this._availableArtists,
                this._initialAlbumCount);

            _.invoke(initialArtistsToShow, 'getAlbum');
        },

        _showMore: function() {
            var artistsToShow = this._randomArtists(
                this._availableArtists,
                this._loadMoreCount);

            _.invoke(artistsToShow, 'getAlbum');
        },

        // If artist has no albums to show, remove this artist from availableArtists and get new album
        _onArtistNoAlbums: function(artist) {
            this._availableArtists.remove(artist);

            var newArtist = this._randomArtist(this._availableArtists);
            if (newArtist) {
                newArtist.getAlbum();
            }
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
});
