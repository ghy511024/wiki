/**
 * 后端版本控制 加载 js 类库和css 类库
 * @author ghy
 * @constant qq249398279
 * */
(function () {
    var Z = document.getElementsByTagName('script')[0];
    var csss = [
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.css",
        "http://static.ws.kukuplay.com/common/styles/dataTables.bootstrap.css",
        "/page/header/css/agate.css", //后端样式
        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminpageV3.9.css" //后端样式
//        "/page/header/css/adminpageV3.0.css", //后端样式
    ];
    var jss = [
        "http://static.ws.kukuplay.com/common/lib/bootstrap/v3.3.5/js/bootstrap.min.js", //bootstrap 核心
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.js", //jquery ui 日期插件
        "http://static.ws.kukuplay.com/common/scripts/lib/jquery.dataTables.min.js", // 数据表格
        "http://static.ws.kukuplay.com/common/scripts/lib/dataTables.bootstrap.js",
        "http://cdn.bootcss.com/highlight.js/8.5/highlight.min.js",
//        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminV3.1.min.js",
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
//    window.CONF_URL="";
    window.CONF_URL = "/adminpage.json";
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
(function () {
    zadmin.ready(function () {
        Wiki.init();
    });
    var Wiki = (function () {
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
})()