/* 
 * 异常监控模块
 */
(function () {
    //异常监控
    window.errarry = [];
    window.Monitor = function (instance) {
        for (key in instance) {
            method = instance[key]
            if (typeof instance[key] == "function") {
                instance[key] = (function (key, method) {
                    return function () {
                        try {
                            return  method.apply(this, arguments);
                        }
                        catch (e) {
                            var name = (this._id || ("window")) + "." + key;
                            var map = {};
                            map[name] = e + "";
                            errarry.push(map);
                        }
                    }
                })(key, method)
            }
        }
        return instance;
    };
    setTimeout(function () {
        var useragent = "";
        for (var k in $.browser) {
            if (useragent.length > 0) {
                useragent += "-"
            }
            useragent += k + "_" + $.browser[k];
        }
        var mstr = "";
        for (var i in errarry) {
            var str = ""
            var item = errarry[i];
            for (var key in item) {
                str += key + ">" + item[key]
            }
            mstr += str + ";"
        }
        var img = new Image();
        if (errarry.length > 0) {
//            img.src = "http://www.fengyunzhibo.com/play/front/report?errstr=" + mstr + "&userAgent=" + useragent
        }
        else {
        }
    }, 2000)
})();
