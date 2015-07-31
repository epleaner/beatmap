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
    		'links': 'a',
    		'quickSearch': '.artist-quick-search-icon'
    	},

		/* Ui events hash */
		events: {
			'click @ui.quickSearch': '_quickSearch',
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
		},

		_quickSearch: function(event) {
			event.stopPropagation();
			this.model.quickSearch();
		},

		_stopPropagation: function() {
			this.ui.links.click(function(event) { 
				event.stopPropagation(); 
			});
		}
	});

});
