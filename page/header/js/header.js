/**
 * 后端版本控制 加载 js 类库和css 类库
 * @author ghy
 * @constant qq249398279
 * */
(function () {
    var Z = document.getElementsByTagName('script')[0];
    var csss = [
        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminpageV3.9.css", //后端样式
        "/page/header/css/agate.css" //后端样式
    ];
    var jss = [
        "/page/header/js/highlight.min.js",
        "/page/header/js/adminV3.js",
    ];

    for (var i = 0; i < csss.length; i++) {
        var tmpcss = document.createElement('link');
        tmpcss.rel = "stylesheet";
        tmpcss.href = csss[i];
        Z.parentNode.insertBefore(tmpcss, Z);
    }
    for (var i = 0; i < jss.length; i++) {
        var tmpjs = document.createElement('script');
        tmpjs.type = 'text/javascript';
        tmpjs.async = false;
        tmpjs.src = jss[i];
        Z.parentNode.insertBefore(tmpjs, Z);
    }
    window.HOME_LINK = "/";
    window.CONF_URL = "/page.json";
    window.zadmin = (function (fun) {
        var tmpfun = [];
        admin = {
            ready: function (fun) {
                if (typeof fun === "function") {
                    tmpfun.push(fun);
                }
            }, init: function () {
                for (var i in tmpfun) {
                    tmpfun[i]();
                }
            }
        };
        return admin;
    })();
})();
admin.ready(function () {
    Wiki.init();
});
var Wiki = (function () {
    var model = {};
    var wiki = {
        init: function () {
            this.layout()
            this.initEvent();
        }, layout: function () {
            hljs.configure({tabReplace: '    '});
            hljs.initHighlightingOnLoad()
        }, initEvent: function () {
        }, load: function (link) {
        }
    };
    var ret = {
        init: function () {
            wiki.init();
        }
    }
    return ret;
})()