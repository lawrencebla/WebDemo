;define("core/class", function(require, exports, module) {

    module.exports = (function() {
        return {
            extend: function(backboneObj, options) {
                if(options) {
                    var oldConstructor = options.constructor;
                    options.constructor = function (backboneParams, optionsParams) {
                        backboneObj.apply(this, [backboneParams]);
                        if ($.isFunction(oldConstructor)) {
                            oldConstructor.apply(this, arguments);
                        }
                        $.extend(true, this, optionsParams);
                    }
                }
                var customObj = backboneObj.extend(options);

                customObj.extend = function() {
                    var _super = this;
                    var child = backboneObj.extend.apply(_super, arguments);
                    child.extend = arguments.callee;
                    child.property = _super.prototype;

                    return child;
                };
                customObj.property = backboneObj.prototype;
                return customObj;
            }
        };
    })();

});