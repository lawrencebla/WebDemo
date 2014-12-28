;define("widget/gallery/gallery", function(require, exports, module) {

    var template = require("gen/template");

    var tpls = {
        tpl_gallery_wrapper: "tpl_gallery_wrapper",
        tpl_gallery_list: "tpl_gallery_list"
    };

    module.exports = function(el, options) {
        var self = this;
        self.el = el;

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
            children: ".j-gallery-item",
            marginTopHeight: 20
        };

        // 初始化数据
        var _init = function(data) {
            _flowItem(data,  _getRowsNum());
        };

        // 分类
        var _filter = function(selector) {
            self.children.hide();
            self.children.css("-webkit-transform", "translate3d(0, 0, 0)");
            self.children.filter(selector).show();
            _calcItemPosition(_getRowsNum());
        };

        // 获取模块列数
        var _getRowsNum = function() {
            var containerHeight = $(window).height() - _options.marginTopHeight;
            var rowNum = _options.boundaryHeight.length;
            for(; rowNum > 0; rowNum--) {
                if(_options.boundaryHeight[rowNum - 1] * rowNum <= containerHeight ) {
                    return rowNum + 1;
                }
            }
            return 1;
        };

        // 排版
        var _flowItem = function(data, rowsNum) {
            //_calcItemSize(rowsNum);
            _render(data);
            _calcItemPosition(rowsNum);
        };

        var _render = function(data) {
            if(_options.galleryClass) {
                data.galleryClass = _options.galleryClass;
            }
            self.el.html(template(tpls.tpl_gallery_wrapper, data));
            self.children = _getChildren();
        };

        var _getChildren = function() {
            if(_options.children instanceof jQuery) {
                return _options.children;
            }
            return self.el.find(_options.children);
        };

        // 计算模块大小
        var _calcItemSize = function(rowsNum) {
            var containerHeight = self.el.outerHeight();
            var itemHeight = containerHeight/rowsNum;
            $.each(self.children, function(i, item) {
                var $item = $(item);
                if(!$item.is("hidden")) {
                    $(item).css("transform", "scale3d(" + +")");
                }
            });
            return;
        };

        // 计算模块位置
        var _calcItemPosition = function(rowsNum) {
            var row = 0;
            var col = 0;
            $.each(self.children.filter(":visible"), function(i, item) {
                $(item).css("-webkit-transform", "translate3d(" + parseInt(i/rowsNum) + "00%, " + i%rowsNum + "00%, 0px)");
            });
        }

        $.extend(_options, options);

        $(window).resize(function() {
            _calcItemPosition(_getRowsNum());
        });

        return {
            start: function(data) {
                _init(data);
            },
            filter: function(selector) {
                _filter(selector);
            }
        };
    };

});