/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.ES6Promise = t());
})(this, function () {
  "use strict";
  function e(e) {
    return "function" == typeof e || ("object" == typeof e && null !== e);
  }
  function t(e) {
    return "function" == typeof e;
  }
  function n(e) {
    z = e;
  }
  function r(e) {
    G = e;
  }
  function o() {
    return function () {
      return process.nextTick(a);
    };
  }
  function i() {
    return function () {
      W(a);
    };
  }
  function s() {
    var e = 0,
      t = new V(a),
      n = document.createTextNode("");
    return (
      t.observe(n, { characterData: !0 }),
      function () {
        n.data = e = ++e % 2;
      }
    );
  }
  function c() {
    var e = new MessageChannel();
    return (
      (e.port1.onmessage = a),
      function () {
        return e.port2.postMessage(0);
      }
    );
  }
  function u() {
    var e = setTimeout;
    return function () {
      return e(a, 1);
    };
  }
  function a() {
    for (var e = 0; e < N; e += 2) {
      var t = $[e],
        n = $[e + 1];
      t(n), ($[e] = void 0), ($[e + 1] = void 0);
    }
    N = 0;
  }
  function l() {
    try {
      var e = require,
        t = e("vertx");
      return (W = t.runOnLoop || t.runOnContext), i();
    } catch (n) {
      return u();
    }
  }
  function d(e, t) {
    var n = arguments,
      r = this,
      o = new this.constructor(h);
    void 0 === o[te] && C(o);
    var i = r._state;
    return (
      i
        ? !(function () {
            var e = n[i - 1];
            G(function () {
              return T(i, o, e, r._result);
            });
          })()
        : A(r, o, e, t),
      o
    );
  }
  function f(e) {
    var t = this;
    if (e && "object" == typeof e && e.constructor === t) return e;
    var n = new t(h);
    return b(n, e), n;
  }
  function h() {}
  function m() {
    return new TypeError("You cannot resolve a promise with itself");
  }
  function p() {
    return new TypeError(
      "A promises callback cannot return that same promise."
    );
  }
  function v(e) {
    try {
      return e.then;
    } catch (t) {
      return (ie.error = t), ie;
    }
  }
  function g(e, t, n, r) {
    try {
      e.call(t, n, r);
    } catch (o) {
      return o;
    }
  }
  function y(e, t, n) {
    G(function (e) {
      var r = !1,
        o = g(
          n,
          t,
          function (n) {
            r || ((r = !0), t !== n ? b(e, n) : S(e, n));
          },
          function (t) {
            r || ((r = !0), L(e, t));
          },
          "Settle: " + (e._label || " unknown promise")
        );
      !r && o && ((r = !0), L(e, o));
    }, e);
  }
  function _(e, t) {
    t._state === re
      ? S(e, t._result)
      : t._state === oe
      ? L(e, t._result)
      : A(
          t,
          void 0,
          function (t) {
            return b(e, t);
          },
          function (t) {
            return L(e, t);
          }
        );
  }
  function w(e, n, r) {
    n.constructor === e.constructor && r === d && n.constructor.resolve === f
      ? _(e, n)
      : r === ie
      ? L(e, ie.error)
      : void 0 === r
      ? S(e, n)
      : t(r)
      ? y(e, n, r)
      : S(e, n);
  }
  function b(t, n) {
    t === n ? L(t, m()) : e(n) ? w(t, n, v(n)) : S(t, n);
  }
  function E(e) {
    e._onerror && e._onerror(e._result), I(e);
  }
  function S(e, t) {
    e._state === ne &&
      ((e._result = t),
      (e._state = re),
      0 !== e._subscribers.length && G(I, e));
  }
  function L(e, t) {
    e._state === ne && ((e._state = oe), (e._result = t), G(E, e));
  }
  function A(e, t, n, r) {
    var o = e._subscribers,
      i = o.length;
    (e._onerror = null),
      (o[i] = t),
      (o[i + re] = n),
      (o[i + oe] = r),
      0 === i && e._state && G(I, e);
  }
  function I(e) {
    var t = e._subscribers,
      n = e._state;
    if (0 !== t.length) {
      for (
        var r = void 0, o = void 0, i = e._result, s = 0;
        s < t.length;
        s += 3
      )
        (r = t[s]), (o = t[s + n]), r ? T(n, r, o, i) : o(i);
      e._subscribers.length = 0;
    }
  }
  function M() {
    this.error = null;
  }
  function B(e, t) {
    try {
      return e(t);
    } catch (n) {
      return (se.error = n), se;
    }
  }
  function T(e, n, r, o) {
    var i = t(r),
      s = void 0,
      c = void 0,
      u = void 0,
      a = void 0;
    if (i) {
      if (
        ((s = B(r, o)),
        s === se ? ((a = !0), (c = s.error), (s = null)) : (u = !0),
        n === s)
      )
        return void L(n, p());
    } else (s = o), (u = !0);
    n._state !== ne ||
      (i && u
        ? b(n, s)
        : a
        ? L(n, c)
        : e === re
        ? S(n, s)
        : e === oe && L(n, s));
  }
  function H(e, t) {
    try {
      t(
        function (t) {
          b(e, t);
        },
        function (t) {
          L(e, t);
        }
      );
    } catch (n) {
      L(e, n);
    }
  }
  function k() {
    return ce++;
  }
  function C(e) {
    (e[te] = ce++),
      (e._state = void 0),
      (e._result = void 0),
      (e._subscribers = []);
  }
  function P(e, t) {
    (this._instanceConstructor = e),
      (this.promise = new e(h)),
      this.promise[te] || C(this.promise),
      K(t)
        ? ((this._input = t),
          (this.length = t.length),
          (this._remaining = t.length),
          (this._result = new Array(this.length)),
          0 === this.length
            ? S(this.promise, this._result)
            : ((this.length = this.length || 0),
              this._enumerate(),
              0 === this._remaining && S(this.promise, this._result)))
        : L(this.promise, j());
  }
  function j() {
    return new Error("Array Methods must be provided an Array");
  }
  function O(e) {
    return new P(this, e).promise;
  }
  function x(e) {
    var t = this;
    return new t(
      K(e)
        ? function (n, r) {
            for (var o = e.length, i = 0; i < o; i++)
              t.resolve(e[i]).then(n, r);
          }
        : function (e, t) {
            return t(new TypeError("You must pass an array to race."));
          }
    );
  }
  function D(e) {
    var t = this,
      n = new t(h);
    return L(n, e), n;
  }
  function R() {
    throw new TypeError(
      "You must pass a resolver function as the first argument to the promise constructor"
    );
  }
  function q() {
    throw new TypeError(
      "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
    );
  }
  function Y(e) {
    (this[te] = k()),
      (this._result = this._state = void 0),
      (this._subscribers = []),
      h !== e &&
        ("function" != typeof e && R(), this instanceof Y ? H(this, e) : q());
  }
  function F() {
    var e = void 0;
    if ("undefined" != typeof global) e = global;
    else if ("undefined" != typeof self) e = self;
    else
      try {
        e = Function("return this")();
      } catch (t) {
        throw new Error(
          "polyfill failed because global object is unavailable in this environment"
        );
      }
    var n = e.Promise;
    if (n) {
      var r = null;
      try {
        r = Object.prototype.toString.call(n.resolve());
      } catch (t) {}
      if ("[object Promise]" === r && !n.cast) return;
    }
    e.Promise = Y;
  }
  var U = void 0;
  U = Array.isArray
    ? Array.isArray
    : function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      };
  var K = U,
    N = 0,
    W = void 0,
    z = void 0,
    G = function (e, t) {
      ($[N] = e), ($[N + 1] = t), (N += 2), 2 === N && (z ? z(a) : ee());
    },
    J = "undefined" != typeof window ? window : void 0,
    Q = J || {},
    V = Q.MutationObserver || Q.WebKitMutationObserver,
    X =
      "undefined" == typeof self &&
      "undefined" != typeof process &&
      "[object process]" === {}.toString.call(process),
    Z =
      "undefined" != typeof Uint8ClampedArray &&
      "undefined" != typeof importScripts &&
      "undefined" != typeof MessageChannel,
    $ = new Array(1e3),
    ee = void 0;
  ee = X
    ? o()
    : V
    ? s()
    : Z
    ? c()
    : void 0 === J && "function" == typeof require
    ? l()
    : u();
  var te = Math.random().toString(36).substring(16),
    ne = void 0,
    re = 1,
    oe = 2,
    ie = new M(),
    se = new M(),
    ce = 0;
  return (
    (P.prototype._enumerate = function () {
      for (
        var e = this.length, t = this._input, n = 0;
        this._state === ne && n < e;
        n++
      )
        this._eachEntry(t[n], n);
    }),
    (P.prototype._eachEntry = function (e, t) {
      var n = this._instanceConstructor,
        r = n.resolve;
      if (r === f) {
        var o = v(e);
        if (o === d && e._state !== ne) this._settledAt(e._state, t, e._result);
        else if ("function" != typeof o)
          this._remaining--, (this._result[t] = e);
        else if (n === Y) {
          var i = new n(h);
          w(i, e, o), this._willSettleAt(i, t);
        } else
          this._willSettleAt(
            new n(function (t) {
              return t(e);
            }),
            t
          );
      } else this._willSettleAt(r(e), t);
    }),
    (P.prototype._settledAt = function (e, t, n) {
      var r = this.promise;
      r._state === ne &&
        (this._remaining--, e === oe ? L(r, n) : (this._result[t] = n)),
        0 === this._remaining && S(r, this._result);
    }),
    (P.prototype._willSettleAt = function (e, t) {
      var n = this;
      A(
        e,
        void 0,
        function (e) {
          return n._settledAt(re, t, e);
        },
        function (e) {
          return n._settledAt(oe, t, e);
        }
      );
    }),
    (Y.all = O),
    (Y.race = x),
    (Y.resolve = f),
    (Y.reject = D),
    (Y._setScheduler = n),
    (Y._setAsap = r),
    (Y._asap = G),
    (Y.prototype = {
      constructor: Y,
      then: d,
      catch: function (e) {
        return this.then(null, e);
      },
    }),
    F(),
    (Y.polyfill = F),
    (Y.Promise = Y),
    Y
  );
}),
  (function () {
    "use strict";
    function e(e) {
      (localStorage.measure = e.target.id), (n.localStorage = localStorage);
    }
    function t() {
      var e = new Date();
      localStorage.setItem("userClosedHelpModal", e.getTime());
    }
    document.addEventListener("DOMContentLoaded", function (e) {
      if (
        (n.init(), localStorage && !localStorage.getItem("userClosedHelpModal"))
      )
        setTimeout(function () {
          n.showHelp();
        }, 5e3);
      else if (localStorage && localStorage.getItem("userClosedHelpModal")) {
        var t = localStorage.getItem("userClosedHelpModal"),
          r = new Date();
        (r.getTime() - t) / 864e5 > 20 &&
          localStorage.removeItem("userClosedHelpModal");
      }
    });
    var n = {};
    (n.cache = {}),
      (n.opts = { maxSpeed: 200 }),
      (n.utils = {}),
      (n.localStorage = localStorage),
      (n.showHelp = function () {}),
      (n.initBtnClickListners = function () {
        document.getElementById("ms").addEventListener("click", e),
          document.getElementById("mh").addEventListener("click", e),
          document.getElementById("kh").addEventListener("click", e),
          document.getElementById("closeHelp").addEventListener("click", t);
      }),
      (n.init = function () {
        (n.cache.speed = document.getElementById("speed")),
          n.localStorage.measure ||
            ((localStorage.measure = "kh"), (n.localStorage = localStorage)),
          n.initBtnClickListners(),
          (document.getElementById("installer").style.display = "none"),
          (n.writeSpeed = function (e) {
            (document.getElementById("error").innerHTML = ""),
              (document.getElementById("unit").innerHTML = "meter/second");
            var t = e.coords.speed;
            "kh" === n.localStorage.measure &&
              ((t = 60 * t * 60),
              (t /= 1e3),
              (document.getElementById("unit").innerHTML = "km/h")),
              "mh" === n.localStorage.measure &&
                ((t = 60 * t * 60),
                (t = 0.000621371192 * t),
                (document.getElementById("unit").innerHTML = "miles/hour")),
              (t = Math.round(t)),
              (n.cache.speed.innerHTML = t);
          }),
          navigator.geolocation.watchPosition(
            function (e) {
              n.writeSpeed(e),
                ga("send", {
                  hitType: "event",
                  eventCategory: "speed",
                  eventAction: "showSpeed",
                  eventLabel: e.coords.speed,
                }),
                (document.getElementById("lat").innerHTML = ""),
                (document.getElementById("long").innerHTML = ""),
                (document.getElementById("info").style.display = "none");
            },
            function (e) {
              (document.getElementById("speed").innerHTML = ""),
                (document.getElementById("error").innerHTML =
                  "ERROR(" + e.code + "): " + e.message),
                (document.getElementById("lat").innerHTML = "ERROR!!!"),
                (document.getElementById("info").style.display = "block"),
                ga("send", {
                  hitType: "event",
                  eventCategory: "speed",
                  eventAction: "errorShowSpeed",
                  eventLabel: e.message,
                });
            },
            { enableHighAccuracy: !0, maximumAge: 0 }
          );
      });
    var r = function (e) {
      var t =
          (e.querySelector(".tooltip"),
          function (t) {
            t.preventDefault(),
              window.install
                .prompt()
                .then(function (t) {
                  ga("send", "event", "install", t),
                    e.classList.remove("available");
                })
                ["catch"](function (e) {
                  ga("send", "event", "install", "errored");
                });
          }),
        n = function () {
          window.install.canPrompt().then(function () {
            (document.getElementById("installer").style.display = "block"),
              e.classList.add("available"),
              ga("send", "event", "install", "prompted");
          });
        };
      e.addEventListener("click", t.bind(this)),
        e.addEventListener("touchend", t.bind(this)),
        n();
    };
    !(function () {
      var e,
        t,
        n = !1,
        r = new Promise(function (e, n) {
          t = e;
        });
      window.addEventListener("beforeinstallprompt", function (r) {
        return (n = !0), r.preventDefault(), (e = r), t(), !1;
      });
      var o = {};
      Object.defineProperty(o, "isAvailable", {
        get: function () {
          return n;
        },
      }),
        (o.canPrompt = function () {
          return r;
        }),
        (o.prompt = function () {
          return new Promise(function (t, r) {
            n === !1 && r("User Agent decided not to prompt"),
              e
                .prompt()
                .then(function () {
                  return e.userChoice;
                })
                .then(function (e) {
                  t(e.outcome);
                })
                ["catch"](function (e) {
                  r(e);
                });
          });
        }),
        (window.install = o);
    })(),
      window.addEventListener("load", function () {
        var e = document.getElementById("installer");
        new r(e);
      });
  })();
