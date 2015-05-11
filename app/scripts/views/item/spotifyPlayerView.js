define(function(require) {
    'use strict';

    var expandedHeight = 290;
    var shrunkHeight = 80;
    var playerWidth = 210;

    var SpotifyPlayerTemplate = require('text!tmpl/item/spotifyPlayerView_tmpl.html');
    var SpotifyPlayer = require('models/spotifyPlayer');

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({
        initialize: function() {
            this.model = new SpotifyPlayer();
        },

        template: _.template(SpotifyPlayerTemplate),

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

                getWidth: function() {
                    return playerWidth;
                },

                getHeight: function() {
                    return this.isExpanded ? expandedHeight : shrunkHeight;
                },

                isHidden: function() {
                    return this.playlistReady ? '' : 'hidden';
                },

                getButtonLabel: function() {
                    return this.isExpanded ? 'Hide' : 'Show';
                }
            };
        },

        ui: {
            'iframeContainer': '.iframe-container',
            'iframe': 'iframe',
            'toggle': '.spotify-player-toggle'
        },

        events: {
            'click @ui.toggle': '_togglePlayer'
        },

        modelEvents: {
            'change:source': 'render',
            'change:type': 'render',
            'change:title': 'render',
            'change:view': 'render',
            'change:data': 'render',
            'change:playlistReady': '_onChangePlaylistReady'
        },

        _onChangePlaylistReady: function(model, ready){
            this.render();
            ready ? this._expand() : this._shrink();
        },

        _togglePlayer: function() {
            this.model.get('isExpanded') ? this._shrink() : this._expand();
        },

        _shrink: function() {
            this.ui.iframe.height(shrunkHeight);
            this.ui.toggle.text('Show');
            this.model.set('isExpanded', false);
        },

        _expand: function() {
            this.ui.iframe.height(expandedHeight);
            this.ui.toggle.text('Hide');
            this.model.set('isExpanded', true);
        }
    });
});
