;define("page/takagism/view", function(require, exports, module) {

    var View = require("core/mvc/view");

    var TakagismRouter = require("page/takagism/takagism_router");

    module.exports = View.extend({
        tpl: "tpl_taskagism",
        initialize: function() {
            this.render();
            new TakagismRouter();
        },

        activateTab: function(event, ui) {
            if(ui.newPanel) {
                ui.panel = ui.newPanel;
            }
            var id = ui.panel.attr("id");
            window.location.hash = id + "_page";
            /*if(!cache.tab[id]) {
                cache.tab[id] = true;
                window.location.hash = id + "_page";
            }*/
        },

        render: function() {
            this.$el.html(this.template(this.tpl)).tabs({
                create: this.activateTab,
                activate: this.activateTab
            });
        }
    });

});