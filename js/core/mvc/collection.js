;define("core/mvc/collection", function(require, exports, module) {

    var Class = require("core/class");

    if(Backbone && Backbone.Collection) {
        var Collection = Class.extend(Backbone.Collection, {
            /*constructor: function(options) {
                Backbone.Collection.constructor.apply(this, arguments);
                //$.extend(true, this, options);
            }*/
        });
        module.exports = Collection;
    } else {
        console.error("Can't found Backbone.");
    }
});