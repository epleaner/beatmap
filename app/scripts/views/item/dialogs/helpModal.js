define(function(require) {
    'use strict';
    var HelpModalTemplate = require('text!tmpl/item/dialogs/helpModal_tmpl.html');

    var HelpModal = Backbone.Marionette.ItemView.extend({
        template: _.template(HelpModalTemplate),
        ui: {
            modal: '#help-modal',
        },

        onShow: function() {
            this.ui.modal.modal();
        }
    });

    return HelpModal;
});
