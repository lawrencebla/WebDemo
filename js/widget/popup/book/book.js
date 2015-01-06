;define("widget/popup/book/book", function(require, exports, module) {

    var template = require("gen/template");
    var cacheService = require("service/cache_service");
    var config = require("config/config");
    var TRANSFORM = require("util/browser_adaptor");

    var animationing = false;

    module.exports = function(el, options) {
        var cacheServiceDataPath = config.apiPath.loadSubjectData;
        var currentId = "";
        var itemLength = 0;
        var tpl = {
            tpl_book: "tpl_book",
            tpl_book_left_part: "tpl_book_left_part",
            tpl_book_right_part: "tpl_book_right_part"
        };
        var cacheIndexToId = {};
        var cacheIdToIndex = {};

        var __removeOldPage = function(callback, oldLeft, oldRight) {
            callback(function() {
                oldLeft.remove();
                oldRight.remove();
            }, oldLeft, oldRight);
        };

        var __renderPage = function(arrow) {
            var newLeft = $(template(tpl.tpl_book_left_part, cacheService.get(cacheServiceDataPath)[currentId])).addClass('j-new-page');
            var newRight = $(template(tpl.tpl_book_right_part, cacheService.get(cacheServiceDataPath)[currentId])).addClass('j-new-page');
            var oldLeft = $(".j-book-content").find(".j-book-left-part").removeClass('j-new-page');
            var oldRight = $(".j-book-content").find(".j-book-right-part").removeClass('j-new-page');
            if(arrow > 0) {
                newLeft.css(TRANSFORM, "rotateY(180deg)");
                oldRight.before(newRight);
                oldLeft.after(newLeft);
                oldRight.addClass('rotating');
                __removeOldPage(function (removeFunc, oldLeft, oldRight) {
                    oldRight.css(TRANSFORM, 'rotateY(-180deg)');
                    newLeft.css(TRANSFORM, 'rotateY(0deg)');
                    setTimeout(function () {
                        oldLeft.remove();
                        oldRight.remove();
                        animationing = false;
                        //removeFunc();
                    }, 1200);
                }, oldLeft, oldRight);
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
