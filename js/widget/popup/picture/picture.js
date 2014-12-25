;define("widget/popup/picture/picture", function(require, exports, module) {

    module.exports = function(el, options) {
        var defaultOptions = {

        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions);
    }

});