;define("core/ajax", function(require, exports, module) {

    var util = require("util/util");

    var _ajax = function (type, url, param, successCallback, errorCallback, dataType, timeout) {

    var isTest = true;
    if(!isTest) {

        if (typeof errorCallback == "undefined") {
            errorCallback = function (XMLHttpRequest, textStatus, errorThrown) {
                if (config.debug) {
                    console.log("status:" + textStatus + " errorThrown:" + errorThrown);
                }
            };
        }
        if (!dataType) {
            dataType = "json";
        }
        timeout = 60 * 1000;
        return $.ajax({
            type: type,
            url: url,
            data: param,
            cache: false,
            dataType: dataType,
            timeout: 60 * 1000,
            success: successCallback,
            error: errorCallback
        });

    } else {
        //try {
            successCallback(require("test_data/" + url));
        //} catch(e) {
        //    console.log(e);
            //console.log("have not test data: " + url);
        //}
    }

    };

    module.exports = (function() {
        return {
            get: function (url, param, successCallback, errorCallback, dataType, timeout) {
                return _ajax("GET", url, param, successCallback, errorCallback, dataType, timeout);
            },
            post: function (url, param, successCallback, errorCallback, dataType, timeout) {
                return _ajax("POST", url, param, successCallback, errorCallback, dataType, timeout);
            }
        };
    })();

});