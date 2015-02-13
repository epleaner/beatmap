define([
        'backbone',
        'model/artist',
    ],
    function(Backbone, Artist) {
        'use strict';

        /* Return a collection class definition */
        return Backbone.Collection.extend({
            model: Artist,

            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar',

            initialize: function(options) {
                console.log("initialize a Artistcollection collection");

                this.options = options || {};
                this._setBaseArtist();
            },

            fetch: function() {
                var query = this._makeFetchQuery();
                return Backbone.Collection.prototype.fetch.call(this, {
                    data: query
                });
            },

            parse: function(response) {
                return response.similarartists.artist;
            },

            _query: {
                autocorrect: 1,
                format: 'json',
                api_key: '138f4284e02f7192bc7657b7534bbdb3'
            },

            _limitArtist: 100,

            _baseArtist: null,

            _makeFetchQuery: function() {
                return $.extend({}, this._query, {
                    artist: this._baseArtist
                });
            },

            _setBaseArtist: function() {
                this._baseArtist = this.options.artist;
            }


        });
    });
