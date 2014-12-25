;define("page/summary/summary", function(require, exports, module) {

    var Model = require("page/summary/model");
    var Collection = require("page/summary/collection");
    var View = require("page/summary/view");

    module.exports = function(dom) {

        var model = new Model();
        var collection = new Collection({model: model});
        var view = new View({el: dom, model: model,  collection: collection});
        return view;
    };

});