(function(aE, G) {
    var D = "body",
        a0 = "appendChild",
        az = "createElement",
        w = "src",
        n = "document",
        a5 = "domain",
        aT = "namespace",
        z = "div",
        a3 = "getElementsByTagName",
        k = "load",
        bd = "localStorage",
        d = "postMessage",
        al = "string",
        a4 = "array",
        aD = "function",
        f = "object",
        aQ = "match",
        ar = "replace",
        aH = "http",
        bm = "script",
        M = "head",
        e = "push",
        a7 = "put",
        bi = "apply",
        aJ = "join",
        m = "length",
        Q = "prototype",
        af = "open",
        ae = "javascript",
        bk = "constructor",
        N = "version",
        au = "path",
        aA = "protocol",
        bg = "host",
        aI = "data_host",
        A = null,
        aP = "console",
        aw = "log",
        am = "call",
        an = "query",
        v = "contentWindow",
        ax = "addEventListener",
        aN = "message",
        ak = "Event",
        av = "subscribe",
        a = "toString",
        aq = "with_links",
        aW = "secure",
        bj = "created_at",
        o = "updated_at",
        ay = "monitorHost",
        ah = "ok",
        q = "fail",
        ba = "progress",
        K = "create",
        ag = "update",
        aL = "action",
        S = aE[n],
        H = S[M] || S[a3](M)[0] || S.documentElement,
        bc = aE[ax] ? ax : "attach" + ak,
        C = aE[ax] ? "remove" + ak + "Listener" : "detach" + ak,
        V = aE[ax] ? aN : "on" + aN,
        be = "><",
        l = "_private",
        p = "_public",
        aY = Object[Q],
        aO = Array[Q],
        J = aO.slice,
        aF = aY.hasOwnProperty,
        aV = {},
        ad = [],
        T = 1,
        L = S[a3](bm),
        a2 = {
            ids: []
        },
        g = [],
        aC = !!aE[bd] && !!aE[d] && (function() {
            var i = S[az]("div");
            i.innerHTML = "<!--[if lte IE 8]><i></i><![endif]-->";
            return i[a3]("i")[m] === 0
        })(),
        ab = false,
        a9 = (+new Date),
        aX = /players\/(missionhistories|rewards)/,
        h = /^l:(.+);c:(.+)/,
        r = /\/$/,
        aS = /\/+/g,
        B = /{.*}/,
        aR = {},
        E = {},
        W = {},
        ap = {},
        at = {},
        X = {},
        aB = {
            key: A,
            sites_id: A,
            namespace: "BVSDK",
            secure: A,
            host: A,
            with_links: A,
            aggressive: false
        },
        aK = {
            data_host: A,
            protocol: A,
            path: "",
            version: A
        },
        bl = {
            _private: "private",
            pending: "pending",
            loadstart: "loadstart",
            progress: ba,
            resolved: "resolved",
            rejected: "rejected",
            executing: "executing",
            loadend: "loadend",
            renewed: "renewed"
        },
        b = {
            logs: [],
            timers: [],
            put: function(bp, bs, br) {
                var s = this,
                    bo = (+new Date),
                    j = s.logs[0] ? bo - s.logs[0].created_at : 0,
                    bn;
                bs = bs || 3;

                function bq(i) {
                    if (i) {
                        if (!s.timers[i]) {
                            s.timers[i] = bo;
                            offset = 0
                        } else {
                            offset = bo - s.timers[i]
                        }
                    }
                    s.logs[e]({
                        created_at: bo,
                        data: bp,
                        main: j,
                        id: i,
                        offset: offset,
                        level: bs
                    })
                }
                if (I(br) === I([])) {
                    bn = br.length;
                    while (bn--) {
                        bq(br[bn])
                    }
                } else {
                    bq(br)
                }
            }
        },
        a1, a8, aU, F, P, Z, O, aa, aC, aM, t, y, aj, ai, ac, u;
    b[a7]("Library Load Start: Base", null, "base");

    function I(j) {
        var i = aY[a][am](j);
        return j === null ? "[" + f + " Null]" : i === aY[a][am](0) && isNaN(j) ? "[" + f + " NaN]" : i
    }

    function bh() {
        return ["<", M, be, "/", M, be, D, " on", k, "=", '"var noPost=true,', "d=", n, ";", "d." + a3 + "('", M, "')[0].", a0, "(d.", az, "('", bm, "')).", w, "='", O, a1, "'\"", be, "/", D, ">"][aJ]("")
    }

    function R(s) {
        var s = s.match(h) || s,
            i = s.pop ? s[1] : A,
            j = s.pop ? s[2] : s;
        b[a7]("Code Received: " + i, null, i);
        try {
            eval(j)
        } catch (bn) {
            try {
                aE[aP].error("Badgeville SDK - Error in processData for " + i + ": " + bn)
            } catch (bn) {}
        }
        if (i) {
            if (E.processLibrary) {
                E.processLibrary(i)
            } else {
                b[a7]("Add library to process queue: " + i, 2, i);
                ad[e](i)
            }
            b[a7]("Load Request End: " + i, 2, i)
        }
    }

    function U() {
        b[a7]("loader Start");

        function bo(bL) {
            if (bL.origin === aK[aA] + aB[bg] || bL.origin === aK[aA] + aK[aI]) {
                R(bL.data)
            }
        }
        try {
            a1 = ["?_=", a9, "&", N, "=", aK[N], "&", aT, "=", aB[aT], "&canUseStorage=", aC][aJ]("");
            a8 = S[az]("iframe");
            a8.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
            a8.id = aB[aT] + "_" + a9;
            a8.name = "";
            a8[w] = ae + ":false";
            S[D][a0](a8)
        } catch (bt) {
            b[a7]("loader Paused - waiting for document.body to exist and be ready");
            var bw = this,
                j = J[am](arguments);
            return aE.setTimeout(function() {
                U[bi](bw, j);
                bw = j = null
            }, 50)
        }
        if (aC) {
            aE[bc](V, bo, false);
            a8[w] = O + a1;
            aE[aB[aT]]._detach = function() {
                aE[C](V, bo)
            }
        } else {
            aE[aB[aT]]["_" + a9] = R;
            try {
                a8[v][n][af]()
            } catch (bt) {
                aU = ae + ":var d=" + n + "." + af + "();d." + a5 + "='" + S[a5] + "';";
                a8[w] = aU + "void(0);"
            }
            try {
                F = a8[v][n];
                F.write(bh());
                F.close()
            } catch (bu) {
                a8[w] = aU + 'd.write("' + bh()[ar](/\"/g, String.fromCharCode(92) + '"') + '");d.close();'
            }
        }
        b[a7]("loader End", 2);
    }

    function bf(i) {
        var s = this,
            j = {},
            bn = {
                _public: s,
                _private: j
            };
        if (!i) {
            s._id = Math.floor(Math.random() * +new Date);
            b[a7]("Created", A, s._id);
            j._state = bl.pending;
            j.methodCalls = [];
            j.requires = {};
            j.callbacks = {};
            a2[s._id] = bn;
            a2.ids[e](s._id)
        }
    }

    function x(bq, bn, i) {
        bf[am](this);
        var bo = this,
            bp = a2[bo._id][l],
            bq = bq || "",
            s = bq && bq.split("/").pop(),
            j, br;
        bo.path = bq && bq.replace(r, "");
        bo.ids = bn || {};
        bo.options = i || {};
        bo.type = s || "";
        bp.progressEvent = {
            loaded: 0,
            total: 4,
            lengthComputable: true
        };
        if (bq && (aB.aggressive || bo.options.aggresive) && E.getData) {
            E.getData[am](bo)
        }
        for (j in bo.options) {
            br = bo.options[j];
            if (aF[am](bo.options, j)) {
                if (I(br) === I({})) {
                    aG("bvql", bo)
                }
            }
        }
        return bo
    }
    x[Q] = new bf(true);
    x[Q][bk] = x;

    function aZ(s) {
        var j = this,
            bn = s.length;
        if (I(s) === I([])) {
            bf[am](this);
            j.resources = s || [];
            a2[j._id][l].progressEvent = {
                lengthComputable: false
            }
        }
        return j
    }
    aZ[Q] = new bf(true);
    aZ[Q][bk] = aZ;

    function ao(i) {
        return aZ[am](this, i || [])
    }
    ao[Q] = new aZ(true);
    ao[Q][bk] = ao;

    function c(i) {
        return aZ[am](this, i || [])
    }
    c[Q] = new aZ(true);
    c[Q][bk] = c;

    function a6(i) {
        return aZ[am](this, i || [])
    }
    a6[Q] = new aZ(true);
    a6[Q][bk] = a6;
    aM = ["then", "always", ah, q, ba];
    aj = aM[m];
    while (aj--) {
        y = aM[aj];
        bf[Q][y] = (function(i) {
            return function() {
                b[a7]("Add method callback: " + i, 3, this._id);
                var s = this,
                    j = a2[s._id][l];
                j.methodCalls[e]({
                    type: i,
                    args: J[am](arguments)
                });
                return s
            }
        })(y)
    }

    function Y(i) {
        if (aV[i]) {
            return
        }
        b[a7]("Load Request Start: " + i, 3, i);
        aV[i] = bl.loadstart;
        if (aC) {
            a8[v][d](i, "*")
        } else {
            if (i) {
                a8[v].library = i;
                a8[v].getLibrary(i)
            }
        }
    }

    function aG(s, bo) {
        var j, bn;
        s = I(s) === I([]) ? s : [s];
        if (j = s.length) {
            while (j--) {
                bn = s[j];
                if (bn) {
                    if (bo && !a2[bo._id][l].requires[bn]) {
                        a2[bo._id][l].requires[bn] = aV[bn] || bl.loadstart
                    }
                    if (!aV[bn]) {
                        ab ? Y(bn) : g[e](bn)
                    }
                }
            }
        }
        return bo || true
    }

    function bb(i) {
        return function() {
            var bq = {
                    type: i,
                    args: J[am](arguments)
                },
                bo = [],
                j = true,
                bn, bp, s = (i === aL && arguments[0]) || i;
            if (s === ag && I(this.options.query) === I({})) {
                this.options.aggressive = true;
                b[a7]("Option changed: aggressive set to true", 1, this._id)
            }
            switch (i) {
                case aL:
                case K:
                case ag:
                    bo = bo.concat(["bvql", "factory"]);
                    break;
                case "describe":
                    bo.push("factory");
                    break;
                case av:
                case "un" + av:
                    bo = bo.concat(["bvql", av]);
                    j = false;
                    break
            }
            bn = j ? new x : this;
            bp = a2[bn._id][l];
            if (bo.length) {
                aG(bo, bn)
            }
            if (j) {
                bq.parent_id = this._id;
                bp.factory = bq
            } else {
                bp.methodCalls[e](bq)
            }
            return bn
        }
    }
    t = [K, ag, aL, av, "un" + av];
    aj = t[m];
    while (aj--) {
        if (y = t[aj]) {
            x[Q][y] = bb(y)
        }
    }
    ac = L[m];
    while (ac--) {
        if (L[ac][w][aQ](/badgeville\.js/)) {
            aa = L[ac][w];
            break
        }
    }
    aB[aW] = aa.split("/")[0] === aH + "s:";
    aB[bg] = aa.split("/")[2];
    aK[aI] = aB[bg];
    aK[N] = aa[aQ](/\/v([\d])\//);
    aK[N] = aK[N] === A ? T : aK[N][1];
    aa[ar](/[\?&#]+([^\?=&#]+)=([^&#]*)/gi, function(i, s, j) {
        j = j === "false" ? false : j === "true" ? true : j;
        aB[s] = j
    });
    aK[N] = isNaN(aB[N]) || aB[N] === A ? aK[N] : parseInt(aB[N]);
    aK[au] = !aB[au] ? "/sdk/js/v" + aK[N] + "/" : aB[au];
    aK[aA] = aB[aW] ? aH + "s://" : aH + "://";
    aK[aI] = aB[aI] ? aB[aI] : aK[aI];
    b[a7]("SDK configured with the following options: ", 3, "base");
    b[a7](aB, 3, "base");
    u = aE[aB[aT]];
    if (u && I(u._detach) === I(I)) {
        u._detach()
    }
    aE[aB[aT]] = function(s, j, i) {
        return new x(s, j, i)
    };
    aE[aB[aT]].any = function() {
        return new ao(J[am](arguments))
    };
    aE[aB[aT]].when = function() {
        return new c(J[am](arguments))
    };
    aE[aB[aT]].all = function() {
        return new a6(J[am](arguments))
    };
    aE[aB[aT]].api = function(i) {
        var j = new x;
        j._api = i;
        if (B.test(i)) {
            aG("bvql", j)
        }
        return j
    };
    if (aC) {
        O = aK[aA] + aB[bg] + aK[au] + "badgeville.JSSDK.html"
    } else {
        O = aK[aA] + aB[bg] + aK[au] + "badgeville.loader.js"
    }
    U();
    b[a7]("Library Load End: Base", 4, "base")
})(window);