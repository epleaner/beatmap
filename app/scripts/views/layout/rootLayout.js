define([
        'backbone',
        'application',
        'views/item/searchBarView',
        'hbs!tmpl/layout/rootLayout_tmpl'
    ],
    function(Backbone, App, SearchBarView, RootLayoutTmpl) {
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
            	searchBar: '#search-bar-region'
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            onBeforeRender: function() {
            	console.log('on before render');
            },

            /* on render callback */
            onRender: function() {
                console.log('renderng a root layout');
            	this._showRegionViews();
            	this._setupAppVents();
            },

            /* Private methods */
            _setupAppVents: function() {
            	App.vent.on('searchBar:search', this._showLoadingSearchView);
            },

            _showRegionViews: function() {
            	this.getRegion('searchBar').show(new SearchBarView());
            },

            _showLoadingSearchView: function(searchVal) {
            	console.log('searching for', searchVal);
            }
        });

    });