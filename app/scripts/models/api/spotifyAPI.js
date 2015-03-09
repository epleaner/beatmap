define(function(require) {
    'use strict';

    var SpotifyServiceType = require('common/enum/spotifyServiceType');
    var SpotifyAPIBaseUrl = require('common/strings/spotifyAPIBaseUrl');

    var SpotifyAPI = Backbone.Model.extend({
        getArtistAlbums: function(options) {
            return this._doRequest(SpotifyServiceType.Search, {
                success: function(response) {
                    var albums = response.albums.items;
                    options.success(albums);
                },
                error: options.error,
                complete: options.complete
            }, _.extend(options.ajaxDataOptions, {type: 'album'}));
        },

        //  serviceType: the method or endpoint on the server you want to call
        //  ajaxOptions: options specifically for ajax, typically success/error callbacks 
        //  ajaxDataOptions: options passed along to the endpoint, for the API
        _doRequest: function(serviceType, ajaxOptions, ajaxDataOptions) {
            return $.ajax(_.extend(ajaxOptions, {
                url: SpotifyAPIBaseUrl + serviceType,
                data: _.extend({}, ajaxDataOptions)
            }));
        }
    });

    return new SpotifyAPI();
});
