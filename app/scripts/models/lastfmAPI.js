define(function(require) {
    'use strict';

    var LastfmAPIKey = require('common/keys/lastfmAPIKey');
    var LastfmServiceType = require('common/enum/lastfmServiceType');

    var LastfmAPI = Backbone.Model.extend({
    	getTopAlbums: function(options) {
    		return this._doRequest(LastfmServiceType.GetTopAlbums, {
    			success: function(response) {
    				if(response.error) {
    					options.error();
    					return;
    				} 

    				var topAlbums = [];

    				if(response.topalbums && response.topalbums.album) {
    					topAlbums = response.topalbums.album;
    				}

    				options.success(topAlbums);
    			},
    			error: options.error,
    			complete: options.complete,
    		}, options.ajaxDataOptions);
    	},

    	//	serviceType: the method or endpoint on the server you want to call
    	//	ajaxOptions: options specifically for ajax, typically success/error callbacks 
    	//	ajaxDataOptions: options passed along to the endpoint, for the API
    	_doRequest: function (serviceType, ajaxOptions, ajaxDataOptions) {
            return $.ajax(_.extend(ajaxOptions, {
                url: 'http://ws.audioscrobbler.com/2.0/?method=' + serviceType,
                data: _.extend({
                    api_key: LastfmAPIKey,
                    autocorrect: 1,
                    //	todo: this might be unnecessary
                	format: 'json'
                }, ajaxDataOptions)
            }));
        }
    });

	return new LastfmAPI();
});
