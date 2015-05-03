define(function(require) {
        'use strict';

        var RootModel = require('models/root');
        var AlbumGridModel = require('models/albumGrid');

        var NavBarView = require('views/item/navBar');
        var SearchBarView = require('views/item/searchBarView');
        var InfoView = require('views/item/infoView');
        var AlbumGridView = require('views/collection/AlbumGridView');

        var RootLayoutTemplate = require('text!tmpl/layout/rootLayout_tmpl.html');

        var AboutModal = require('views/item/dialogs/aboutModal');
        var ContactModal = require('views/item/dialogs/contactModal');

        /* Return a Layout class definition */
        return Backbone.Marionette.LayoutView.extend({
            model: new RootModel(),

            el: 'body',

            template: _.template(RootLayoutTemplate),

            /* Layout sub regions */
            regions: {
                navBar: '.nav-bar-region',
                searchBar: '.search-bar-region',
                resultsGrid: '.results-grid-region',
                dialogs: '.dialogs-region',
                info: '.info-region'
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

            initialize: function() {
                this.model.set('gridModel', new AlbumGridModel());
                this.model.get('gridModel').on('change', this._onGridChange.bind(this));
            },

            onBeforeRender: function() {
            },

            /* on render callback */
            onRender: function() {
            	this._showRegionViews();
            	this._setupAppVentListeners();
            },

            _onGridChange: function() {

            },

            _showRegionViews: function() {
                this._showNavBar();
                this._showSearchBar();
                this._showInfo();
                this._showResultsGrid();
            },

            /* Private methods */
            _setupAppVentListeners: function() {
                Beatmap.channels.searchBar.vent.on('search', this._onSearch.bind(this));
            },

            _showNavBar: function() {
                var navBarView = new NavBarView();

                //  nav bar and root layout share the same dialogs region
                navBarView.regionManager.addRegion('dialogs', this.getRegion('dialogs'));

                this.getRegion('navBar').show(navBarView);
            },
            
            _showSearchBar: function() {
                this.getRegion('searchBar').show(new SearchBarView());
            },

            //  InfoView shares models with the album grid
            _showInfo: function() {
                this.getRegion('info').show(new InfoView({
                    model: this.model.get('gridModel')
                }));
            },

            _showResultsGrid: function() {
                this.getRegion('resultsGrid').show(new AlbumGridView({
                    model: this.model.get('gridModel')
                }));
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

