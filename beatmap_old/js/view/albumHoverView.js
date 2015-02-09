define(['text!/template/albumHoverView.html', 'model/album'], function(Template, AlbumModel) {
    var AlbumHoverView = Backbone.Marionette.ItemView.extend({
        // model: new AlbumModel(),

        className: 'infinite-item',

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

        onRender: function() {
            this.albumArtwork = this.model.get("image");

            //  Get url of XL album artwork 
            albumArtworkXL = _.where(this.albumArtwork, {
                size: "extralarge"
            })[0]['#text'];

            // Get artist and album name for alt text
            var altText = this.model.get("artist")["name"] + ": " + this.model.get("name");

            this.setImageUrl(albumArtworkXL);
            this.setImageAlt(altText);
        },

        setImageUrl: function(url) {
            this.ui.img.attr("src", url);
        },

        setImageAlt: function(text) {
            this.ui.img.attr("alt", text);
        },

        _onMouseEnter: function() {
            this.ui.albumHover.animate(
                    {opacity: 1},
                    200,
                    function () {
                        console.log("done showing");
                    }
            );
        },

        _onMouseLeave: function() {
            this.ui.albumHover.animate(
                    {opacity: 0},
                    200,
                    function () {
                        console.log("done hiding");
                    }
            );
        },
    });

    return AlbumView;
});
