define(function() {
	'use strict';

	var SpotifyPlayer = Backbone.Model.extend({
		defaults: {
			source: 'https://embed.spotify.com/?uri=spotify:',
			type: 'trackset',
			title: 'Related Artists',
			theme: 'white',
			view: 'list',
			data: '',
			playlistReady: false,
			isExpanded: false
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
        	this.set('playlistReady', true);
        },
	});

	return SpotifyPlayer;
});