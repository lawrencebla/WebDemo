;define("widget/popup/acticle/acticle", function(require, exports, module) {

    module.exports = function(el, options) {
        var defaultOptions = {

        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions)
    }

});