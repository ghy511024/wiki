window.ZYCA = (function () {
    var i, len, _this, time;
    var Carousel = function (options) {
        var defaults = {
            main: $(".content"),
            leftBtn: $(".left"),
            rightBtn: $(".right"),
            speed: 5000
        }
        this.options = $.extend(defaults, options);
    };
    Carousel.prototype = {
        init: function () {
            _this = this;
            i = 0;
            len = this.options.main.find("ul li").length;
            this.initEvent();
            this.layout();
            this.timer();
        },
        layout: function () {
            var wid = parseInt(this.options.main.find("ul li").css("width"));
            this.options.main.find("ul").css({"width": wid * len});
            this.options.main.find("ul li").eq(i).siblings().hide();
            _this.append();
        },
        append: function () {
            var zyspot = $("<div class='spot'></div>");
            var zypath = $("<div class='bar'></div>")
            zyspot.appendTo(this.options.main);
            zypath.appendTo(this.options.main);
            for (var j = 0; j < len; j++) {
                var zydot = $("<span class='dot'></span>");
                var zysvg = $("<div class='bar-circle'><svg viewBox='0 0 100 100' style='display: block; width: 100%;'><path d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94' stroke='green' stroke-width='6'fill-opacity='0' style='stroke-dasharray: 295.416; stroke-dashoffset: 295.416;'></path></svg></div>");
                zydot.appendTo($(".spot"));
                zysvg.appendTo($(".bar"));
            }
            ;
            this.options.main.find($(".spot .dot")).first().addClass("selected");
            $(".bar-circle path").first().animate({strokeDashoffset:"0"},this.options.speed);
        },
        initEvent: function () {
            this.options.leftBtn.on("click", function () {
                $(".bar-circle").eq(i).find("path").stop();
                if (i == 0) {
                    i = len;
                }
                i--;
                _this.move();
                _this.svgmove();
                clearInterval(time), function () {
                    _this.timer()
                };
                _this.timer();
            });
            this.options.rightBtn.on("click", function () {
                $(".bar-circle").eq(i).find("path").stop();
                if (i == len - 1) {
                    i = -1;
                }
                i++;
                _this.move();
                _this.svgmove();
                clearInterval(time), function () {
                    _this.timer()
                };
                _this.timer();
            });
        },
        timer: function () {
            time = setInterval(function () {
                if (i == len - 1) {
                    i = -1;
                }
                i++;
                _this.move();
                _this.svgmove();
            }, this.options.speed);
        },
        move: function () {
            this.options.main.find("ul li").eq(i).fadeIn().siblings().hide();
            $(".spot .dot").eq(i).addClass("selected").siblings().removeClass("selected");
        },
        svgmove: function () {
            $(".bar-circle").eq(i).find("path").animate({strokeDashoffset:"0"},this.options.speed);
            $(".bar-circle").eq(i).siblings().find("path").animate({strokeDashoffset:"295.416"},100);
        }
    }
    return function (options) {
        return new Carousel(options);
    };
})();