/* Configuration for require.js. Describes relative paths, dependencies, and exports. */

requirejs.config({

    /* Unless a path starts with a '/', it will be automatically prefixed by the baseUrl */
    baseUrl: 'js/',

    /* Cache buster */
    urlArgs: "cb=" + (new Date()).getTime(),

    /* Relative paths to baseUrl */
    paths: {
        'utility': 'common/utility',
        
        'text': 'thirdParty/text',
        'jquery': 'thirdParty/jquery',
        'underscore': 'thirdParty/underscore',
        'bootstrap': 'thirdParty/bootstrap',
        'backbone': 'thirdParty/backbone',
        'backbone.marionette': 'thirdParty/backbone.marionette',
        'waypoints': 'thirdParty/waypoints'
    },

    /* Establishes library dependencies and keyword exports */
    shim: {
        'utility': {
            exports: 'Utility'
        },

        'bootstrap': {
            deps: ['jquery']
        },

        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        'backbone.marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },

        'waypoints': {
            deps: ['jquery']
        }

    },

    /* Not quite sure */
    waitSeconds: 15
});

/* Require all these libraries before loading main, so main can use them */
require(['jquery', 'underscore', 'bootstrap', 'backbone', 'backbone.marionette', 'waypoints', 'utility'], function() {
    'use strict';

    //  Now load main (may be bad practice to load it this way)
    require(['main']);
});
