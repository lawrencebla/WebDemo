;define("page/summary/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    module.exports = view.extend({
        tpl: "tpl_summary",
        render: function() {
            this.$el.html(this.template(this.tpl));
        }
    });

});