define(function(require) {
    'use strict';

    var LoadingViewTemplate = require('hbs!tmpl/item/loadingView_tmpl');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
    	template: LoadingViewTemplate,
	});

});
