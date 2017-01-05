(function (tool) {
    "use strict";
    var reLayParent = function (mainDom) {
        var position = $(mainDom).css("position");
        var styleMain = ["marginTop", "marginBottom", "marginLeft", "marginRight", "top", "bottom", "left", "right"];
        var pdstyle = ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"];
        for (var i in styleMain) {
            var main = $(mainDom).css(styleMain[i]);
            if (parseInt(main) != 0) {
                $(mainDom).parent().css(styleMain[i], main);
                $(mainDom).css(styleMain[i], 0);
            }
        }
        if ("textarea" !== $(mainDom)[0].tagName.toLowerCase() && "input" !== $(mainDom)[0].tagName.toLowerCase()) {
            for (var i in pdstyle) {
                var main = $(mainDom).css(pdstyle[i]);
                if (parseInt(main) != 0) {
                    $(mainDom).parent().css(pdstyle[i], main);
                    $(mainDom).css(pdstyle[i], 0);
                }
            }
        }



        if (position != "static") {
            $(mainDom).parent().css("position", position);
        }
        if (position == "absolute") {
            if ("textarea" === $(mainDom)[0].tagName.toLowerCase() || "input" === $(mainDom)[0].tagName.toLowerCase()) {
                var ph = parseInt($(mainDom).css("padding-top")) + parseInt($(mainDom).css("padding-bottom"))
                $(mainDom).parent().css({
                    width: $(mainDom).innerWidth(),
                    height: $(mainDom).innerHeight()
                });
            } else {
                $(mainDom).parent().css({
                    width: $(mainDom).width(),
                    height: $(mainDom).height()
                });
            }
        }
    };
    tool.reLayParent = reLayParent;
})(zlib.tool = zlib.tool || {});