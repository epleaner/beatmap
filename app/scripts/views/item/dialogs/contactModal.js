define(function(require) {
    'use strict';
    var ContactModalTemplate = require('hbs!tmpl/item/dialogs/contactModal_tmpl');

    var ContactModal = Backbone.Marionette.ItemView.extend({
        template: ContactModalTemplate,
        ui: {
            modal: '#contact-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return ContactModal;
});
