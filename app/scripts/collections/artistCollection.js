define(function(require) {
    'use strict';

    /* Return a collection class definition */
    return Backbone.Collection.extend({
        initialize: function() {
            //  Must require Artist and set model in here to avoid circular dependency issues
            var Artist = require('models/artist');
            this.model = Artist;
        }
    });
});
