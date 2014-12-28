/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define("gen/template", function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:2*/
    template("tpl_art", '<ul class="sub-page-top-menue"> <li class="tab"><a href="#arder">休闲娱乐区</a></li> <li class="tab"><a href="#artwork">艺术品展示</a></li> </ul> <div id="arder" class="j-arder-content"> </div> <div id="artwork" class="j-artwork-content"> </div>'), 
    /*v:1*/
    template("tpl_comment", function($data, $filename) {
        "use strict";
        var $utils = this, info = ($utils.$helpers, $data.info), i = $data.i, include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, $out = "";
        if ($out += '<div> <div> <div>水木迷城真人实景游戏</div> <div>密室预约</div> <ul> <li><span class="phone-icon"></span>电话: </li> <li><span class="mobile-icon"></span>手机: </li> <li><span class="address-icon"></span>北京市还定去北三环西路科技会展中心</li> </ul> <div></div> </div> <div> <div>评论区</div> <ul class="j-post-comment-list-wrapper"> ', 
        info && info.length > 0) for (var i = 0; i < info.length; i++) include("./tpl_comment_list_item", info[i]);
        return $out += ' </ul> <textarea class="j-post-comment-content"></textarea> <a class="j-post-comment" href="javascript:void(0)">评论</a> </div> </div>', 
        new String($out);
    }), /*v:1*/
    template("tpl_comment_list_item", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), content = $data.content, date = $data.date, $out = "";
        return $out += "<li> <span>玩家：</span>", $out += $escape(content), $out += " <span>", 
        $out += $escape(date), $out += "</span> </li>", new String($out);
    }), /*v:2*/
    template("tpl_commonweal", '<ul class="sub-page-top-menue"> <li class="tab"><a href="#weal_doing">火热逐梦中</a></li> <li class="tab"><a href="#weal_done">艺术品展示</a></li> </ul> <div id="weal_doing" class="j-weal-doing-content"> </div> <div id="weal_done" class="j-weal-done-content"> </div>'), 
    /*v:1*/
    template("tpl_gallery_list", function($data) {
        "use strict";
        var $utils = this, info = ($utils.$helpers, $data.info), i = $data.i, e = $data.e, $escape = $utils.$escape, $out = "";
        if (info && info.length) for (var i = 0; i < info.length; i++) {
            var e = info[i];
            e.commonwealDone === !1 && (e.attach = "(逐梦中)"), $out += ' <li class="j-gallery-item" data-src="', 
            $out += $escape(e.largeImgPath), $out += '" data-name="', $out += $escape(e.name), 
            $out += '" data-level="', $out += $escape(e.level), $out += '" data-plot="', $out += $escape(e.plot), 
            $out += '" data-interest="', $out += $escape(e.interest), $out += '" data-content="', 
            $out += $escape(e.content), $out += '" data-commonweal-done="', $out += $escape(e.commonwealDone), 
            $out += '" data-type="', $out += $escape(e.type), $out += '"> <a href="javascript:void(0)" data-id="', 
            $out += $escape(e.id), $out += '"> <img src="', $out += $escape(e.smallImgPath), 
            $out += '"/> <span> ', $out += $escape(e.name), $out += $escape(e.attach), $out += " </span> </a> </li> ";
        }
        return new String($out);
    }), /*v:1*/
    template("tpl_gallery_wrapper", function($data, $filename) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), galleryClass = $data.galleryClass, include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, info = $data.info, $out = "";
        return $out += '<ul class="j-gallery-wrapper gallery lb-album ', $out += $escape(galleryClass), 
        $out += '"> ', include("./tpl_gallery_list", {
            info: info
        }), $out += " </ul>", new String($out);
    }), /*v:1*/
    template("tpl_home_content", function($data) {
        "use strict";
        var $utils = this, i = ($utils.$helpers, $data.i), info = $data.info, e = $data.e, $escape = $utils.$escape, $out = "";
        $out += '<div class="home-bg overlay"> <div class="fg_overlay"></div> </div> <div id="j_home_content"> <ul id="test1"> ';
        for (var i = 0; i < info.length; i++) {
            var e = info[i];
            $out += " <li> <div>", $out += $escape(e.name), $out += "</div> </li> ";
        }
        $out += ' </ul> <ul id="test2"> ';
        for (var i = 0; i < info.length; i++) {
            var e = info[i];
            $out += " <li> <div>", $out += $escape(e.name), $out += "</div> </li> ";
        }
        return $out += " </ul> </div>", new String($out);
    }), /*v:1*/
    template("tpl_popup_acticle", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), picturePath = $data.picturePath, name = $data.name, attach = $data.attach, content = $data.content, $out = "";
        return $out += '<div> <div><img src="', $out += $escape(picturePath), $out += '"/></div> <div> <div>', 
        $out += $escape(name), $out += $escape(attach), $out += ":</div> <div>", $out += $escape(content), 
        $out += "</div> </div> </div>", new String($out);
    }), /*v:1*/
    template("tpl_popup_book", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), picturePath = $data.picturePath, name = $data.name, level = $data.level, plot = $data.plot, interest = $data.interest, content = $data.content, $out = "";
        return $out += '<div> <div><img src="', $out += $escape(picturePath), $out += '"/></div> <div> <div>', 
        $out += $escape(name), $out += "</div> <div>难度: ", $out += $escape(level), $out += "</div> <div>情节: ", 
        $out += $escape(plot), $out += "</div> <div>趣味: ", $out += $escape(interest), $out += "</div> <div>主题介绍</div> <div>", 
        $out += $escape(content), $out += "</div> </div> </div>", new String($out);
    }), /*v:2*/
    template("tpl_subject", '<ul class="sub-page-top-menue"> <li class="tab"><a href="javascript:void(0)" class="j-all-link">全部</a></li> <li class="tab"><a href="javascript:void(0)" class="j-escape-link">密室主题</a></li> <li class="tab"><a href="javascript:void(0)" class="j-detective-link">侦探主题</a></li> <li class="tab"><a href="javascript:void(0)" class="j-rpg-link">真人RPG</a></li> </ul> <div class="j-subject-content"></div>'), 
    /*v:5*/
    template("tpl_summary", '<div class="secret-room-bg overlay" style="background-size: 100%;"> </div> <div class="summary-animation-scroll-wrapper overlay"> <div class="summary-animation-scroll"> <section> <section class="title">公司简介</section> <section> <p>水木迷城文化传播有限公司成立于2013年8月，主要业务为真人实景类游戏的设计、推广与运营。</p> <p>公司旗下位于海淀区的三家直营店自开业以来受到玩家的一致好评。目前公司在北京、河北、浙江、福建、广东、辽宁、吉林、湖北、新疆、内蒙、贵州等地已有二十余家加盟店。</p> <p>除实体店外，水木迷城设计团队已为全国三十多个城市的密室逃脱店面提供了密室游戏设计，并独立开发了主题相关电脑程序、手机app，设计了侦探游戏、真人RPG游戏等多种类型的室内实景游戏，拥有丰富的游戏设计经验。</p> </section> </section> <section class="summary-animation-scroll-bottom"> <section class="title">团队成员</section> <section> <p>CEO: 黄帅</p> <p>CTO: 黄帅</p> <p>CFO: 黄帅</p> <p>UFO: 黄帅</p> </section> </section> </div> </div>'), 
    /*v:2*/
    template("tpl_taskagism", '<ul id="menue-overlay" class="j-menue-overlay overlay"> <li class="logo-line"> <img class="logo" src="js/images/logo.jpg"/> <img class="sub-logo" src="js/images/Z02.png"/> </li> <li class="tab"><a href="#home">首页</a></li> <li class="tab"><a href="#subject">主题介绍</a></li> <li class="tab"><a href="#art">艺术休闲吧</a></li> <li class="tab"><a href="#commonweal">筑梦公益墙</a></li> <li class="tab"><a href="#summary">公司简介</a></li> <li class="tab"><a href="#comment">预约及评论</a></li> </ul> <div id="home" class="j-home-content overlay j-tab-content"> </div> <div id="subject" class="j-subject-content overlay j-tab-content"> </div> <div id="art" class="j-art-content overlay j-tab-content"> </div> <div id="commonweal" class="j-commonweal-content overlay j-tab-content"> </div> <div id="summary" class="j-summary-content overlay j-tab-content"> </div> <div id="comment" class="j-comment-content overlay j-tab-content"> </div>');
}();