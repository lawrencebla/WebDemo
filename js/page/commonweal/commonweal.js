;define("page/commonweal/commonweal", function(require, exports, module) {

    var model = require("page/commonweal/model");
    var collection = require("page/commonweal/collection");
    var view = require("page/commonweal/view");

    module.exports = function(dom) {
        var m = new model();
        var c = new collection({model: m});
        var v = new view({collection: c, el: dom, model: m});

        return v;
    };
});