define(function() {
	'use strict';

	var SpotifyPlayer = Backbone.Model.extend({
		defaults: {
			source: 'https://embed.spotify.com/?uri=spotify:',
			width: 300,
			height: 380,
			type: 'trackset',
			title: 'PREFEREDTITLE',
			data: ''
		},

		initialize: function() {
			this._setupAppVentListeners();
		},

		_setupAppVentListeners: function() {
            //  Album Grid Channel
            Beatmap.channels.albumGrid.vent.on('playlistReady', this._setData.bind(this));
        },

        _setData: function(data) {
        	this.set('data', data);
        }
	});

	return SpotifyPlayer;
});