;define("page/subject/subject", function(require, exports, module) {

    var model = require("page/subject/model");
    var collection = require("page/subject/collection");
    var view = require("page/subject/view");

    module.exports = function(dom) {
        var m = new model();
        var c = new collection({model: m});
        var v = new view({collection: c, el: dom, model: m});

        return v;
    };
});