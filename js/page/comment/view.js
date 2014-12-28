;define("page/comment/view", function(require, exports, module) {

    var view = require("core/mvc/view");

    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    module.exports = view.extend({
        tpl: {
            tpl_comment: "tpl_comment",
            tpl_comment_list_item: "tpl_comment_list_item"
        },
        render: function() {

            var self = this;

            topic_center.subscribe.loadCommentDataDone(function(data) {

                var options = util.decodingTopicOptions(data);
                var params = options.params;
                data = options.data;

                if(util.hasInfoData(data)) {
                    self.$el.html(self.template(self.tpl.tpl_comment, data))
                        .find(".j-post-comment-list-wrapper")
                        .slimscroll({
                            height: 300
                        });
                } else {
                    self.$el.html(self.template(self.tpl.tpl_comment));
                }

                self.$el.find(".j-post-comment").click(function() {
                    var content = $(".j-post-comment-content").val();
                    topic_center.publish.postCommentTodo({content: content});
                    $(".j-post-comment-list-wrapper")
                        .append(
                            self.template(
                                self.tpl.tpl_comment_list_item,
                                {
                                    content: content,
                                    date: util.getDate()
                                }
                            )
                        );
                });

            });

            topic_center.publish.getCommentDataTodo({actionType: "init"});
        }
    });



});