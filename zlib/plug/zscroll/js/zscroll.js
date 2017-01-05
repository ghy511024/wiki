
(function (zlib, plug) {
    "use strict";
    var _default = {
        scWidth: "10px",
        barWidth: "4px",
        barBgColor: "#a6b0c3",
        barHoverColor: "#caccd0",
        panelBgColor: "transparent"
    };
    var cssmk = false;

    function zscroll(el, options) {
        var setting = $.extend({}, _default, options);
        for (var name in setting)
            this[name] = setting[name];
        this.el = $(el);
        this._init();
        if (options != null) {
            this._mkMyStyle();
        }
    }
    var p = {
        _init: function () {
            this._inintEvent();
            this._wrapDom();
            this._layout();
            this._mkstyle();
        },
        // 包装dom
        _wrapDom: function () {
            var unic_id = this._getUnicStr();
            var ph = this.el.height();
            var pw = this.el.width();
            var zyscwrap = $("<div class='zyscwrap zyscwrap_" + unic_id + "'></div>");
            zyscwrap.css({height: ph, width: pw});
            var scbar = $('<div class="scbar"><div class="scpanel"><div class="sc-bar"></div></div></div>');
            this.el.wrap(zyscwrap);
            this.el.parent().append(scbar);
            this.elc = (this.el.find(".sc_content") ? (this.el.children().first()) : (this.el.find(".sc_content")));
            this.elp = this.el.parent();
            this.bar = this.el.parent().find(">.scbar>.scpanel>.sc-bar");
            zlib.tool.reLayParent(this.el);
        },
        // 生成样式
        _mkstyle: function () {
            if (cssmk) {
                return;
            }
            var style = {
                ".zyscwrap": {
                    "position": "relative;",
                    ".scbar": {
                        "position": "absolute;",
                        "width": _default.scWidth,
                        "right": "0px;",
                        "height": "100%;",
                        "top": "0px;",
                        ".scpanel": {
                            "position": "relative;",
                            "width": _default.barWidth,
                            "height": "100%;",
                            "margin": "0px auto;",
                            "background": _default.panelBgColor,
                            ".sc-bar": {
                                "position": "absolute;",
                                "width": _default.barWidth,
                                "background": _default.barBgColor,
                                "border-radius": "3px;",
                                "cursor": "pointer;",
                                "z-index": "2;",
                                "&:hover": {
                                    "background": _default.barHoverColor
                                },
                                "&:active": {
                                    "background": _default.barHoverColor
                                }
                            }
                        }
                    }
                }
            }
            zlib.tool.mkcss(style);
            cssmk = true;
        },
        _mkMyStyle: function () {
            var unic_id = this._getUnicStr();
            var style = {};
            style[".zyscwrap_" + unic_id] = {};
            style[".zyscwrap_" + unic_id] = {".scbar": {
                    "width": this.scWidth,
                    ".scpanel": {
                        "width": this.barWidth,
                        "background": this.panelBgColor,
                        ".sc-bar": {
                            "width": this.barWidth,
                            "background": this.barBgColor,
                            "&:hover": {
                                "background": this.barHoverColor
                            },
                            "&:active": {
                                "background": this.barHoverColor
                            }
                        }
                    }
                }
            }
            zlib.tool.mkcss(style);
        },
        _getUnicStr: function () {
            var _id = $.trim(this.el.attr("id") || "");
            var cla = $.trim(this.el.attr("class") || "").split(/\s+/gi).join(".");
            var str = null;
            if (_id != null && _id.length > 0) {
                str = $.trim(_id);
            }
            if (str == null) {
                str = cla;
            }
            return str;
        },
        // 计算容器高度
        _layout: function () {
            var ph = this.el.height();

            var _options = {
                lockX: !0,
                limit: !0,
                mxbottom: ph,
                onMove: $.proxy(function () {
                    this._scrollByBar()
                }, this)
            }
            this.dg = new plug.drag(this.bar, _options)
            this.update();
        },
        //test
        _inintEvent: function () {
            this.el.mousewheel($.proxy(function (event, delta, deltaX, deltaY) {
                var e = e ? e : window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                this.el[0].scrollTop -= delta * 20
                this._setBarPosition();
                if (typeof this.callback == 'function') {
                    this.callback(this.el[0].scrollTop, this.el.height(), this.elc.height());
                }
            }, this))
        },
        _setBarPosition: function () {
            var all_h = this.elc.height();
            var c_h = this.el.height();
            var s_t = this.el[0].scrollTop;
            var top = s_t * (c_h - this.barh) / (all_h - c_h);
            this.bar.css({top: top})
        },
        _scrollByBar: function () {
            var all_h = this.elc.height();
            var c_h = this.el.height();
            var top = this.bar.position().top
            var s_t = top / ((c_h - this.barh) / (all_h - c_h));
            this.el.scrollTop(s_t);
        },
        // 更新容器
        update: function () {
            var h = this._coutBar();
            this.bar.css({height: h});
            this.barh = h;
            this._setBarPosition();
            this.dg.mxbottom = this.el.height();// 更新可拖动的那个上下范围。
            if (typeof this.callback == 'function') {
                this.callback(this.el[0].scrollTop, this.el.height(), this.elc.height());
            }
        },
        // 自定义滚动
        scrollTo: function (type) {
            if (type == "top") {
                this.el.scrollTop(0);
                this.bar.css({top: 0})
            }
            else if (type == "bottom") {
                this.el.scrollTop(99999);
                if (this.barh > 0) {
                    this.bar.css({top: this.el.height() - this.barh})
                }
            }
            else if (typeof type == "number") {
                this.el.scrollTop(type);
                var top = type * (this.el.height() - this.barh) / (this.elc.height() - this.el.height());
                this.bar.css({top: top})
            }
        },
        //计算bar 高度
        _coutBar: function () {
            var ph = this.el.height();
            var ch = this.elc.height();
            ch == 0 && ph != 0 && (ch = ph);
            var ret = ch <= ph ? 0 : ((ph * ph / ch) <= 20 ? 20 : (ph * ph / ch));
            return ret;
        }
    }
    zlib.extend(zscroll, p);// 属性继承
    plug.zscroll = zscroll;
//    plug.zscroll = zlib.fnwrap(zscroll);// 这和上面注释那种方法相似
})(zlib = zlib || {}, zlib.plug = zlib.plug || {});


