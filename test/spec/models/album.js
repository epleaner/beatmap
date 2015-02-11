(function() {
    'use strict';

    var root = this;

    root.define([
            'models/album'
        ],
        function(Album) {

            describe('Album Model', function() {

                it('should be an instance of Album Model', function() {
                    var album = new Album();
                    expect(album).to.be.an.instanceof(Album);
                });

                it('should have default artwork URL', function() {
                    var album = new Album();
                    var artwork = album.get('artworkUrl');
                    expect(artwork).to.equal('images/blankalbumart.png');
                });
            });

        });

}).call(this);
