;define("widget/popup/acticle/acticle", function(require, exports, module) {

    var template = require("gen/template");

    module.exports = function(el, options) {
        var tpl = "tpl_popup_acticle";
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
                    attach: target.attr("data-attach"),
                    content: target.attr("data-content")
                };
                return template(tpl, data);
            }
        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions);
    }

});