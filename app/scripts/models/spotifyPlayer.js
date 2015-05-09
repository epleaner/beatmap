define(function() {
	'use strict';

	var SpotifyPlayer = Backbone.Model.extend({
		defaults: {
			source: 'https://embed.spotify.com/?uri=spotify%3Atrack%3A2TpxZ7JUBn3uw46aR7qd6V',
			width: 300,
			height: 380
		}
	});

	return SpotifyPlayer;
});