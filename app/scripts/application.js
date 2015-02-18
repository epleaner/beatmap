define(function(require) {
    'use strict';

    var RootLayoutView = require('views/layout/rootLayout');

    var Application = Backbone.Marionette.Application.extend({
        regions: {
            rootLayoutRegion: '#root-layout-region'
        },

        channels: {
            global: Backbone.Wreqr.radio.channel('global'),
            dialog: Backbone.Wreqr.radio.channel('dialog'),
            notification: Backbone.Wreqr.radio.channel('notification'),
            window: Backbone.Wreqr.radio.channel('window'),
            searchBar: Backbone.Wreqr.radio.channel('searchBar'),
            artistCollection: Backbone.Wreqr.radio.channel('artistCollection'),
        },

        initialize: function() {
            this.on('start', this._onStart);
        },

        _onStart: function() {
            console.log('application started');

            this._showRootLayout();
        },

        _showRootLayout: function() {
            this.rootLayoutRegion.show(new RootLayoutView());
        }
    });

    $(function() {
        var beatmap = new Application();
        window.Beatmap = beatmap;
        Beatmap.start();
    });
});
