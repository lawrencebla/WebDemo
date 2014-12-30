;define("page/commonweal/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var config = require("config/config");
    var util = require("util/util");
    var url = require("util/url");

    var gallery = require("widget/gallery/gallery");
    var generalPopup = require("widget/popup/general/general");

    var cache = {
        tab: {}
    };

    module.exports = view.extend({
        tpl: {
            tpl_commonweal: "tpl_commonweal",
            tpl_popup_acticle_item: "tpl_popup_acticle_item"
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
                topic_center.publish.getCommonwealDataTodo({actionType: "init", tabId: id, type: id});
            }
        },

        showData: function(data, params) {
            new gallery(this.$el.find("#" + params.tabId), {galleryClass: "commonweal-gallery"}).start(data);
            var options = {};
            new generalPopup(this.$el.find(".commonweal-gallery"), {
                tpl_popup_content_item: this.tpl.tpl_popup_acticle_item,
                cacheServiceDataPath: url.addParameters(config.apiPath.loadCommonwealData, "type", params.type),
                childrenSelector: ".j-gallery-item",
                customClass: "article-popup"
            });
        },
        showMsg: function() {
        },
        showError: function() {
        }
    });

});