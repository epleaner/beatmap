require([
        'backbone',
        'application',
        'regionManager',
        'views/layout/rootLayout'
    ],
    function(Backbone, App, RegionManager, RootLayout) {
        'use strict';

        App.start({
            rootLayout: new RootLayout()
        });
    });
