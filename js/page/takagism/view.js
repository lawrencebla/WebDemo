;define("page/takagism/view", function(require, exports, module) {

    var View = require("core/mvc/view");

    var TakagismRouter = require("page/takagism/takagism_router");

    module.exports = View.extend({
        initialize: function() {
            this.render();
            new TakagismRouter();
        },

        render: function() {
            this.$el.html(this.template("tpl_taskagism"));
        }
    });

});