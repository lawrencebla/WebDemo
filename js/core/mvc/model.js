;define("core/mvc/model", function(require, exports, module) {

    var Class = require("core/class");

    if(Backbone && Backbone.Model) {
        var Model = Class.extend(Backbone.Model);
        module.exports = Model;
    } else {
        console.error("Can't found Backbone.");
    }
});