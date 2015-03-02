define(function(require) {
        'use strict';

        var SearchBarView = require('views/item/searchBarView');
        var AlbumGridView = require('views/collection/AlbumGridView');
        var RootLayoutTmpl = require('hbs!tmpl/layout/rootLayout_tmpl');

        /* Return a Layout class definition */
        return Backbone.Marionette.LayoutView.extend({

            initialize: function() {},

            template: RootLayoutTmpl,

            /* Layout sub regions */
            regions: {
                searchBar: '.search-bar-region',
                resultsGrid: '.results-grid-region'
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

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
                Beatmap.channels.searchBar.vent.on('search', this._showSearchingView.bind(this));
                Beatmap.channels.searchBar.vent.on('badSearch', this._showBadSearchView.bind(this));
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

            //  todo: have a bad search view
            _showBadSearchView: function(searchVal) {
                console.log('bad search val', searchVal);
            }
        });

    });

