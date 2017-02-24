/* 
 * @version v1.0.0 
 * @date 20170224
 * @author ghy
 * @desc 手机端轮播插件，依赖zepto 和百度的touch.js 优点方便小巧可控，老少皆宜。缺点，兼容性还没有测。。。
 */

(function (zlib, plug) {
    "use strict";
    var _default = {
        duration: 5000, // 轮播间隙5秒
        antime: 600, // 轮播切换时间
        locktime: 400, // 点击间隔锁，如果不上锁，则连击效果不好，上锁并且按照动画间隔时间来，则连击感觉卡顿等很久，体验不好，所以取一个比较合适的值
        autoplay: true, // 自动轮播
        color: "#ff3140", // svg 转圈颜色 红色
        btncontrol: true
    };
    function slide(el, options) {
        var setting = $.extend({}, _default, options);
        for (var key in setting) {
            this[key] = setting[key];
        }
        this.induration = false; // 是否在轮播间隔期
        this.num = 0; // 轮播元素数量
        this.cur = 0; // 当前轮播元素
        this.item_width = 0;
        this.el = $(el);
        this.elc = $(el).find(".zslide-content");
        this._init();
        this._initEvent();
        return this;
    }
    slide.prototype = {
        _init: function () {
            this._layout();
            this.autoPlayStart(true);
        },
        // 初始化
        _layout: function () {
            //清空布局
            this.num = this.elc.find(".zslide-item").length;
            this.item_width = this.el.width();
            this.cur = 1;
            // 插件填充
            var num = this.elc.find(".zslide-item").length;
            var lastitem = this.elc.find(".zslide-item").eq(num - 1).clone();
            this.elc.prepend(lastitem);

            this._moveTo(1, 0);
            // 添加旋转圆圈
            var control = $("<div class='zslide-controll'><div class='zslide-svg-wrap'></div><div class='zslide-dot-wrap'></div></div>")
            this.el.append(control);
            for (var i = 0; i < this.num; i++) {
                var zydot = $("<div class='zslide-dot' tag='" + (i + 1) + "'><span class='dot'></span></div>");
                var zysvg = $("<div class='zslide-circle'><svg viewBox='0 0 100 100' style='display: block; width: 100%;'><path d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94' stroke='" + this.color + "' stroke-width='6'fill-opacity='0' style='stroke-dasharray: 295.416; stroke-dashoffset: 295.416;'></path></svg></div>");
                zysvg.find("path")[0].style.transitionProperty = "stroke-dashoffset";
                zysvg.find("path")[0].style.transitionTimingFunction = "linear";
                zysvg.appendTo(control.find(".zslide-svg-wrap"));
                zydot.appendTo(control.find(".zslide-dot-wrap"));
                if (i == 0) {
                    zydot.addClass("current");
                    zysvg.addClass("current");
                }
            }
            // 添加左右控制按钮
            if (this.btncontrol) {
                this.pre_btn = $("<div class='zslide-btn pre-btn'>〈</div>");
                this.next_btn = $("<div class='zslide-btn next-btn'>〉</div>");
                this.el.append(this.pre_btn).append(this.next_btn);
            }
            console.log("【zslide】插件初始化完成")
        },
        // 绑定事件
        _initEvent: function () {
            touch.on(".zslide-wrap", 'swipeleft', $.proxy(function () {
                if (!this.induration) {
                    this.autoPlayStop();
                    this.next();
                    clearTimeout(this.timer);
                    this.timer = setTimeout($.proxy(function () {
                        this.autoPlayStart();
                    }, this), this.duration);
                }
            }, this));
            touch.on(".zslide-wrap", 'swiperight', $.proxy(function () {
                if (!this.induration) {
                    this.autoPlayStop();
                    this.pre();
                    clearTimeout(this.timer);
                    this.timer = setTimeout($.proxy(function () {
                        this.autoPlayStart();
                    }, this), this.duration);
                }
            }, this));
            if (this.btncontrol) {
                this.next_btn.on("click", $.proxy(function () {
                    if (!this.induration) {
                        this.autoPlayStop();
                        this.next();
                        clearTimeout(this.timer);
                        this.timer = setTimeout($.proxy(function () {
                            this.autoPlayStart();
                        }, this), this.duration);
                    }
                }, this))
                this.pre_btn.on("click", $.proxy(function () {
                    if (!this.induration) {
                        this.autoPlayStop();
                        this.pre();
                        clearTimeout(this.timer);
                        this.timer = setTimeout($.proxy(function () {
                            this.autoPlayStart();
                        }, this), this.duration);
                    }
                }, this));
            }
            $(document).on("click", ".zslide-dot", $.proxy(function (evt) {
                this.autoPlayStop();
                var _this = $(evt.target);
                var tag = _this.attr("tag") || _this.parent().attr("tag");
                tag = Number(tag) || 0;
                this._controlClear();
                this._moveTo(tag);
                this._controlPlay();
                clearTimeout(this.timer);
                this.timer = setTimeout($.proxy(function () {
                    this.autoPlayStart();
                }, this), this.duration);
            }, this))
        },
        // 生成控制台条
        _createControl: function () {

        },
        _moveTo: function (cur, antime) {
            var x = -(cur * this.item_width)
//            console.log("【更改轮播】", " 当前元素位置：" + this.cur, " 目的位置：" + cur)
            this.cur = cur;
            if (antime != null) {
                antime = (Number(antime) || 0)
                this.elc[0].style.transitionDuration = antime + "ms"

            } else {
                this.elc[0].style.transitionDuration = this.antime + "ms"
            }
            this.elc[0].style.transform = "translate3d(" + x + "px, 0px, 0px)";
            console.log(this.elc[0].style.transform, this.elc[0].style.transitionDuration);
        },
        next: function () {
            // 上锁
            console.log(this.num, this.cur);
            this._controlClear();
            var next = this.cur + 1;
            if (next > this.num) {
                this._moveTo(0, 0)// 位置重置为初始
                next = 1;
            }
            //加timeout 让样式重置生效
            setTimeout($.proxy(function () {
                this._moveTo(next);
                this.induration = true;
                this._controlPlay();
                setTimeout($.proxy(function () {
                    this.induration = false;
                }, this), this.locktime);
            }, this), 30);
        },
        pre: function () {
            // 上锁 （后来觉得没必要）
//            if (!this.induration) {
            this._controlClear();
            var pre = this.cur - 1;
            if (pre < 0) {
                this._moveTo(this.num, 0)// 位置重置为初始
                pre = this.num - 1;
            }
            setTimeout($.proxy(function () {
                this._moveTo(pre);
                this.induration = true;
                this._controlPlay();
                setTimeout($.proxy(function () {
                    this.induration = false;
                }, this), this.locktime);
            }, this), 30);
//            }
        },
        _controlClear: function () {
            var path = $(".zslide-circle.current").find("path");
            if (path == null) {
                return;
            }
            path[0].style.transitionDuration = this.antime + 'ms';
            setTimeout(function () {
                path[0].style.strokeDashoffset = "295.416";
            }, 1)
            $(".zslide-dot.current").removeClass("current");
            $(".zslide-circle.current").removeClass("current");
        },
        _controlPlay: function () {
            if (this.autoplay) {
                var path = $(".zslide-circle").eq(this.cur - 1).addClass("current").find("path");
                path[0].style.transitionDuration = this.duration + 'ms';
                setTimeout(function () {
                    path[0].style.strokeDashoffset = "0";
                }, 1)
                $(".zslide-dot").eq(this.cur - 1).addClass("current");
            }

        },
        // 开始自动轮播
        autoPlayStart: function (begin) {
            if (!this.autoplay) {
                return;
            }
            if (!begin) {
                this.next();
            } else {
                // 插件第一次加载时，不立即滚动，而是转圈计时
                this._controlPlay();
            }
            this.interval = this.interval || setInterval($.proxy(function () {
                this.next();
            }, this), this.duration);
        },
        // 轮播暂停
        autoPlayPause: function () {
        },
        // 结束自动轮播
        autoPlayStop: function () {
            clearInterval(this.interval)
            this.interval = null;
        }
    }
    plug.zslide = slide;
})(zlib = window.zlib || {}, zlib.plug = zlib.plug || {});
