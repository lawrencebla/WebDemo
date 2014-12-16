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
    /*v:3*/
    template("tpl_gallery_list", function($data) {
        "use strict";
        var $utils = this, info = ($utils.$helpers, $data.info), i = $data.i, e = $data.e, $escape = $utils.$escape, $out = "";
        if (info && info.length) for (var i = 0; i < info.length; i++) {
            var e = info[i];
            $out += ' <li data-src="', $out += $escape(e.largeImgPath), $out += '"> <a href="javascript:void(0)" data-id="',
            $out += $escape(e.id), $out += '"> <img src="', $out += $escape(e.smallImgPath), 
            $out += '"/> <span>', $out += $escape(e.name), $out += "</span> </a> </li> ";
        }
        return new String($out);
    }), /*v:4*/
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
    }), /*v:2*/
    template("tpl_taskagism", '<div> <ul> <li><a href="#home">首页</a></li> <li><a href="#subject">主题介绍</a></li> <li><a href="#art">艺术休闲吧</a></li> <li><a href="#commonweal">筑梦公益墙</a></li> <li><a href="#summary">公司简介</a></li> <li><a href="#comment">联系我们</a></li> </ul> </div>');
}();