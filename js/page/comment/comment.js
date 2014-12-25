;define("page/comment/comment", function(require, exports, module) {

    var Model = require("page/comment/model");
    var Collection = require("page/comment/collection");
    var View = require("page/comment/view");

    module.exports = function(dom) {

        var model = new Model();
        var collection = new Collection({model: model});
        var view = new View({el: dom, model: model,  collection: collection});
        return view;
    };

});