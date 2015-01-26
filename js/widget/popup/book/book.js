;define("widget/popup/book/book", function(require, exports, module) {

    var template = require("gen/template");
    var cacheService = require("service/cache_service");
    var config = require("config/config");
    var constant = require("config/constant");
    var TRANSFORM = require("util/browser_adaptor");

    var animationing = false;

    module.exports = function(el, options) {
        var cacheServiceDataPath = config.apiPath.loadSubjectData;
        var currentId = "";
        var currentObj = {};
        var itemLength = 0;
        var tpl = {
            tpl_book: "tpl_book",
            tpl_book_left_part: "tpl_book_left_part",
            tpl_book_right_part: "tpl_book_right_part"
        };
        var cacheIndexToId = {};
        var cacheIdToIndex = {};

        var __renderPage = function(arrow) {
            if(!currentObj.id) {
                currentObj = cacheService.get(cacheServiceDataPath)[currentId];
            }
            var newLeft = $(template(tpl.tpl_book_left_part, currentObj)).addClass('j-new-page');
            var newRight = $(template(tpl.tpl_book_right_part, currentObj)).addClass('j-new-page');
            var oldLeft = $(".j-book-content").find(".j-book-left-part").removeClass('j-new-page');
            var oldRight = $(".j-book-content").find(".j-book-right-part").removeClass('j-new-page');
            if(arrow > 0) {
                newLeft.css(TRANSFORM, "rotateY(180deg)");
                oldRight.before(newRight);
                oldLeft.after(newLeft);
                oldRight.addClass('rotating');
                setTimeout(function () {
                    oldRight.css(TRANSFORM, 'rotateY(-180deg)');
                    newLeft.css(TRANSFORM, 'rotateY(0deg)');
                    setTimeout(function () {
                        oldLeft.remove();
                        oldRight.remove();
                        animationing = false;
                    }, 1200);
                });
            } else {
                newRight.css(TRANSFORM, "rotateY(-180deg)");
                oldLeft.before(newRight).before(newLeft);

                setTimeout(function () {
                    oldLeft.css(TRANSFORM, 'rotateY(180deg)');
                    newRight.css(TRANSFORM, 'rotateY(0deg)');
                    setTimeout(function () {
                        newRight.removeClass('rotating');
                        oldLeft.remove();
                        oldRight.remove();
                        animationing = false;
                    }, 1200);
                });
            }
        };

        var __renderPrev = function() {
            currentObj = __findPrev();
            currentId = currentObj.id;
            __renderPage(-1);
        };

        var __renderNext = function() {
            currentObj = __findNext();
            currentId = currentObj.id;
            __renderPage(1);
        };

        var __findPrev = function() {
            var filterData = _getFilterData();
            var prevObj = {};
            $.each(filterData, function(index, item) {
                if(item.id === currentId) {
                    if(index == 0) {
                        prevObj = filterData[filterData.length  - 1];
                    } else {
                        prevObj = filterData[index - 1];
                    }
                }
            });
            return prevObj;
        };

        var __findNext = function() {
            var filterData = _getFilterData();
            var nextObj = {};
            $.each(filterData, function(index, item) {
                if(item.id === currentId) {
                    if(index == filterData.length - 1) {
                        nextObj = filterData[0];
                    } else {
                        nextObj = filterData[index + 1];
                    }
                }
            });
            return nextObj;
        };

        var _getFilterData = function() {
            var bookFilterType = cacheService.get(constant.bookFilter);
            var filterData = [];
            $.each(cacheService.get(cacheServiceDataPath), function(index, item) {
                if(bookFilterType === 'all' || item.type === bookFilterType) {
                    filterData.push(item);
                }
            });
            return filterData;
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
            animationing = false;
            currentId = $(item).attr("data-id");
            $(".j-takagism-wrapper").append(template(tpl.tpl_book, {data: cacheService.get(cacheServiceDataPath)[currentId]}));
            _changeImgSize();

            $(".j-book-content").find(".j-prev-button").click(function() {
                if(animationing) {
                    return;
                }
                animationing = true;
                __renderPrev();
            });
            $(".j-book-content").find(".j-next-button").click(function() {
                if(animationing) {
                    return;
                }
                animationing = true;
                __renderNext();
            });
            $(".j-book-content").find(".j-close-book-button").click(function() {
                _close();
                currentId = "";
                itemLength = 0;
            });

            $("a").bind("click.book", function(e) {
                if(!$.contains($(".j-book-content"), e.target)) {
                    _close();
                }
            });
        };

        var _close = function() {
            if($(".j-book-content").length > 0) {
                $(".j-book-content").remove();
                $("a").unbind("click.book");
            }
        };

        var _changeImgSize = function() {
           // $(".j-book-content .j-book-left-img").height($(window).height());
        };

        $(window).resize(function() {
            _changeImgSize();
        });

        $.each(el.find("li"), function(i, item) {
            _addToCache(i, item);
            $(item).click(function() {
                _bindItemClick(this);
            });
        });
    }

});
