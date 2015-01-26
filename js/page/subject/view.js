;define("page/subject/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var cache_service = require("service/cache_service");
    var constant = require("config/constant");
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
            cache_service.add(constant.bookFilter, "all");
            this.$el.find(".j-all-link").click(function() {
                cache_service.add(constant.bookFilter, "all");
                g.filter(self.$el.find(".j-gallery-item"));
                $(".sub-page-top-menue .tab a").removeClass("active");
                $(this).addClass("active");
            });
            this.$el.find(".j-escape-link").click(function() {
                cache_service.add(constant.bookFilter, "escape");
                g.filter(self.$el.find("[data-type='escape']"));
                $(".sub-page-top-menue .tab a").removeClass("active");
                $(this).addClass("active");
            });
            this.$el.find(".j-detective-link").click(function() {
                cache_service.add(constant.bookFilter, "detective");
                g.filter(self.$el.find("[data-type='detective']"));
                $(".sub-page-top-menue .tab a").removeClass("active");
                $(this).addClass("active");
            });
            this.$el.find(".j-rpg-link").click(function() {
                cache_service.add(constant.bookFilter, "rpg");
                g.filter(self.$el.find("[data-type='rpg']"));
                $(".sub-page-top-menue .tab a").removeClass("active");
                $(this).addClass("active");
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