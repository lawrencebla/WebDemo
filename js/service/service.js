;define("service/service", function(require, exports, module) {

    var ajax = require("core/ajax");
    var config = require("config/config");
    var topic_center = require("topic/topic_center");
    var util = require("util/util");

    var service = (function() {

        return {
            loadHomeData: function(success, error) {
                ajax.get(config.apiPath.loadHomeData, {}, success, error);
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
    };

    module.exports = service;

});