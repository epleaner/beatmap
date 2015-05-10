define(function() {
	'use strict';

	var SpotifyPlayer = Backbone.Model.extend({
		defaults: {
			source: 'https://embed.spotify.com/?uri=spotify:',
			width: 300,
			height: 80,
			type: 'trackset',
			title: 'Related Artists',
			theme: 'white',
			view: 'list',
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
        	this.set('height', 380);
        	this.set('data', data);
        }
	});

	return SpotifyPlayer;
});