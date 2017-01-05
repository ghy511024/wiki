/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//自定义绑定事件 （插件正在开发中，会有后续升级维护 2015-6-30）
window.EVT = (function () {
    var Events = {
        map: {},
        listen: function (element, eventName, callback) {
            if (element.addEventListener) {
                element.addEventListener(eventName, function (e) {
                    return callback.apply(this, e.detail);
                }, false);
//                function calls(e) {
//                    return callback.apply(this, e.detail);
//                }
            } else {
                var arry = element[eventName] || [];
                arry.push(callback);
                element[eventName] = arry;
            }
        }, trigger: function (element, eventName) {
            if (element.createEvent) {
                var event = element.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true, Array.prototype.slice.call(arguments, 2));
                element.dispatchEvent(event);
            } else {
                if (this.map[eventName] != true) {
                    element.documentElement.attachEvent('onpropertychange', function (e) {
                        var arry = element[eventName] || [];
                        var parrm = element[eventName + "_param"] || [];
                        if (e.propertyName == eventName) {
                            for (var i = 0; i < arry.length; i++) {
                                if (typeof arry[i] == "function") {
                                    arry[i].apply(this, parrm[element[eventName + "_num"] - 1] || []);
                                }
                            }
                        }
                    });
                    this.map[eventName] = true;
                }
                var parrm = element[eventName + "_param"] || [];
                var pry = Array.prototype.slice.call(arguments, 2) || [];
                parrm.push(pry);
                element[eventName + "_param"] = parrm;
                element[eventName + "_num"] = parrm.length;
                element.documentElement[eventName] = 0;
            }
        }
    };
    return Events;
})();

