/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (zlib, plug) {
    "use strict";
    function slide(el) {
        this.induration = false; // 是否在轮播间隔期
        this.num = 0; // 轮播元素数量
        this.cur = 0; // 当前轮播元素
        this.item_width = 0;
        this.duration = 4000; // 轮播间隙3秒
        this.antime = 600;// 轮播切换时间
        this.locktime = 400;// 点击间隔锁，如果不上锁，则连击效果不好，上锁并且按照动画间隔时间来，则连击感觉卡顿等很久，体验不好，所以取一个比较合适的值
        this.autoplay = true; // 自动轮播
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
            // 插件填充
            var lastitem = this.elc.find(".zslide-item:last").clone();
            this.elc.prepend(lastitem);
            this._moveTo(1, 0);
            // 添加旋转圆圈
            var control = $("<div class='zslide-controll'><div class='zslide-svg-wrap'></div><div class='zslide-dot-wrap'></div></div>")
            this.el.append(control);
            for (var i = 0; i < this.num; i++) {
                var zydot = $("<div class='zslide-dot' tag='" + (i + 1) + "'><span class='dot'></span></div>");
                var zysvg = $("<div class='zslide-circle'><svg viewBox='0 0 100 100' style='display: block; width: 100%;'><path d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94' stroke='green' stroke-width='6'fill-opacity='0' style='stroke-dasharray: 295.416; stroke-dashoffset: 295.416;'></path></svg></div>");
                zysvg.appendTo(control.find(".zslide-svg-wrap"));
                zydot.appendTo(control.find(".zslide-dot-wrap"));
                if (i == 0) {
                    zydot.addClass("current");
                    zysvg.addClass("current");
//                    zysvg.find("path").stop().css({strokeDashoffset: "0"});
                }
            }
            console.log("【zslide】插件初始化完成")
        },
        // 绑定事件
        _initEvent: function () {
            $("#next").on("click", $.proxy(function () {
                if (!this.induration) {
                    this.autoPlayStop();
                    this.next();
                    clearTimeout(this.timer);
//                    this.timer = null;
                    this.timer = setTimeout($.proxy(function () {
                        this.autoPlayStart();
                    }, this), this.duration);
                }
            }, this))
            $("#pre").on("click", $.proxy(function () {
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
            var x = -(cur * this.item_width)
            console.log("【更改轮播】", " 当前元素位置：" + this.cur, " 目的位置：" + cur)
            this.cur = cur;
            if (antime != null) {
                antime = (Number(antime) || 0)
                this.elc.css({
                    "transition-duration": antime + "ms"
                })
            } else {
                this.elc.css({
                    "transition-duration": this.antime + "ms"
                })
            }
            this.elc.css({
                "transform": "translate3d(" + x + "px, 0px, 0px)"
            })
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
            }, this), 1);
        },
        pre: function () {
            // 上锁
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
            }, this), 1);
//            }
        },
        _controlClear: function () {
            $(".zslide-circle.current").find("path").stop().animate({strokeDashoffset: "295.416"}, 400);
            $(".zslide-dot.current").removeClass("current");
        },
        _controlPlay: function () {
            $(".zslide-circle").eq(this.cur - 1).addClass("current").find("path").stop().animate({strokeDashoffset: "0"}, this.duration);
            $(".zslide-dot").eq(this.cur - 1).addClass("current");
        },
        // 开始自动轮播
        autoPlayStart: function (begin) {
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
})(zlib = zlib || {}, zlib.plug = zlib.plug || {});
