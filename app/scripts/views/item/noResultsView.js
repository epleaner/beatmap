define(function(require) {
    'use strict';

    var NoResultsViewTemplate = require('text!tmpl/item/noResultsView_tmpl.html');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
    	template: _.template(NoResultsViewTemplate),

    	initialize: function(options) {
    		this.model.set('query', options.query);
    	}
	});

});
