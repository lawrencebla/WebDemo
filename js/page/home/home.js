;define("page/home/home", function(require, exports, module) {

    var model = require("page/home/model");
    var collection = require("page/home/collection");
    var view = require("page/home/view");

    module.exports = function(dom) {
        var m = model;
        var c = new collection({model: m});
        var v = new view({collection: c, el: dom, model: m});

        return v;
    };
});