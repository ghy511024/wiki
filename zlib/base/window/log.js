/* 
 *日志打印 pollyfil
 */
(function (con) {
    'use strict';
    var prop, method;
    var empty = {};
    var dummy = function () {
    };
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
            'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
            'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop()) {
        try {
            con[prop] = con[prop] || empty;
        }
        catch (e) {

        }
    }
    while (method = methods.pop()) {
        try {
            con[method] = con[method] || dummy;
        }
        catch (e) {

        }
    }
})(this.console = this.console || {});
(function (console) {
    var logarry = [];
    var logbug = store.get("logdebug");
    window.log = function () {
        if (typeof console.log == "function") {
            var date = new Date();
            var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getMilliseconds() + "ms";
            if (logbug == "true") {
                var arr1 = [str];
                Array.prototype.push.apply(arr1, arguments);
                console.log.apply(console, arr1);
            }
            else {
                var obj = {time: str, info: arguments}
                logarry.push(obj);
            }
        }
    }
    window.showdebug = function () {
        for (var key in logarry) {
            console.log(logarry[key]["time"], logarry[key]["info"])
        }
    }
})(window.console);