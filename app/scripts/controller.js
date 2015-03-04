define(function(require) {
	'use strict';

	var Controller = {
		_showSearchPage: function() {
			console.log('navigated to search with no query');
		},
		_doSearch: function(query) {
			console.log('navigated to search with query', query);
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