define(function(require) {
    'use strict';

    var LoadingViewTemplate = require('text!tmpl/item/loadingView_tmpl.html');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
    	template: _.template(LoadingViewTemplate),
	});

});
