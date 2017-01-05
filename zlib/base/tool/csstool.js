(function (tool) {
    "use strict";
    var csstool = {
        makstyle: function (styleobj) {
            var stylestr = csstool.getstyle(styleobj);
            var STY = $('style');
            if (STY != null && STY.length > 0) {
                try {
                    STY.eq(0).append(stylestr)
                } catch (e) {
                    var styles = $('<style type="text/css">' + stylestr + '</style>')
                    styles.appendTo("head");
                    console.log("【csstool】 append err" + e)
                }
            } else {
                var styles = $('<style type="text/css">' + stylestr + '</style>')
                styles.appendTo("head");
            }
        },
        getstyle: function (styleobj) {
            var retstr = "";
            var styarray = csstool._getstyleArray(styleobj)
            for (var i = 0; i < styarray.length; i++) {
                var styles = styarray[i];
                for (var j = styles.length - 1; j >= 0; j--) {
                    var style = styles[j];
                    for (var ids in style) {
                        var idksys = ids.replace(/[#]/gi, " #").replace(/[\.]/gi, " .").replace(/&\s/gi, "&").replace(/&/gi, "")
                        var str = style[ids];
                        retstr += idksys + "{" + str + "}";
                    }
                }
            }
            retstr = retstr.replace(/^\s/gi, "")
            return retstr;
        },
        _getstyleArray: function (obj) {
            var array = [];
            for (var key in obj) {
                var ret = csstool._getyles(key, obj[key]);
                array.push(ret);
            }
            return array;
        },
        _getyles: function (key, pa) {
            var array = [];
            var ret = [];
            getstyle(key, pa);
            function getstyle(perfix, obj) {
                var tmp = {}
                for (var key in obj) {
                    if (/[#\.&]/gi.test(key) && (typeof obj[key] == "object")) {
                        getstyle(perfix + key, obj[key]);
                    } else {
                        tmp[perfix] = (tmp[perfix] || "") + key + ":" + obj[key] + ";";
                    }
                }
                array.push(tmp)
            }
            return array
        }
    };
    tool.mkcss = csstool.makstyle;
})(zlib.tool = zlib.tool || {});