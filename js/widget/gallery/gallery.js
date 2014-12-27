;define("widget/gallery/gallery", function(require, exports, module) {

    module.exports = function(el) {
        this.el = el;
        this.children = this.el.children();

        /*
            默认属性：
            boundaryHeight: 模块不同行数边界时的高度
                            如[100, 200], 则有3种显示方式：
                            当模块高度小于100时，单列显示；
                            当模块高度大于等于100，小于200时，两列显示，
                            当模块高度大于300时，三列显示

            children: 子元素/选择器

         */
        var _options = {
            boundaryHeight: [340],
            children: ""
        };

        // 初始化数据
        var _init = function() {

        };

        // 获取模块列数
        var _getRowsNum = function() {
            var containerHeight = this.el.outerHeight();
            var i = 1;
            for(; i < _options.boundaryHeight.length; i++) {
                if(_options.boundaryHeight * i ) {

                }
            }
        };

        // 计算模块大小
        var _calcItemSize = function() {

        };

        // 计算模块位置

        return {
            start: function(options) {
                $(_options, options);
                _init();
            }
        };
    };

});