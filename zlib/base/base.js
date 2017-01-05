/**
 * @author ghy
 * @desc 章鱼底层基础类库，提供最底层工具，方便上层开发插件。
 * @version v0.0.1
 * */

this.zlib = this.zlib || {};
// 属性继承，针对插件 方法
zlib.extend = function (subclass, pro, superclass) {
    /**     
     * S P S
     * | | ∟ superclass 要继承的父类类名
     * | ∟ pro object 对象类型的参数 {}
     * ∟ subclass 自身function 类名
     */
    "use strict";
    function o() {
        this.constructor = subclass;
    }
    if (superclass != null) {
        o.prototype = superclass.prototype;
    }
    $.extend(o.prototype, pro);
    return (subclass.prototype = new o());
}
// 包装函数， 函数下划线开头的属性（_xxx） 将设置为私有函数，外部不可访问，保证函数安全性
zlib.fnwrap = function (myclass) {
    var tmpfun = function () {
        var f = new myclass(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])// 20161117 1:16 暂无解决方案，Function.prototype.bind 可以解决，但是不兼容ie8
        for (var key in myclass.prototype) {
            if (!/^_/.test(key)) {
                this[key] = (function (key) {
                    return  function () {
                        return    f[key].apply(f, arguments);//闭包固定变量名 （第二次写这种以后都看不懂的代码了，上一次是封装monitor函数）
                    }
                })(key)
            } else {
            }
        }
    }
    return tmpfun;
};