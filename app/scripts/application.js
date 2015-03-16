define(function(require) {
    'use strict';

    var RootLayoutView = require('views/layout/rootLayout');
    var Router = require('router');

    var Application = Backbone.Marionette.Application.extend({
        regions: {
            rootLayoutRegion: '#root-layout-region'
        },

        channels: {
            global: Backbone.Wreqr.radio.channel('global'),
            dialog: Backbone.Wreqr.radio.channel('dialog'),
            notification: Backbone.Wreqr.radio.channel('notification'),
            window: Backbone.Wreqr.radio.channel('window'),

            albumGrid: Backbone.Wreqr.radio.channel('albumGrid'),
            searchBar: Backbone.Wreqr.radio.channel('searchBar'),
            artistCollection: Backbone.Wreqr.radio.channel('artistCollection'),
            artist: Backbone.Wreqr.radio.channel('artist'),
            album: Backbone.Wreqr.radio.channel('album'),
        },

        initialize: function() {

            this.on('start', this._onStart);
        },

        _onStart: function() {
            console.log('application started');

            new Router();
            Backbone.history.start();
            
            this._showRootLayout();
        },

        _showRootLayout: function() {
            this.rootLayoutView = new RootLayoutView();
            this.rootLayoutView.render();
        }
    });

    $(function() {
        var beatmap = new Application();
        window.Beatmap = beatmap;
        Beatmap.start();
    });
});
