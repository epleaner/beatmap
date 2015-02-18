define([
        'hbs!tmpl/item/searchBarView_tmpl'
    ],
    function(SearchBarViewTmpl) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function() {
                console.log("initialize a Searchview ItemView");
            },

            template: SearchBarViewTmpl,


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
                if(searchVal !== '') {
                    Beatmap.channels.searchBar.vent.trigger('search', searchVal);
                } else {
                    Beatmap.channels.searchBar.vent.trigger('badSearch', searchVal);
                }
            }
        });

    });