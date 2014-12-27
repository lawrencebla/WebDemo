;define("topic/topic_center", function(require, exports, module) {

    var util = require("util/util");
    //var service = require("service/service");

    module.exports = (function() {

        var topics = {
            /* Home Topic */
            getHomeDataTodo: "get/home/data/todo",
            getHomeDataDoing: "get/home/data/doing",
            getHomeDataDone: "get/home/data/done",
            getHomeDataError: "get/home/data/error",

            loadHomeDataTodo: "load/home/data/todo",
            loadHomeDataDoing: "load/home/data/doing",
            loadHomeDataDone: "load/home/data/done",
            loadHomeDataError: "load/home/data/error",

            /* Subject Topic */
            getSubjectDataTodo: "get/subject/data/todo",
            getSubjectDataDoing: "get/subject/data/doing",
            getSubjectDataDone: "get/subject/data/done",
            getSubjectDataError: "get/subject/data/error",

            loadSubjectDataTodo: "load/subject/data/todo",
            loadSubjectDataDoing: "load/subject/data/doing",
            loadSubjectDataDone: "load/subject/data/done",
            loadSubjectDataError: "load/subject/data/error",

            /* Art Topic */
            getArtDataTodo: "get/art/data/todo",
            getArtDataDoing: "get/art/data/doing",
            getArtDataDone: "get/art/data/done",
            getArtDataError: "get/art/data/error",

            loadArtDataTodo: "load/art/data/todo",
            loadArtDataDoing: "load/art/data/doing",
            loadArtDataDone: "load/art/data/done",
            loadArtDataError: "load/art/data/error",

            /* Commonweal Topic */
            getCommonwealDataTodo: "get/commonweal/data/todo",
            getCommonwealDataDoing: "get/commonweal/data/doing",
            getCommonwealDataDone: "get/commonweal/data/done",
            getCommonwealDataError: "get/commonweal/data/error",

            loadCommonwealDataTodo: "load/commonweal/data/todo",
            loadCommonwealDataDoing: "load/commonweal/data/doing",
            loadCommonwealDataDone: "load/commonweal/data/done",
            loadCommonwealDataError: "load/commonweal/data/error",

            /* Comment Topic */
            getCommentDataTodo: "get/comment/data/todo",
            getCommentDataDoing: "get/comment/data/doing",
            getCommentDataDone: "get/comment/data/done",
            getCommentDataError: "get/comment/data/error",

            loadCommentDataTodo: "load/comment/data/todo",
            loadCommentDataDoing: "load/comment/data/doing",
            loadCommentDataDone: "load/comment/data/done",
            loadCommentDataError: "load/comment/data/error",

            postCommentTodo: "post/comment/todo"

        };

        var mappingTopicFlow = function() {
            // Home Page
            subscribe.getHomeDataTodo(function(data) {
                publish.loadHomeDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadHomeDataDone(function(data) {
                publish.getHomeDataDone(util.decodingTopicData(data));
            });

            // Subject Page
            subscribe.getSubjectDataTodo(function(data) {
                publish.loadSubjectDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadSubjectDataDone(function(data) {
                publish.getSubjectDataDone(util.decodingTopicData(data));
            });

            // Art Page
            subscribe.getArtDataTodo(function(data) {
                publish.loadArtDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadArtDataDone(function(data) {
                publish.getArtDataDone(util.decodingTopicData(data));
            });

            // Commonweal Page
            subscribe.getCommonwealDataTodo(function(data) {
                publish.loadCommonwealDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadCommonwealDataDone(function(data) {
                publish.getCommonwealDataDone(util.decodingTopicData(data));
            });

            // Comment Page
            subscribe.getCommentDataTodo(function(data) {
                publish.loadCommentDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadCommentDataDone(function(data) {
                publish.getCommentDataDone(util.decodingTopicData(data));
            });
        }

        var _subscribe = function(topic, subscribeFunction) {
            if(arguments.length == 2 && $.isFunction(subscribeFunction)) {
                $.channel('subscribe', topic, subscribeFunction );
            } else {
                util.log("subscribe arguments format error.");
            }
        };

        var _unsubscribe = function(topic, unsubscribeFunction) {
            if(arguments.length == 2 && $.isFunction(unsubscribeFunction)) {
                $.channel('unsubscribe', topic, unsubscribeFunction );
            } else {
                util.log("unsubscribe arguments format error.");
            }
        };

        var _publish = function(topic, data, context) {
            if(arguments.length > 0) {
                $.channel('publish', topic, data, context);
            } else {
                util.log("publish arguments format error.");
            }
        };

        var subscribe = {};
        var unsubscribe = {};
        var publish = {};

        $.each(topics, function(funcName, topic) {
            subscribe[funcName] = function(subscribeFunction) {
                _subscribe(topic, subscribeFunction);
            },
            unsubscribe[funcName] = function(unsubscribeFunction) {
                _unsubscribe(topic, unsubscribeFunction);
            },
            publish[funcName] = function(data, context) {
                _publish(topic, data, context);
            }
        });

        mappingTopicFlow();
        //service.start();

        return {
            topic: topics,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            publish: publish
        };
    })();

})