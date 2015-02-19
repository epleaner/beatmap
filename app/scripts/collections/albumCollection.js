define(function(require) {
        'use strict';

        var Album = require('models/album');
        
        /* Return a collection class definition */
        return Backbone.Collection.extend({
            model: Album,

            //  No sorting needed
            comparator: false,

            initialize: function() {
                console.log('initialize a Albumcollection collection');
            }

        });
    });
