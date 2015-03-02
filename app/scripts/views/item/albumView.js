define(function(require) {
    'use strict';

    var AlbumViewTemplate = require('hbs!tmpl/item/albumView_tmpl');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
    	template: AlbumViewTemplate,

    	/* ui selector cache */
    	ui: {
    		'caption': 'figcaption',
    		'details': '.details'
    	},

		/* Ui events hash */
		events: {
			'click': '_showDetails'
		},

		/* model events */
		modelEvents: {
            'change': 'render'
        },

		/* on render callback */
		onRender: function() {
		},

		_showDetails: function() {
			this.ui.caption.toggleClass('full-height');
			this.ui.details.toggleClass('hidden');
		}
	});

});
