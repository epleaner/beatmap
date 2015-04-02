define(function(require) {
    'use strict';

    var SearchBarViewTemplate = require('text!tmpl/item/searchBarView_tmpl.html');

    var SearchBar = Backbone.Model.extend({
        defaults: {
            query: ''
        }
    });

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

        initialize: function() {
            this.model = new SearchBar();

            this._setupAppVentListeners();
        },

        template: _.template(SearchBarViewTemplate),

        /* ui selector cache */
        ui: {
            'searchButton': '.search-button',
            'searchInput': '.search-input'
        },

        /* Ui events hash */
        events: {
            'click @ui.searchButton': '_triggerSearch'
        },

        modelEvents: {
            'change': 'render'
        },

        /* on render callback */
        onRender: function() {
            console.log('search view rendered');
            this._setupEnterKey();
        },

        _triggerSearch: function() {
            var searchVal = this.ui.searchInput.val();
            
            if (searchVal !== '') {
                this.model.set('query', searchVal);
                Beatmap.channels.searchBar.vent.trigger('search', searchVal);

                var urlSearch = searchVal.split(' ').join('+');
                Beatmap.router.navigate('#search/' + urlSearch);
            }
        },

        _setupAppVentListeners: function() {
            Beatmap.channels.router.vent.on('search', this._setSearchVal.bind(this));
        },

        _setupEnterKey: function() {
            this.ui.searchInput.keyup(function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.ui.searchButton.click();
                }
            }.bind(this));
        },

        _setSearchVal: function(searchVal) {
            this.model.set('query', searchVal);
        },

    });
});
