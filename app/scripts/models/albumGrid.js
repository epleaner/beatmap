define(function(require) {
    'use strict';

    var Artist = require('models/artist');
    var Album = require('models/album');
    var ArtistCollection = require('collections/artistCollection');

    /* Return a model class definition */
    return Backbone.Model.extend({
        initialize: function() {
            this._setupAppVentListeners();
        },

        defaults: function() {
            return {
                searchArtist: undefined,
                searchAlbum: undefined,
                searchQuery: '',
                albumResults: false,
                searchLoading: false,
                noResults: false,
                searchComplete: false
            };
        },

        _initialAlbumCount: 16,
        _loadMoreCount: 8,
        _availableArtists: undefined,

        _setupAppVentListeners: function() {
            //  Search bar channel
            Beatmap.channels.searchBar.vent.on('search', this._search.bind(this));

            //  Artist channel
            Beatmap.channels.artist.vent.on('getSimilarArtistSuccess', this._onGetSimilarArtistsSuccess.bind(this));
            Beatmap.channels.artist.vent.on('noAlbums', this._onArtistNoAlbums.bind(this));
        },

        _search: function(query) {
            this.set('searchQuery', query);
            debugger;
            if(query.indexOf(' - ') !== -1) {
                query = query.split(' - ');

                this.set('albumResults', true);
                this._albumSearch(query);
            } else {
                this.set('artistResults', true);
                this._artistSearch(query);
            }
        },

        _artistSearch: function(query) {
            var artist = new Artist({
                name: query
            });

            this.set('searchArtist', artist);
            artist.getSimilar();
        },

        _albumSearch: function(query) {
            var album = new Album({
                name: query[0],
                artist: query[1]
            })

            this.set('searchAlbum', album);
            this._artistSearch(query[1]);
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

        loadMore: function() {
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
