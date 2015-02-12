define([
        'backbone',
        'model/album'
    ],
    function(Backbone, Album) {
        'use strict';

        /* Return a collection class definition */
        return Backbone.Collection.extend({
            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums',

            model: Album,

            //	No sorting
            comparator: false,

            initialize: function(options) {
                console.log('initialize a Albumcollection collection');
                
                this.options = options || {};
                this._setBaseArtist();
            },

            fetch: function() {
                var $query = $.extend({}, this._query, {
                    artist: this._baseArtist.get('name')
                });
                return Backbone.Collection.prototype.fetch.call(this, {data: $query});
            },

            parse: function(response) {
                return response.topalbums.album || [];
            },

            // Private attributes and methods

            _query: {
                autocorrect: 1,
                format: 'json',
                api_key: '138f4284e02f7192bc7657b7534bbdb3'
            },

            _limitAlbum: 10,

            _baseArtist: null,

            _setBaseArtist: function() {
                this._baseArtist = this.options.artist;
            }

        });
    });

        