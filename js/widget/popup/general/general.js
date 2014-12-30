;define("widget/popup/general/general", function(require, exports, module) {

    var template = require("gen/template");
    var cacheService = require("service/cache_service");
    var config = require("config/config");

    module.exports = function(el, options) {
        var cacheServiceDataPath = config.apiPath.loadSubjectData;
        var currentId = "";
        var itemLength = 0;
        var tpl = {
            tpl_popup_general: "tpl_popup_general"
        };
        var cacheIndexToId = {};
        var cacheIdToIndex = {};

        var __renderPage = function(arrow) {
            $(".j-popup-content").find(".j-popup-content-item").html(template(options.tpl_popup_content_item, cacheService.get(options.cacheServiceDataPath)[currentId]));
        };

        var __renderPrev = function() {
            currentId = __findPrev();
            __renderPage(-1);
        };

        var __renderNext = function() {
            currentId = __findNext();
            __renderPage(1);
        };

        var __findPrev = function() {
            var index = cacheIdToIndex[currentId];
            if(index == 0) {
                return cacheIndexToId[itemLength  - 1];
            } else {
                return cacheIndexToId[index - 1];
            }
        };

        var __findNext = function() {
            var index = cacheIdToIndex[currentId];
            if(index == itemLength - 1) {
                return cacheIndexToId[0];
            } else {
                return cacheIndexToId[index + 1];
            }
        };

        var _addToCache = function(index, item) {
            var id = $(item).attr("data-id");
            cacheIndexToId[index] = id;
            cacheIdToIndex[id] = index;
            itemLength++;
        };

        var _bindItemClick = function(item) {
            _close();
            _open(item);
        };

        var _open = function(item) {
            if(options.cacheServiceDataPath) {
                currentId = $(item).attr("data-id");
                $(".j-takagism-wrapper").append(template(tpl.tpl_popup_general, {customClass: options.customClass}));
                __renderPage(1);
                _changeImgSize();

                $(".j-popup-content").find(".j-prev-button").click(function () {
                    __renderPrev();
                });
                $(".j-popup-content").find(".j-next-button").click(function () {
                    __renderNext();
                });
                $(".j-popup-content").find(".j-close-book-button").click(function () {
                    _close();
                    currentId = "";
                    itemLength = 0;
                });

                $("a").bind("click.acticle", function (e) {
                    if (!$.contains($(".j-popup-content"), e.target)) {
                        _close();
                    }
                });
            }
        };

        var _close = function() {
            if($(".j-popup-content").length > 0) {
                $(".j-popup-content").remove();
                $("a").unbind("click.acticle");
            }
        };

        var _changeImgSize = function() {
            el.find(".j-popup-general-content-img").height($(window).height());
        };

        $(window).resize(function() {
            _changeImgSize();
        });


        $.each(el.find(options.childrenSelector), function(i, item) {
            _addToCache(i, item);
            $(item).click(function() {
                _bindItemClick(this);
            });
        });
    }

});