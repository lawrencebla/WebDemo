;define("core/mvc/view", function(require, exports, module) {

    var Class = require("core/class");
    var template = require("gen/template");

    if(Backbone && Backbone.View) {
        var View = Class.extend(Backbone.View, {
            template: template
        });
        module.exports = View;
    } else {
        console.error("Can't found Backbone.");
    }
});