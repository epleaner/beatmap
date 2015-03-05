define(function(require) {
    'use strict';

    var SearchBarViewTemplate = require('hbs!tmpl/item/searchBarView_tmpl');

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

        initialize: function() {
            console.log("initialize a Searchview ItemView");
        },

        template: SearchBarViewTemplate,

        onShow: function() {
            this._setupEnterKey();
        },

        /* ui selector cache */
        ui: {
            'searchButton': '.search-button',
            'searchInput': '.search-input'
        },

        /* Ui events hash */
        events: {
            'click @ui.searchButton': '_triggerSearch'
        },

        /* on render callback */
        onRender: function() {
            console.log('search view rendered');
        },

        _triggerSearch: function() {
            var searchVal = this.ui.searchInput.val();

            if (searchVal !== '') {
                Beatmap.channels.searchBar.vent.trigger('search', searchVal);
            }
        },

        _setupEnterKey: function() {
            this.ui.searchInput.keyup(function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.ui.searchButton.click();
                }
            }.bind(this));
        }

    });
});
