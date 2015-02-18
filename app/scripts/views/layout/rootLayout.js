define([
        'backbone',
        'application',
        'views/item/searchBarView',
        'views/collection/AlbumGridView',
        'hbs!tmpl/layout/rootLayout_tmpl'
    ],
    function(Backbone, App, SearchBarView, AlbumGridView, RootLayoutTmpl) {
        'use strict';

        /* Return a Layout class definition */
        return Backbone.Marionette.LayoutView.extend({

            initialize: function() {
                console.log("initialize a RootLayout Layout");
            },

            template: RootLayoutTmpl,

            el: 'body',

            /* Layout sub regions */
            regions: {
            	searchBar: '#search-bar-region',
                resultsGrid: '.results-grid-region'
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            onBeforeRender: function() {
            	console.log('on before render root layout');
            },

            /* on render callback */
            onRender: function() {
                console.log('rendering a root layout');

            	this._showRegionViews();
            	this._setupAppVentListeners();
            },

            _showRegionViews: function() {
                this._showSearchBar();
                this._showResultsGrid();
            },

            /* Private methods */
            _setupAppVentListeners: function() {
                App.vent.on('searchBar:search', this._showSearchingView.bind(this));
            	App.vent.on('searchBar:badSearch', this._showBadSearchView.bind(this));
            },
            
            _showSearchBar: function() {
                this.getRegion('searchBar').show(new SearchBarView());
            },

            _showResultsGrid: function() {
                this.getRegion('resultsGrid').show(new AlbumGridView());
            },
            
            _showSearchingView: function(searchVal) {
            	console.log('searching for', searchVal);
            },

            _showBadSearchView: function(searchVal) {
                console.log('bad search val', searchVal);
            }
        });

    });

