define(function(require) {
    'use strict';

    var NavBarTemplate = require('text!tmpl/item/navBar_tmpl.html');

    var HelpModal = require('views/item/dialogs/helpModal');
    var SpotifyLoginModal = require('views/item/dialogs/spotifyLoginModal');

    var NavBar = Backbone.Model.extend({
        defaults: {
            query: '',
            collapsed: true
        }
    });

    /* Return a ItemView class definition */
    return Backbone.Marionette.LayoutView.extend({

        initialize: function() {
            this.model = new NavBar();

            this._setupAppVentListeners();
        },

        template: _.template(NavBarTemplate),

        /* ui selector cache */
        ui: {
            search: '.navbar-search',
            help: '.navbar-help',
            spotifyLogin: '.spotify-login',
            collapseToggle: '.navbar-toggle',
            collapse: '.navbar-collapse'
            // lastfmLogin: '.lastfm-login'
        },

        events: {
            'click @ui.help': '_openHelpModal',
            'click @ui.spotifyLogin': '_openSpotifyLoginModal',
            'click @ui.collapseToggle': '_toggleCollapse'
        },

        modelEvents: {
            'change:query': 'render'
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

        //  Handles hiding/showing search in top bar.
        //  Only toggles hiding/showing if navbar is collapsed or collapse toggle is not visible,
        //  Which happens for non-mobile/tablets.
        _setupScrollEvent: function() {
            $(window).scroll(function () {
                //  
                if(this.model.get('collapsed') || !this.ui.collapseToggle.is(':visible')) {
                    if ($(window).scrollTop() > 300) {
                    this.ui.search.show({duration: 200, easing: 'swing'});
                } else {
                    this.ui.search.hide({duration: 200, easing: 'swing'});
                }
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

        _openHelpModal: function() {
            this.getRegion('dialogs').show(new HelpModal());
        },

        _openSpotifyLoginModal: function() {
            this.getRegion('dialogs').show(new SpotifyLoginModal());
        },

        _toggleCollapse: function() {
            this.ui.collapse.is(':visible') ? this.ui.collapse.slideUp(100) : this.ui.collapse.slideDown(100, function() {
                this.ui.search.show(0);
            }.bind(this));

            this.model.set('collapsed', !this.model.get('collapsed'));
        }
    });
});
