;define("page/home/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var picturePop = require("widget/popup/picture/picture");

    module.exports = view.extend({
        tpl: {
            tpl_home: "tpl_home"
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
            this.$el.append(this.template(this.tpl.tpl_home));
            new gallery(this.$el.find(".j-home-wrapper"), {galleryClass: "home-gallery"}).start();
            var options = {};
            new picturePop(this.$el.find(".home-gallery"), options);
            /*this.$el.find(".j-home-content").mCustomScrollbar({
                axis: "x",
                advanced:{autoExpandHorizontalScroll:true}
            });*/
        },
        showMsg: function() {
            //console.log("showMsg");
        },
        showError: function() {
            //console.log("showError");
        }
    });

});