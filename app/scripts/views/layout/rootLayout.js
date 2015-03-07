define(function(require) {
        'use strict';

        var SearchBarView = require('views/item/searchBarView');
        var AlbumGridView = require('views/collection/AlbumGridView');
        var RootLayoutTemplate = require('hbs!tmpl/layout/rootLayout_tmpl');

        var AboutModal = require('views/item/dialogs/aboutModal');
        var ContactModal = require('views/item/dialogs/contactModal');

        /* Return a Layout class definition */
        return Backbone.Marionette.LayoutView.extend({

            initialize: function() {},

            el: 'body',

            template: RootLayoutTemplate,

            /* Layout sub regions */
            regions: {
                searchBar: '.search-bar-region',
                resultsGrid: '.results-grid-region',
                dialogs: '.dialogs-region'
            },

            /* ui selector cache */
            ui: {
                'about': 'footer nav .about',
                'contact': 'footer nav .contact'
            },

            /* Ui events hash */
            events: {
                'click @ui.about': '_showAboutModal',
                'click @ui.contact': '_showContactModal'
            },

            onBeforeRender: function() {},

            /* on render callback */
            onRender: function() {
            	this._showRegionViews();
            	this._setupAppVentListeners();
            },

            _showRegionViews: function() {
                this._showSearchBar();
                this._showResultsGrid();
            },

            /* Private methods */
            _setupAppVentListeners: function() {
                Beatmap.channels.searchBar.vent.on('search', this._onSearch.bind(this));
            },
            
            _showSearchBar: function() {
                this.getRegion('searchBar').show(new SearchBarView());
            },

            _showResultsGrid: function() {
                this.getRegion('resultsGrid').show(new AlbumGridView());
            },
            
            _onSearch: function(searchVal) {
                Beatmap.gridSearchVal = searchVal;
                console.log('searching for', searchVal);
            },

            _showAboutModal: function() {
                this.getRegion('dialogs').show(new AboutModal());
            },

            _showContactModal: function() {
                this.getRegion('dialogs').show(new ContactModal());
            },
        });

    });

