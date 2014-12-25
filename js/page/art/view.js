;define("page/art/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var picturePop = require("widget/popup/picture/picture");

    module.exports = view.extend({
        render: function() {
            this.flowController();
        },

        flowController: function() {
            var self = this;

            topic_center.subscribe.loadArtDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.showData(data);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadArtDataError(function() {
                self.showError();
            });

            topic_center.publish.getArtDataTodo({actionType: "init"});
        },

        showData: function(data) {
            new gallery(this.$el, {galleryClass: "art-gallery"}).render(data);
            var options = {};
            new picturePop(this.$el.find(".art-gallery"), options);
        },
        showMsg: function() {
        },
        showError: function() {
        }
    });

});