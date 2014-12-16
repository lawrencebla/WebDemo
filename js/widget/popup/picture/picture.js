;define("widget/popup/prcture/picture", function(require, exports, module) {

    var Model = require("widget/popup/picture/model");
    var Collection = require("widget/popup/picture/collection");
    var View = require("widget/popup/picture/view");

    /*module.exports = function(dom) {

        var m = new Model();
        var c = new Collection({collection: c});
        var v = new View({el: dom,  mode: m, collection: c});

        return v;
    };*/

    module.exports = function(el, options) {
        var defaultOptions = {

        };
        $.extend(true, defaultOptions, options);
        el.lightGallery(defaultOptions)
    }

});