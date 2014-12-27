;define("widget/gallery/gallery", function(require, exports, module) {

    var Model = require("widget/gallery/model");
    var Collection = require("widget/gallery/collection");
    var View = require("widget/gallery/view");

    module.exports = function(el, options) {
        var model = new Model();
        var collection = new  Collection({model: model});
        var view = new View({el: el, collection: collection, model:model}, options);

        return view;
    };

});