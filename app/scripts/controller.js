define(function(require) {
	'use strict';

	var Controller = {
		_showSearchPage: function() {
			console.log('navigated to search with no query');
		},
		_doSearch: function(query) {
			query = query.split('+').join(' ');
			console.log('navigated to search with query', query);
			Beatmap.channels.router.vent.trigger('search', query);
		},
		_showAboutPage: function() {
			window.alert('made by eli pleaner!');
		},
		_showContactPage: function() {
			window.alert('email me! epleaner@calpoly.edu');
		}
	};

	return Controller;
});