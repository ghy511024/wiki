/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (document, undefined) {
    var cookie = function () {
        return cookie.get.apply(cookie, arguments);
    };
    var utils = cookie.utils = {
        isArray: Array.isArray || function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },
        isPlainObject: function (value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },
        toArray: function (value) {
            return Array.prototype.slice.call(value);
        },
        getKeys: Object.keys || function (obj) {
            var keys = [],
                    key = '';
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        },
        escape: function (value) {
            return String(value).replace(/[,;"\\=\s%]/g, function (character) {
                return encodeURIComponent(character);
            });
        },
        retrieve: function (value, fallback) {
            return value == null ? fallback : value;
        }
    };
    cookie.defaults = {};
    cookie.expiresMultiplier = 60 * 60 * 24;
    cookie.set = function (key, value, options) {
        if (utils.isPlainObject(key)) { // Then `key` contains an object with keys and values for cookies, `value` contains the options object.
            for (var k in key) { // TODO: `k` really sucks as a variable name, but I didn't come up with a better one yet.
                if (key.hasOwnProperty(k))
                    this.set(k, key[k], value);
            }

        } else {
            options = utils.isPlainObject(options) ? options : {expires: options};
            var expires = options.expires !== undefined ? options.expires : (this.defaults.expires || ''), // Empty string for session cookies.
                    expiresType = typeof (expires);
            if (expiresType === 'string' && expires !== '')
                expires = new Date(expires);
            else if (expiresType === 'number')
//                expires = new Date(+new Date + 1000 * this.expiresMultiplier * expires); // This is needed because IE does not support the `max-age` cookie attribute.
                expires = new Date(+new Date + 1000 * expires); // This is needed because IE does not support the `max-age` cookie attribute.
            if (expires !== '' && 'toGMTString' in expires)
                expires = ';expires=' + expires.toGMTString();
            var path = options.path || this.defaults.path; // TODO: Too much code for a simple feature.
            path = path ? ';path=' + path : '';
            var domain = options.domain || this.defaults.domain;
            domain = domain ? ';domain=' + domain : '';
            var secure = options.secure || this.defaults.secure ? ';secure' : '';
            document.cookie = utils.escape(key) + '=' + utils.escape(value) + expires + path + domain + secure;
        }
        return this; // Return the `cookie` object to make chaining possible. 
    };
    cookie.remove = function (keys) {
        keys = utils.isArray(keys) ? keys : utils.toArray(arguments);
        for (var i = 0, l = keys.length; i < l; i++) {
            this.set(keys[i], '', -1);
        }
        return this; // Return the `cookie` object to make chaining possible.
    };
    cookie.empty = function () {

        return this.remove(utils.getKeys(this.all()));
    };
    cookie.get = function (keys, fallback) {

        fallback = fallback || undefined;
        var cookies = this.all();
        if (utils.isArray(keys)) {
            var result = {};
            for (var i = 0, l = keys.length; i < l; i++) {
                var value = keys[i];
                result[value] = utils.retrieve(cookies[value], fallback);
            }
            return result;
        } else
            return utils.retrieve(cookies[keys], fallback);
    };
    cookie.all = function () {
        if (document.cookie === '')
            return {};
        var cookies = document.cookie.split('; '),
                result = {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var item = cookies[i].split('=');
            result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
        }
        return result;
    };
    cookie.enabled = function () {
        if (navigator.cookieEnabled)
            return true;
        var ret = cookie.set('_', '_').get('_') === '_';
        cookie.remove('_');
        return ret;

    };
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return cookie;
        });
    } else if (typeof exports !== 'undefined') {
        exports.cookie = cookie;
    } else
        window.cookie = cookie;

})(document);