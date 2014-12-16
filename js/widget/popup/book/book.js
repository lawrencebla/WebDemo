;define("widget/popup/book/book", function(require, exports, module) {

    module.exports = function(el, options) {
        var defaultOptions = {
            speed: 0,
            onOpen: function() {
                console.log(this);
            },
            onSlidePrev: function() {
                console.log(this);
            },
            onSlideNext: function() {
                console.log(this);
                this.loadContent(0);
            }
        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions)
    }

});