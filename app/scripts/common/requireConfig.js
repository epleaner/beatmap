define(function() {
    'use strict';

    require.config({

        baseUrl: '/scripts',

        /* starting point for application */
        deps: ['backbone.marionette', 'bootstrap', 'main'],

        shim: {
            backbone: {
                deps: [
                'underscore',
                'jquery'
                ],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery'],
                exports: 'jquery'
            }
        },

        paths: {
            jquery: '../bower_components/jquery/jquery',
            backbone: '../bower_components/backbone-amd/backbone',
            underscore: '../bower_components/underscore-amd/underscore',
            moment: '../bower_components/moment/moment',

            /* alias all marionette libs */
            'backbone.marionette': '../bower_components/backbone.marionette/lib/core/backbone.marionette',
            'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
            'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',

            /* alias the bootstrap js lib */
            bootstrap: 'vendor/bootstrap',

            /* Alias text.js for template loading and shortcut the templates dir to tmpl */
            text: '../bower_components/requirejs-text/text',
            tmpl: '../templates',
        }
    });
});
