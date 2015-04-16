define(function(require) {
    'use strict';

    var InfoTemplate = require('text!tmpl/item/infoView_tmpl.html');

    return Backbone.Marionette.ItemView.extend({

        initialize: function() {
        },

        template: _.template(InfoTemplate),

        /* ui selector cache */
        ui: {
        },

        /* Ui events hash */
        events: {
        },

        modelEvents: {
            'change': 'render'
        },

        /* on render callback */
        onRender: function() {
        }
    });
});
