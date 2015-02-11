define([
        'backbone',
        'communicator',
    ],

    function(Backbone, Communicator) {
        'use strict';

        var App = new Backbone.Marionette.Application();

        /* Add initializers here */
        App.on('start', function(options) {
            Communicator.mediator.trigger('APP:START');

            if (options && options.rootLayout) {
                options.rootLayout.render();
            }
        });

        return App;
    });
