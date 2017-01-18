/* 
 * 章鱼水纹插件，ui first plug
 */

(function (zlib, ui) {
    var an = {
        duration: 750,
        show: function (evt, pdom) {
            if (2 === evt.button) {
                return false;
            }
            var tmpdom = pdom || this;
            andom = document.createElement("div");
            andom.className = "waves-ripple";
            tmpdom.appendChild(andom);
            var positoin = wave.countPosition(tmpdom)
            var h = evt.pageY - positoin.top
            var i = evt.pageX - positoin.left
            var k = "scale(" + tmpdom.clientWidth / 100 * 10 + ")";
            "touches"in evt && (h = evt.touches[0].pageY - positoin.top, i = evt.touches[0].pageX - positoin.left);
            andom.setAttribute("data-hold", Date.now());
            andom.setAttribute("data-scale", k);
            andom.setAttribute("data-x", i);
            andom.setAttribute("data-y", h);
            var style = {
                top: h + "px",
                left: i + "px"
            };
            andom.className = andom.className + " waves-notransition";
            andom.setAttribute("style", wave.mkstyle(style));
            andom.className = andom.className.replace("waves-notransition", "");
            style["-webkit-transform"] = k;
            style["-moz-transform"] = k;
            style["-ms-transform"] = k;
            style["-o-transform"] = k;
            style.transform = k;
            style.opacity = "1";
            style["-webkit-transition-duration"] = an.duration + "ms";
            style["-moz-transition-duration"] = an.duration + "ms";
            style["-o-transition-duration"] = an.duration + "ms";
            style["transition-duration"] = an.duration + "ms";
            style["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
            style["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
            style["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
            style["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
            andom.setAttribute("style", wave.mkstyle(style));
        },
        hide: function (a) {
            var _this = this
            var andom = (1.4 * _this.clientWidth, null)
            var anlist = _this.getElementsByClassName("waves-ripple");
            if (!(anlist.length > 0)) {
                return false;
            }
            andom = anlist[anlist.length - 1];
            var left = andom.getAttribute("data-x")
            var top = andom.getAttribute("data-y")
            var scale = andom.getAttribute("data-scale")
            var hold = Date.now() - Number(andom.getAttribute("data-hold"))
            var time = 350 - hold;
            setTimeout(function () {
                var style = {
                    top: top + "px",
                    left: left + "px",
                    opacity: "0",
                    "-webkit-transition-duration": an.duration + "ms",
                    "-moz-transition-duration": an.duration + "ms",
                    "-o-transition-duration": an.duration + "ms",
                    "transition-duration": an.duration + "ms",
                    "-webkit-transform": scale,
                    "-moz-transform": scale,
                    "-ms-transform": scale,
                    "-o-transform": scale,
                    transform: scale
                };
                andom.setAttribute("style", wave.mkstyle(style));
                setTimeout(function () {
                    try {
                        _this.removeChild(andom)
                    } catch (a) {
                        return false
                    }
                }, an.duration)
            }, time)
        },
        wrapInput: function (doms) {
            if (doms == null) {
                return;
            }
            for (var b = 0; b < doms.length; b++) {
                var dom = doms[b];
                if ("input" === dom.tagName.toLowerCase() || "textarea" === dom.tagName.toLowerCase()) {
                    var d = dom.parentNode;
                    if ("i" === d.tagName.toLowerCase() && -1 !== d.className.indexOf(wave.elname))
                        continue;
                    var e = document.createElement("i");
                    e.className = wave.elname + " waves-input-wrapper";
                    e.setAttribute("style", "font-style: normal");
                    dom.className = (dom.className || "").replace(wave.elname, "waves-button-input");
                    if ("textarea" === dom.tagName.toLowerCase()) {// textarea 重置为block,属性，不然出现底部出现3像素bug.
                        var style = dom.getAttribute("style");
                        style += style == "" ? "display:block;" : ";display:block;";
                        dom.setAttribute("style", style);
                    }
                    d.replaceChild(e, dom);
                    e.appendChild(dom);
                    zlib.tool.reLayParent(dom);
                }
            }
        }
    }
    var wave = {
        elname: "waves-effect",
        init: function (elname) {
            if (wave.select("." + elname) != null && wave.select("." + elname).length > 0) {
                wave.elname = elname;
            }
            wave.initEvent()
            wave.mkcss();
        },
        mkcss: function () {
            var style = {}
            style["." + wave.elname] = {
                "position": "relative;",
                "cursor": "pointer;",
                "display": "inline-block;",
                "overflow": "hidden;",
                "-webkit-user-select": " none;",
                " -webkit-tap-highlight-color": "transparent;",
                " vertical-align": " middle;",
                "  z-index": "1;",
                " will-change": "opacity, transform;",
                "transition": "all .3s ease-out;",
                " .waves-ripple": {
                    "position": "absolute;",
                    "border-radius": "50%;",
                    "width": "20px;",
                    "height": "20px;",
                    "margin-top": "-10px;",
                    "margin-left": "-10px;",
                    "opacity": "0;",
                    "background": "rgba(0,0,0,0.11);",
                    "transition": "all 0.7s ease-out;",
                    "transition-property": "opacity, -webkit-transform;",
                    "transition-property": "transform, opacity, -webkit-transform;",
                            "-webkit-transform": "scale(0);",
                    "transform": "scale(0);",
                    "pointer-events": "none;"
                }
            }
            if (!wave.hasmk) {
                zlib.tool.mkcss(style)
                wave.hasmk = true;
            }
        },
        initEvent: function (par) {
            par = par || {};
            an.wrapInput(wave.select("." + wave.elname));
            document.body.addEventListener("mousedown", wave.clickdown, !1)
        },
        clickdown: function (dom) {
            var pdom = wave.findPdom(dom);
            if (null !== pdom) {
                an.show(dom, pdom);
                pdom.addEventListener("mouseup", an.hide, !1);
                pdom.addEventListener("mouseleave", an.hide, !1);
            }
        },
        // 父层去找 含 事件名字的dom
        findPdom: function (dom) {
            for (var retdom = null, tdom = dom.target || dom.srcElement; null !== tdom.parentElement; ) {
                if (!tdom.className.indexOf(wave.elname) === -1) {
                    retdom = tdom;
                    break
                }
                if (tdom.classList && tdom.classList.contains(wave.elname)) {
                    retdom = tdom;
                    break
                }
                tdom = tdom.parentElement
            }
            return retdom
        }, countPosition: function (dom) {
            var b, d, parm = {
                top: 0,
                left: 0
            }, f = dom && dom.ownerDocument;
            return b = f.documentElement,
                    "undefined" != typeof dom.getBoundingClientRect && (parm = dom.getBoundingClientRect()),
                    d = wave.getdom(f),
                    {
                        top: parm.top + d.pageYOffset - b.clientTop,
                        left: parm.left + d.pageXOffset - b.clientLeft
                    }
        }, isWindow: function (dom) {
            return null !== dom && dom === dom.window
        }, getdom: function (dom) {
            return wave.isWindow(dom) ? dom : 9 === dom.nodeType && dom.defaultView
        }, mkstyle: function (stylemap) {
            var str = "";
            for (var key in stylemap)
                stylemap.hasOwnProperty(key) && (str += key + ":" + stylemap[key] + ";");
            return str
        }, select: document.querySelectorAll && document.querySelectorAll.bind ? document.querySelectorAll.bind(document) : function () {
        }
    }
     if (window.Monitor) {
        wave = Monitor(wave);
    }
    ui.wave = function (elname) {
        wave.init(elname)
    };
})(zlib = zlib || {}, zlib.ui = zlib.ui || {})