;define("page/art/view", function(require, exports, module) {

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
            tpl_art: "tpl_art",
            tpl_popup_acticle_item: "tpl_popup_acticle_item"
        },
        render: function() {
            this.flowController();
        },

        activateTab: function(event, ui) {
            if(ui.newPanel) {
                ui.panel = ui.newPanel;
            }
            var id = ui.panel.attr("id");
            if(!cache.tab[id]) {
                cache.tab[id] = true;
                topic_center.publish.getArtDataTodo({actionType: "init", tabId: id, type: id});
            }
        },

        flowController: function() {
            var self = this;
            topic_center.subscribe.loadArtDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.showData(data, params);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadArtDataError(function() {
                self.showError();
            });

            this.$el.html(this.template(this.tpl.tpl_art));
            this.$el.tabs({
                create: this.activateTab,
                activate: this.activateTab
            });

        },

        showData: function(data, params) {
            new gallery(this.$el.find("#" + params.tabId), {galleryClass: "art-gallery"}).start(data);
            var options = {};
            new generalPopup(this.$el.find(".art-gallery"), {
                tpl_popup_content_item: this.tpl.tpl_popup_acticle_item,
                cacheServiceDataPath: url.addParameters(config.apiPath.loadArtData, "type", params.type),
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