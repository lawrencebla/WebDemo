;define("page/home/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");
    var config = require("config/config");

    var gallery = require("widget/gallery/gallery");
    var generalPopup = require("widget/popup/general/general");

    module.exports = view.extend({
        tpl: {
            tpl_home: "tpl_home",
            tpl_popup_picture_item: "tpl_popup_picture_item"
        },
        render: function() {
            this.flowController();
        },

        flowController: function() {
            var self = this;

            topic_center.subscribe.loadHomeDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.showData(data);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadHomeDataError(function() {
                self.showError();
            });

            topic_center.publish.getHomeDataTodo({actionType: "init"});
        },

        showData: function(data) {
            this.$el.append(this.template(this.tpl.tpl_home, data));
            var activityList = $(".j-home-activity-list");
            activityList.find(".j-home-activity-list-left").click(function() {
                var currentItem = activityList.find(".j-gallery-item-home:visible");
                var prevItem = currentItem.prev(".j-gallery-item-home");
                if(prevItem.length < 1) {
                    prevItem = currentItem.nextAll(".j-gallery-item-home:last");
                }
                currentItem.hide();
                prevItem.css("display", "block");
            });
            activityList.find(".j-home-activity-list-right").click(function() {
                var currentItem = activityList.find(".j-gallery-item-home:visible");
                var nextItem = currentItem.next(".j-gallery-item-home");
                if(nextItem.length < 1) {
                    nextItem = currentItem.prevAll(".j-gallery-item-home:last");
                }
                currentItem.hide();
                nextItem.css("display", "block");
            });
            new gallery(this.$el.find(".j-home-wrapper"), {children: ".j-home-main-list"}).start();
            new generalPopup(this.$el.find(".home-gallery"), {
                tpl_popup_content_item: this.tpl.tpl_popup_picture_item,
                cacheServiceDataPath: config.apiPath.loadHomeData,
                childrenSelector: ".j-gallery-item-home",
                customClass: "picture-popup"
            });
        },
        showMsg: function() {
            //console.log("showMsg");
        },
        showError: function() {
            //console.log("showError");
        }
    });

});