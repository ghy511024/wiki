/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    window.Ut = {
        getParam: function (key) {
            var search = window.location.search;
            var param = {}
            var arry = search.replace("?", "").split("&")
            for (var i in arry) {
                var item = arry[i]
                param[item.split("=")[0]] = item.split("=")[1]
            }
            if (key != null) {
                return param[key];
            }
            else {
                return param;
            }
        }, gettime: function (str) {
            var ret = null;
            if (str == null || str.length == 0) {
                return;
            }
            var arry = str.split(" ");
            if (arry != null && arry.length > 1) {
                var dayarry = (arry[0] || "-").split("-");
                var y = dayarry[0];
                var M = Number(dayarry[1]) - 1;
                var d = dayarry[2]
                var harry = arry[1].split(":");
                var h = harry[0];
                var m = harry[1];
                ret = new Date(y, M, d, h, m).getTime();
            }
            return ret;
        }, Null: function (e) {
            return e == null || e == "" || e.length == 0;
        }, isURL: function (str) {
            if (str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+(\w|\/)$/i) == null) {
                return false
            }
            else {
                return true;
            }
        },
        getTimeTostr: function (time) {
            var str = "";
            var time = (Number(time) || -1)
            if (time > 0) {
                var date = new Date(time)
                var M = (date.getMonth() + 1);
                M = M < 10 ? "0" + M : M;
                var D = (date.getDate());
                D = D < 10 ? "0" + D : D;
                var H = (date.getHours());
                H = H < 10 ? "0" + H : H;
                var m = (date.getMinutes());
                m = m < 10 ? "0" + m : m;
                str = date.getFullYear() + "-" + M + "-" + D + " " + H + ":" + m
            }
            return str;
        }, interval: function (fun, time, notWite) {
            setTimeout(function () {
                if (fun() !== false) {
                    Ut.interval(fun, time)
                }
            }, time);
            if (notWite === true) {
                fun()
            }
        },
        templateSettings: {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g},
        template: function (m, f, k) {
            var g = /\\|'|\r|\n|\u2028|\u2029/g;
            var n = function (e) {
                return"\\" + escapes[e]
            };
            if (!f && k) {
                f = k
            }
            f = $.extend({}, f, Ut.templateSettings);
            var h = RegExp([(f.escape || noMatch).source, (f.interpolate || noMatch).source, (f.evaluate || noMatch).source].join("|") + "|$", "g");
            var i = 0;
            var b = "__p+='";
            m.replace(h, function (o, p, e, r, q) {
                b += m.slice(i, q).replace(g, n);
                i = q + o.length;
                if (p) {
                    b += "'+\n((__t=(" + p + "))==null?'':_.escape(__t))+\n'"
                } else {
                    if (e) {
                        b += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"
                    } else {
                        if (r) {
                            b += "';\n" + r + "\n__p+='"
                        }
                    }
                }
                return o
            });
            b += "';\n";
            if (!f.variable) {
                b = "with(obj||{}){\n" + b + "}\n"
            }
            b = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + b + "return __p;\n";
            try {
                var d = new Function(f.variable || "obj", "_", b)
            } catch (j) {
                j.source = b;
                throw j
            }
            var l = function (e) {
                return d.call(this, e)
            };
            var c = f.variable || "obj";
            l.source = "function(" + c + "){\n" + b + "}";
            return l
        }
    }
})();
