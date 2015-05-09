define(function(require) {
    'use strict';

    var AlbumViewTemplate = require('text!tmpl/item/albumView_tmpl.html');

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
    	template: _.template(AlbumViewTemplate),

    	/* ui selector cache */
    	ui: {
    		'caption': 'figcaption',
    		'details': '.details',
    		'links': 'a'
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
			this._stopPropagation();
		},

		_showDetails: function() {
			this.ui.caption.toggleClass('full-height');
			this.ui.details.toggleClass('hidden');
		},

		_stopPropagation: function() {
			this.ui.links.click(function(event) { 
				event.stopPropagation(); 
			});
		}
	});

});
