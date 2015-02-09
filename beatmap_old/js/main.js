/*  Define these files so that they are useable in this file  */
define([
    'view/gridView',
    'model/grid',
    'collection/albumCollection',
    'model/album'

    /*  One to one correspondence with function parameters  */
], function(GridView, GridModel, AlbumCollection, AlbumModel) {
    'use strict';

    var TEST_ALBUM_LIMIT = 10;

    var albumGrid = new GridView({

        model: new GridModel(),
        collection: new AlbumCollection()

    });

    // $('#search-input').waypoint('sticky');

    /*  Event handler for artist search  */
    $('#search-button').on('click', function() {
        _onSearchClick();
    });

    /* Event handler for enter key */
    $('#search-input').keyup(function(event) {
        if (event.keyCode == 13) {
            $("#search-button").click();
        }
    });

    $('#load-more').on('click', function() {
        albumGrid.loadMore();
    });

    var _onSearchClick = function() {
        var artist = $('#search-input').val();

        if (artist !== "") {
            
            $('#main').prepend(albumGrid.render().$el);

            $('#load-more').prop('hidden', true);

            albumGrid.isLoading = true;

            /*  Reset grid collection for new albums  */
            albumGrid.collection.reset();

            /*  Call grid's model's artist search */
            albumGrid.model.artistSearch({
                artist: artist
            });
        }

    };

    return albumGrid;
});
