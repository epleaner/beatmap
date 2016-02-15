define(function(require) {
    'use strict';

    var LastfmAPI = require('models/api/lastfmAPI');

    // todo: these should be stored somewhere better maybe?
    var defaultLastfmAlbumArtwork = 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png';
    var defaultLocalAlbumArtwork = 'images/logo.png';
    var youtubeSearchBase = 'https://www.youtube.com/results?search_query=';

    /* Return a model class definition */
    return Backbone.Model.extend({
        initialize: function() {
            this._setXlArtwork();
            this._setAltText();
            this._setSearchLinks();
        },

        defaults: {
            artworkUrl: defaultLocalAlbumArtwork,
            artist: {
                name: 'Artist name unknown'
            },
            releasedate: 'Unavailable',
            tracks: [],
            toptags: [],
            name: 'Album name unknown',
            youtubeLink: 'http://www.youtube.com',
            spotifyURL: 'http://www.spotify.com',
            spotifyID: '',
            spotifyImages: [],
            spotifyURI: ''
        },

        getInfo: function() {
            LastfmAPI.getAlbumInfo({
                success: this._onGetInfoSuccess.bind(this),
                error: this._onError.bind(this),
                ajaxDataOptions: {
                    artist: this.attributes.artist.name,
                    album: this.attributes.name,
                    mbid: this.attributes.mbid
                }
            });
        },

        search: function() {
            LastfmAPI.albumSearch({
                success: this._onSearchSuccess.bind(this),
                error: this._onSearchError.bind(this),
                ajaxDataOptions: {
                    album: this.attributes.name,
                }
            });
        },

        mergeSpotifyData: function(spotifyAlbum) {
            this.set('spotifyURL', spotifyAlbum.attributes.external_urls.spotify);
            this.set('spotifyID', spotifyAlbum.attributes.id);
            this.set('spotifyImages', spotifyAlbum.attributes.images);
            this.set('spotifyURI', spotifyAlbum.attributes.uri);
        },

        quickSearch: function() {
            var urlSearch = this.get('artist').name.split(' ').join('+');
            Beatmap.router.navigate('#search/' + urlSearch, { trigger: true });
        },

        _onGetInfoSuccess: function(response) {
            //  album already has an artist object property
            //  that has more than what the response gives,
            //  so don't set the response's artist
            if(response && response.artist) {delete response.artist;}

            this.set(response);
            
            this._formatReleaseDate();
            this._flattenTopTags();
            this._flattenTracks();
            this._formatTrackDurations();
        },

        _onSearchSuccess: function(response) {
            Beatmap.channels.album.vent.trigger('albumSearchSuccess', response);
        },

        _onSearchError: function(response) {
            Beatmap.channels.album.vent.trigger('albumSearchError', response);
        },

        //  lastfm release date has hours but they're always 00:00
        //  so strip that here.
        //  Also set date to 'unknown' if not there
        _formatReleaseDate: function() {
            var date = this.attributes.releasedate;
            if (date.trim() === '') {
                date = 'Unavailable';
            } else {
                date = date.substring(0, date.indexOf(',')).trim();
            }
            this.set('releasedate', date);
        },

        //  lastfm wraps tags inside the toptags object as an attribute called 'tag'
        //  so we clean that up there, as well as handle undefined tags
        _flattenTopTags: function() {
            this.set('toptags', this.attributes.toptags.tag || []);
        },

        _flattenTracks: function() {
            this.set('tracks', this.attributes.tracks.track || []);

            //  if there is only one track, then lastfm makes the tracks an object of that track,
            //  so make tracks an array with just that track instead
            if (!_.isArray(this.attributes.tracks)) {
                this.set('tracks', [this.attributes.tracks]);
            }
        },

        //  lastfm gives duration in seconds, so convert it to 'm:ss'
        _formatTrackDurations: function() {
            _.each(this.attributes.tracks, function(track) {
                track.duration = moment().startOf('day').seconds(track.duration).format('m:ss');
            });

            //  trigger change to view rerenders
            this.trigger('change');
        },

        _setXlArtwork: function() {
            var artworkUrl;

            if (this.get('image')) {
                //  gets the filepath of the extra large image 
                artworkUrl = _.where(this.get('image'), {
                    size: 'extralarge'
                }).shift()['#text'];

                if (_.isEmpty(artworkUrl) || artworkUrl === defaultLastfmAlbumArtwork) {
                    artworkUrl = defaultLocalAlbumArtwork;
                }

                this.set('artworkUrl', artworkUrl);
            }
        },

        _setAltText: function() {
            //  bug: Why is this not displaying properly in the html?
            var altText = this.get('artist').name + ' – ' + this.get('name');
            this.set('altText', altText);
        },

        //  constructs search url for Youtube and Grooveshark, which work out quite well most of the time
        _setSearchLinks: function() {
            var searchString = this.get('name') + ' ' + this.get('artist').name;
            
            searchString = encodeURIComponent(searchString);

            this.set('youtubeLink', youtubeSearchBase + searchString + '+full+album');
        },

        _onError: function(response) {
            console.log('error', response);
        }

    });
});
