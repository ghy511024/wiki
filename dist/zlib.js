!function(){window.errarry=[],window.Monitor=function(a){for(key in a)method=a[key],"function"==typeof a[key]&&(a[key]=function(a,b){return function(){try{return b.apply(this,arguments)}catch(c){var d=(this._id||"window")+"."+a,e={};e[d]=c+"",errarry.push(e)}}}(key,method));return a},setTimeout(function(){var a="";for(var b in $.browser)a.length>0&&(a+="-"),a+=b+"_"+$.browser[b];var c="";for(var d in errarry){var e="",f=errarry[d];for(var g in f)e+=g+">"+f[g];c+=e+";"}new Image;errarry.length>0},2e3)}(),function(){window.Ut={getParam:function(a){var b=window.location.search,c={},d=b.replace("?","").split("&");for(var e in d){var f=d[e];c[f.split("=")[0]]=f.split("=")[1]}return null!=a?c[a]:c},gettime:function(a){var b=null;if(null!=a&&0!=a.length){var c=a.split(" ");if(null!=c&&c.length>1){var d=(c[0]||"-").split("-"),e=d[0],f=Number(d[1])-1,g=d[2],h=c[1].split(":"),i=h[0],j=h[1];b=new Date(e,f,g,i,j).getTime()}return b}},Null:function(a){return null==a||""==a||0==a.length},isURL:function(a){return null==a.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+(\w|\/)$/i)?!1:!0},getTimeTostr:function(a){var b="",a=Number(a)||-1;if(a>0){var c=new Date(a),d=c.getMonth()+1;d=10>d?"0"+d:d;var e=c.getDate();e=10>e?"0"+e:e;var f=c.getHours();f=10>f?"0"+f:f;var g=c.getMinutes();g=10>g?"0"+g:g,b=c.getFullYear()+"-"+d+"-"+e+" "+f+":"+g}return b},interval:function(a,b,c){setTimeout(function(){a()!==!1&&Ut.interval(a,b)},b),c===!0&&a()},templateSettings:{evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},template:function(a,b,c){var d=/\\|'|\r|\n|\u2028|\u2029/g,e=function(a){return"\\"+escapes[a]};!b&&c&&(b=c),b=$.extend({},b,Ut.templateSettings);var f=RegExp([(b.escape||noMatch).source,(b.interpolate||noMatch).source,(b.evaluate||noMatch).source].join("|")+"|$","g"),g=0,h="__p+='";a.replace(f,function(b,c,f,i,j){return h+=a.slice(g,j).replace(d,e),g=j+b.length,c?h+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'":f?h+="'+\n((__t=("+f+"))==null?'':__t)+\n'":i&&(h+="';\n"+i+"\n__p+='"),b}),h+="';\n",b.variable||(h="with(obj||{}){\n"+h+"}\n"),h="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+h+"return __p;\n";try{var i=new Function(b.variable||"obj","_",h)}catch(j){throw j.source=h,j}var k=function(a){return i.call(this,a)},l=b.variable||"obj";return k.source="function("+l+"){\n"+h+"}",k}}}(),function(a,b){var c=function(){return c.get.apply(c,arguments)},d=c.utils={isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isPlainObject:function(a){return!!a&&"[object Object]"===Object.prototype.toString.call(a)},toArray:function(a){return Array.prototype.slice.call(a)},getKeys:Object.keys||function(a){var b=[],c="";for(c in a)a.hasOwnProperty(c)&&b.push(c);return b},escape:function(a){return String(a).replace(/[,;"\\=\s%]/g,function(a){return encodeURIComponent(a)})},retrieve:function(a,b){return null==a?b:a}};c.defaults={},c.expiresMultiplier=86400,c.set=function(c,e,f){if(d.isPlainObject(c))for(var g in c)c.hasOwnProperty(g)&&this.set(g,c[g],e);else{f=d.isPlainObject(f)?f:{expires:f};var h=f.expires!==b?f.expires:this.defaults.expires||"",i=typeof h;"string"===i&&""!==h?h=new Date(h):"number"===i&&(h=new Date(+new Date+1e3*h)),""!==h&&"toGMTString"in h&&(h=";expires="+h.toGMTString());var j=f.path||this.defaults.path;j=j?";path="+j:"";var k=f.domain||this.defaults.domain;k=k?";domain="+k:"";var l=f.secure||this.defaults.secure?";secure":"";a.cookie=d.escape(c)+"="+d.escape(e)+h+j+k+l}return this},c.remove=function(a){a=d.isArray(a)?a:d.toArray(arguments);for(var b=0,c=a.length;c>b;b++)this.set(a[b],"",-1);return this},c.empty=function(){return this.remove(d.getKeys(this.all()))},c.get=function(a,c){c=c||b;var e=this.all();if(d.isArray(a)){for(var f={},g=0,h=a.length;h>g;g++){var i=a[g];f[i]=d.retrieve(e[i],c)}return f}return d.retrieve(e[a],c)},c.all=function(){if(""===a.cookie)return{};for(var b=a.cookie.split("; "),c={},d=0,e=b.length;e>d;d++){var f=b[d].split("=");c[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}return c},c.enabled=function(){if(navigator.cookieEnabled)return!0;var a="_"===c.set("_","_").get("_");return c.remove("_"),a},"function"==typeof define&&define.amd?define(function(){return c}):"undefined"!=typeof exports?exports.cookie=c:window.cookie=c}(document);var store=function(){function a(){return b?b:(b=e.body.appendChild(e.createElement("div")),b.style.display="none",b.addBehavior("#default#userData"),b.load(f),b)}var b,c={},d=window,e=d.document,f="localStorage",g="globalStorage";c.set=function(a,b){},c.get=function(a){},c.remove=function(a){},c.clear=function(){};try{f in d&&d[f]?(b=d[f],c.set=function(a,c){b.setItem(a,c)},c.get=function(a){return b.getItem(a)},c.remove=function(a){b.removeItem(a)},c.clear=function(){b.clear()}):g in d&&d[g]?(b=d[g][d.location.hostname],c.set=function(a,c){b[a]=c},c.get=function(a){return b[a]&&b[a].value},c.remove=function(a){delete b[a]},c.clear=function(){for(var a in b)delete b[a]}):e.documentElement.addBehavior&&(c.set=function(b,c){var d=a();d.setAttribute(b,c),d.save(f)},c.get=function(b){var c=a();return c.getAttribute(b)},c.remove=function(b){var c=a();c.removeAttribute(b),c.save(f)},c.clear=function(){var b=a(),c=b.XMLDocument.documentElement.attributes;b.load(f);for(var d,e=0;d=c[e];e++)b.removeAttribute(d.name);b.save(f)})}catch(h){}return c}();!function(a){"use strict";for(var b,c,d={},e=function(){},f="memory".split(","),g="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");b=f.pop();)try{a[b]=a[b]||d}catch(h){}for(;c=g.pop();)try{a[c]=a[c]||e}catch(h){}}(this.console=this.console||{}),function(a){var b=[],c=store.get("logdebug");window.log=function(){if("function"==typeof a.log){var d=new Date,e=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" "+d.getMilliseconds()+"ms";if("true"==c){var f=[e];Array.prototype.push.apply(f,arguments),a.log.apply(a,f)}else{var g={time:e,info:arguments};b.push(g)}}},window.showdebug=function(){for(var c in b)a.log(b[c].time,b[c].info)}}(window.console),window.EVT=function(){var a={map:{},listen:function(a,b,c){if(a.addEventListener)a.addEventListener(b,function(a){return c.apply(this,a.detail)},!1);else{var d=a[b]||[];d.push(c),a[b]=d}},trigger:function(a,b){if(a.createEvent){var c=a.createEvent("CustomEvent");c.initCustomEvent(b,!0,!0,Array.prototype.slice.call(arguments,2)),a.dispatchEvent(c)}else{1!=this.map[b]&&(a.documentElement.attachEvent("onpropertychange",function(c){var d=a[b]||[],e=a[b+"_param"]||[];if(c.propertyName==b)for(var f=0;f<d.length;f++)"function"==typeof d[f]&&d[f].apply(this,e[a[b+"_num"]-1]||[])}),this.map[b]=!0);var d=a[b+"_param"]||[],e=Array.prototype.slice.call(arguments,2)||[];d.push(e),a[b+"_param"]=d,a[b+"_num"]=d.length,a.documentElement[b]=0}}};return a}(),!function(a,b,c){function d(a,b){return typeof a===b}function e(){var a,b,c,e,f,g,h;for(var i in t)if(t.hasOwnProperty(i)){if(a=[],b=t[i],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(c=0;c<b.options.aliases.length;c++)a.push(b.options.aliases[c].toLowerCase());for(e=d(b.fn,"function")?b.fn():b.fn,f=0;f<a.length;f++)g=a[f],h=g.split("."),1===h.length?v[h[0]]=e:(!v[h[0]]||v[h[0]]instanceof Boolean||(v[h[0]]=new Boolean(v[h[0]])),v[h[0]][h[1]]=e),s.push((e?"":"no-")+h.join("-"))}}function f(a){var b=w.className,c=v._config.classPrefix||"";if(x&&(b=b.baseVal),v._config.enableJSClass){var d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2")}v._config.enableClasses&&(b+=" "+c+a.join(" "+c),x?w.className.baseVal=b:w.className=b)}function g(){return"function"!=typeof b.createElement?b.createElement(arguments[0]):x?b.createElementNS.call(b,"http://www.w3.org/2000/svg",arguments[0]):b.createElement.apply(b,arguments)}function h(){var a=b.body;return a||(a=g(x?"svg":"body"),a.fake=!0),a}function i(a,c,d,e){var f,i,j,k,l="modernizr",m=g("div"),n=h();if(parseInt(d,10))for(;d--;)j=g("div"),j.id=e?e[d]:l+(d+1),m.appendChild(j);return f=g("style"),f.type="text/css",f.id="s"+l,(n.fake?n:m).appendChild(f),n.appendChild(m),f.styleSheet?f.styleSheet.cssText=a:f.appendChild(b.createTextNode(a)),m.id=l,n.fake&&(n.style.background="",n.style.overflow="hidden",k=w.style.overflow,w.style.overflow="hidden",w.appendChild(n)),i=c(m,a),n.fake?(n.parentNode.removeChild(n),w.style.overflow=k,w.offsetHeight):m.parentNode.removeChild(m),!!i}function j(a,b){return!!~(""+a).indexOf(b)}function k(a){return a.replace(/([a-z])-([a-z])/g,function(a,b,c){return b+c.toUpperCase()}).replace(/^-/,"")}function l(a,b){return function(){return a.apply(b,arguments)}}function m(a,b,c){var e;for(var f in a)if(a[f]in b)return c===!1?a[f]:(e=b[a[f]],d(e,"function")?l(e,c||b):e);return!1}function n(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-")}function o(b,d){var e=b.length;if("CSS"in a&&"supports"in a.CSS){for(;e--;)if(a.CSS.supports(n(b[e]),d))return!0;return!1}if("CSSSupportsRule"in a){for(var f=[];e--;)f.push("("+n(b[e])+":"+d+")");return f=f.join(" or "),i("@supports ("+f+") { #modernizr { position: absolute; } }",function(a){return"absolute"==getComputedStyle(a,null).position})}return c}function p(a,b,e,f){function h(){l&&(delete D.style,delete D.modElem)}if(f=d(f,"undefined")?!1:f,!d(e,"undefined")){var i=o(a,e);if(!d(i,"undefined"))return i}for(var l,m,n,p,q,r=["modernizr","tspan"];!D.style;)l=!0,D.modElem=g(r.shift()),D.style=D.modElem.style;for(n=a.length,m=0;n>m;m++)if(p=a[m],q=D.style[p],j(p,"-")&&(p=k(p)),D.style[p]!==c){if(f||d(e,"undefined"))return h(),"pfx"==b?p:!0;try{D.style[p]=e}catch(s){}if(D.style[p]!=q)return h(),"pfx"==b?p:!0}return h(),!1}function q(a,b,c,e,f){var g=a.charAt(0).toUpperCase()+a.slice(1),h=(a+" "+A.join(g+" ")+g).split(" ");return d(b,"string")||d(b,"undefined")?p(h,b,e,f):(h=(a+" "+B.join(g+" ")+g).split(" "),m(h,b,c))}function r(a,b,d){return q(a,c,c,b,d)}var s=[],t=[],u={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){t.push({name:a,fn:b,options:c})},addAsyncTest:function(a){t.push({name:null,fn:a})}},v=function(){};v.prototype=u,v=new v;var w=b.documentElement,x="svg"===w.nodeName.toLowerCase(),y=u.testStyles=i,z="Moz O ms Webkit",A=u._config.usePrefixes?z.split(" "):[];u._cssomPrefixes=A;var B=u._config.usePrefixes?z.toLowerCase().split(" "):[];u._domPrefixes=B;var C={elem:g("modernizr")};v._q.push(function(){delete C.elem});var D={style:C.elem.style};v._q.unshift(function(){delete D.style}),u.testAllProps=q,u.testAllProps=r,v.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&r("transform","scale(1)",!0)}),v.addTest("csstransitions",r("transition","all",!0));var E="CSS"in a&&"supports"in a.CSS,F="supportsCSS"in a;v.addTest("supports",E||F),v.addTest("csstransforms3d",function(){var a=!!r("perspective","1px",!0),b=v._config.usePrefixes;if(a&&(!b||"webkitPerspective"in w.style)){var c,d="#modernizr{width:0;height:0}";v.supports?c="@supports (perspective: 1px)":(c="@media (transform-3d)",b&&(c+=",(-webkit-transform-3d)")),c+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",y(d+c,function(b){a=7===b.offsetWidth&&18===b.offsetHeight})}return a}),e(),f(s),delete u.addTest,delete u.addAsyncTest;for(var G=0;G<v._q.length;G++)v._q[G]();a.Modernizr=v}(window,document),window.onload=function(){log("===================页面载入完毕，进入事件驱动阶段============="),setTimeout(function(){EVT.trigger(document,"onload")},10)},this.zlib=this.zlib||{},zlib.extend=function(a,b,c){"use strict";function d(){this.constructor=a}return null!=c&&(d.prototype=c.prototype),$.extend(d.prototype,b),a.prototype=new d},zlib.fnwrap=function(a){var b=function(){var b=new a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);for(var c in a.prototype)/^_/.test(c)||(this[c]=function(a){return function(){return b[a].apply(b,arguments)}}(c))};return b},function(a){"use strict";var b={makstyle:function(a){var c=b.getstyle(a),d=$("style");if(null!=d&&d.length>0)try{d.eq(0).append(c)}catch(e){var f=$('<style type="text/css">'+c+"</style>");f.appendTo("head"),console.log("【csstool】 append err"+e)}else{var f=$('<style type="text/css">'+c+"</style>");f.appendTo("head")}},getstyle:function(a){for(var c="",d=b._getstyleArray(a),e=0;e<d.length;e++)for(var f=d[e],g=f.length-1;g>=0;g--){var h=f[g];for(var i in h){var j=i.replace(/[#]/gi," #").replace(/[\.]/gi," .").replace(/&\s/gi,"&").replace(/&/gi,""),k=h[i];c+=j+"{"+k+"}"}}return c=c.replace(/^\s/gi,"")},_getstyleArray:function(a){var c=[];for(var d in a){var e=b._getyles(d,a[d]);c.push(e)}return c},_getyles:function(a,b){function c(a,b){var e={};for(var f in b)/[#\.&]/gi.test(f)&&"object"==typeof b[f]?c(a+f,b[f]):e[a]=(e[a]||"")+f+":"+b[f]+";";d.push(e)}var d=[];return c(a,b),d}};a.mkcss=b.makstyle}(zlib.tool=zlib.tool||{}),function(a){"use strict";jQuery.fn.zen=function(a,b){var c=$(this);return void 0==typeof a?c:(a.replace(/^([^>+]+)(([>+])(.*))?/,function(a,d,e,f,g){d.replace(/^([^*]+)(\*([0-9]+))?/,function(a,d,e,h){void 0==h&&(h=1),1>h&&(h=1);for(var i=d.match(/[^.#]+/)[0],j=1;h>=j;j++){var k=$("<"+i+">");d.replace(/([.#])([^.#]+)/g,function(a,b,c){"#"==b?k.attr("id",c):"."==b&&k.addClass(c)}),c.append(k),void 0==f?void 0!=b&&jQuery.each([k],b):"+"==f?c.zen(g,b):">"==f&&k.zen(g,b)}})}),$(this))},a.zen=function(a,b){var c=$("<span>").zen(a,b).html();return $(c)},window.zen=a.zen}(zlib.tool=zlib.tool||{}),function(a){"use strict";var b=function(a){var b=$(a).css("position"),c=["marginTop","marginBottom","marginLeft","marginRight","top","bottom","left","right"],d=["paddingTop","paddingBottom","paddingLeft","paddingRight"];for(var e in c){var f=$(a).css(c[e]);0!=parseInt(f)&&($(a).parent().css(c[e],f),$(a).css(c[e],0))}if("textarea"!==$(a)[0].tagName.toLowerCase()&&"input"!==$(a)[0].tagName.toLowerCase())for(var e in d){var f=$(a).css(d[e]);0!=parseInt(f)&&($(a).parent().css(d[e],f),$(a).css(d[e],0))}if("static"!=b&&$(a).parent().css("position",b),"absolute"==b)if("textarea"===$(a)[0].tagName.toLowerCase()||"input"===$(a)[0].tagName.toLowerCase()){parseInt($(a).css("padding-top"))+parseInt($(a).css("padding-bottom"));$(a).parent().css({width:$(a).innerWidth(),height:$(a).innerHeight()})}else $(a).parent().css({width:$(a).width(),height:$(a).height()})};a.reLayParent=b}(zlib.tool=zlib.tool||{}),function(a,b){var c={duration:750,show:function(a,b){if(2===a.button)return!1;var e=b||this;andom=document.createElement("div"),andom.className="waves-ripple",e.appendChild(andom);var f=d.countPosition(e),g=a.pageY-f.top,h=a.pageX-f.left,i="scale("+e.clientWidth/100*10+")";"touches"in a&&(g=a.touches[0].pageY-f.top,h=a.touches[0].pageX-f.left),andom.setAttribute("data-hold",Date.now()),andom.setAttribute("data-scale",i),andom.setAttribute("data-x",h),andom.setAttribute("data-y",g);var j={top:g+"px",left:h+"px"};andom.className=andom.className+" waves-notransition",andom.setAttribute("style",d.mkstyle(j)),andom.className=andom.className.replace("waves-notransition",""),j["-webkit-transform"]=i,j["-moz-transform"]=i,j["-ms-transform"]=i,j["-o-transform"]=i,j.transform=i,j.opacity="1",j["-webkit-transition-duration"]=c.duration+"ms",j["-moz-transition-duration"]=c.duration+"ms",j["-o-transition-duration"]=c.duration+"ms",j["transition-duration"]=c.duration+"ms",j["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",j["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",j["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",j["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",andom.setAttribute("style",d.mkstyle(j))},hide:function(a){var b=this,e=(1.4*b.clientWidth,null),f=b.getElementsByClassName("waves-ripple");if(!(f.length>0))return!1;e=f[f.length-1];var g=e.getAttribute("data-x"),h=e.getAttribute("data-y"),i=e.getAttribute("data-scale"),j=Date.now()-Number(e.getAttribute("data-hold")),k=350-j;setTimeout(function(){var a={top:h+"px",left:g+"px",opacity:"0","-webkit-transition-duration":c.duration+"ms","-moz-transition-duration":c.duration+"ms","-o-transition-duration":c.duration+"ms","transition-duration":c.duration+"ms","-webkit-transform":i,"-moz-transform":i,"-ms-transform":i,"-o-transform":i,transform:i};e.setAttribute("style",d.mkstyle(a)),setTimeout(function(){try{b.removeChild(e)}catch(a){return!1}},c.duration)},k)},wrapInput:function(b){if(null!=b)for(var c=0;c<b.length;c++){var e=b[c];if("input"===e.tagName.toLowerCase()||"textarea"===e.tagName.toLowerCase()){var f=e.parentNode;if("i"===f.tagName.toLowerCase()&&-1!==f.className.indexOf(d.elname))continue;var g=document.createElement("i");if(g.className=d.elname+" waves-input-wrapper",g.setAttribute("style","font-style: normal"),e.className=(e.className||"").replace(d.elname,"waves-button-input"),"textarea"===e.tagName.toLowerCase()){var h=e.getAttribute("style");h+=""==h?"display:block;":";display:block;",e.setAttribute("style",h)}f.replaceChild(g,e),g.appendChild(e),a.tool.reLayParent(e)}}}},d={elname:"waves-effect",init:function(a){null!=d.select("."+a)&&d.select("."+a).length>0&&(d.elname=a),d.initEvent(),d.mkcss()},mkcss:function(){var b={};b["."+d.elname]={position:"relative;",cursor:"pointer;",display:"inline-block;",overflow:"hidden;","-webkit-user-select":" none;"," -webkit-tap-highlight-color":"transparent;"," vertical-align":" middle;","  z-index":"1;"," will-change":"opacity, transform;",transition:"all .3s ease-out;"," .waves-ripple":{position:"absolute;","border-radius":"50%;",width:"20px;",height:"20px;","margin-top":"-10px;","margin-left":"-10px;",opacity:"0;",background:"rgba(0,0,0,0.2);",transition:"all 0.7s ease-out;","transition-property":"opacity, -webkit-transform;","transition-property":"transform, opacity, -webkit-transform;","-webkit-transform":"scale(0);",transform:"scale(0);","pointer-events":"none;"}},d.hasmk||(a.tool.mkcss(b),d.hasmk=!0)},initEvent:function(a){a=a||{},c.wrapInput(d.select("."+d.elname)),document.body.addEventListener("mousedown",d.clickdown,!1)},clickdown:function(a){var b=d.findPdom(a);null!==b&&(c.show(a,b),b.addEventListener("mouseup",c.hide,!1),b.addEventListener("mouseleave",c.hide,!1))},findPdom:function(a){for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(-1===!c.className.indexOf(d.elname)){b=c;break}if(c.classList&&c.classList.contains(d.elname)){b=c;break}c=c.parentElement}return b},countPosition:function(a){var b,c,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),c=d.getdom(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}},isWindow:function(a){return null!==a&&a===a.window},getdom:function(a){return d.isWindow(a)?a:9===a.nodeType&&a.defaultView},mkstyle:function(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b},select:document.querySelectorAll&&document.querySelectorAll.bind?document.querySelectorAll.bind(document):function(){}};window.Monitor&&(d=Monitor(d)),b.wave=function(a){d.init(a)}}(zlib=zlib||{},zlib.ui=zlib.ui||{});