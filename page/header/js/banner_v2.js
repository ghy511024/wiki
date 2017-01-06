
var wrap_w = window.innerWidth;
//var wrap_h = window.innerHeight;
var wrap_h = 350;
!function (t) {
    function o(t, o, r) {
        this.x = t,
                this.y = o,
                this.z = r
    }
    function r(t) {
        return t * t * t * (t * (6 * t - 15) + 10)
    }
    function n(t, o, r) {
        return (1 - r) * t + r * o
    }
    var a = t.noise = {};
    o.prototype.dot2 = function (t, o) {
        return this.x * t + this.y * o
    }
    ,
            o.prototype.dot3 = function (t, o, r) {
                return this.x * t + this.y * o + this.z * r
            }
    ;
    var e = [new o(1, 1, 0), new o(-1, 1, 0), new o(1, -1, 0), new o(-1, -1, 0), new o(1, 0, 1), new o(-1, 0, 1), new o(1, 0, -1), new o(-1, 0, -1), new o(0, 1, 1), new o(0, -1, 1), new o(0, 1, -1), new o(0, -1, -1)]
            , i = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
            , d = new Array(512)
            , f = new Array(512);
    a.seed = function (t) {
        t > 0 && 1 > t && (t *= 65536),
                t = Math.floor(t),
                256 > t && (t |= t << 8);
        for (var o = 0; 256 > o; o++) {
            var r;
            r = 1 & o ? i[o] ^ 255 & t : i[o] ^ t >> 8 & 255,
                    d[o] = d[o + 256] = r,
                    f[o] = f[o + 256] = e[r % 12]
        }
    }
    ,
            a.seed(0);
    var h = .5 * (Math.sqrt(3) - 1)
            , v = (3 - Math.sqrt(3)) / 6
            , u = 1 / 3
            , s = 1 / 6;
    a.simplex2 = function (t, o) {
        var r, n, a, e, i, u = (t + o) * h, s = Math.floor(t + u), l = Math.floor(o + u), w = (s + l) * v, M = t - s + w, c = o - l + w;
        M > c ? (e = 1,
                i = 0) : (e = 0,
                i = 1);
        var p = M - e + v
                , y = c - i + v
                , x = M - 1 + 2 * v
                , m = c - 1 + 2 * v;
        s &= 255,
                l &= 255;
        var q = f[s + d[l]]
                , z = f[s + e + d[l + i]]
                , A = f[s + 1 + d[l + 1]]
                , b = .5 - M * M - c * c;
        0 > b ? r = 0 : (b *= b,
                r = b * b * q.dot2(M, c));
        var g = .5 - p * p - y * y;
        0 > g ? n = 0 : (g *= g,
                n = g * g * z.dot2(p, y));
        var j = .5 - x * x - m * m;
        return 0 > j ? a = 0 : (j *= j,
                a = j * j * A.dot2(x, m)),
                70 * (r + n + a)
    }
    ,
            a.simplex3 = function (t, o, r) {
                var n, a, e, i, h, v, l, w, M, c, p = (t + o + r) * u, y = Math.floor(t + p), x = Math.floor(o + p), m = Math.floor(r + p), q = (y + x + m) * s, z = t - y + q, A = o - x + q, b = r - m + q;
                z >= A ? A >= b ? (h = 1,
                        v = 0,
                        l = 0,
                        w = 1,
                        M = 1,
                        c = 0) : z >= b ? (h = 1,
                        v = 0,
                        l = 0,
                        w = 1,
                        M = 0,
                        c = 1) : (h = 0,
                        v = 0,
                        l = 1,
                        w = 1,
                        M = 0,
                        c = 1) : b > A ? (h = 0,
                        v = 0,
                        l = 1,
                        w = 0,
                        M = 1,
                        c = 1) : b > z ? (h = 0,
                        v = 1,
                        l = 0,
                        w = 0,
                        M = 1,
                        c = 1) : (h = 0,
                        v = 1,
                        l = 0,
                        w = 1,
                        M = 1,
                        c = 0);
                var g = z - h + s
                        , j = A - v + s
                        , k = b - l + s
                        , B = z - w + 2 * s
                        , C = A - M + 2 * s
                        , D = b - c + 2 * s
                        , E = z - 1 + 3 * s
                        , F = A - 1 + 3 * s
                        , G = b - 1 + 3 * s;
                y &= 255,
                        x &= 255,
                        m &= 255;
                var H = f[y + d[x + d[m]]]
                        , I = f[y + h + d[x + v + d[m + l]]]
                        , J = f[y + w + d[x + M + d[m + c]]]
                        , K = f[y + 1 + d[x + 1 + d[m + 1]]]
                        , L = .6 - z * z - A * A - b * b;
                0 > L ? n = 0 : (L *= L,
                        n = L * L * H.dot3(z, A, b));
                var N = .6 - g * g - j * j - k * k;
                0 > N ? a = 0 : (N *= N,
                        a = N * N * I.dot3(g, j, k));
                var O = .6 - B * B - C * C - D * D;
                0 > O ? e = 0 : (O *= O,
                        e = O * O * J.dot3(B, C, D));
                var P = .6 - E * E - F * F - G * G;
                return 0 > P ? i = 0 : (P *= P,
                        i = P * P * K.dot3(E, F, G)),
                        32 * (n + a + e + i)
            }
    ,
            a.perlin2 = function (t, o) {
                var a = Math.floor(t)
                        , e = Math.floor(o);
                t -= a,
                        o -= e,
                        a = 255 & a,
                        e = 255 & e;
                var i = f[a + d[e]].dot2(t, o)
                        , h = f[a + d[e + 1]].dot2(t, o - 1)
                        , v = f[a + 1 + d[e]].dot2(t - 1, o)
                        , u = f[a + 1 + d[e + 1]].dot2(t - 1, o - 1)
                        , s = r(t);
                return n(n(i, v, s), n(h, u, s), r(o))
            }
    ,
            a.perlin3 = function (t, o, a) {
                var e = Math.floor(t)
                        , i = Math.floor(o)
                        , h = Math.floor(a);
                t -= e,
                        o -= i,
                        a -= h,
                        e = 255 & e,
                        i = 255 & i,
                        h = 255 & h;
                var v = f[e + d[i + d[h]]].dot3(t, o, a)
                        , u = f[e + d[i + d[h + 1]]].dot3(t, o, a - 1)
                        , s = f[e + d[i + 1 + d[h]]].dot3(t, o - 1, a)
                        , l = f[e + d[i + 1 + d[h + 1]]].dot3(t, o - 1, a - 1)
                        , w = f[e + 1 + d[i + d[h]]].dot3(t - 1, o, a)
                        , M = f[e + 1 + d[i + d[h + 1]]].dot3(t - 1, o, a - 1)
                        , c = f[e + 1 + d[i + 1 + d[h]]].dot3(t - 1, o - 1, a)
                        , p = f[e + 1 + d[i + 1 + d[h + 1]]].dot3(t - 1, o - 1, a - 1)
                        , y = r(t)
                        , x = r(o)
                        , m = r(a);
                return n(n(n(v, w, y), n(u, M, y), m), n(n(s, c, y), n(l, p, y), m), x)
            }
}(this);
var __extends = this && this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }
    for (var s in e)
        e.hasOwnProperty(s) && (t[s] = e[s]);
    t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
}
, clockmaker;
!function (t) {
    "use strict";
    var e = function () {
        function t() {
        }
        return t.highDPI = function (e, i, s) {
            var a = t._getBackingRatio(e)
                    , r = Math.max(1, (window.devicePixelRatio || 1) / a)
                    , n = e.canvas;
            n.style;
            return n.width = i * r,
                    n.height = s * r,
                    e.scaleX = e.scaleY = r,
                    this
        }
        ,
                t._getBackingRatio = function (t) {
                    var e = t.canvas.getContext("2d");
                    return e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || 1
                }
        ,
                t
    }();
    t.StageHelper = e
}(clockmaker || (clockmaker = {}));
var project;
!function (t) {
    "use strict";
    var e = function (t) {
        function e() {
            t.call(this),
                    this.time = 0,
                    this.MAX_LINES = 10,
                    this.MAX_VERTEX = 10,
                    this.mouseEnabled = !1,
                    noise.seed(0),
                    this.vertexArr = [];
            for (var e = 0; e < this.MAX_LINES; e++) {
                this.vertexArr[e] = [];
                for (var i = (this.MAX_VERTEX - 1) * Math.random() * Math.random() + 1, s = 0; i >= s; s++)
                    this.vertexArr[e][s] = 0
            }
            this.on("tick", this.handleTick, this)
        }
        return __extends(e, t),
                e.prototype.handleTick = function (t) {
                    this.time = Date.now() / 5e3,
                            this.graphics.clear();
                    for (var e = 0; e < this.MAX_LINES; e++)
                        this.drawWave(this.vertexArr[e], .05 * e + .001, .1 * e)
                }
        ,
                e.prototype.drawWave = function (t, e, i) {
                    var s = t.length - 1
                            , a = wrap_w
                            , r = wrap_h;
                    this.graphics.setStrokeStyle(e).beginStroke("white");
                    for (var n = 0; s >= n; n++) {
                        var h = noise.perlin2(.2 * n, this.time + i);
                        h *= .5,
                                t[n] = h * wrap_h * 2
                    }
                    var o = r / 2
                            , c = [];
                    c.push({
                        x: -200,
                        y: o
                    });
                    for (var n = 0; s >= n; n++)
                        c.push({
                            x: a * (n / s) >> 0,
                            y: t[n] + o
                        });
                    c.push({
                        x: a + 200,
                        y: o
                    });
                    for (var n = 0; n < c.length; n++)
                        if (n >= 2) {
                            var l = c[n - 0].x
                                    , d = c[n - 0].y
                                    , p = c[n - 1].x
                                    , u = c[n - 1].y
                                    , g = c[n - 2].x
                                    , v = c[n - 2].y
                                    , f = (g + p) / 2
                                    , m = (v + u) / 2
                                    , _ = (l + p) / 2
                                    , y = (d + u) / 2;
                            this.graphics.moveTo(f, m).curveTo(p, u, _, y)
                        }
                    this.graphics.endStroke()
                }
        ,
                e
    }(createjs.Shape);
    t.CrossGraphicsContainer = e
}(project || (project = {}));
var project;
!function (t) {
    "use strict";
    var e = function (t) {
        function e() {
            t.call(this)
        }
        return __extends(e, t),
                e.prototype.drawContents = function (t, e) {
                    this.graphics.clear(),
                            this.graphics.beginFill(createjs.Graphics.getHSL(0, 0, 0)).drawRect(0, 0, t, e);
                    var i = 1 * t / 3 + t / 10 * Math.sin(Date.now() / 4e3)
                            , s = 1 * e / 3
                            , a = t / 2;
                    this.graphics.beginRadialGradientFill([createjs.Graphics.getHSL(0, 0, 100, .3 + .008 * Math.random()), createjs.Graphics.getHSL(0, 0, 0, 0)], [0, 1], i, s, 0, i, s, a),
                            this.graphics.drawCircle(i, s, a),
                            this.graphics.endFill();
                    var i = 3 * t / 4 + t / 15 * Math.cos(Date.now() / 1e4)
                            , s = 2 * e / 3
                            , a = t / 3;
                    this.graphics.beginRadialGradientFill([createjs.Graphics.getHSL(0, 0, 100, .3 + .006 * Math.random()), createjs.Graphics.getHSL(0, 0, 0, 0)], [0, 1], i, s, 0, i, s, a),
                            this.graphics.drawCircle(i, s, a),
                            this.graphics.endFill()
                }
        ,
                e
    }(createjs.Shape);
    t.SpotLightContainer = e
}(project || (project = {}));
var project;
!function (t) {
//    var wrap_w;
//    var wrap_h;

    "use strict";
    var e = function (t) {
        function e(e) {
            t.call(this),
                    this._time = 0,
                    this._isMouseMoved = !1,
                    this._tickCount = 0,
                    this._bg = new createjs.Shape,
                    this.addChild(this._bg),
                    this._emitter = new s(e, 2, 2),
                    this.addChild(this._emitter.container),
                    this._emitterForMouse = new s(2, 6, 6),
                    this.addChild(this._emitterForMouse.container),
                    this.on("tick", this.enterFrameHandler, this)
        }
        return __extends(e, t),
                Object.defineProperty(e.prototype, "isMouseMoved", {
                    set: function (t) {
                        this._isMouseMoved = !0
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.enterFrameHandler = function (t) {
                    if (this._tickCount = this._tickCount + 1,
                            this._tickCount % 2 == 0 && this._emitter.emit(wrap_w * Math.random(), wrap_h / 5 * (Math.random() - .5) + 6 * wrap_h / 10),
                            this._emitter.update(),
                            1 == this._isMouseMoved) {
                        var e = this.globalToLocal(this.getStage().mouseX, this.getStage().mouseY);
                        this._emitterForMouse.emit(e.x, e.y),
                                this._isMouseMoved = !1
                    }
                    this._emitterForMouse.update();
                    var i = 45 * Math.sin(-1 * Date.now() / 400 * Math.PI / 180) + 200
                            , s = createjs.Graphics.getHSL(i, 100, 60)
                            , a = createjs.Graphics.getHSL(i + 120, 100, 40);
                    this._bg.graphics.clear().beginLinearGradientFill([s, a], [0, 1], 0, 0, 0,
                            wrap_h).drawRect(0, 0, wrap_w,
                            wrap_h)
                }
        ,
                e
    }(createjs.Container);
    t.ParticleContainer = e;
    var i = function () {
        function t() {
            this.vy = 0,
                    this.x = 0,
                    this.latestY = 0,
                    this.latestX = 0,
                    this.y = 0,
                    this.vx = 0
        }
        return t.prototype.update = function () {
            var t = this.latestX - this.x
                    , e = this.latestY - this.y
                    , i = .2 * Math.sqrt(t * t + e * e)
                    , s = Math.atan2(e, t);
            this.vx += Math.cos(s) * i,
                    this.vy += Math.sin(s) * i,
                    this.vx *= .4,
                    this.vy *= .4,
                    this.x += this.vx,
                    this.y += this.vy
        }
        ,
                t
    }()
            , s = function (t) {
                function e(e, i, s) {
                    t.call(this),
                            this.numParticles = e,
                            this.startVx = i,
                            this.startVy = s,
                            this.PRE_CACHE_PARTICLES = 100,
                            this.container = new createjs.Container,
                            this._particleActive = [],
                            this._particlePool = [];
                    for (var r = 0; r < this.PRE_CACHE_PARTICLES; r++)
                        this._particlePool.push(new a)
                }
                return __extends(e, t),
                        e.prototype.emit = function (t, e) {
                            for (var i = 0; i < this.numParticles; i++)
                                this.getNewParticle(t, e)
                        }
                ,
                        e.prototype.update = function () {
                            t.prototype.update.call(this);
                            for (var e = 0; e < this._particleActive.length; e++) {
                                var i = this._particleActive[e];
                                i.getIsDead() ? this.removeParticle(i) : i.update()
                            }
                        }
                ,
                        e.prototype.getNewParticle = function (t, e) {
                            var i = this.fromPool();
                            return i.resetParameters(t, e, this.startVx, this.startVy),
                                    this._particleActive.push(i),
                                    this.container.addChild(i),
                                    i
                        }
                ,
                        e.prototype.removeParticle = function (t) {
                            this.container.removeChild(t);
                            var e = this._particleActive.indexOf(t);
                            e > -1 && this._particleActive.splice(e, 1),
                                    this.toPool(t)
                        }
                ,
                        e.prototype.getActiveParticles = function () {
                            return this._particleActive
                        }
                ,
                        e.prototype.fromPool = function () {
                            return this._particlePool.length > 0 ? this._particlePool.shift() : new a
                        }
                ,
                        e.prototype.toPool = function (t) {
                            this._particlePool.push(t)
                        }
                ,
                        e
            }(i)
            , a = function (t) {
                function e() {
                    t.call(this),
                            this.MAX_SIZE = 128;
                    var e = Math.random() * Math.random() * Math.random() * Math.random() * this.MAX_SIZE + 2;
                    this.size = e;
                    var i = createjs.Graphics.getHSL(0, 0, 20 + 50 * Math.random());
                    this.graphics.clear(),
                            Math.random() < .4 ? this.graphics.beginRadialGradientFill([i, "#000000"], [0, 1], 0, 0, 0, 0, 0, this.size) : Math.random() < .1 ? this.graphics.setStrokeStyle(1).beginStroke(createjs.Graphics.getRGB(255, 255, 255)) : Math.random() < .3 ? this.graphics.setStrokeStyle(1.5).beginStroke(createjs.Graphics.getRGB(255, 255, 255)) : this.graphics.beginFill(i),
                            this.graphics.drawCircle(0, 0, this.size),
                            this.graphics.endFill(),
                            this.compositeOperation = "lighter",
                            this.mouseEnabled = !1;
                    var s = 2;
                    this.cache(-this.size - s, -this.size - s, 2 * this.size + 2 * s, 2 * this.size + 2 * s),
                            this._destroy = !0
                }
                return __extends(e, t),
                        e.prototype.resetParameters = function (t, e, i, s) {
                            this.x = t,
                                    this.y = e,
                                    this.vx = (Math.random() - .5) * i,
                                    this.vy = (Math.random() - .5) * s,
                                    this.life = Math.random() * Math.random() * 400 + 40,
                                    this.vSize = .5 * Math.random(),
                                    this.baseAlpha = .7,
                                    this._destroy = !1,
                                    this._count = 0,
                                    this.alpha = 1,
                                    this.scaleX = this.scaleY = 1
                        }
                ,
                        e.prototype.update = function () {
                            this.vy -= .05,
                                    this.vx *= .98,
                                    this.vy *= .98,
                                    this.x += this.vx,
                                    this.y += this.vy,
                                    this._count++;
                            var t = 1 - this._count / this.life
                                    , e = 1 - this._count / this.life * this.vSize;
                            this.alpha = .3 * Math.random() + this.baseAlpha * t,
                                    this.scaleX = this.scaleY = e,
                                    this.life < this._count && (this._destroy = !0,
                                            this.parent.removeChild(this))
                        }
                ,
                        e.prototype.getIsDead = function () {
                            return this._destroy
                        }
                ,
                        e
            }(createjs.Shape)
}(project || (project = {}));
var project;
!function (t) {
    "use strict";
    var e = function () {
        function e(e) {
            var i = this;
            this.stageBase = new createjs.Stage("canvasBase");
            var s = new t.ParticleContainer(e);
            this.stageBase.addChild(s),
                    createjs.Ticker.setFPS(60),
                    createjs.Ticker.timingMode = createjs.Ticker.RAF,
                    createjs.Ticker.on("tick", this.handleTick, this);
            var a = new createjs.Stage("canvasOverlay");
            this.stageOverlay = a,
                    this.stageOverlay.nextStage = this.stageBase,
                    this.stageBase.on("stagemousemove", function (t) {
                        s.isMouseMoved = !0
                    }),
                    this.spotLightContainer = new t.SpotLightContainer,
                    a.addChild(this.spotLightContainer),
                    this.stageCalcInside = new createjs.Stage(document.createElement("canvas")),
                    this.stageCalcInside.autoClear = !1;
            var r = new t.CrossGraphicsContainer;
            this.stageCalcInside.addChild(r),
                    this.buildUi(),
                    this.handleResize(),
                    window.addEventListener("resize", function () {
                        i.handleResize()
                    }),
                    setTimeout(function () {
                        i.handleResize()
                    }, 100)
        }
        return e.prototype.buildUi = function () {
        }
        ,
                e.prototype.handleTick = function () {
                    this.spotLightContainer.drawContents(innerWidth, wrap_h),
                            this.stageBase.update();
                    var t = this.stageCalcInside.canvas.getContext("2d");
                    t.fillStyle = "rgba(0, 0, 0, " + .35 * Math.random() + ")",
                            t.fillRect(0, 0, this.stageCalcInside.canvas.width, this.stageCalcInside.canvas.height),
                            this.stageCalcInside.update(),
                            this.stageOverlay.update();
                    var e = this.stageOverlay.canvas.getContext("2d");
                    e.globalCompositeOperation = "lighter",
                            e.drawImage(this.stageCalcInside.canvas, 0, 0)
                }
        ,
                e.prototype.handleResize = function () {
                    clockmaker.StageHelper.highDPI(this.stageBase, innerWidth, wrap_h),
                            clockmaker.StageHelper.highDPI(this.stageOverlay, innerWidth, wrap_h),
                            clockmaker.StageHelper.highDPI(this.stageCalcInside, innerWidth, wrap_h)
                }
        ,
                e
    }();
    t.MainBase = e
}(project || (project = {}));
var project;
!function (t) {
    "use strict";
    var e = 1;
    window.addEventListener("DOMContentLoaded", function () {
        new t.Main(e);
        var i = document.getElementById("mainTitle");
        null != i && requestAnimationFrame(function () {
            i.classList.add("show")
        })
    });
    var i = function (t) {
        function e(e) {
            t.call(this, e),
                    this.buildUi()
        }
        return __extends(e, t),
                e.prototype.buildUi = function () {
                }
        ,
                e.prototype.handleResize = function () {
                    t.prototype.handleResize.call(this)
                }
        ,
                e
    }(t.MainBase);
    t.Main = i
}(project || (project = {}));
