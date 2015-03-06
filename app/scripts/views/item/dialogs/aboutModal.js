define(function(require) {
    'use strict';
    var AboutModalTemplate = require('hbs!tmpl/item/dialogs/aboutModal_tmpl');

    var AboutModal = Backbone.Marionette.ItemView.extend({
        template: AboutModalTemplate,
        ui: {
            modal: '#about-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return AboutModal;
});
