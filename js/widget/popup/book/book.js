;define("widget/popup/book/book", function(require, exports, module) {

    var template = require("gen/template");

    module.exports = function(el, options) {
        var tpl = "tpl_popup_book";
        var defaultOptions = {
            speed: 0,
            animateThumb: false,
            onOpen: function() {
                console.log(this);
            },
            onSlidePrev: function() {
                console.log(this);
                this.loadContent(this.getPrevSlide());
            },
            onSlideNext: function() {
                console.log(this);
                this.loadContent(this.getNextSlide());
            },
            templateCallback: function(target) {
                var data = {
                    picturePath: target.attr("data-src"),
                    name: target.attr("data-name"),
                    level: target.attr("data-level"),
                    plot: target.attr("data-plot"),
                    interest: target.attr("data-interest"),
                    content: target.attr("data-content")
                };
                return template(tpl, data);
            }
        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions);
    }

});