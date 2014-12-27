;define("page/subject/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var gallery = require("widget/gallery/gallery");
    var bookPop = require("widget/popup/book/book");

    module.exports = view.extend({
        tpl: {
            tpl_subject: "tpl_subject"
        },
        render: function() {
            this.flowController();
        },

        flowController: function() {
            var self = this;
            topic_center.subscribe.loadSubjectDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.showData(data, params);
                } else {
                    self.showMsg();
                }
            });

            topic_center.subscribe.loadSubjectDataError(function() {
                self.showError();
            });

            this.$el.html(this.template(this.tpl.tpl_subject));
            topic_center.publish.getSubjectDataTodo({actionType: "init"});

        },

        showData: function(data, params) {
            var self = this;
            var g = new gallery(this.$el.find(".j-subject-content"), {galleryClass: "subject-gallery"});
            g.start(data);
            this.$el.find(".j-all-link").click(function() {
                g.filter(self.$el.find(".j-gallery-item"));
            });
            this.$el.find(".j-escape-link").click(function() {
                g.filter(self.$el.find("[data-type='escape']"));
            });
            this.$el.find(".j-detective-link").click(function() {
                g.filter(self.$el.find("[data-type='detective']"));
            });
            this.$el.find(".j-rpg-link").click(function() {
                g.filter(self.$el.find("[data-type='rpg']"));
            });
            var options = {};
            new bookPop(this.$el.find(".subject-gallery"), options);
        },
        showMsg: function() {
        },
        showError: function() {
        }
    });

});