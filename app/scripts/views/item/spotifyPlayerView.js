define(function(require) {
    'use strict';

    var SpotifyPlayerTemplate = require('text!tmpl/item/spotifyPlayerView_tmpl.html');
    var SpotifyPlayer = require('models/spotifyPlayer');

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({
        initialize: function() {
            this.model = new SpotifyPlayer();
        },

        template: _.template(SpotifyPlayerTemplate),

        ui: {
            'iframeContainer': '.iframe-container',
            'iframe': 'iframe'
        },

        templateHelpers: function() {
            return {
                getSrc: function() {
                    // janky...
                    var src = this.source + 
                        this.type + 
                        ':' + 
                        this.title + 
                        ':' + 
                        this.data +
                        '&theme=' +
                        this.theme +
                        '&view=' +
                        this.view;

                    console.log(src);

                    return src;
                },

                isHidden: function() {
                    return this.playlistReady ? '' : 'hidden';
                }
            };
        },

        modelEvents: {
            'change': 'render',
        },
    });
});