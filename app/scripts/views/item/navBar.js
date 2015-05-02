define(function(require) {
    'use strict';

    var NavBarTemplate = require('text!tmpl/item/navBar_tmpl.html');

    var NavBar = Backbone.Model.extend({
        defaults: {
            query: ''
        }
    });

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

        initialize: function() {
            this.model = new NavBar();

            this._setupAppVentListeners();
        },

        template: _.template(NavBarTemplate),

        /* ui selector cache */
        ui: {
            search: '.navbar-search'
        },

        modelEvents: {
            'change': 'render'
        },

        /* on render callback */
        onRender: function() {
            this._setupEnterKey();
            this._setupScrollEvent();

            this.ui.search.hide();
        },

        _setupAppVentListeners: function() {
            Beatmap.channels.router.vent.on('search', this._setSearchVal.bind(this));
            Beatmap.channels.searchBar.vent.on('search', this._setSearchVal.bind(this));
        },

        _setupEnterKey: function() {
            this.ui.search.keyup(function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this._triggerSearch();
                }
            }.bind(this));
        },

        _setupScrollEvent: function() {
            $(window).scroll(function () { 
                if ($(window).scrollTop() > 300) {
                    this.ui.search.show({duration: 200, easing: 'swing'});
                } else {
                    this.ui.search.hide({duration: 200, easing: 'swing'});
                }
          }.bind(this));
        },

        _setSearchVal: function(searchVal) {
            this.model.set('query', searchVal);
        },

        _triggerSearch: function() {
            var searchQuery = this.ui.search.val();
            this._setSearchVal(searchQuery);
            Beatmap.channels.router.vent.trigger('search', searchQuery);
        },
    });
});
