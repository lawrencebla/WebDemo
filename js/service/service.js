;define("service/service", function(require, exports, module) {

    var ajax = require("core/ajax");
    var config = require("config/config");
    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var service = (function() {

        return {
            loadHomeData: function(success, error) {
                ajax.get(config.apiPath.loadHomeData, {}, success, error);
            },

            loadArtData: function(success, error) {
                ajax.get(config.apiPath.loadArtData, {}, success, error);
            },

            loadCommonwealData: function(success, error) {
                ajax.get(config.apiPath.loadCommonwealData, {}, success, error);
            },

            loadCommentData: function(success, error) {
                ajax.get(config.apiPath.loadCommentData, {}, success, error);
            },

            postComment: function(comment) {
                ajax.get(config.apiPath.postComment, {comment: comment});
            }
        };

    })();

    service.start = function() {
        topic_center.subscribe.loadHomeDataTodo(function (params) {
            service.loadHomeData(function (data) {
                topic_center.publish.loadHomeDataDone({data: data, params: util.decodingTopicData(params)});
            }, function () {
                topic_center.publish.loadHomeDataError();
            });
        });

        topic_center.subscribe.loadArtDataTodo(function (params) {
            service.loadArtData(function (data) {
                topic_center.publish.loadArtDataDone({data: data, params: util.decodingTopicData(params)});
            }, function () {
                topic_center.publish.loadArtDataError();
            });
        });

        topic_center.subscribe.loadCommonwealDataTodo(function (params) {
            service.loadCommonwealData(function (data) {
                topic_center.publish.loadCommonwealDataDone({data: data, params: util.decodingTopicData(params)});
            }, function () {
                topic_center.publish.loadCommonwealDataError();
            });
        });

        topic_center.subscribe.loadCommentDataTodo(function (params) {
            service.loadCommentData(function (data) {
                topic_center.publish.loadCommentDataDone({data: data, params: util.decodingTopicData(params)});
            }, function () {
                topic_center.publish.loadCommentDataError();
            });
        });

        topic_center.subscribe.postCommentTodo(function (params) {
            service.postComment(util.decodingTopicData(params).content, function (data) {
            }, function () {
            });
        });
    };

    module.exports = service;

});