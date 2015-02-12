define([
	'backbone',
	'hbs!tmpl/item/albumView_tmpl'
],
function( Backbone, AlbumViewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Albumview ItemView");
		},
		
    	template: AlbumViewTmpl,
        

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
