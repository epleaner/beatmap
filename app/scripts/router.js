define(function(require) {
	'use strict';

	var Controller = require('controller');
	var Router = Backbone.Marionette.AppRouter.extend({
		controller: Controller,
		appRoutes: {
			'search': '_showSearchPage',
			'search/:query': '_doSearch',
			'about': '_showAboutPage',
			'contact': '_showContactPage'
		}
	});

	return Router;
});