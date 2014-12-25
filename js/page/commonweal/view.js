;define("page/commonweal/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var acticle = require("widget/popup/acticle/acticle");

    module.exports = view.extend({
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
                    self.showData(data);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadCommonwealDataError(function() {
                self.showError();
            });

            topic_center.publish.getCommonwealDataTodo({actionType: "init"});
        },

        showData: function(data) {
            new gallery(this.$el, {galleryClass: "commonweal-gallery"}).render(data);
            var options = {};
            new acticle(this.$el.find(".commonweal-gallery"), options);
        },
        showMsg: function() {
        },
        showError: function() {
        }
    });

});