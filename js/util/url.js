;define("util/url", function(require, exports, module) {
    var url = (function () {

        // private method for UTF-8 encoding
        var _utf8Encode = function (string) {

            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return escape(utftext);
        };

        // private method for UTF-8 decoding
        var _utf8Decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return unescape(string);
        };

        var _addParameter = function (url, name, value) {
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            url = url + name + '=' + _utf8Encode(value);
            return url;
        };

        return {
            // public method for url encoding
            encode: function (string) {
                return _utf8Encode(string);
            },

            // public method for url decoding
            decode: function (string) {
                return _utf8Decode(string);
            },

            addParameters: function () {
                if (arguments.length < 2) {
                    return;
                }
                var url = arguments[0];
                if (arguments.length == 2 && typeof arguments[1] === 'object') {
                    var o = arguments[1];
                    for (var p in o) {
                        if (o.hasOwnProperty(p)) {
                            url = _addParameter(url, p, o[p]);
                        }
                    }
                } else {
                    for (var i = 1; i < arguments.length - 1; i += 2) {
                        url = _addParameter(url, arguments[i], arguments[i + 1]);
                    }
                }
                return url;
            },

            getParameter: function (url, name) {
                var queryStr = "";
                var idx = url.indexOf("?");
                if (idx > -1) {
                    queryStr = url.substring(idx + 1);
                }
                var reg = new RegExp("(([^=]+?)=([^&]*?)(&|$))", "gi");
                var result = "";

                var tempArray = queryStr.match(reg);
                if (null != tempArray) {
                    for (var i = 0; i < tempArray.length; i++) {
                        var r = tempArray[i];
                        var array = r.split("=");
                        if (array[0] == name) {
                            if (result.length > 0) {
                                result = result + ",";
                            }
                            if (array[1].charAt(array[1].length - 1) == '&') {
                                array[1] = array[1].substring(0, array[1].length - 1);
                            }
                            result = result + array[1];
                        }
                    }
                }
                return result;
            },

            removeParameter: function (url, name) {
                if (url.indexOf(name) < 0) {
                    return url;
                }

                var idx = url.indexOf('?');
                if (idx < 0) {
                    return url;
                }
                var queryStr = url.substring(idx + 1);
                var reg = new RegExp("(([^=]+?)=([^&]*?)(&|$))", "gi");
                var tempArray = queryStr.match(reg);

                for (var i = 0; i < tempArray.length; i++) {
                    var r = tempArray[i];
                    var array = r.split("=");
                    if (array[0] == name) {
                        url = url.replace(r, "");
                    }
                }

                if (url.charAt(url.length - 1) == '?' || url.charAt(url.length - 1) == '&') {
                    url = url.substring(0, url.length - 1);
                }
                return url;
            },

            replaceParameter: function (url, name, value) {
                return _addParameter(this.removeParameter(url, name), name, value);
            }
        };
    })();

    module.exports = url;
});