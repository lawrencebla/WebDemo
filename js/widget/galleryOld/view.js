;define("widget/gallery/view", function(require, exports, module) {

    var View = require("core/mvc/view");

    var bookPop = require("widget/popup/book/book");

    module.exports = View.extend({
        tpl: {
            tpl_gallery_wrapper: "tpl_gallery_wrapper",
            tpl_gallery_list: "tpl_gallery_list"
        },
        render: function(data) {
            if(this.galleryClass) {
                data.galleryClass = this.galleryClass;
            }
            this.$el.html(this.template(this.tpl.tpl_gallery_wrapper, data));
/*
            var options = {
                //addClass: "custom-gallery",
                //controls: false
            };
            if(this.galleryClass) {
                new picturePop($("." + this.galleryClass), options);
                //this.$el.find("." + this.galleryClass).lightGallery(options);
            }
            */
        }
    });

});