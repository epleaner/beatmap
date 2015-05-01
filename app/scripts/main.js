'use strict';

require.config({
	baseUrl: '/scripts',

	/* starting point for application */
	deps: ['bootstrap', 'material'],

	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		material: {
			deps: ['bootstrap']
		},
		ripples: {
			deps: ['bootstrap']
		}
	},

	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		backbone: '../bower_components/backbone-amd/backbone',
		underscore: '../bower_components/underscore-amd/underscore',
		moment: '../bower_components/moment/moment',

		/* alias all marionette libs */
		'backbone.marionette': '../bower_components/backbone.marionette/lib/core/backbone.marionette',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',

		/* alias the bootstrap js lib */
		bootstrap: 'vendor/bootstrap',
		/* alias the bootstrap-material-design js lib */
		material: '../bower_components/bootstrap-material-design/dist/js/material',
		/* alias the ripples js lib */
		ripples: '../bower_components/bootstrap-material-design/dist/js/ripples',

		/* Alias text.js for template loading and shortcut the templates dir to tmpl */
		text: '../bower_components/requirejs-text/text',
		tmpl: '../templates',
	}
});

define(function(require) {
	require('backbone.marionette');
	require('moment');

	require(['application']);
});