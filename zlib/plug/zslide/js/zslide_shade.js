/* 
 ** 2017-3-8
 *淡入淡出轮播
 */

(function (zlib, plug) {
    "use strict";
    var _default = {
        duration: 5000, // 轮播间隙5秒
        antime: 1000, // 轮播切换时间
        locktime: 400, // 点击间隔锁，如果不上锁，则连击效果不好，上锁并且按照动画间隔时间来，则连击感觉卡顿等很久，体验不好，所以取一个比较合适的值
        color: "#ff3140", // svg 转圈颜色 红色
        autoplay: true // 自动轮播
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
    var p = {
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

            this.elc.find(".zslide-item:first").addClass("current");
            // 添加旋转圆圈
            var control = $("<div class='zslide-controll'><div class='zslide-svg-wrap'></div><div class='zslide-dot-wrap'></div></div>")
            this.el.append(control);
            for (var i = 0; i < this.num; i++) {
                var zydot = $("<div class='zslide-dot' tag='" + (i + 1) + "'><span class='dot'></span></div>");
                var zysvg = $("<div class='zslide-circle'><svg viewBox='0 0 100 100' style='display: block; width: 100%;'><path d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94' stroke='" + this.color + "' stroke-width='6'fill-opacity='0' style='stroke-dasharray: 295.416; stroke-dashoffset: 295.416;'></path></svg></div>");
                zysvg.appendTo(control.find(".zslide-svg-wrap"));
                zydot.appendTo(control.find(".zslide-dot-wrap"));
                if (i == 0) {
                    zydot.addClass("current");
                    zysvg.addClass("current");
                }
            }
            // 添加左右控制按钮
            this.pre_btn = $("<div class='zslide-btn pre-btn'>〈</div>");
            this.next_btn = $("<div class='zslide-btn next-btn'>〉</div>");
            this.el.append(this.pre_btn).append(this.next_btn);
            // IE 补丁〉〈
            if (!zlib.tran3d) {
                this.el.addClass("IE");
                this.elc.css({width: (this.item_width * (this.num + 1)), left: -this.item_width})
                this.elc.find("li").css({width: this.item_width});
            }
            console.log("【zslide】插件初始化完成")
        },
        // 绑定事件
        _initEvent: function () {
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
            console.log("【更改轮播】", " 当前元素位置：" + this.cur, " 目的位置：" + cur)
            this.cur = cur;
            if (zlib.tran3d) {
                if (antime != null) {
                    antime = (Number(antime) || 0)
                    this.elc.find(".zslide-item").css({
                        "transition-duration": antime + "ms"
                    })
                } else {
                    this.elc.find(".zslide-item").css({
                        "transition-duration": this.antime + "ms"
                    })
                }
                this.elc.find(".zslide-item.current").removeClass("current");
                this.elc.find(".zslide-item").eq(cur - 1).addClass("current");
            } else {// IE8 专用 使用jquery 的动画
                var t = this.antime
                if (antime != null) {
                    antime = (Number(antime) || 0)
                    if (antime <= 0) {
                        this.elc.stop().css({left: x});
                    } else {
                        t = antime;
                    }
                }
                if (t > 0) {
                    this.elc.stop().animate({
                        left: x
                    }, t);
                }
            }
        },
        next: function () {
            // 上锁
            console.log(this.num, this.cur);
            this._controlClear();
            var next = this.cur + 1;
            if (next > this.num) {
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
            }, this), 1);
        },
        pre: function () {
            // 上锁 （后来觉得没必要）
//            if (!this.induration) {
            this._controlClear();
            var pre = this.cur - 1;
            if (pre <= 0) {
                pre = this.num;
            }
            setTimeout($.proxy(function () {
                this._moveTo(pre);
                this.induration = true;
                this._controlPlay();
                setTimeout($.proxy(function () {
                    this.induration = false;
                }, this), this.locktime);
            }, this), 1);
//            }
        },
        _controlClear: function () {
            $(".zslide-circle.current").find("path").stop().animate({strokeDashoffset: "295.416"}, 400);
            $(".zslide-dot.current").removeClass("current");
        },
        _controlPlay: function () {
            if (this.autoplay) {
                $(".zslide-circle").eq(this.cur - 1).addClass("current").find("path").stop().animate({strokeDashoffset: "0"}, this.duration);
            }
            $(".zslide-dot").eq(this.cur - 1).addClass("current");
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
    zlib.extend(slide, p); // 属性继承
    plug.zslide = slide;
})(zlib = window.zlib || {}, zlib.plug = zlib.plug || {});
