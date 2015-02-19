define(function(require) {
    'use strict';

    var AlbumViewTemplate = require('hbs!tmpl/item/albumView_tmpl');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
    	template: AlbumViewTemplate,

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* model events */
		modelEvents: {
            'change': 'render'
        },

		/* on render callback */
		onRender: function() {
		}
	});

});
