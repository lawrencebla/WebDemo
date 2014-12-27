;define("page/home/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var picturePop = require("widget/popup/picture/picture");

    module.exports = view.extend({
        render: function() {
            this.flowController();
            //this.$el.html("adf");
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
            new gallery(this.$el, {galleryClass: "home-gallery"}).start(data);
            var options = {};
            new picturePop(this.$el.find(".home-gallery"), options);
            this.$el.mCustomScrollbar({
                axis: "x",
                setHeight: 400,
                advanced:{autoExpandHorizontalScroll:true}
            });
            //this.$el.html(this.template(this.tpl.tpl_home_content, data));
            //console.log(data);
        },
        showMsg: function() {
            //console.log("showMsg");
        },
        showError: function() {
            //console.log("showError");
        }
    });

});