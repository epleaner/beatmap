define(function(require) {
    'use strict';

    var SpotifyPlayerTemplate = require('text!tmpl/item/spotifyPlayerView_tmpl.html');
    var SpotifyPlayer = require('models/spotifyPlayer');

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({
        initialize: function() {
            this.model = new SpotifyPlayer();
            this._setupAppVentListeners();
        },

        template: _.template(SpotifyPlayerTemplate),

        /* ui selector cache */
        ui: {
        },

        /* Ui events hash */
        events: {
        },

        modelEvents: {
        },

        /* on render callback */
        onRender: function() {
        },

        _setupAppVentListeners: function() {
        }
    });
});
