/**
 * Created by jifangyu on 2016/10/31.
 */

(function (zlib, admin) {
    "use strict";
    var _default = {};
    var cssmk = false;

    function zpanel(el, options) {
        var setting = $.extend({}, _default, options);
        for (var name in setting)
            this[name] = setting[name];
        this.el = $(el);
        this._init();
    }

    var p = {
        _init: function () {
            this._wrapDom();
            this._initEvent();
        },
        // 包装dom
        _wrapDom: function () {
            var zypanel = $("<div class='zy-panel'></div>>");
            var titleWrap = $("<div class='title-wrap'></div>>");
            var closeBtn = $("<div class='close'>×</div>");
            this.el.wrap(zypanel);
            this.el.addClass('zy-info');
            this.el.find('.zy-title').wrap(titleWrap);
            this.el.find('.title-wrap').append(closeBtn);
        },
        _initEvent: function () {
            var cur = this;
            this.el.find('.close').on("click", function () {
                cur.Hide();
                cur.cancel();
            });
            this.el.find('.submit').on("click", function () {
                cur.isSubmitClicked = true;
                cur.submit(cur.clickFunction.name);
            });
            this.el.find('.cancel').on("click", function () {
                cur.isCancelClicked = true;
                cur.cancel();
            });
        },
        // 隐藏弹框
        Hide: function () {
            this.el.parent().removeClass('show');
        },
        // 显示弹框
        Show: function () {
            this.el.parent().addClass('show').siblings('.zy-panel').removeClass('show');
            this.el.show();
        },
        isSubmitClicked: false,
        isCancelClicked: false,
        clickFunction: {},
        submit: function (functionName) {
            if (arguments.length == 0) {
            } else {
                this.clickFunction.name = functionName;
                if (this.isSubmitClicked == true) {
                    functionName();
                    this.Hide();
                    this.cancel();
                }
            }
        },
        cancel: function () {
            var aCheckbox = this.el.find('input[type="checkbox"]');
            var aRadio = this.el.find('input[type="radio"]');
            var aInput = this.el.find('input[type="text"]');
            if (this.isCancelClicked == true) {
                this.el.hide();
//                清空所填信息
                for (var i = 0; i < aInput.length; i++) {
                    aInput[i].value = "";
                }
                for (var i = 0; i < aCheckbox.length; i++) {
                    aCheckbox[i].checked = false;
                }
                for (var i = 0; i < aRadio.length; i++) {
                    aCheckbox[i].checked = false;
                }
            }
            this.el.parent().removeClass('show');
        },
        // 获取下拉框中被选择项的值
        // val_option: function (className) {
        //     return this.el.find(className).children('option:selected').html();
        // },
        // val_radio: function (className) {
        //     return this.el.find(className).find('input:checked').attr('id');
        // }

    }
    zlib.extend(zpanel, p);// 属性继承
//    ui.zscroll = zscroll;
    admin.zpanel = zlib.fnwrap(zpanel);// 这和上面注释那种方法相似
})(zlib = zlib || {}, zlib.admin = zlib.admin || {});


