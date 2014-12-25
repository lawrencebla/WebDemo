;define("page/art/art", function(require, exports, module) {

    var model = require("page/art/model");
    var collection = require("page/art/collection");
    var view = require("page/art/view");

    module.exports = function(dom) {
        var m = new model();
        var c = new collection({model: m});
        var v = new view({collection: c, el: dom, model: m});

        return v;
    };
});