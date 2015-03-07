define(function(require) {
    'use strict';

    var NoResultsViewTemplate = require('hbs!tmpl/item/noResultsView_tmpl');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
    	template: NoResultsViewTemplate,

    	initialize: function() {
    		this.model.set('searchVal', Beatmap.gridSearchVal);
    	}
	});

});
