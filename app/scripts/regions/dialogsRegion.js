define(function() {
	'use strict';

	var DialogsRegion = Backbone.Marionette.Region.extend({
		el: '.dialogs-region',

		initialize: function() {
			console.log('dialog region initialized');
		}
	});

	return DialogsRegion;
});