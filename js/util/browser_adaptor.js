;define("util/browser_adaptor", function(require, exports, module) {

    var TRANSFORM = function (css) {
        for (var arr = [ 'webkitTransform', 'MozTransform', 'transform'], i = 0; i < arr.length; i++)
            if (typeof css[[arr[i]]] !== 'undefined')
                return arr[i];
    }(document.documentElement.style);

    module.exports = TRANSFORM;
});