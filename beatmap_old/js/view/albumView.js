define(['text!template/albumView.html', 'model/album'], function(Template, AlbumModel) {
    var AlbumView = Backbone.Marionette.ItemView.extend({
        className: '',

        template: _.template(Template),

        ui: {
            img: 'img',
            album: '.album',
            albumHover: '.album-hover',
        },

        images: [],

        events: {
            'mouseenter': '_onMouseEnter',
            'mouseleave': '_onMouseLeave'
        },

        modelEvents: {
            'change': 'render'
        },

        onRender: function() {
        },

        _onMouseEnter: function() {
            this.ui.albumHover.animate(
                    {opacity: 1},
                    400,
                    function () {
                    }
            );
        },

        _onMouseLeave: function() {
            this.ui.albumHover.animate(
                    {opacity: 0},
                    400,
                    function () {
                    }
            );
        },
    });

    return AlbumView;
});
