/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csstransforms-csstransforms3d-csstransitions-setclasses-teststyles !*/
!function (e, n, t) {
    function r(e, n) {
        return typeof e === n
    }
    function s() {
        var e, n, t, s, o, i, a;
        for (var f in C)
            if (C.hasOwnProperty(f)) {
                if (e = [], n = C[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++)
                        e.push(n.options.aliases[t].toLowerCase());
                for (s = r(n.fn, "function")?n.fn():n.fn, o = 0; o < e.length; o++)
                    i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = s : (!Modernizr[a[0]] || Modernizr[a[0]]instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = s), y.push((s ? "" : "no-") + a.join("-"))
            }
    }
    function o(e) {
        var n = S.className, t = Modernizr._config.classPrefix || "";
        if (x && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(r, "$1" + t + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), x ? S.className.baseVal = n : S.className = n)
    }
    function i() {
        return"function" != typeof n.createElement ? n.createElement(arguments[0]) : x ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }
    function a() {
        var e = n.body;
        return e || (e = i(x ? "svg" : "body"), e.fake = !0), e
    }
    function f(e, t, r, s) {
        var o, f, l, u, d = "modernizr", p = i("div"), c = a();
        if (parseInt(r, 10))
            for (; r--; )
                l = i("div"), l.id = s ? s[r] : d + (r + 1), p.appendChild(l);
        return o = i("style"), o.type = "text/css", o.id = "s" + d, (c.fake ? c : p).appendChild(o), c.appendChild(p), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(n.createTextNode(e)), p.id = d, c.fake && (c.style.background = "", c.style.overflow = "hidden", u = S.style.overflow, S.style.overflow = "hidden", S.appendChild(c)), f = t(p, e), c.fake ? (c.parentNode.removeChild(c), S.style.overflow = u, S.offsetHeight) : p.parentNode.removeChild(p), !!f
    }
    function l(e, n) {
        return!!~("" + e).indexOf(n)
    }
    function u(e) {
        return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
            return n + t.toUpperCase()
        }).replace(/^-/, "")
    }
    function d(e, n) {
        return function () {
            return e.apply(n, arguments)
        }
    }
    function p(e, n, t) {
        var s;
        for (var o in e)
            if (e[o]in n)
                return t === !1 ? e[o] : (s = n[e[o]], r(s, "function") ? d(s, t || n) : s);
        return!1
    }
    function c(e) {
        return e.replace(/([A-Z])/g, function (e, n) {
            return"-" + n.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }
    function m(n, r) {
        var s = n.length;
        if ("CSS"in e && "supports"in e.CSS) {
            for (; s--; )
                if (e.CSS.supports(c(n[s]), r))
                    return!0;
            return!1
        }
        if ("CSSSupportsRule"in e) {
            for (var o = []; s--; )
                o.push("(" + c(n[s]) + ":" + r + ")");
            return o = o.join(" or "), f("@supports (" + o + ") { #modernizr { position: absolute; } }", function (e) {
                return"absolute" == getComputedStyle(e, null).position
            })
        }
        return t
    }
    function h(e, n, s, o) {
        function a() {
            d && (delete E.style, delete E.modElem)
        }
        if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
            var f = m(e, s);
            if (!r(f, "undefined"))
                return f
        }
        for (var d, p, c, h, v, g = ["modernizr", "tspan"]; !E.style; )
            d = !0, E.modElem = i(g.shift()), E.style = E.modElem.style;
        for (c = e.length, p = 0; c > p; p++)
            if (h = e[p], v = E.style[h], l(h, "-") && (h = u(h)), E.style[h] !== t) {
                if (o || r(s, "undefined"))
                    return a(), "pfx" == n ? h : !0;
                try {
                    E.style[h] = s
                } catch (y) {
                }
                if (E.style[h] != v)
                    return a(), "pfx" == n ? h : !0
            }
        return a(), !1
    }
    function testProperty(e, n, t, s, o) {
        var i = e.charAt(0).toUpperCase() + e.slice(1), a = (e + " " + P.join(i + " ") + i).split(" ");
        return r(n, "string") || r(n, "undefined") ? h(a, n, s, o) : (a = (e + " " + z.join(i + " ") + i).split(" "), p(a, n, t))
    }
    function testNormal(e, n, r) {
        return testProperty(e, t, t, n, r)
    }
    var y = [], C = [], w = {_version: "3.2.0", _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0}, _q: [], on: function (e, n) {
            var t = this;
            setTimeout(function () {
                n(t[e])
            }, 0)
        }, addTest: function (e, n, t) {
            C.push({name: e, fn: n, options: t})
        }, addAsyncTest: function (e) {
            C.push({name: null, fn: e})
        }}, Modernizr = function () {
    };
    Modernizr.prototype = w, Modernizr = new Modernizr;
    var S = n.documentElement, x = "svg" === S.nodeName.toLowerCase(), _ = w.testStyles = f, b = "Moz O ms Webkit", P = w._config.usePrefixes ? b.split(" ") : [];
    w._cssomPrefixes = P;
    var z = w._config.usePrefixes ? b.toLowerCase().split(" ") : [];
    w._domPrefixes = z;
    var T = {elem: i("modernizr")};
    Modernizr._q.push(function () {
        delete T.elem
    });
    var E = {style: T.elem.style};
    Modernizr._q.unshift(function () {
        delete E.style
    }), w.testAllProps = testProperty, w.testAllProps = testNormal,
            Modernizr.addTest("csstransforms", function () {
                var ret = -1 === navigator.userAgent.indexOf("Android 2.") && testNormal("transform", "scale(1)", !0)
                window.zlib = window.zlib || {};
                zlib.tranf = ret;
                return ret
            }), Modernizr.addTest("csstransitions", function () {

        var ret = testNormal("transition", "all", !0)
        window.zlib = window.zlib || {};
        zlib.tran = ret;
        return ret;
    });
    var N = "CSS"in e && "supports"in e.CSS, k = "supportsCSS"in e;
    Modernizr.addTest("supports", N || k), Modernizr.addTest("csstransforms3d", function () {
        var ret = !!testNormal("perspective", "1px", !0), n = Modernizr._config.usePrefixes;
        if (ret && (!n || "webkitPerspective"in S.style)) {
            var t, r = "#modernizr{width:0;height:0}";
            Modernizr.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)", n && (t += ",(-webkit-transform-3d)")), t += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", _(r + t, function (n) {
                ret = 7 === n.offsetWidth && 18 === n.offsetHeight
            })
        }
        window.zlib = window.zlib || {};
        zlib.tran3d = ret;
        return ret
    }), s(), o(y), delete w.addTest, delete w.addAsyncTest;
    for (var A = 0; A < Modernizr._q.length; A++)
        Modernizr._q[A]();
    e.Modernizr = Modernizr
}(window, document);