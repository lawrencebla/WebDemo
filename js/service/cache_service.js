;define("service/cache_service", function(require, exports, module) {

    var cacheService =  (function() {

        var cache = {

        };

        var _add = function(path, value) {
            cache[path] = value;
        };

        var _get = function(path) {
            return cache[path];
        };

        return  {
            add: _add,
            get: _get
        };
    })();

    module.exports = cacheService;

});