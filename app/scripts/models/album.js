define(function(require) {
    'use strict';

    var LastfmAPI = require('models/lastfmAPI');

    // todo: these should be stored somewhere better maybe?
    var defaultLastfmAlbumArtwork = 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png';
    var defaultLocalAlbumArtwork = 'images/blankalbumart.png';
    var youtubeSearchBase = 'https://www.youtube.com/results?search_query=';

    /* Return a model class definition */
    return Backbone.Model.extend({
        initialize: function() {
            this._setXlArtwork();
            this._setAltText();
            this._setYoutubeLink();
        },

        defaults: {
            artworkUrl: 'images/blankalbumart.png',
            artist: {
                name: 'Artist name unknown'
            },
            name: 'Album name unknown',
            youtubeLink: ''
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

        _onGetInfoSuccess: function(response) {
            //  album already has an artist object property
            //  that has more than what the response gives,
            //  so don't set the response's artist
            delete response.artist;
            
            this.set(response);

            this._formatReleaseDate();
            this._flattenTopTags();
            this._flattenTracks();
            this._formatTrackDurations();
        },

        //  lastfm release date has hours but they're always 00:00
        //  so strip that here.
        //  Also set date to 'unknown' if not there
        _formatReleaseDate: function() {
            var date = this.attributes.releasedate;
            if (date.trim() === '') {
                date = 'unknown';
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

                if (artworkUrl === defaultLastfmAlbumArtwork) {
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

        _setYoutubeLink: function() {
            var searchString = this.get('name') + ' ' + this.get('artist').name + ' ' + 'full album';
            searchString = searchString.split(' ').join('+');

            this.set('youtubeLink', youtubeSearchBase + searchString);
        },

        _onError: function(response) {
            console.log('error', response);
        }

    });
});
