define(function(require) {
    'use strict';
    var ContactModalTemplate = require('text!tmpl/item/dialogs/contactModal_tmpl.html');

    var ContactModal = Backbone.Marionette.ItemView.extend({
        template: _.template(ContactModalTemplate),
        ui: {
            modal: '#contact-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return ContactModal;
});
