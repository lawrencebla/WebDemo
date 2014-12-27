;define("page/commonweal/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var acticle = require("widget/popup/acticle/acticle");

    var cache = {
        tab: {}
    };

    module.exports = view.extend({
        tpl: {
            tpl_commonweal: "tpl_commonweal"
        },
        render: function() {
            this.flowController();
        },

        flowController: function() {
            var self = this;

            topic_center.subscribe.loadCommonwealDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.showData(data, params);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadCommonwealDataError(function() {
                self.showError();
            });

            this.$el.html(this.template(this.tpl.tpl_commonweal));
            this.$el.tabs({
                create: this.activateTab,
                activate: this.activateTab
            });
        },

        activateTab: function(event, ui) {
            if(ui.newPanel) {
                ui.panel = ui.newPanel;
            }
            var id = ui.panel.attr("id");
            if(!cache.tab[id]) {
                cache.tab[id] = true;
                topic_center.publish.getCommonwealDataTodo({actionType: "init", tabId: id});
            }
        },

        showData: function(data, params) {
            new gallery(this.$el.find("#" + params.tabId), {galleryClass: "commonweal-gallery"}).start(data);
            var options = {};
            new acticle(this.$el.find(".commonweal-gallery"), options);
        },
        showMsg: function() {
        },
        showError: function() {
        }
    });

});