define(function(require) {
    'use strict';
    var SpotifyLoginModalTemplate = require('text!tmpl/item/dialogs/spotifyLoginModal_tmpl.html');

    var SpotifyLoginModal = Backbone.Marionette.ItemView.extend({
        template: _.template(SpotifyLoginModalTemplate),
        ui: {
            modal: '#spotify-login-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return SpotifyLoginModal;
});
