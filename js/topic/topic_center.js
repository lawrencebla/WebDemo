;define("topic/topic_center", function(require, exports, module) {

    var util = require("util/util");
    //var service = require("service/service");

    module.exports = (function() {

        var topics = {
            getHomeDataTodo: "get/home/data/todo",
            getHomeDataDoing: "get/home/data/doing",
            getHomeDataDone: "get/home/data/done",
            getHomeDataError: "get/home/data/error",

            loadHomeDataTodo: "load/home/data/todo",
            loadHomeDataDoing: "load/home/data/doing",
            loadHomeDataDone: "load/home/data/done",
            loadHomeDataError: "load/home/data/error"
        };

        var mappingTopicFlow = function() {
            // Home Page
            subscribe.getHomeDataTodo(function(data) {
                publish.loadHomeDataTodo(util.decodingTopicData(data));
            });
            subscribe.loadHomeDataDone(function(data) {
                publish.getHomeDataDone(util.decodingTopicData(data));
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