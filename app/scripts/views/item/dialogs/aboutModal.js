define(function(require) {
    'use strict';
    var AboutModalTemplate = require('text!tmpl/item/dialogs/aboutModal_tmpl.html');

    var AboutModal = Backbone.Marionette.ItemView.extend({
        template: _.template(AboutModalTemplate),
        ui: {
            modal: '.about-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return AboutModal;
});
