;define("util/util", function(require, exports, module) {
    module.exports = (function() {
        return {
            isSuccess: function(data) {
                return data && data.status && data.status == constant.status.success;
            },

            hasInfoData: function(data) {
                return (data && data.info && data.info.length > 0) ||
                    (data && data.data && data.data.info && data.data.info.length > 0);
            },

            hasMoreData: function (data) {
                return !!(data && data.data && data.data.hasMore && data.data.hasMore == 1);
            },

            log: function (s) {
                if (config.debug && console && console.log) {
                    console.log(s);
                }
                return;
            },

            decodingTopicData: function(data) {
                return data && data.data;
            },

            decodingTopicOptions: function(data) {
                var resultData = {};
                var params = {};
                if(data) {
                    if(data.data) {
                        if(data.data.data || data.data.options) {
                            resultData = data.data.data ? data.data.data : {};
                            params = data.data.params ? data.data.params : {};
                        } else {
                            resultData = data.data;
                        }
                    } else {
                        resultData = data;
                    }
                }
                return {
                    data: resultData,
                    params: params
                };
            }
        };
    })();
});