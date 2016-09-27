/* Loads JS from external Pen */
/* thedangercrew.com to play our latest game demo! */

! function (t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "/dist/", e(0)
}([function (t, e, n) {
    t.exports = n(152)
}, function (t, e) {
    t.exports = React
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    e.__esModule = !0, e.connect = e.Provider = void 0;
    var a = n(206),
       o = r(a),
       i = n(207),
       u = r(i);
    e.Provider = o["default"], e.connect = u["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        l["default"].dispatch({
            type: "SET_BATTLE_VALUE",
            payload: {
                changes: u({}, t)
            }
        })
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        l["default"].dispatch({
            type: "MERGE_COMBATANT",
            payload: {
                key: t,
                changes: u({}, e)
            }
        })
    }

    function i() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = l["default"].getState().battle.history,
           n = e.map(function (n, r) {
               return r == e.length - 1 ? u({}, t) : n
           });
        a({
            history: n
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.setBattleValue = a, e.setCombatantValue = o, e.setLatestHistory = i;
    var s = n(4),
       l = r(s)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(153),
       i = r(o),
       u = n(154),
       s = r(u),
       l = localStorage.getItem("b4CurrentView") || "battle",
       c = (0, i["default"])({
           battle: {
               devTimeTravelTurn: 0,
               history: [],
               turnRolloutHistoryEntries: [{
                   turnId: 0,
                   steps: []
               }],
               rollout: [],
               currentAnimation: null,
               submissions: [],
               textMessageContent: [],
               result: {},
               descriptionBarText: "",
               selectedOptionId: "root_attack",
               menuKey: "root",
               menuPageIndex: 0,
               viewMode: l,
               backgroundStyle: null,
               isBattleOver: !1,
               showEndingOverlay: !0,
               isAllowingMusic: !0,
               isShowingIntroScreen: !0,
               isReportRunning: !1
           },
           map: {
               viewportWidth: 0
           },
           playerData: a({}, s["default"])
       });
    e["default"] = c, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = u["default"].getState().battle.rollout;
        if (u["default"].getState().battle.isShowingIntroScreen) return (0, s.setBattleValue)({
            isShowingIntroScreen: !1
        }), void (0, c.turnCombatantsForSubmissions)();
        if (0 == t.length) return void d();
        var e = t[0],
           n = t.filter(function (t, e) {
               return e > 0
           });
        (0, s.setBattleValue)({
            rollout: n
        }), "message" == e.type && ((0, s.setBattleValue)({
            textMessageContent: []
        }), (0, s.setBattleValue)({
            textMessageContent: e.content
        })), "animation" == e.type && (e.actionDescription || console.warn("no actionDescription found for", e), (0, s.setBattleValue)({
            currentAnimation: {
                animationId: e.animationName,
                actionDescription: e.actionDescription
            }
        })), "stateChange" == e.type && (0, l.gradualStateChange)(e.newState)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.doStep = o;
    var i = n(4),
       u = r(i),
       s = n(3),
       l = n(136),
       c = n(23),
       f = n(12),
       p = n(41),
       d = function () {
           var t = u["default"].getState().battle.history,
              e = u["default"].getState().battle.result,
              n = u["default"].getState().battle.turnRolloutHistoryEntries,
              r = u["default"].getState().battle.devTimeTravelTurn;
           if ((0, s.setBattleValue)({
               textMessageContent: [],
               history: [].concat(a(t), [(0, l.removeAnimationFromState)(e.nextState)]),
               turnRolloutHistoryEntries: [].concat(a(n), [{
               turnId: n.length,
               steps: e.rolloutSteps
           }]),
               devTimeTravelTurn: r + 1
           }), (0, f.getDeadCombatantId)(e.nextState)) {
               var o = u["default"].getState().battle.isBattleOver;
               o ? v() : m(e.nextState)
           } else (0, s.setBattleValue)({
               submissions: []
           }), (0, c.turnCombatantsForSubmissions)()
       },
       m = function (t) {
           var e = (0, p.getWinningCombatantId)(t),
              n = ((0, f.getDeadCombatantId)(t), t.combatants[e]);
           (0, s.setBattleValue)({
               isBattleOver: !0,
               textMessageContent: [n.name + " is the winner!"]
           }), (0, s.setCombatantValue)(e, {
               animation: "celebrate 2s infinite"
           })
       },
       v = function () {
           (0, s.setBattleValue)({
               showEndingOverlay: !0
           })
       }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(63),
       i = r(o),
       u = n(64),
       s = r(u),
       l = n(65),
       c = r(l),
       f = n(35),
       p = r(f),
       d = n(62),
       m = r(d);
    e["default"] = a({}, i["default"], s["default"], c["default"], p["default"], m["default"]), t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        return i({}, t, {
            accuracyRoll: 90 + t.accuracyModifier,
            attackRating: t.attackStatPoints + t.attackModifier,
            defenseRating: t.defenseStatPoints + t.defenseModifier,
            isDead: t.hp <= 0,
            isAlive: t.hp > 0,
            attacks: p(t),
            getMiss: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                   n = 2;
                "zen" === t.status && (n -= 20), "fury" === t.status && (n += 10), n -= e;
                var r = (0, f.percentChance)(n);
                return 1 == r && console.log("MISS with % chance: ", n), r
            },
            getAllAttacks: function () {
                return [].concat(a(t.attacks))
            },
            isOutOfUsablePp: function () {
                var e = t.attacks.filter(function (e) {
                    var n = s["default"][e];
                    return t.pp >= n.ppCost
                });
                return 1 == e.length && "attack-special-011-a" == e[0] ? !0 : 0 == e.length
            },
            speedRoll: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                   n = t.speedStatPoints + t.speedModifier + e,
                   r = "deadline" == t.status ? Math.round(.25 * t.speedStatPoints) : 0;
                return n + r
            },
            attackRoll: function (e, n, r, a, o) {
                var i = -1 * this.attackRating + e,
                   u = Math.round(n / 2);
                "zen" === r && (u = Math.round(u *= 1.33)), "fury" === t.status && (i = Math.round(i *= 1.33));
                var s = i + u;
                return "attack-008-a-resolve" == a.actionId && (s = d(s, o.characterUpgrades)), -1 > s ? s : -1
            },
            isDangerMeterUsable: function () {
                var e = (0, c.getAlignmentByUpgrades)(t.laptopUpgrades);
                if (e.f1Alignment + e.f2Alignment + e.f3Alignment + e.f4Alignment === 0) return !1;
                var n = (0, l.hasUpgrade)("character-upgrade-005-i", t.characterUpgrades),
                   r = (0, l.hasUpgrade)("character-upgrade-005-ii", t.characterUpgrades);
                return n && !r ? t.dangerMeter >= .65 * t.maxDangerMeter : n && r ? t.dangerMeter >= .55 * t.maxDangerMeter : t.dangerMeter >= .75 * t.maxDangerMeter
            }
        }, (0, c.getAlignmentByUpgrades)(t.laptopUpgrades), {
            getAvailableFrameworkOptions: function () {
                return [{
                    prop: this.f1Alignment,
                    frameworkId: "framework_001"
                }, {
                    prop: this.f2Alignment,
                    frameworkId: "framework_002"
                }, {
                    prop: this.f3Alignment,
                    frameworkId: "framework_003"
                }, {
                    prop: this.f4Alignment,
                    frameworkId: "framework_004"
                }].filter(function (t) {
                    return t.prop > 0
                }).map(function (t) {
                    return t.frameworkId
                })
            }
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.CombatantModel = o;
    var u = n(6),
       s = r(u),
       l = n(16),
       c = n(40),
       f = n(29),
       p = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
              e = t.attacks.filter(function (e) {
                  var n = s["default"][e];
                  return t.pp >= n.ppCost
              });
           return e.length ? e : ["attack-000-a"]
       },
       d = function (t) {
           var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
           return (0, l.hasUpgrade)("character-upgrade-007-iii", e) ? Math.round(.5 * t) : (0, l.hasUpgrade)("character-upgrade-007-ii", e) ? t - Math.round(.3 * t) : (0, l.hasUpgrade)("character-upgrade-007-i", e) ? t - Math.round(.15 * t) : t
       }
}, function (t, e, n) {
    (function (e) {
        var r = n(179),
           a = r("object" == typeof e && e),
           o = r("object" == typeof self && self),
           i = r("object" == typeof this && this),
           u = a || o || i || Function("return this")();
        t.exports = u
    }).call(e, function () {
        return this
    }())
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/energetic-battle-body.mp3"],
        volume: .4,
        sprite: {
            trimmed: [0, 56195.102040816324, !0]
        }
    }),
       r = new Howl({
           src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/energetic-battle-intro.mp3"],
           volume: .4,
           sprite: {
               trimmed: [0, 5853, !1]
           },
           onend: function () {
               n.play("trimmed")
           }
       });
    e.songEnergeticBattle = r;
    var a = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/baBuhm.mp3"]
    });
    e.sfxBabum = a;
    var o = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/Blip-0.0_bip_3.1.wav"],
        volume: 1
    });
    e.sfxTypeBlip = o;
    var i = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/menu-move.mp3"],
        volume: 1
    });
    e.sfxCursorMove = i;
    var u = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/submit.mp3"],
        volume: 1
    });
    e.sfxSubmitAction = u;
    var s = new Howl({
        src: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/iterator.mp3"],
        volume: 1
    });
    e.sfxIterate = s
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t) {
        return "normal" != t.status
    }

    function i(t) {
        var e = t.status;
        return "lag" == e || "memory-leak" == e || "fire" == e
    }

    function u(t) {
        var e = t.status;
        return "zen" == e || "fury" == e || "deadline" == e
    }

    function s() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = t.filter(function (t) {
               var n = I["default"][t];
               return Array.isArray(n.affectCasterStatus) ? n.affectCasterStatus[0] == e && "normal" == n.affectCasterStatus[1] : "normal" == n.affectCasterStatus
           });
        return n.length ? (0, E.randomFromArray)(n) : null
    }

    function l() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = t.filter(function (t) {
               var n = I["default"][t];
               return Array.isArray(n.affectCasterStatus) ? n.affectCasterStatus[1] == e : n.affectCasterStatus == e
           });
        return n.length ? (0, E.randomFromArray)(n) : null
    }

    function c() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = t.filter(function (t) {
               var n = I["default"][t];
               return Array.isArray(n.affectTargetStatus) ? n.affectTargetStatus[1] == e : n.affectTargetStatus == e
           });
        return n.length ? (0, E.randomFromArray)(n) : null
    }

    function f(t) {
        var e = ["zen", "fury", "deadline"],
           n = [];
        return e.forEach(function (e) {
            var r = l(t.attacks, e);
            r && n.push(r)
        }), n.length ? (0, E.randomFromArray)(n) : null
    }

    function p(t) {
        var e = ["lag", "memory-leak", "fire"],
           n = [];
        return e.forEach(function (e) {
            var r = c(t.attacks, e);
            r && n.push(r)
        }), n.length ? (0, E.randomFromArray)(n) : null
    }

    function d(t) {
        return s(t.attacks, t.status)
    }

    function m(t) {
        return s(t.items, t.status)
    }

    function v(t) {
        return t.hp >= t.maxHp
    }

    function h(t) {
        return t.hp <= Math.round(.2 * t.maxHp)
    }

    function y() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = t.filter(function (t) {
               var e = I["default"][t];
               return e.affectCasterHpPoints > 0
           });
        return e.length ? (0, E.randomFromArray)(e) : null
    }

    function g(t) {
        return y(t.attacks)
    }

    function b(t) {
        return y(t.items)
    }

    function O(t) {
        return t.items.length > 0
    }

    function _() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = t.filter(function (t) {
               var e = I["default"][t];
               return e.theftQuantity > 0
           });
        return e.length ? (0, E.randomFromArray)(e) : null
    }

    function P(t) {
        return _(t.attacks)
    }

    function w(t) {
        return t.isDangerMeterUsable()
    }

    function k(t) {
        var e = [].concat(a(t.attacks)).sort(function (t, e) {
            var n = I["default"][t],
               r = I["default"][e];
            return n.ppCost > r.ppCost ? 1 : -1
        });
        return e[0]
    }

    function S(t) {
        var e = [].concat(a(t.attacks)).sort(function (t, e) {
            var n = I["default"][t],
               r = I["default"][e];
            return n.affectTargetHpPoints > r.affectTargetHpPoints ? 1 : -1
        });
        return e[0]
    }

    function j(t) {
        var e = t.attacks.filter(function (t) {
            var e = I["default"][t];
            return "Normal" == e.type
        });
        return 0 == e.length ? "attack-000-a" : (0, E.randomFromArray)(e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.doesCombatantHaveAnyStatus = o, e.doesCombatantHaveNegativeStatus = i, e.doesCombatantHavePositiveStatus = u, e.findMoveThatCanHealStatus = s, e.findMoveThatCanGiveMeStatus = l, e.findMoveThatCanGiveEnemyStatus = c, e.findAttackThatGivesMePositiveStatus = f, e.findAttackThatGivesEnemyNegativeStatus = p, e.findAttackThatCanHealStatus = d, e.findItemThatCanHealStatus = m, e.isCombatantHpFull = v, e.isCombatantHpCritical = h, e.findMoveThatCanRecoverHp = y, e.findAttackThatCanRecoverHp = g, e.findItemThatCanRecoverHp = b, e.doesCombatantHaveItems = O, e.findMoveThatCanStealItems = _, e.findAttackThatCanStealItems = P, e.isDangerMeterUsable = w, e.findLeastExpensivePpMove = k, e.findMostDamagingAttack = S, e.findRandomAttack = j;
    var C = n(6),
       I = r(C),
       E = n(17)
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        name: "",
        description: "",
        animation: "tada",
        ppCost: 0,
        increaseDangerMeter: .15,
        affectTargetDangerMeter: 0,
        affectTargetHpPoints: 0,
        affectTargetHpPointsByPercent: 0,
        affectTargetAttackPoints: 0,
        affectTargetDefensePoints: 0,
        affectTargetSpeedPoints: 0,
        affectTargetSpecialPoints: 0,
        affectTargetAccuracyPoints: 0,
        bypassCasterAttackStats: !1,
        affectCasterHpPoints: 0,
        affectCasterPpPoints: 0,
        affectCasterHpPointsByPercent: 0,
        affectCasterAttackPoints: 0,
        affectCasterDefensePoints: 0,
        affectCasterSpeedPoints: 0,
        affectCasterSpecialPoints: 0,
        affectCasterAccuracyPoints: 0,
        statusMultiplier: null,
        itemValue: 0,
        itemMalfunctionChance: 0,
        affectTargetStatus: null,
        affectCasterStatus: null,
        statusTurnCount: [],
        dependentOnCasterStatus: null,
        dependentOnTargetStatus: null,
        theftQuantity: 0,
        theftQuality: "random",
        targetResistanceNeeded: 0,
        stealAndUseItem: !1,
        repetitions: [],
        speedModifier: 0,
        accuracyModifier: 0,
        customSuccessStep: null,
        customMissStep: null,
        customFailStep: null,
        changeCasterCommittedData: !1,
        clearTargetCommittedData: !1,
        useCasterCommittedData: !1,
        useFrameworkId: null,
        getFail: function () {
            return !1
        },
        getFollowupActions: function () {
            return []
        }
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t) {
        var e = Object.keys(t.combatants).map(function (e) {
            var n = t.combatants[e];
            return n.hp <= 0 ? e : null
        }).find(function (t) {
            return Boolean(t)
        });
        return e ? e : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getDeadCombatantId = n
}, function (t, e, n) {
    function r(t, e) {
        var n = o(t, e);
        return a(n) ? n : void 0
    }
    var a = n(172),
       o = n(186);
    t.exports = r
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       r = {
           name: "someFrameworkName",
           playerProperty: ""
       };
    e["default"] = {
        framework_001: n({}, r, {
            name: "Palm",
            playerProperty: "f1Alignment",
            strongAgainst: ["framework_002"],
            weakAgainst: ["framework_004"]
        }),
        framework_002: n({}, r, {
            name: "EndGame",
            playerProperty: "f2Alignment",
            strongAgainst: ["framework_003"],
            weakAgainst: ["framework_001"]
        }),
        framework_003: n({}, r, {
            name: "edjKase",
            playerProperty: "f3Alignment",
            strongAgainst: ["framework_004"],
            weakAgainst: ["framework_002"]
        }),
        framework_004: n({}, r, {
            name: "Vector",
            playerProperty: "f4Alignment",
            strongAgainst: ["framework_001"],
            weakAgainst: ["framework_003"]
        })
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = ["attack-001-a", "attack-002-a", "attack-003-a", "attack-004-a", "attack-008-a", "attack-009-a", "attack-special-008-a", "attack-special-007-a", "attack-special-009-a", "attack-special-010-a", "attack-special-000-a", "attack-special-001-a", "attack-special-002-a", "attack-special-003-a", "attack-special-004-a", "attack-special-004-b", "attack-special-005-a", "attack-special-006-a", "attack-special-011-a", "attack-special-011-b", "attack-special-011-c"];
    e.allAttacks = n
}, function (t, e, n) {
    "use strict";

    function r() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = (0, o.getClassStatsByLevel)(t["class"], t.level);
        return {
            maxHp: i(e.maxHp, t),
            maxPp: e.maxPp,
            attackStatPoints: u(e.atk, t),
            defenseStatPoints: e.def,
            specialStatPoints: e.spec,
            speedStatPoints: e.spd
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
           n = e.find(function (e) {
               return e.libraryId == t
           });
        return Boolean(n)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getCombatantStats = r, e.hasUpgrade = a;
    var o = n(132),
       i = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
              n = t,
              r = a("character-upgrade-001-i", e.characterUpgrades),
              o = a("character-upgrade-001-ii", e.characterUpgrades);
           return r && !o && (n = parseInt(n) + parseInt(e.level)), r && o && (n = parseInt(n) + 2 * parseInt(e.level)), n
       },
       u = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
              n = t,
              r = a("character-upgrade-002", e.characterUpgrades);
           return r && (n = parseInt(n) + parseInt(e.level)), n
       }
}, function (t, e) {
    "use strict";

    function n(t) {
        return t[Math.floor(Math.random() * t.length)]
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.randomFromArray = n, e["default"] = n
}, function (t, e) {
    "use strict";

    function n(t, e, n) {
        var r = "keydown." + (n || ""),
           a = "keyup." + (n || ""),
           o = !0;
        $(document).on(r, function (n) {
            switch (n.which) {
                case t:
                    n.preventDefault(), o && (o = !1, e())
            }
        }), $(document).on(a, function (e) {
            switch (e.which) {
                case t:
                    o = !0
            }
            e.preventDefault()
        })
    }

    function r(t) {
        return t ? ($(document).off("." + t), void ($(".message-board").length && $(".message-board").off("." + t))) : (console.warn("valid namespace string required for `removeKeyboardSinglePress`"), !1)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.addKeyboardSinglePress = n, e.removeKeyboardSinglePress = r
}, function (t, e, n) {
    function r(t) {
        return null != t && i(a(t)) && !o(t)
    }
    var a = n(183),
       o = n(32),
       i = n(49);
    t.exports = r
}, function (t, e) {
    function n(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
    }
    t.exports = n
}, function (t, e, n) {
    var r = n(182),
       a = r();
    t.exports = a
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = [{
            vicious: 1,
            protective: 1,
            cursing: 1,
            conservative: 1,
            klepto: 1
        }],
           e = [{
               property: "level",
               possibilities: [1, 3, 5, 10, 20]
           }, {
               property: "class",
               possibilities: ["ninja", "captain", "monk"]
           }, {
               property: "computerAiTraits",
               possibilities: t
           }],
           n = (0, y.generateVariations)(e).map(function (t) {
               var e = t["class"] + "-" + t.level + "-" + g(t.computerAiTraits);
               return i({}, t, {
                   id: e,
                   simName: e,
                   name: e,
                   isComputerControlled: !0,
                   attacks: [].concat(a(h.allAttacks)),
                   items: [].concat(a(v.allItems))
               })
           }),
           r = {};
        return n.forEach(function (t) {
            r[t.id] = i({}, t)
        }), r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getGeneratedCharacters = o;
    var u = n(68),
       s = r(u),
       l = n(67),
       c = r(l),
       f = n(69),
       p = r(f),
       d = n(66),
       m = r(d),
       v = n(70),
       h = n(15),
       y = n(148);
    e["default"] = {
        player: i({}, s["default"], {
            items: [].concat(a(v.allItems))
        }),
        meatsim: i({}, c["default"], {
            items: [].concat(a(v.allItems))
        }),
        thief: i({}, p["default"], {
            items: [].concat(a(v.allItems))
        }),
        knight: i({}, m["default"], {
            items: [].concat(a(v.allItems))
        })
    };
    var g = function (t) {
        return Object.keys(t).map(function (e) {
            return String(t[e])
        }).join("")
    }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = u["default"].getState().battle.history,
           e = t[t.length - 1].combatants,
           n = Object.keys(e);
        (0, s.setCombatantValue)(n[0], {
            animation: "turnToFaceDown 0.2s steps(2, end) forwards"
        }), (0, s.setCombatantValue)(n[1], {
            animation: "turnToFaceUp 0.2s steps(2, end) forwards"
        })
    }

    function o() {
        var t = u["default"].getState().battle.history,
           e = t[t.length - 1].combatants,
           n = Object.keys(e);
        (0, s.setCombatantValue)(n[0], {
            animation: "turnToFaceUp 0.2s steps(2, end) forwards"
        }), (0, s.setCombatantValue)(n[1], {
            animation: "turnToFaceDown 0.2s steps(2, end) forwards"
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.turnCombatantsForSubmissions = a, e.turnCombatantsForRollout = o;
    var i = n(4),
       u = r(i),
       s = n(3)
}, function (t, e) {
    "use strict";

    function n(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function r(t, e) {
        void 0 === t && (t = []);
        var r = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
        if (1 > r) return console.warn("turnsToWait must be 1 or more "), [];
        for (var a = [], o = 0; r - 1 >= o; o++) t[o] && t[o].length ? a.push([].concat(n(t[o]))) : a.push([]);
        var i = [].concat(a);
        return i[r - 1] = [].concat(n(i[r - 1]), [e]), i
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
        return t.length ? t[0] : []
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
        return t.filter(function (t, e) {
            return e > 0
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.addQueuedSubmissions = r, e.extractQueuedSubmissions = a, e.removeQueueSlot = o
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        var n = (arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3]),
           r = arguments.length <= 4 || void 0 === arguments[4] ? null : arguments[4],
           a = new l.CombatantModel(t),
           o = new l.CombatantModel(e);
        if (a.isComputerControlled && !n) {
            var u = (0, c.getTraitPathChoice)(a.computerAiTraits, a, o),
               p = s["default"][u.actionId];
            return i({}, u, {
                speedRoll: a.speedRoll(p.speedModifier)
            })
        }
        var d = n ? n : (0, f.randomFromArray)(a.attacks),
           m = s["default"][d],
           v = r && a.isDangerMeterUsable() ? r : null;
        return {
            casterId: t.id,
            targetId: e.id,
            actionId: d,
            superChargedFrameworkId: v,
            speedRoll: a.speedRoll(m.speedModifier)
        }
    }

    function o() {
        var t = d["default"].getState().battle.history,
           e = t[t.length - 1].combatants,
           n = Object.keys(e).map(function (t) {
               return e[t]
           }),
           r = [];
        return n[0].isComputerControlled && r.push(a(n[0], n[1], {}, null, null)), n[1].isComputerControlled && r.push(a(n[1], n[0], {}, null, null)), r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getSmartAttack = a, e.getAutoAttacks = o;
    var u = n(6),
       s = r(u),
       l = n(7),
       c = n(119),
       f = n(17),
       p = n(4),
       d = r(p)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = s["default"].getState().battle.history,
           n = e[e.length - 1],
           r = [].concat(a((0, c.extractQueuedSubmissions)(n.cloudQueue)), a((0, l.getOrderedActionsFromSubmissions)(t))),
           o = {
               cloudQueue: (0, c.removeQueueSlot)(n.cloudQueue),
               combatants: i({}, n.combatants),
               currentTurnIndex: e.length
           },
           u = (0, f.processActions)(r, o);
        return u
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.executeTurn = o;
    var u = n(4),
       s = r(u),
       l = n(147),
       c = n(24),
       f = (n(3), n(138))
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(3),
       i = n(16),
       u = n(137),
       s = r(u),
       l = n(150);
    r(l), e["default"] = function (t, e) {
        var n = t.simName,
           r = e.simName,
           u = a({
               isComputerControlled: !1,
               id: n
           }, t),
           l = a({
               isComputerControlled: !0,
               id: r
           }, e),
           c = {},
           f = (0, i.getCombatantStats)(u),
           p = (0, i.getCombatantStats)(l);
        c[n] = a({}, s["default"], u, f, {
            hp: f.maxHp,
            pp: f.maxPp,
            speedModifier: 999
        }), c[r] = a({}, s["default"], l, p, {
            hp: p.maxHp,
            pp: p.maxPp,
            isChallenger: !0
        }), (0, o.setBattleValue)({
            history: [{
                cloudQueue: [],
                combatants: a({}, c),
                currentTurnIndex: 0
            }],
            turnRolloutHistoryEntries: [{
                turnId: 0,
                steps: []
            }],
            rollout: [],
            currentAnimation: null,
            submissions: [],
            devTimeTravelTurn: 0,
            showEndingOverlay: !1,
            isBattleOver: !1
        })
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function r() {
        function t(o) {
            for (var i = []; i.length < r;) i.push(e[o]), o += 1;
            a = [].concat(n(a), [i.filter(function (t) {
                return Boolean(t)
            })]), o < e.length && t(o)
        }
        var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           r = arguments.length <= 1 || void 0 === arguments[1] ? 4 : arguments[1],
           a = [];
        return t(0), [].concat(n(a))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getPagesFromArray = r
}, function (t, e) {
    "use strict";

    function n(t, e) {
        return Math.floor(Math.random() * (e - t)) + t
    }

    function r(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }

    function a() {
        return 0 === Math.floor(2 * Math.random())
    }

    function o() {
        return r(2, 8)
    }

    function i(t) {
        return t >= r(1, 100)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getRandomInt = n, e.getRandomInRange = r, e.coinToss = a, e.baseRoll = o, e.percentChance = i
}, function (t, e) {
    "use strict";

    function n() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        return o({}, t, e)
    }

    function r() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
           r = o({}, t),
           a = r[e];
        if (a)
            for (var i in n) "object" == typeof n[i] && (Array.isArray(n[i]) || (n[i] = o({}, a[i], n[i])));
        return a = o({}, a, n), r[e] = a, r
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = o({}, t);
        return n[e] && delete n[e], n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.setValue = n, e.editNode = r, e.removeNode = a
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
        if (!i["default"].getState().map.cW) return 0;
        var e = i["default"].getState().map.cW * t;
        return Math.round(10 * e) / 10
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.vW = a;
    var o = n(4),
       i = r(o)
}, function (t, e, n) {
    function r(t) {
        var e = a(t) ? s.call(t) : "";
        return e == o || e == i
    }
    var a = n(20),
       o = "[object Function]",
       i = "[object GeneratorFunction]",
       u = Object.prototype,
       s = u.toString;
    t.exports = r
}, function (t, e) {
    function n(t) {
        return !!t && "object" == typeof t
    }
    t.exports = n
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       r = {
           name: "insertNameHere",
           description: "insertDescriptionHere",
           equipCost: 0,
           sellValue: 0,
           affectCasterAttackPoints: 0,
           affectCasterDefensePoints: 0,
           affectCasterSpeedPoints: 0,
           affectCasterSpecialPoints: 0,
           affectCasterAccuracyPoints: 0,
           alignmentPointsF1: 0,
           alignmentPointsF2: 0,
           alignmentPointsF3: 0,
           alignmentPointsF4: 0
       };
    e["default"] = {
        "laptop-upgrade_001": n({}, r, {
            name: "Palm Carrier Bag",
            equipCost: 4,
            alignmentPointsF1: 4
        }),
        "laptop-upgrade_002": n({}, r, {
            name: "EndGame Earbuds",
            equipCost: 2,
            alignmentPointsF2: 3
        }),
        "laptop-upgrade_003": n({}, r, {
            equipCost: 7,
            name: "Vector Drive 4x",
            alignmentPointsF4: 8
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(11),
       i = r(o),
       u = n(43),
       s = r(u),
       l = function (t, e, n, r) {
           var a = (0, s["default"])(t.name);
           return {
               type: "message",
               content: [e.name + " used " + a + " " + t.name + "!"]
           }
       },
       c = a({}, i["default"], {
           type: "Item",
           ppCost: 0,
           animation: "slideOutDown",
           accuracyModifier: 999,
           speedModifier: 900,
           increaseDangerMeter: 0
       });
    e["default"] = {
        item_001: a({}, c, {
            name: "Network Reset Code",
            description: "Fixes lagging",
            affectCasterStatus: ["lag", "normal"],
            getFail: function (t, e, n, r) {
                return "lag" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [l(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + "'s lagging has ended! "]
                }]
            }
        }),
        item_002: a({}, c, {
            name: "Mini Battery Pack",
            description: "Recovers 10 HP",
            affectCasterHpPoints: 10,
            getFail: function (t, e, n, r) {
                return e.hp == e.maxHp
            },
            customSuccessStep: function (t, e, n, r, a) {
                return [l(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "stateChange",
                    newState: a
                }, {
                    type: "message",
                    content: ["[FAST]" + e.name + " recovered " + r.affectCasterHp + " hp!"]
                }]
            }
        }),
        item_003: a({}, c, {
            name: "Breakpoint",
            description: "Patches a memory leak",
            affectCasterStatus: ["memory-leak", "normal"],
            getFail: function (t, e, n, r) {
                return "memory-leak" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [l(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " fixed the memory leak!"]
                }]
            }
        }),
        item_004: a({}, c, {
            name: "Mini PP Pack",
            description: "Recovers 20 PP",
            affectCasterPpPoints: 20,
            getFail: function (t, e, n, r) {
                return e.pp == e.maxPp
            },
            customSuccessStep: function (t, e, n, r) {
                return [l(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: ["[FAST]" + e.name + " recovered " + r.affectCasterPp + " pp!"]
                }]
            }
        }),
        item_005: a({}, c, {
            name: "Extinguisher",
            description: "Removes burning flames from a laptop",
            affectCasterStatus: ["fire", "normal"],
            getFail: function (t, e, n, r) {
                return "fire" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [l(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " put out the laptop fire!"]
                }]
            }
        }),
        item_006: a({}, c, {
            name: "Honeypot Trap",
            description: "WARNING: It's a trap!! Explodes in your face.",
            affectCasterHpPointsByPercent: -.33,
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "message",
                    content: [e.name + " opened a Honeypot Trap!"]
                }, {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: ["The Honeypot Trap blew up in " + e.name + "'s face!!!"]
                }]
            }
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = function (t) {
           function e() {
               a(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), u(e, [{
               key: "getLeftStyle",
               value: function () {
                   var t = this.props,
                      e = t.vW,
                      n = t.isPlayer,
                      r = t.isBigMessageBoard;
                   return n ? r ? 30 * e : 43 * e : r ? 53 * e : 53 * e
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props,
                      e = t.vW,
                      n = t.isPlayer,
                      r = t.extraStyle,
                      a = t.hp;
                   if (0 >= a) return null;
                   var o = n ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/danger-laptop-screen-view.svg" : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/danger-laptop-back-view.svg",
                      u = i({
                          zIndex: n ? 1 : 5,
                          position: "absolute",
                          left: this.getLeftStyle(),
                          top: n ? 40 * e : 26 * e,
                          width: n ? 14 * e : 9 * e,
                          transition: "left 0.4s ease-out"
                      }, r),
                      s = {
                          position: "absolute",
                          left: 4 * e,
                          right: 4 * e,
                          height: 2 * e,
                          top: 13 * e,
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: "50%"
                      };
                   return c["default"].createElement("div", {
                       style: u
                   }, c["default"].createElement("img", {
                       src: o,
                       style: {
                           display: "block",
                           width: "100%"
                       }
                   }), n ? c["default"].createElement("div", {
                       style: s
                   }) : null)
               }
           }]), e
       }(c["default"].Component);
    e["default"] = f, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
           n = i(t).nextPage;
        if ((0, c.setBattleValue)({
            menuPageIndex: n
        }), e) {
            var r = s["default"].getState().battle.menuKey,
               a = (0, l.getPagesFromArray)(t[r]),
               o = a[n][0].optionId;
            (0, c.setBattleValue)({
                selectedOptionId: o
            })
        }
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
           n = i(t).prevPage;
        if ((0, c.setBattleValue)({
            menuPageIndex: n
        }), e) {
            var r = s["default"].getState().battle.menuKey,
               a = (0, l.getPagesFromArray)(t[r]),
               o = a[n][0].optionId;
            (0, c.setBattleValue)({
                selectedOptionId: o
            })
        }
    }

    function i(t) {
        var e = s["default"].getState().battle.menuPageIndex,
           n = s["default"].getState().battle.menuKey,
           r = (0, l.getPagesFromArray)(t[n]),
           a = r.length - 1,
           o = e > 0 ? e - 1 : 0,
           i = a > e ? e + 1 : a;
        return {
            prevPage: o,
            nextPage: i
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.goToNextSubPage = a, e.goToPrevSubPage = o;
    var u = n(4),
       s = r(u),
       l = n(28),
       c = n(3)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t) {
        var e = t.isOutOfUsablePp() ? ["attack-000-a"].concat(a(t.getAllAttacks())) : t.getAllAttacks(),
           n = g(e, "Normal"),
           r = g(t.attacks, "Special"),
           o = t.f1Alignment,
           i = t.f2Alignment,
           u = t.f3Alignment,
           s = t.f4Alignment,
           l = [o > 0 ? "super-001-a" : null, i > 0 ? "super-002-a" : null, u > 0 ? "super-003-a" : null, s > 0 ? "super-004-a" : null].filter(function (t) {
               return "string" == typeof t
           });
        return {
            structure: {
                root: y(t),
                superCharge: l.map(function (e, n) {
                    return b(e, "super_" + e + "_" + n, t)
                }),
                attack: n.map(function (e, n) {
                    return b(e, "attack_" + e + "_" + n, t)
                }),
                special: r.map(function (e, n) {
                    return b(e, "special_" + e + "_" + n, t)
                }),
                items: [].concat(a(t.items)).map(function (e, n) {
                    return b(e, "item_" + e + "_" + n, t)
                })
            }
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getMenuModel = o;
    var u = n(6),
       s = r(u),
       l = n(94),
       c = r(l),
       f = n(92),
       p = n(146),
       d = n(42),
       m = n(9),
       v = n(4),
       h = (r(v), n(18)),
       y = function (t) {
           var e = i({}, c["default"], {
               optionId: "root_super",
               labelText: "SUPER CHARGE",
               descriptionBarText: "SUPER CHARGE > Unleash Danger Meter in a powerful blow",
               supportText: "...",
               customClasses: "",
               handleEnter: function () {
                   (0, f.changeMenuPage)("superCharge")
               }
           }),
              n = i({}, c["default"], {
                  optionId: "root_attack",
                  labelText: "ATTACK",
                  descriptionBarText: "ATTACK > Offensive hacking commands",
                  supportText: "...",
                  customClasses: "",
                  handleEnter: function () {
                      (0, f.changeMenuPage)("attack")
                  }
              }),
              r = i({}, c["default"], {
                  optionId: "root_special",
                  labelText: "SPECIAL",
                  descriptionBarText: "SPECIAL > Wizardy computer science magic",
                  supportText: "...",
                  customClasses: "",
                  handleEnter: function () {
                      (0, f.changeMenuPage)("special")
                  }
              }),
              a = i({}, c["default"], {
                  optionId: "root_item",
                  labelText: "ITEM",
                  descriptionBarText: "ITEM > Usable utilities in your bag",
                  supportText: "...",
                  customClasses: "",
                  handleEnter: function () {
                      (0, f.changeMenuPage)("items")
                  }
              });
           return [t.isDangerMeterUsable() ? e : null, n, r, a].filter(function (t) {
               return null !== t
           })
       },
       g = function (t) {
           var e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
           return t.filter(function (t) {
               var n = s["default"][t];
               return n.type === e
           })
       },
       b = function (t, e, n) {
           var r = s["default"][t],
              a = r.name.toUpperCase() + " > " + r.description,
              o = r.ppCost > n.pp;
           o && (a = "NOT AVAILABLE! INSUFFICIENT PP");
           var u = "string" == typeof r.useFrameworkId ? r.useFrameworkId : null;
           return i({}, c["default"], {
               optionId: e,
               labelText: r.name,
               supportText: r.ppCost > 0 ? "PP " + r.ppCost : "",
               customClasses: "",
               descriptionBarText: a,
               isDeactivated: o,
               handleEnter: function () {
                   if (!this.isDeactivated) {
                       (0, h.removeKeyboardSinglePress)("battle-submission-ui-handle-enter"), m.sfxSubmitAction.play();
                       var e = (0, p.getSubmission)(t, u);
                       (0, d.addSubmission)(e)
                   }
               }
           })
       }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(3),
       d = n(96),
       m = r(d),
       v = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "handleHover",
               value: function () {
                   (0, p.setBattleValue)({
                       selectedOptionId: this.props.model.optionId
                   })
               }
           }, {
               key: "handleClick",
               value: function () {
                   var t = this;
                   (0, p.setBattleValue)({
                       selectedOptionId: this.props.model.optionId
                   }), setTimeout(function () {
                       t.props.model.handleEnter()
                   }, 100)
               }
           }, {
               key: "renderLeftArrow",
               value: function () {
                   var t = this.props.vW,
                      e = {
                          paddingLeft: 1.5 * t,
                          paddingRight: 1.5 * t
                      };
                   return c["default"].createElement("span", {
                       style: e
                   }, m["default"].leftArrow(2 * t))
               }
           }, {
               key: "renderRightArrow",
               value: function () {
                   var t = this.props.vW,
                      e = {
                          paddingLeft: 1.5 * t,
                          paddingRight: 1.5 * t
                      };
                   return c["default"].createElement("span", {
                       style: e
                   }, m["default"].rightArrow(2 * t))
               }
           }, {
               key: "renderBackArrowIcon",
               value: function () {
                   var t = this.props.vW,
                      e = {
                          width: 0,
                          height: 0,
                          position: "relative",
                          marginRight: 1.2 * t,
                          display: "inline-block",
                          top: .2 * -t,
                          borderTop: .8 * t + "px solid transparent",
                          borderBottom: .8 * t + "px solid transparent",
                          borderRight: 1 * t + "px solid #000"
                      };
                   return c["default"].createElement("span", {
                       style: e
                   })
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.model,
                      e = this.props.useBackArrowIcon ? this.renderBackArrowIcon() : null,
                      n = {
                          fontSize: 2 * this.props.vW
                      },
                      r = i({}, this.props.baseStyle),
                      a = ["submission-menu_option", t.customClasses || "", this.props.isSelected ? "is-selected" : "", this.props.isDeactivated || t.isDeactivated ? "is-deactivated" : ""].join(" ");
                   return c["default"].createElement("div", {
                       onMouseOver: this.handleHover.bind(this),
                       onClick: this.handleClick.bind(this),
                       style: r,
                       className: a
                   }, t.labelText ? c["default"].createElement("span", null, e, t.labelText) : null, t.supportText ? c["default"].createElement("span", {
                       style: n
                   }, t.supportText) : null, this.props.isLeftArrow ? this.renderLeftArrow() : null, this.props.isRightArrow ? this.renderRightArrow() : null)
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   isSelected: t.battle.selectedOptionId == e.model.optionId
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = v, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = t.map(function (t) {
               return i["default"][t.libraryId]
           });
        return {
            f1Alignment: u("alignmentPointsF1", e),
            f2Alignment: u("alignmentPointsF2", e),
            f3Alignment: u("alignmentPointsF3", e),
            f4Alignment: u("alignmentPointsF4", e)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getAlignmentByUpgrades = a;
    var o = n(34),
       i = r(o),
       u = function (t) {
           var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
              n = e.map(function (e) {
                  return e[t]
              });
           return n.length ? n.reduce(function (t, e) {
               return t + e
           }) : 0
       }
}, function (t, e) {
    "use strict";

    function n(t) {
        var e = Object.keys(t.combatants).map(function (e) {
            var n = t.combatants[e];
            return n.hp > 0 ? e : null
        }).filter(function (t) {
            return Boolean(t)
        });
        return 1 == e.length ? e[0] : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getWinningCombatantId = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t) {
        if (t || console.warn("addSubmission called without a proper submissionModel", t), (0, i.setBattleValue)({
            submissions: [].concat(a(s["default"].getState().battle.submissions), [t])
        }), 2 == s["default"].getState().battle.submissions.length) {
            var e = (0, l.executeTurn)(s["default"].getState().battle.submissions);
            (0, i.setBattleValue)({
                rollout: [].concat(a(e.rolloutSteps)),
                result: e
            }), (0, f.turnCombatantsForRollout)(), setTimeout(function () {
                (0, c.doStep)()
            }, 500)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.addSubmission = o;
    var i = n(3),
       u = n(4),
       s = r(u),
       l = n(26),
       c = n(5),
       f = n(23)
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = function () {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        t = t.toLowerCase();
        var e = t.split("")[0];
        return ["a", "e", "i", "o", "u"].indexOf(e) > -1 ? "an" : "a"
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        return Object.keys(t).map(function (e) {
            return r({
                _id: e
            }, t[e])
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.modelsFromObject = n
}, function (t, e) {
    function n(t, e) {
        return e = null == e ? r : e, !!e && ("number" == typeof t || a.test(t)) && t > -1 && t % 1 == 0 && e > t
    }
    var r = 9007199254740991,
       a = /^(?:0|[1-9]\d*)$/;
    t.exports = n
}, function (t, e, n) {
    function r(t, e, n) {
        if (!u(n)) return !1;
        var r = typeof e;
        return ("number" == r ? o(n) && i(e, n.length) : "string" == r && e in n) ? a(n[e], t) : !1
    }
    var a = n(195),
       o = n(19),
       i = n(45),
       u = n(20);
    t.exports = r
}, function (t, e) {
    function n(t) {
        if (null != t) {
            try {
                return r.call(t)
            } catch (e) { }
            try {
                return t + ""
            } catch (e) { }
        }
        return ""
    }
    var r = Function.prototype.toString;
    t.exports = n
}, function (t, e) {
    var n = Array.isArray;
    t.exports = n
}, function (t, e) {
    function n(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && r >= t
    }
    var r = 9007199254740991;
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        return "string" == typeof t || !a(t) && o(t) && s.call(t) == i
    }
    var a = n(48),
       o = n(33),
       i = "[object String]",
       u = Object.prototype,
       s = u.toString;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        if ("number" == typeof t) return t;
        if (i(t)) return u;
        if (o(t)) {
            var e = a(t.valueOf) ? t.valueOf() : t;
            t = o(e) ? e + "" : e
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(s, "");
        var n = c.test(t);
        return n || f.test(t) ? p(t.slice(2), n ? 2 : 8) : l.test(t) ? u : +t
    }
    var a = n(32),
       o = n(20),
       i = n(198),
       u = NaN,
       s = /^\s+|\s+$/g,
       l = /^[-+]0x[0-9a-f]+$/i,
       c = /^0b[01]+$/i,
       f = /^0o[0-7]+$/i,
       p = parseInt;
    t.exports = r
}, function (t, e, n) {
    "use strict";
    e.__esModule = !0;
    var r = n(1);
    e["default"] = r.PropTypes.shape({
        subscribe: r.PropTypes.func.isRequired,
        dispatch: r.PropTypes.func.isRequired,
        getState: r.PropTypes.func.isRequired
    })
}, function (t, e) {
    "use strict";

    function n(t) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(t);
        try {
            throw new Error(t)
        } catch (e) { }
    }
    e.__esModule = !0, e["default"] = n
}, function (t, e) {
    "use strict";

    function n() {
        for (var t = arguments.length, e = Array(t), n = 0; t > n; n++) e[n] = arguments[n];
        if (0 === e.length) return function (t) {
            return t
        };
        var r = function () {
            var t = e[e.length - 1],
               n = e.slice(0, -1);
            return {
                v: function () {
                    return n.reduceRight(function (t, e) {
                        return e(t)
                    }, t.apply(void 0, arguments))
                }
            }
        }();
        return "object" == typeof r ? r.v : void 0
    }
    e.__esModule = !0, e["default"] = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e, n) {
        function r() {
            y === h && (y = h.slice())
        }

        function o() {
            return v
        }

        function u(t) {
            if ("function" != typeof t) throw new Error("Expected listener to be a function.");
            var e = !0;
            return r(), y.push(t),
               function () {
                   if (e) {
                       e = !1, r();
                       var n = y.indexOf(t);
                       y.splice(n, 1)
                   }
               }
        }

        function c(t) {
            if (!(0, i["default"])(t)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if ("undefined" == typeof t.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (g) throw new Error("Reducers may not dispatch actions.");
            try {
                g = !0, v = m(v, t)
            } finally {
                g = !1
            }
            for (var e = h = y, n = 0; n < e.length; n++) e[n]();
            return t
        }

        function f(t) {
            if ("function" != typeof t) throw new Error("Expected the nextReducer to be a function.");
            m = t, c({
                type: l.INIT
            })
        }

        function p() {
            var t, e = u;
            return t = {
                subscribe: function (t) {
                    function n() {
                        t.next && t.next(o())
                    }
                    if ("object" != typeof t) throw new TypeError("Expected the observer to be an object.");
                    n();
                    var r = e(n);
                    return {
                        unsubscribe: r
                    }
                }
            }, t[s["default"]] = function () {
                return this
            }, t
        }
        var d;
        if ("function" == typeof e && "undefined" == typeof n && (n = e, e = void 0), "undefined" != typeof n) {
            if ("function" != typeof n) throw new Error("Expected the enhancer to be a function.");
            return n(a)(t, e)
        }
        if ("function" != typeof t) throw new Error("Expected the reducer to be a function.");
        var m = t,
           v = e,
           h = [],
           y = h,
           g = !1;
        return c({
            type: l.INIT
        }), d = {
            dispatch: c,
            subscribe: u,
            getState: o,
            replaceReducer: f
        }, d[s["default"]] = p, d
    }
    e.__esModule = !0, e.ActionTypes = void 0, e["default"] = a;
    var o = n(58),
       i = r(o),
       u = n(222),
       s = r(u),
       l = e.ActionTypes = {
           INIT: "@@redux/INIT"
       }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    e.__esModule = !0, e.compose = e.applyMiddleware = e.bindActionCreators = e.combineReducers = e.createStore = void 0;
    var a = n(55),
       o = r(a),
       i = n(218),
       u = r(i),
       s = n(217),
       l = r(s),
       c = n(216),
       f = r(c),
       p = n(54),
       d = r(p),
       m = n(57);
    r(m), e.createStore = o["default"], e.combineReducers = u["default"], e.bindActionCreators = l["default"], e.applyMiddleware = f["default"], e.compose = d["default"]
}, function (t, e) {
    "use strict";

    function n(t) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(t);
        try {
            throw new Error(t)
        } catch (e) { }
    }
    e.__esModule = !0, e["default"] = n
}, function (t, e, n) {
    function r(t) {
        if (!i(t) || p.call(t) != u || o(t)) return !1;
        var e = a(t);
        if (null === e) return !0;
        var n = c.call(e, "constructor") && e.constructor;
        return "function" == typeof n && n instanceof n && l.call(n) == f
    }
    var a = n(219),
       o = n(220),
       i = n(221),
       u = "[object Object]",
       s = Object.prototype,
       l = Function.prototype.toString,
       c = s.hasOwnProperty,
       f = l.call(Object),
       p = s.toString;
    t.exports = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(1),
       o = r(a),
       i = n(80),
       u = r(i),
       s = n(74),
       l = r(s),
       c = n(78),
       f = r(c),
       p = n(77),
       d = r(p),
       m = n(71),
       v = r(m),
       h = n(81),
       y = r(h),
       g = n(79),
       b = r(g),
       O = n(73),
       _ = r(O),
       P = n(75),
       w = r(P),
       k = n(76),
       S = r(k),
       j = n(72),
       C = r(j);
    e["default"] = {
        tada: function (t) {
            return o["default"].createElement(u["default"], {
                casterId: t.casterId
            })
        },
        fury: function (t) {
            return o["default"].createElement(l["default"], {
                casterId: t.casterId
            })
        },
        zen: function (t) {
            return o["default"].createElement(y["default"], {
                casterId: t.casterId
            })
        },
        slideOutDown: function (t) {
            return o["default"].createElement(b["default"], {
                casterId: t.casterId,
                isPlayer: !t.isCasterComputerControlled
            })
        },
        iterate: function (t) {
            return o["default"].createElement(w["default"], {
                casterId: t.casterId,
                repetitionsCount: t.repetitionsCount
            })
        },
        slice: function (t) {
            return o["default"].createElement(f["default"], {
                casterId: t.casterId,
                isPlayer: !t.isCasterComputerControlled
            })
        },
        preloaded: function (t) {
            return o["default"].createElement(d["default"], {
                casterId: t.casterId
            })
        },
        commit: function (t) {
            return o["default"].createElement(v["default"], {
                casterId: t.casterId
            })
        },
        ouch: function (t) {
            return o["default"].createElement(S["default"], {
                casterId: t.casterId
            })
        },
        ddos: function (t) {
            return o["default"].createElement(C["default"], {
                casterId: t.casterId,
                targetId: t.targetId,
                isPlayer: !t.isCasterComputerControlled
            })
        },
        die: function (t) {
            return o["default"].createElement(_["default"], {
                casterId: t.casterId
            })
        }
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       r = {
           name: "insertNameHere",
           description: "insertDescriptionHere"
       };
    e["default"] = {
        "character-upgrade-001-i": n({}, r, {
            name: "Battery Lord I",
            description: "Gain an extra HP point for every level earned"
        }),
        "character-upgrade-001-ii": n({}, r, {
            name: "Battery Lord II",
            description: "Gain 2 extra HP points for every level earned"
        }),
        "character-upgrade-002": n({}, r, {
            name: "Swordsman",
            description: "Gain an extra Attack point for every level earned"
        }),
        "character-upgrade-005-i": n({}, r, {
            name: "Dangerous I",
            description: "Decrease Danger Meter threshold to 65%"
        }),
        "character-upgrade-005-ii": n({}, r, {
            name: "Dangerous II",
            description: "Decrease Danger Meter threshold to 55%"
        }),
        "character-upgrade-006-i": n({}, r, {
            name: "Weakless I",
            description: "Decrease Framework weakness by 10%"
        }),
        "character-upgrade-006-ii": n({}, r, {
            name: "Weakless II",
            description: "Decrease Framework weakness by 20%"
        }),
        "character-upgrade-007-i": n({}, r, {
            name: "Oathbreaker",
            description: "15% chance of dissolving oncoming enemy Promises"
        }),
        "character-upgrade-007-ii": n({}, r, {
            name: "Oathbreaker II",
            description: "30% chance of dissolving oncoming enemy Promises"
        }),
        "character-upgrade-007-iii": n({}, r, {
            name: "Oathbreaker III",
            description: "50% chance of dissolving oncoming enemy Promises"
        })
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       r = {
           description: "Some description",
           hpGrowthPattern: [2],
           ppGrowthPattern: [2],
           atkGrowthPattern: [2],
           defGrowthPattern: [2],
           specGrowthPattern: [2],
           spdGrowthPattern: [2]
       },
       a = {
           fastHp: [4, 5, 5],
           standardHp: [4],
           slowHp: [4, 3, 3],
           fastStat: [2, 2, 2, 1],
           standardStat: [2, 1],
           slowStat: [1, 1, 1, 2]
       },
       o = function (t, e) {
           for (var n = [], r = t, a = 0, o = 1; 30 >= o; o++) {
               if (o > 1) {
                   r += e[a];
                   var i = a + 1;
                   a = e[i] ? i : 0
               }
               n.push(r)
           }
           return n
       };
    e["default"] = {
        ninja: n({}, r, {
            hpGrowthPattern: o(20, a.standardHp),
            ppGrowthPattern: o(20, a.standardHp),
            atkGrowthPattern: o(10, a.fastStat),
            defGrowthPattern: o(10, a.slowStat),
            specGrowthPattern: o(10, a.standardStat),
            spdGrowthPattern: o(10, a.slowStat)
        }),
        monk: n({}, r, {
            hpGrowthPattern: o(20, a.standardHp),
            ppGrowthPattern: o(20, a.fastHp),
            atkGrowthPattern: o(10, a.slowStat),
            defGrowthPattern: o(10, a.fastStat),
            specGrowthPattern: o(10, a.fastStat),
            spdGrowthPattern: o(10, a.slowStat)
        }),
        captain: n({}, r, {
            hpGrowthPattern: o(20, a.fastHp),
            ppGrowthPattern: o(20, a.standardHp),
            atkGrowthPattern: o(10, a.slowStat),
            defGrowthPattern: o(10, a.fastStat),
            specGrowthPattern: o(10, a.standardStat),
            spdGrowthPattern: o(10, a.standardStat)
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(11),
       i = r(o),
       u = a({}, i["default"], {
           accuracyModifier: 999
       });
    e["default"] = {
        "natural-death-a": a({}, u, {
            animation: "die",
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " has run out of battery life!"]
                }]
            }
        }),
        "natural-memory-leak-a": a({}, u, {
            animation: "ouch",
            dependentOnCasterStatus: "memory-leak",
            affectTargetHpPointsByPercent: -.15,
            customSuccessStep: function (t, e, n, r, a) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "stateChange",
                    newState: a
                }, {
                    type: "message",
                    content: [e.name + " is hurt by the memory leak!"]
                }]
            }
        }),
        "natural-fire-a": a({}, u, {
            animation: "tada",
            dependentOnCasterStatus: "fire",
            affectTargetHpPointsByPercent: -.25,
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: ["[FAST]" + e.name + "'s laptop is burning in fire!!!"]
                }]
            }
        }),
        "natural-lag-a": a({}, u, {
            ppCost: 0,
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "message",
                    content: [e.name + " is lagging too much to attack!"]
                }]
            }
        }),
        "natural-recover-lag": a({}, u, {
            ppCost: 0,
            animation: "tada",
            dependentOnCasterStatus: "lag",
            affectCasterStatus: ["lag", "normal"],
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + "'s lagging has ended!"]
                }]
            }
        }),
        "natural-recover-fury": a({}, u, {
            ppCost: 0,
            animation: "tada",
            dependentOnCasterStatus: "fury",
            affectCasterStatus: ["fury", "normal"],
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " has calmed down from fury."]
                }]
            }
        }),
        "natural-recover-zen": a({}, u, {
            ppCost: 0,
            animation: "tada",
            dependentOnCasterStatus: "zen",
            affectCasterStatus: ["zen", "normal"],
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + "'s focus has broken!"]
                }]
            }
        }),
        "natural-recover-deadline": a({}, u, {
            ppCost: 0,
            animation: "tada",
            dependentOnCasterStatus: "deadline",
            affectCasterStatus: ["deadline", "normal"],
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + "'s deadline has passed."]
                }]
            }
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(11),
       i = r(o),
       u = a({}, i["default"], {
           levelRequirement: 0,
           type: "Normal",
           dependentOnAttack: null
       }),
       s = function (t, e, n, r, a) {
           return [{
               type: "message",
               content: [e.name + " used ", "@@pause_400@@", "[FAST]" + t.name + "!"]
           }, {
               type: "animation",
               animationName: t.animation,
               actionDescription: r
           }, {
               type: "stateChange",
               newState: a
           }, {
               type: "message",
               content: ["It hit " + r.repetitionsCount + " times!"]
           }]
       };
    e["default"] = {
        "attack-000-a": a({}, u, {
            name: "Insult",
            animation: "tada",
            description: "When you have nothing left to lose",
            affectTargetHpPoints: -2,
            bypassCasterAttackStats: !0,
            ppCost: 0,
            increaseDangerMeter: 0
        }),
        "attack-001-a": a({}, u, {
            name: "Slice",
            animation: "slice",
            description: "Chops the enemy to bits.",
            affectTargetHpPoints: -4,
            ppCost: 3
        }),
        "attack-001-b": a({}, u, {
            name: "Slice mk II",
            animation: "slice",
            description: "Deep cuts than the original Slice",
            affectTargetHpPoints: -6,
            ppCost: 5
        }),
        "attack-001-c": a({}, u, {
            name: "Slice mk III",
            animation: "slice",
            description: "Chops the enemy to bits. May lower enemy defense on impact.",
            affectTargetHpPoints: -8,
            ppCost: 6,
            affectTargetDefensePoints: {
                percentChance: 33.3,
                affectValue: -2
            }
        }),
        "attack-002-a": a({}, u, {
            name: "Preloaded",
            animation: "preloaded",
            description: "Extremely fast attack",
            affectTargetHpPoints: -5,
            speedModifier: 6,
            ppCost: 5
        }),
        "attack-002-b": a({}, u, {
            name: "Preloaded mk II",
            animation: "preloaded",
            description: "Even faster version of Preloaded",
            affectTargetHpPoints: -6,
            speedModifier: 8,
            ppCost: 7
        }),
        "attack-002-c": a({}, u, {
            name: "Preloaded mk II",
            animation: "preloaded",
            description: "Fastest loader of them all. Reduces enemy speed.",
            affectTargetHpPoints: -7,
            affectTargetSpeedPoints: {
                percentChance: 33.3,
                affectValue: -3
            },
            speedModifier: 10,
            ppCost: 9
        }),
        "attack-003-a": a({}, u, {
            name: "ForEach",
            animation: "iterate",
            description: "Hits the enemy 2 to 4 times with wildcard damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [2, 4],
            repetitionType: "random",
            ppCost: 5,
            increaseDangerMeter: .17,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-003-b": a({}, u, {
            name: "ForEach Mk II",
            animation: "tada",
            description: "Hits the enemy 3 to 5 times with stronger wildcard damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [3, 5],
            repetitionType: "random",
            ppCost: 8,
            increaseDangerMeter: .17,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-003-c": a({}, u, {
            name: "ForEach Mk III",
            animation: "iterate",
            description: "Hits the enemy 4 to 6 times with stronger wildcard damage",
            affectTargetHpPoints: [1, 2, 3, 4],
            repetitions: [4, 6],
            repetitionType: "random",
            ppCost: 11,
            increaseDangerMeter: .17,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-004-a": a({}, u, {
            name: "Map",
            animation: "iterate",
            description: "Hits the enemy 2 to 4 times with consistent damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [2, 4],
            repetitionType: "map",
            ppCost: 5,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-004-b": a({}, u, {
            name: "Map Mk II",
            animation: "iterate",
            description: "Hits the enemy 3 to 5 times with consistent damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [3, 5],
            repetitionType: "map",
            ppCost: 7,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-004-c": a({}, u, {
            name: "Map Mk III",
            animation: "iterate",
            description: "Hits the enemy 4 to 6 times with consistent damage",
            affectTargetHpPoints: [1, 2, 3, 4],
            repetitions: [4, 6],
            repetitionType: "map",
            ppCost: 9,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-005-a": a({}, u, {
            name: "Reduce",
            animation: "iterate",
            description: "Hits the enemy 2 to 4 times with increasing damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [2, 4],
            repetitionType: "reduce",
            ppCost: 5,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-005-b": a({}, u, {
            name: "Reduce Mk II",
            animation: "iterate",
            description: "Hits the enemy 3 to 5 times with increasing damage",
            affectTargetHpPoints: [1, 2, 3],
            repetitions: [3, 5],
            repetitionType: "reduce",
            ppCost: 7,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-005-c": a({}, u, {
            name: "Reduce Mk III",
            animation: "iterate",
            description: "Hits the enemy 3 to 6 times with increasing damage",
            affectTargetHpPoints: [1, 2, 3, 4],
            repetitions: [3, 6],
            repetitionType: "reduce",
            ppCost: 9,
            customSuccessStep: function (t, e, n, r, a) {
                return s(t, e, n, r, a)
            }
        }),
        "attack-008-a": a({}, u, {
            name: "Promise",
            description: "Send an attack in the air to strike later",
            affectTargetHpPoints: -1,
            speedModifier: 0,
            ppCost: 9,
            customSuccessStep: function (t, e, n, r, a) {
                return [{
                    type: "message",
                    content: [e.name + " used ", "@@pause_300@@", "[FAST]" + t.name + "!"]
                }, {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "stateChange",
                    newState: a
                }, {
                    type: "message",
                    content: ["A promise flew into the air!"]
                }]
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        casterId: r.casterId,
                        targetId: r.targetId,
                        actionId: "attack-008-a-resolve"
                    },
                    turnRange: [2, 5]
                }]
            }
        }),
        "attack-008-a-resolve": a({}, u, {
            name: "(Promise: resolve)",
            description: "",
            affectTargetHpPoints: -9,
            speedModifier: 0,
            ppCost: 0,
            customSuccessStep: function (t, e, n, r, a) {
                return [{
                    type: "message",
                    content: [e.name + "'s Promise resolved!"]
                }, {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }]
            }
        }),
        "attack-009-a": a({}, u, {
            name: "Scope Bomb",
            animation: "tada",
            description: "Extra effective against a deadline",
            affectTargetHpPoints: -5,
            statusMultiplier: ["deadline", 2],
            ppCost: 5,
            customSuccessStep: function (t, e, n, r, a) {
                var o = [{
                    type: "message",
                    content: [e.name + " dropped a Scope Bomb!"]
                }, {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }];
                return r.wasSuperEffective && o.push({
                    type: "message",
                    content: ["It was extra painful for " + n.name + "!"]
                }), [].concat(o)
            }
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(11),
       i = r(o),
       u = n(149),
       s = r(u),
       l = n(43),
       c = r(l),
       f = a({}, i["default"], {
           levelRequirement: 0,
           type: "Special",
           dependentOnAttack: null
       }),
       p = function (t, e, n, r) {
           return {
               type: "message",
               content: [e.name + " used ", "@@pause_400@@", "[FAST]" + t.name + "!"]
           }
       },
       d = function (t, e, n, r) {
           return {
               type: "animation",
               animationName: t.animation,
               actionDescription: r
           }
       };
    e["default"] = {
        "attack-special-000-a": a({}, f, {
            name: "Throttle",
            description: "Causes opponent to lag out for 2 turns",
            ppCost: 4,
            affectTargetStatus: ["normal", "lag"],
            getFail: function (t, e, n, r) {
                return "normal" != n.status
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.targetId,
                        casterId: r.targetId,
                        actionId: "natural-recover-lag"
                    },
                    turnRange: [2, 2]
                }]
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [n.name + " is lagging out!"]
                }]
            }
        }),
        "attack-special-001-a": a({}, f, {
            name: "DDoS",
            animation: "ddos",
            description: "Causes lagging for 2 to 5 turns",
            ppCost: 6,
            affectTargetStatus: ["normal", "lag"],
            getFail: function (t, e, n, r) {
                return "normal" != n.status
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.targetId,
                        casterId: r.targetId,
                        actionId: "natural-recover-lag"
                    },
                    turnRange: [2, 5]
                }]
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [n.name + " is lagging out!"]
                }]
            }
        }),
        "attack-special-002-a": a({}, f, {
            name: "Garbage Jammer",
            description: "Causes a memory leak",
            ppCost: 6,
            affectTargetStatus: ["normal", "memory-leak"],
            getFail: function (t, e, n, r) {
                return "normal" != n.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [n.name + " has a memory leak!"]
                }]
            }
        }),
        "attack-special-003-a": a({}, f, {
            name: "Thrash",
            description: "Causes a memory leak and gradual burning",
            ppCost: 10,
            affectTargetStatus: ["normal", "memory-leak"],
            getFail: function (t, e, n, r) {
                return "normal" != n.status
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.targetId,
                        casterId: r.targetId,
                        actionId: "attack-special-003-a-catchfire"
                    },
                    turnRange: [2, 2]
                }]
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [n.name + " has a memory leak!"]
                }, {
                    type: "message",
                    content: [n.name + "'s laptop is getting uncomfortably warm..."]
                }]
            }
        }),
        "attack-special-003-a-catchfire": a({}, f, {
            name: "(Thrash: catch fire)",
            description: "",
            ppCost: 0,
            dependentOnCasterStatus: "memory-leak",
            affectTargetStatus: ["memory-leak", "fire"],
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "message",
                    content: ["[FAST]" + n.name + "'s laptop ", "[FAST]CAUGHT ON FIRE"]
                }]
            }
        }),
        "attack-special-004-a": a({}, f, {
            name: "Curl",
            description: "Steals 1 random item",
            ppCost: 6,
            theftQuantity: 1,
            getFail: function (t, e, n, r) {
                return 0 == n.items.length
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [e.name + " stole " + (0, s["default"])(r.stolenItemNames) + " from " + n.name + "!"]
                }]
            }
        }),
        "attack-special-004-b": a({}, f, {
            name: "Curl mk II",
            description: "Steal 2 random items",
            ppCost: 6,
            theftQuantity: 2,
            getFail: function (t, e, n, r) {
                return 0 == n.items.length
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: [e.name + " stole " + (0, s["default"])(r.stolenItemNames) + " from " + n.name + "!"]
                }]
            }
        }),
        "attack-special-005-a": a({}, f, {
            name: "Steal-and-Use",
            description: "Steals 1 random item and immediately uses it",
            theftQuantity: 1,
            ppCost: 11,
            stealAndUseItem: !0,
            getFail: function (t, e, n, r) {
                return 0 == n.items.length
            },
            customSuccessStep: function (t, e, n, r) {
                var a = r.stolenItemNames[0];
                return [p(t, e, n, r), d(t, e, n, r), {
                    type: "message",
                    content: ["[FAST]" + e.name + " stole " + (0, c["default"])(a) + " " + a + " from " + n.name + "!"]
                }]
            }
        }),
        "attack-special-006-a": a({}, f, {
            name: "Clean",
            ppCost: 7,
            description: "Clears status back to normal",
            affectCasterStatus: "normal",
            getFail: function (t, e, n, r) {
                return "normal" == e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "message",
                    content: [e.name + "'s status condition is gone!"]
                }]
            }
        }),
        "attack-special-007-a": a({}, f, {
            name: "Troll",
            animation: "fury",
            ppCost: 5,
            description: "Enters temporary state of fury",
            affectCasterStatus: ["normal", "fury"],
            getFail: function (t, e, n, r) {
                return "normal" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " is enraged in fury!"]
                }]
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.casterId,
                        casterId: r.casterId,
                        actionId: "natural-recover-fury"
                    },
                    turnRange: [2, 5]
                }]
            }
        }),
        "attack-special-008-a": a({}, f, {
            name: "Headphones",
            animation: "zen",
            ppCost: 5,
            description: "Enters temporary state of focus",
            affectCasterStatus: ["normal", "zen"],
            getFail: function (t, e, n, r) {
                return "normal" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "message",
                    content: [e.name + " put on Headphones!"]
                }, {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " has entered a state of Focus!"]
                }]
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.casterId,
                        casterId: r.casterId,
                        actionId: "natural-recover-zen"
                    },
                    turnRange: [2, 5]
                }]
            }
        }),
        "attack-special-009-a": a({}, f, {
            name: "Deadline",
            ppCost: 5,
            description: "Boosts speed for 4 to 6 turns",
            affectCasterStatus: ["normal", "deadline"],
            getFail: function (t, e, n, r) {
                return "normal" != e.status
            },
            customSuccessStep: function (t, e, n, r) {
                return [{
                    type: "message",
                    content: [e.name + " issued a deadline!"]
                }, {
                    type: "message",
                    content: [e.name + "'s speed is greatly increased!"]
                }]
            },
            getFollowupActions: function (t, e, n, r) {
                return [{
                    action: {
                        targetId: r.casterId,
                        casterId: r.casterId,
                        actionId: "natural-recover-deadline"
                    },
                    turnRange: [4, 6]
                }]
            }
        }),
        "attack-special-010-a": a({}, f, {
            name: "Mitigate",
            ppCost: 5,
            description: "Reduces Enemy Danger Meter by 20%",
            affectTargetDangerMeter: -.2,
            getFail: function (t, e, n, r) {
                return 0 == n.dangerMeter
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "message",
                    content: [n.name + "'s Danger Meter is reduced!"]
                }]
            }
        }),
        "attack-special-011-a": a({}, f, {
            name: "Commit",
            animation: "commit",
            ppCost: 1,
            description: "Bookmarks health and statuses of all combatants",
            accuracyModifier: 999,
            speedModifier: 950,
            changeCasterCommittedData: !0,
            getFail: function (t, e, n, r) {
                return !1
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "animation",
                    animationName: t.animation,
                    actionDescription: r
                }, {
                    type: "message",
                    content: [e.name + " committed the battle status!"]
                }]
            }
        }),
        "attack-special-011-b": a({}, f, {
            name: "Revert",
            ppCost: 10,
            description: "Reverts battle status to saved Commit",
            accuracyModifier: 999,
            useCasterCommittedData: !0,
            getFail: function (t, e, n, r) {
                return null === e.committedTurnData
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "message",
                    content: [e.name + " reverted the battle to a saved Commit!"]
                }]
            }
        }),
        "attack-special-011-c": a({}, f, {
            name: "Stash",
            ppCost: 7,
            description: "Destroys opponent's Commit",
            accuracyModifier: 999,
            clearTargetCommittedData: !0,
            getFail: function (t, e, n, r) {
                return null === n.committedTurnData
            },
            customSuccessStep: function (t, e, n, r) {
                return [p(t, e, n, r), {
                    type: "message",
                    content: [e.name + " cleared " + n.name + "'s Commit!"]
                }]
            }
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(11),
       i = r(o),
       u = a({}, i["default"], {
           levelRequirement: 0,
           type: "Normal",
           accuracyModifier: 999,
           dependentOnAttack: null
       });
    e["default"] = {
        "super-001-a": a({}, u, {
            name: "SUPER Palm",
            useFrameworkId: "framework_001",
            animation: "tada",
            description: "Focus PALM knowledge in one powerful blow",
            affectTargetHpPoints: -5,
            ppCost: 0
        }),
        "super-002-a": a({}, u, {
            name: "SUPER EndGame",
            useFrameworkId: "framework_002",
            animation: "tada",
            description: "Focus EndGame knowledge in one powerful blow",
            affectTargetHpPoints: -5,
            ppCost: 0
        }),
        "super-003-a": a({}, u, {
            name: "SUPER edjKase",
            useFrameworkId: "framework_003",
            animation: "tada",
            description: "Focus edjKase knowledge in one powerful blow",
            affectTargetHpPoints: -5,
            ppCost: 0
        }),
        "super-004-a": a({}, u, {
            name: "SUPER Vector",
            useFrameworkId: "framework_004",
            animation: "tada",
            description: "Focus Vector knowledge in one powerful blow",
            affectTargetHpPoints: -5,
            ppCost: 0
        })
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(15);
    e["default"] = {
        computerAiTraits: {
            vicious: 10,
            protective: 1,
            cursing: 1,
            conservative: 1,
            klepto: 1
        },
        name: "Knight",
        simName: "knight",
        level: 1,
        "class": "ninja",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
        attacks: [].concat(r(a.allAttacks)),
        laptopUpgrades: [{
            libraryId: "laptop-upgrade_002"
        }],
        characterUpgrades: [{
            libraryId: "character-upgrade-005-i"
        }, {
            libraryId: "character-upgrade-005-ii"
        }]
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(15);
    e["default"] = {
        computerAiTraits: {
            vicious: 2,
            protective: 1,
            cursing: 1,
            conservative: 1,
            klepto: 1
        },
        name: "Hitesh",
        simName: "meatsim",
        level: 30,
        "class": "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
        attacks: [].concat(r(a.allAttacks)),
        laptopUpgrades: [{
            libraryId: "laptop-upgrade_002"
        }],
        characterUpgrades: [{
            libraryId: "character-upgrade-005-i"
        }, {
            libraryId: "character-upgrade-005-ii"
        }]
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(15);
    e["default"] = {
        computerAiTraits: {
            vicious: 1,
            protective: 1,
            cursing: 1,
            conservative: 1,
            klepto: 1
        },
        name: "Matt",
        simName: "player",
        level: 30,
        "class": "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg",
        attacks: [].concat(r(a.allAttacks)),
        laptopUpgrades: [{
            libraryId: "laptop-upgrade_001"
        }, {
            libraryId: "laptop-upgrade_002"
        }, {
            libraryId: "laptop-upgrade_003"
        }, {
            libraryId: "laptop-upgrade_001"
        }, {
            libraryId: "laptop-upgrade_002"
        }, {
            libraryId: "laptop-upgrade_003"
        }],
        characterUpgrades: [{
            libraryId: "character-upgrade-005-i"
        }, {
            libraryId: "character-upgrade-005-ii"
        }]
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        computerAiTraits: {
            vicious: 20,
            protective: 20,
            cursing: 20,
            conservative: 20,
            klepto: 20
        },
        name: "Thief",
        simName: "thief",
        level: 2,
        "class": "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
        attacks: ["attack-001-a", "attack-002-a", "attack-special-004-a"],
        laptopUpgrades: [{
            libraryId: "laptop-upgrade_002"
        }],
        characterUpgrades: [{
            libraryId: "character-upgrade-005-i"
        }, {
            libraryId: "character-upgrade-005-ii"
        }]
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = n(35),
       i = r(o),
       u = [].concat(a(Object.keys(i["default"])));
    e.allItems = u;
    var s = [];
    e.someOtherLoadout = s
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1002)
               }
           }, {
               key: "render",
               value: function () {
                   var t = {
                       position: "absolute",
                       left: 0,
                       right: 0,
                       top: 0,
                       bottom: 0,
                       zIndex: 99,
                       background: "#fff",
                       opacity: 0,
                       animation: "screenshot 1s forwards"
                   };
                   return l["default"].createElement("div", {
                       style: t
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.targetId, {
                       animation: "celebrate 0.3s infinite"
                   }), (0, c.setBattleValue)({
                       backgroundStyle: "rgba(71, 44, 95, 0.6)"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.targetId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null,
                           backgroundStyle: "rgba(0,0,0,0)"
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1602)
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.isPlayer,
                      e = {
                          position: "absolute",
                          left: t ? "52%" : "14%",
                          top: t ? "23%" : "45%",
                          width: "18%",
                          paddingBottom: "18%",
                          opacity: "0",
                          background: "#ffee52",
                          zIndex: 10,
                          animation: "flashbox 0.2s infinite steps(2)"
                      };
                   return l["default"].createElement("div", {
                       style: e
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: "",
        isPlayer: !0
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "die 1s ease-out forwards"
                       })
                   }, 200), setTimeout(function () {
                       (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1202)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "shake 0.5s infinite"
                   }), (0, c.setBattleValue)({
                       backgroundStyle: "rgba(255,0,0,0.4)"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null,
                           backgroundStyle: "rgba(0,0,0,0)"
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1202)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = n(9),
       d = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   function t() {
                       p.sfxIterate.play(), e -= 1, (0, c.setCombatantValue)(n.props.casterId, {
                           animation: "tada 0.5s infinite"
                       }), setTimeout(function () {
                           (0, c.setCombatantValue)(n.props.casterId, {
                               animation: "inherit"
                           }), (0, c.setBattleValue)({
                               currentAnimation: null
                           }), e > 0 ? t() : (0, f.doStep)()
                       }, 502)
                   }
                   var e = this.props.repetitionsCount,
                      n = this;
                   t()
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    d.defaultProps = {
        casterId: ""
    }, e["default"] = d, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(3),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "celebrate 0.7s forwards"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 702)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "preloaded 1s forwards"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 802)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 302)
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.isPlayer,
                      e = {
                          position: "absolute",
                          left: t ? "47%" : "10%",
                          top: t ? "10%" : "40%",
                          width: "26%",
                          paddingBottom: "26%",
                          opacity: "0.7",
                          zIndex: 10,
                          backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/slice.svg)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1000%",
                          backgroundPosition: "100% 0",
                          animation: "slice 0.3s steps(9)"
                      };
                   return l["default"].createElement("div", {
                       style: e
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: "",
        isPlayer: !0
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   this.props.isPlayer && (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "slideOutDown 0.8s forwards"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 810)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "tada 1s infinite"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1002)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(3)),
       f = n(5),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, c.setCombatantValue)(this.props.casterId, {
                       animation: "shake 3s infinite"
                   }), (0, c.setBattleValue)({
                       backgroundStyle: "rgba(56,202,234,0.5)"
                   }), setTimeout(function () {
                       (0, c.setCombatantValue)(t.props.casterId, {
                           animation: "inherit"
                       }), (0, c.setBattleValue)({
                           currentAnimation: null,
                           backgroundStyle: "rgba(0,0,0,0)"
                       }), setTimeout(function () {
                           (0, f.doStep)()
                       }, 200)
                   }, 1202)
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           position: "absolute"
                       }
                   })
               }
           }]), e
       }(l["default"].Component);
    p.defaultProps = {
        casterId: ""
    }, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "render",
               value: function () {
                   var t = {
                       background: this.props.backgroundStyle
                   };
                   return l["default"].createElement("div", {
                       style: t,
                       className: "battle-arena-overlay"
                   })
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   backgroundStyle: t.battle.backgroundStyle
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = f, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(7),
       d = n(36),
       m = (r(d), function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "getPositionStyles",
               value: function (t) {
                   var e = this.props,
                      n = e.isPlayer,
                      r = e.isBigMessageBoard;
                   if (n) {
                       var a = 8 * t,
                          o = 34 * t;
                       return {
                           left: r ? a : o,
                           top: 28 * t,
                           width: 29 * t,
                           height: 29 * t
                       }
                   }
                   return {
                       left: r ? 50 * t : 45 * t,
                       top: 13 * t,
                       width: 20 * t,
                       height: 20 * t
                   }
               }
           }, {
               key: "render",
               value: function () {
                   var t = new p.CombatantModel(this.props.combatant),
                      e = this.props.vW,
                      n = {
                          backgroundImage: "url(" + t.skin + ")",
                          animation: t.animation,
                          width: "100%",
                          height: "100%"
                      },
                      r = this.props.isPlayer ? "is-player" : "",
                      a = i({
                          position: "absolute"
                      }, this.getPositionStyles(e)),
                      o = {
                          animation: n.animation.match(/die/) ? n.animation : "none"
                      };
                   return c["default"].createElement("div", {
                       style: a,
                       className: "single-combatant-container"
                   }, c["default"].createElement("div", {
                       style: n,
                       className: "arena-combatant-image " + r
                   }), c["default"].createElement("div", {
                       style: o,
                       className: "arena-combatant-shadow"
                   }))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   combatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[e.combatantId],
                   vW: Math.round(t.map.viewportWidth / 100)
               }
           })(e) || e
       }(c["default"].Component));
    m.defaultProps = {
        combatantId: "some-id",
        isPlayer: !1
    }, e["default"] = m, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(59),
       p = r(f),
       d = n(87),
       m = r(d),
       v = n(88),
       h = r(v),
       y = n(97),
       g = r(y),
       b = n(83),
       O = r(b),
       _ = n(85),
       P = r(_),
       w = n(82),
       k = r(w),
       S = n(36),
       j = r(S),
       C = n(90),
       I = r(C),
       E = n(89),
       M = r(E),
       T = n(7),
       x = n(23),
       A = n(139),
       D = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   (0, x.turnCombatantsForRollout)()
               }
           }, {
               key: "renderAnimation",
               value: function () {
                   if (!this.props.currentAnimation) return null;
                   var t = p["default"][this.props.currentAnimation.animationId];
                   return t(this.props.currentAnimation.actionDescription)
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props,
                      e = t.combatants,
                      n = t.combatantIds,
                      r = t.vW,
                      a = t.isRollout,
                      o = t.isIntro,
                      i = {
                          padding: 1 * r
                      },
                      u = a ? "is-rollout" : "",
                      s = a || o;
                   return l["default"].createElement("div", {
                       className: "battle-arena " + u
                   }, l["default"].createElement(k["default"], null), l["default"].createElement("div", {
                       style: i,
                       className: "scoreboards"
                   }, l["default"].createElement(m["default"], {
                       combatantId: n[0]
                   }), l["default"].createElement(m["default"], {
                       combatantId: n[1]
                   })), l["default"].createElement(O["default"], {
                       isBigMessageBoard: s,
                       vW: r,
                       isPlayer: !1,
                       combatantId: n[1]
                   }), l["default"].createElement(j["default"], {
                       vW: r,
                       isPlayer: !1,
                       isBigMessageBoard: s,
                       hp: e[n[1]].hp
                   }), l["default"].createElement(j["default"], {
                       vW: r,
                       isPlayer: !0,
                       isBigMessageBoard: s,
                       hp: e[n[0]].hp
                   }), l["default"].createElement(O["default"], {
                       isBigMessageBoard: s,
                       vW: r,
                       isPlayer: !0,
                       combatantId: n[0]
                   }), this.renderAnimation(), l["default"].createElement(g["default"], {
                       casterModel: this.props.playerModel,
                       hide: s
                   }), l["default"].createElement(h["default"], {
                       isRollout: a,
                       isIntro: o,
                       challengerModel: this.props.challengerModel,
                       challengeeModel: this.props.challengeeModel
                   }), l["default"].createElement(P["default"], null), l["default"].createElement(I["default"], null), l["default"].createElement(M["default"], null))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               var n = t.battle.history[t.battle.devTimeTravelTurn].combatants,
                  r = Object.keys(n),
                  a = t.battle.history[t.battle.devTimeTravelTurn].combatants[r[0]],
                  o = (0, A.getCombatantsByQuery)(n, function (t) {
                      return t.isChallenger
                  })[0],
                  i = (0, A.getCombatantsByQuery)(n, function (t) {
                      return !t.isChallenger
                  })[0];
               return {
                   combatants: n,
                   challengerModel: o,
                   challengeeModel: i,
                   playerModel: new T.CombatantModel(a),
                   isRollout: t.battle.submissions.length == r.length,
                   combatantIds: r,
                   vW: Math.round(t.map.viewportWidth / 100),
                   currentAnimation: t.battle.currentAnimation,
                   isIntro: t.battle.isShowingIntroScreen
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = D, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(25),
       p = n(42),
       d = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "submit",
               value: function (t) {
                   setTimeout(function () {
                       if (0 == t.submissions.length) {
                           var e = (0, f.getAutoAttacks)();
                           e.forEach(function (t) {
                               (0, p.addSubmission)(t)
                           })
                       }
                   }, 700)
               }
           }, {
               key: "componentDidMount",
               value: function () {
                   this.submit(this.props)
               }
           }, {
               key: "componentWillUpdate",
               value: function (t) {
                   t.submissions.length != this.props.submissions.length && this.submit(t)
               }
           }, {
               key: "render",
               value: function () {
                   return null
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   submissions: t.battle.submissions
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = d, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "getColorStyle",
               value: function (t) {
                   var e = "linear-gradient(-180deg, #23E500 0%, #78EB69 38%, #0FC700 100%)",
                      n = "linear-gradient(-180deg, #E5E200 0%, #EBE669 38%, #C7BC00 100%)",
                      r = "linear-gradient(-180deg, #E50000 0%, #EB6969 38%, #C70000 100%)";
                   return 20 >= t ? r : 50 >= t ? n : e
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.vW,
                      e = {
                          position: "relative",
                          display: "inline-block",
                          verticalAlign: "middle",
                          borderRadius: .3 * t,
                          width: 14 * t,
                          height: 1.5 * t,
                          background: "#333",
                          marginRight: 2 * t
                      },
                      n = .25 * t,
                      r = {
                          position: "absolute",
                          left: n,
                          right: n,
                          top: n,
                          bottom: n
                      },
                      a = Math.round(this.props.part / this.props.whole * 100),
                      o = {
                          position: "absolute",
                          width: a + "%",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          background: this.getColorStyle(a)
                      },
                      i = {
                          position: "absolute",
                          top: "110%",
                          left: a > 0 ? a + "%" : "0%",
                          transform: "translateX(-50%)",
                          padding: .3 * t,
                          fontSize: 1.4 * t,
                          background: "#222",
                          color: "#FFF"
                      },
                      u = this.props.part >= 0 ? this.props.part : 0,
                      s = this.props.isPlayer ? l["default"].createElement("div", {
                          style: i
                      }, u, "/", this.props.whole) : null;
                   return l["default"].createElement("div", {
                       style: e
                   }, l["default"].createElement("div", {
                       style: r
                   }, l["default"].createElement("div", {
                       style: o
                   })), s)
               }
           }]), e
       }(l["default"].Component));
    c.defaultProps = {
        part: 0,
        whole: 0,
        vW: 0
    }, e["default"] = c, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(7),
       d = n(86),
       m = r(d),
       v = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "renderStatusBlip",
               value: function (t) {
                   if ("normal" == t.status) return null;
                   var e = {
                       color: "#fff",
                       background: "red",
                       paddingLeft: "0.2em",
                       paddingRight: "0.2em"
                   };
                   if ("lag" == t.status) {
                       var n = i({}, e, {
                           background: "#472C5F"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "LAGGING")
                   }
                   if ("zen" == t.status) {
                       var n = i({}, e, {
                           background: "#4A90E2"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "FOCUS")
                   }
                   if ("deadline" == t.status) {
                       var n = i({}, e, {
                           background: "#000"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "DEADLINE")
                   }
                   if ("fury" == t.status) {
                       var n = i({}, e, {
                           background: "#B72C2C"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "FURY")
                   }
                   if ("memory-leak" == t.status) {
                       var n = i({}, e, {
                           background: "#FF5303"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "LEAK")
                   }
                   if ("fire" == t.status) {
                       var n = i({}, e, {
                           background: "red"
                       });
                       return c["default"].createElement("span", {
                           style: n
                       }, "FIRE")
                   }
                   return null
               }
           }, {
               key: "renderDanger",
               value: function (t) {
                   var e = this.props.vW,
                      n = {
                          fontSize: 1.6 * e,
                          verticalAlign: "middle",
                          display: "inline-block"
                      },
                      r = {
                          color: t.isDangerMeterUsable() ? "#399988" : "#444"
                      };
                   return c["default"].createElement("span", {
                       style: n,
                       className: "scoreboard_danger"
                   }, c["default"].createElement("span", null, "Danger Meter"), c["default"].createElement("span", {
                       style: r
                   }, t.dangerMeter / t.maxDangerMeter * 100, "%"))
               }
           }, {
               key: "renderAlignment",
               value: function (t) {
                   var e = {
                       top: 1.5 * this.props.vW,
                       right: 1.5 * this.props.vW
                   };
                   return c["default"].createElement("div", {
                       style: e,
                       className: "scoreboard_alignment"
                   }, [{
                       hasValue: t.f1Alignment > 0,
                       fillColor: "#41CA2A"
                   }, {
                       hasValue: t.f2Alignment > 0,
                       fillColor: "#8E5FD4"
                   }, {
                       hasValue: t.f3Alignment > 0,
                       fillColor: "#4A90E2"
                   }, {
                       hasValue: t.f4Alignment > 0,
                       fillColor: "#FF4800"
                   }].map(function (e, n) {
                       var r = {};
                       return e.hasValue && (r.background = t.isDangerMeterUsable() ? e.fillColor : "#444"), c["default"].createElement("div", {
                           key: n,
                           style: r,
                           className: "square"
                       })
                   }))
               }
           }, {
               key: "render",
               value: function () {
                   var t = new p.CombatantModel(this.props.combatant),
                      e = this.props.vW,
                      n = {
                          width: "calc(50% - " + .5 * e + "px)",
                          border: .5 * e + "px solid #000",
                          padding: 1 * e,
                          fontSize: 2 * e
                      },
                      r = {
                          width: 5 * e,
                          height: 5 * e,
                          marginRight: e,
                          backgroundImage: "url(" + t.skin + ")"
                      };
                   return c["default"].createElement("div", {
                       className: "scoreboard",
                       style: n
                   }, c["default"].createElement("div", {
                       className: "scoreboard_avatar-container"
                   }, c["default"].createElement("div", {
                       style: r,
                       className: "scoreboard_avatar"
                   })), c["default"].createElement("div", {
                       className: "scoreboard_scores"
                   }, c["default"].createElement("div", null, c["default"].createElement("span", {
                       className: "scoreboard_name"
                   }, t.name.toUpperCase()), c["default"].createElement("span", {
                       className: "scoreboard_lvl"
                   }, c["default"].createElement("span", null, "LVL"), c["default"].createElement("span", null, t.level)), c["default"].createElement("span", null, this.renderStatusBlip(t))), c["default"].createElement("div", null, c["default"].createElement(m["default"], {
                       isPlayer: !t.isComputerControlled,
                       part: t.hp,
                       whole: t.maxHp,
                       vW: e
                   }), this.renderDanger(t)), this.renderAlignment(t)))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   combatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[e.combatantId],
                   vW: Math.round(t.map.viewportWidth / 100)
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = v, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(155),
       p = n(101),
       d = r(p),
       m = n(5),
       v = (n(3), n(4)),
       h = (r(v), function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "handleEnterKey",
               value: function () {
                   (0, m.doStep)()
               }
           }, {
               key: "getTextLine",
               value: function () {
                   if (0 == this.props.textMessageContent.length) return null;
                   var t = (0, f.convertText)(this.props.textMessageContent);
                   return l["default"].createElement(d["default"], {
                       vW: this.props.vW,
                       content: t,
                       needsUserPrompt: !0,
                       handleUserPrompt: this.handleEnterKey
                   })
               }
           }, {
               key: "getContent",
               value: function () {
                   if (this.props.isIntro) {
                       var t = this.props.challengerModel.name,
                          e = this.props.challengeeModel.name,
                          n = (0, f.convertText)(["[FAST]" + t + " challenges " + e + " to a HACK BATTLE!"]);
                       return l["default"].createElement(d["default"], {
                           vW: this.props.vW,
                           content: n,
                           needsUserPrompt: !0,
                           handleUserPrompt: this.handleEnterKey
                       })
                   }
                   return this.props.isRollout ? this.getTextLine() : this.props.descriptionBarText
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.vW,
                      e = this.props.isRollout || this.props.isIntro,
                      n = {
                          padding: e ? 2 * t : t,
                          paddingLeft: 3 * t,
                          borderTop: .5 * t + "px solid #000",
                          borderBottom: .5 * t + "px solid #000",
                          fontSize: e ? 2.5 * t : 2 * t,
                          height: e ? 13 * t : 5 * t
                      },
                      r = this.getContent();
                   return l["default"].createElement("div", {
                       style: n,
                       className: "bottom-bar"
                   }, r)
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   vW: Math.round(t.map.viewportWidth / 100),
                   descriptionBarText: t.battle.descriptionBarText,
                   textMessageContent: t.battle.textMessageContent
               }
           })(e) || e
       }(l["default"].Component));
    e["default"] = h, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(27),
       p = r(f),
       d = n(22),
       m = r(d),
       v = n(3),
       h = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "handleClick",
               value: function (t) {
                   t.preventDefault(), (0, p["default"])(m["default"].player, m["default"].meatsim), (0, v.setBattleValue)({
                       selectedOptionId: "root_attack",
                       menuKey: "root",
                       menuPageIndex: 0
                   })
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.isActive ? "is-active" : "",
                      e = {
                          fontSize: Math.round(3 * this.props.cW)
                      };
                   return l["default"].createElement("div", {
                       className: "ending-overlay " + t
                   }, l["default"].createElement("a", {
                       href: "#",
                       onClick: this.handleClick.bind(this),
                       className: "ending-overlay-link",
                       style: e
                   }, "Restart?"))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   isActive: t.battle.showEndingOverlay,
                   cW: t.map.cW || 1
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = h, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = (n(3), n(5), n(9)),
       p = n(18),
       d = function (t) {
           function e(t) {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).call(this), this.state = {
                   isShowing: t.isShowingIntroScreen
               }
           }
           o(e, t), i(e, [{
               key: "kickoff",
               value: function () {
                   f.songEnergeticBattle.stop(), f.songEnergeticBattle.play("trimmed"), this.setState({
                       isShowing: !1
                   }), (0, p.removeKeyboardSinglePress)("intro-overlay-screen")
               }
           }, {
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   (0, p.addKeyboardSinglePress)(13, function () {
                       t.kickoff()
                   }, "intro-overlay-screen")
               }
           }, {
               key: "handleClick",
               value: function (t) {
                   t.preventDefault(), this.kickoff(), $(".js-textline-autoclick-target").click()
               }
           }, {
               key: "render",
               value: function () {
                   return this.state.isShowing ? l["default"].createElement("div", {
                       className: "start-overlay half is-active"
                   }, l["default"].createElement("a", {
                       href: "#",
                       onClick: this.handleClick.bind(this),
                       className: "start-overlay-link"
                   }, "PRESS `ENTER` TO BATTLE")) : null
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   isShowingIntroScreen: t.battle.isShowingIntroScreen
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = d, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(39),
       d = r(p),
       m = n(31),
       v = n(3),
       h = n(37),
       y = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "render",
               value: function () {
                   if (this.props.isHidden) return null;
                   var t = {
                       optionId: "back",
                       labelText: "BACK",
                       customClasses: "back-button",
                       handleEnter: function () {
                           (0, v.setBattleValue)({
                               menuKey: "root",
                               menuPageIndex: 0
                           })
                       }
                   },
                      e = {
                          padding: (0, m.vW)(1.2),
                          border: (0, m.vW)(.5) + "px solid #000",
                          borderRadius: (0, m.vW)(1),
                          marginTop: (0, m.vW)(1.1),
                          textAlign: "center",
                          display: "inline-block"
                      },
                      n = this.props.menuPageIndex,
                      r = n < this.props.lastPage ? n + 1 : this.props.lastPage,
                      a = this.props.menuModel,
                      o = {
                          optionId: "prev-page",
                          labelText: null,
                          customClasses: "",
                          handleEnter: function () {
                              (0, h.goToPrevSubPage)(a)
                          }
                      },
                      u = {
                          optionId: "next-page",
                          labelText: null,
                          customClasses: "",
                          handleEnter: function () {
                              (0, h.goToNextSubPage)(a)
                          }
                      },
                      s = i({}, e, {
                          marginLeft: (0, m.vW)(1)
                      });
                   return c["default"].createElement("div", {
                       className: "submission-bottom-nav-container"
                   }, c["default"].createElement("div", null, c["default"].createElement(d["default"], {
                       vW: this.props.vW,
                       useBackArrowIcon: !0,
                       baseStyle: e,
                       model: t
                   })), c["default"].createElement("div", null, c["default"].createElement(d["default"], {
                       isDeactivated: 0 == n,
                       vW: this.props.vW,
                       isLeftArrow: !0,
                       baseStyle: s,
                       model: o
                   }), c["default"].createElement(d["default"], {
                       isDeactivated: n == r,
                       vW: this.props.vW,
                       isRightArrow: !0,
                       baseStyle: s,
                       model: u
                   })))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   isHidden: "root" == t.battle.menuKey,
                   menuPageIndex: t.battle.menuPageIndex,
                   cW: t.map.cW
               }
           })(e) || e
       }(c["default"].Component);
    y.propTypes = {
        lastPage: c["default"].PropTypes.number.isRequired
    }, e["default"] = y, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        (0, a.setBattleValue)({
            menuKey: t
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.changeMenuPage = r;
    var a = n(3)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        var e = i(t).nextOptionId;
        e && (h.sfxCursorMove.play(), (0, d.setBattleValue)({
            selectedOptionId: i(t).nextOptionId
        }))
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = i(t).prevOptionId;
        e && (h.sfxCursorMove.play(), (0, d.setBattleValue)({
            selectedOptionId: i(t).prevOptionId
        }))
    }

    function i(t) {
        var e = p["default"].getState().battle.menuKey,
           n = p["default"].getState().battle.selectedOptionId,
           r = (0, m.getPagesFromArray)(t[e])[p["default"].getState().battle.menuPageIndex],
           a = -1;
        r.forEach(function (t, e) {
            t.optionId == n && (a = e)
        });
        var o = r[a + 1],
           i = o ? o.optionId : null;
        i || "root" == e || (i = "back");
        var u = r[a - 1],
           s = u ? u.optionId : null;
        return ["back", "prev-page", "next-page"].indexOf(n) > -1 && (i = n, s = r[r.length - 1].optionId), {
            prevOptionId: s,
            nextOptionId: i
        }
    }

    function u(t) {
        var e = p["default"].getState().battle,
           n = e.menuKey,
           r = e.menuPageIndex,
           a = e.selectedOptionId;
        if ("root" != n) {
            var o = ["next-page", "prev-page", "back"]; -1 === o.indexOf(a) && (0 == r ? (0, d.setBattleValue)({
                menuKey: "root",
                menuPageIndex: 0
            }) : (0, v.goToPrevSubPage)(t, !0))
        }
        "next-page" == a && (0, d.setBattleValue)({
            selectedOptionId: "prev-page"
        }), "prev-page" == a && (0, d.setBattleValue)({
            selectedOptionId: "back"
        })
    }

    function s() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = p["default"].getState().battle.menuKey,
           n = p["default"].getState().battle.selectedOptionId,
           r = t[e],
           a = r.find(function (t) {
               return t.optionId == n
           }),
           o = ["root_super", "root_attack", "root_special", "root_item"];
        return o.indexOf(n) > -1 ? void a.handleEnter() : "back" == n ? void (0, d.setBattleValue)({
            selectedOptionId: "prev-page"
        }) : "prev-page" == n ? void (0, d.setBattleValue)({
            selectedOptionId: "next-page"
        }) : void (0, v.goToNextSubPage)(t, !0)
    }

    function l() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = p["default"].getState().battle.menuKey,
           n = p["default"].getState().battle.selectedOptionId,
           r = t[e],
           a = r.find(function (t) {
               return t.optionId == n
           });
        a ? a.handleEnter() : ("back" == n && (0, d.setBattleValue)({
            menuKey: "root",
            menuPageIndex: 0
        }), "prev-page" == n && (0, v.goToPrevSubPage)(t), "next-page" == n && (0, v.goToNextSubPage)(t))
    }

    function c() {
        var t = (arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], p["default"].getState().battle.menuKey);
        "root" != t && (0, d.setBattleValue)({
            menuKey: "root",
            menuPageIndex: 0
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.handleMenuDown = a, e.handleMenuUp = o, e.handleMenuLeft = u, e.handleMenuRight = s, e.handleMenuEnter = l, e.handleMenuEsc = c;
    var f = n(4),
       p = r(f),
       d = n(3),
       m = n(28),
       v = n(37),
       h = n(9)
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        optionId: "some_unique_id",
        labelText: "some option",
        supportText: "",
        customClasses: "",
        descriptionBarText: "",
        handleEnter: function () { }
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(21),
       d = r(p),
       m = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "render",
               value: function () {
                   var t = this;
                   if (this.props.isHidden) return null;
                   var e = !0;
                   1 == this.props.totalItems && (e = !1);
                   var n = this.props.vW,
                      r = {
                          width: 37 * n,
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: 1.3 * n,
                          paddingBottom: 0,
                          visibility: e ? "visible" : "hidden"
                      },
                      a = {
                          width: 1.3 * n,
                          height: 1.3 * n,
                          borderRadius: "50%",
                          border: .3 * n + "px solid #222",
                          marginLeft: 1 * n,
                          marginRight: 1 * n
                      },
                      o = (0, d["default"])(this.props.totalItems).map(function (e, n) {
                          var r = t.props.currentIndex == n,
                             o = i({}, a, {
                                 background: r ? "#000" : "rgba(0,0,0,0)"
                             });
                          return c["default"].createElement("div", {
                              key: n,
                              style: o
                          })
                      });
                   return c["default"].createElement("div", {
                       style: r
                   }, o)
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   isHidden: "root" == t.battle.menuKey
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = m, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(1),
       o = r(a);
    e["default"] = {
        leftArrow: function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? 17 : arguments[0];
            return o["default"].createElement("svg", {
                width: t,
                viewBox: "0 0 15 17",
                version: "1.1"
            }, o["default"].createElement("g", {
                stroke: "none",
                strokeWidth: "1",
                fill: "none",
                "fill-rule": "evenodd"
            }, o["default"].createElement("polygon", {
                fill: "#000000",
                transform: "translate(7.210526, 8.500000) rotate(-90.000000) translate(-7.210526, -8.500000) ",
                points: "15.7105263 15.7105263 -1.28947368 15.7105263 7.21052632 1.28947368"
            })))
        },
        rightArrow: function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? 17 : arguments[0];
            return o["default"].createElement("svg", {
                width: t,
                viewBox: "0 0 15 17",
                version: "1.1"
            }, o["default"].createElement("g", {
                id: "Page-1",
                stroke: "none",
                strokeWidth: "1",
                fill: "none",
                "fill-rule": "evenodd"
            }, o["default"].createElement("polygon", {
                fill: "#000000",
                transform: "translate(7.210526, 8.500000) rotate(-270.000000) translate(-7.210526, -8.500000) ",
                points: "15.7105263 15.7105263 -1.28947368 15.7105263 7.21052632 1.28947368"
            })))
        }
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(38),
       p = n(28),
       d = n(99),
       m = n(100),
       v = n(39),
       h = r(v),
       y = n(98),
       g = r(y),
       b = n(91),
       O = r(b),
       _ = n(95),
       P = r(_),
       w = n(3),
       k = n(31),
       S = n(18),
       j = n(93),
       C = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "bindKeyboard",
               value: function () {
                   this.unbindKeyboard(), (0, S.addKeyboardSinglePress)(38, j.handleMenuUp.bind(this, this.menuModel), "battle-submission-ui-handle-up"), (0, S.addKeyboardSinglePress)(40, j.handleMenuDown.bind(this, this.menuModel), "battle-submission-ui-handle-down"), (0, S.addKeyboardSinglePress)(37, j.handleMenuLeft.bind(this, this.menuModel), "battle-submission-ui-handle-left"), (0, S.addKeyboardSinglePress)(39, j.handleMenuRight.bind(this, this.menuModel), "battle-submission-ui-handle-right"), (0, S.addKeyboardSinglePress)(13, j.handleMenuEnter.bind(this, this.menuModel), "battle-submission-ui-handle-enter"), (0, S.addKeyboardSinglePress)(27, j.handleMenuEsc.bind(this, this.menuModel), "battle-submission-ui-handle-esc")
               }
           }, {
               key: "unbindKeyboard",
               value: function () {
                   (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-up"), (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-down"), (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-left"), (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-right"), (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-enter"), (0, S.removeKeyboardSinglePress)("battle-submission-ui-handle-esc")
               }
           }, {
               key: "componentWillMount",
               value: function () {
                   this.menuModel = (0, f.getMenuModel)(this.props.casterModel).structure, (0, d.updateDescriptionText)(this.props.selectedOptionId, this.menuModel)
               }
           }, {
               key: "componentDidMount",
               value: function () {
                   this.bindKeyboard()
               }
           }, {
               key: "componentWillUpdate",
               value: function (t) {
                   !t.hide && this.props.hide && (this.menuModel = (0, f.getMenuModel)(t.casterModel).structure, (0, w.setBattleValue)({
                       menuKey: "root",
                       menuPageIndex: 0
                   }), (0, m.updateSelectedId)("root", this.props.menuKey), this.bindKeyboard()), t.hide && !this.props.hide && this.unbindKeyboard(), t.selectedOptionId != this.props.selectedOptionId && (0, d.updateDescriptionText)(t.selectedOptionId, this.menuModel), t.menuKey != this.props.menuKey && (0, m.updateSelectedId)(t.menuKey, this.props.menuKey)
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.vW,
                      e = {
                          width: 37 * t,
                          left: 2 * t,
                          bottom: this.props.hide ? -43 * t : 7 * t,
                          fontSize: 3 * t
                      },
                      n = {
                          padding: (0, k.vW)(1.2),
                          width: "100%",
                          border: (0, k.vW)(.5) + "px solid #000",
                          borderRadius: (0, k.vW)(1),
                          marginTop: (0, k.vW)(1)
                      },
                      r = {
                          "float": "right",
                          fontSize: 2 * t,
                          borderRadius: .3 * t,
                          position: "relative",
                          borderBottomRightRadius: 0,
                          top: 2,
                          background: "#000",
                          color: "#fff",
                          padding: .5 * t + "px " + t + "px"
                      },
                      a = (0, p.getPagesFromArray)(this.menuModel[this.props.menuKey]),
                      o = a[this.props.menuPageIndex] || a[0],
                      i = o.map(function (e, r) {
                          return l["default"].createElement(h["default"], {
                              vW: t,
                              baseStyle: n,
                              key: r,
                              model: e
                          })
                      });
                   return l["default"].createElement("div", {
                       style: e,
                       className: "submission-menu"
                   }, this.props.showPP ? l["default"].createElement("div", {
                       style: r
                   }, "PP ", this.props.casterModel.pp, "/", this.props.casterModel.maxPp) : null, l["default"].createElement(g["default"], {
                       pp: this.props.casterModel.pp,
                       maxPp: this.props.casterModel.maxPp
                   }), l["default"].createElement("div", null, i), l["default"].createElement(P["default"], {
                       vW: this.props.vW,
                       totalItems: a.length,
                       currentIndex: this.props.menuPageIndex
                   }), l["default"].createElement(O["default"], {
                       menuModel: this.menuModel,
                       vW: this.props.vW,
                       lastPage: a.length - 1
                   }))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   cW: t.map.cW,
                   vW: Math.round(t.map.viewportWidth / 100),
                   menuKey: t.battle.menuKey,
                   menuPageIndex: t.battle.menuPageIndex,
                   selectedOptionId: t.battle.selectedOptionId
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = C, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(31),
       p = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "renderTitleText",
               value: function () {
                   return "attack" == this.props.menuKey ? "ATTACK" : "special" == this.props.menuKey ? "SPECIAL" : "items" == this.props.menuKey ? "ITEM" : "superCharge" == this.props.menuKey ? "SUPER CHARGE" : "CHOOSE OPTION"
               }
           }, {
               key: "render",
               value: function () {
                   var t = {
                       "float": "left",
                       fontSize: (0, f.vW)(2.5),
                       padding: (0, f.vW)(0) + "px " + (0, f.vW)(1) + "px",
                       position: "relative",
                       top: (0, f.vW)(-.3)
                   },
                      e = {
                          "float": "right",
                          fontSize: (0, f.vW)(2),
                          borderRadius: (0, f.vW)(.3),
                          position: "relative",
                          borderBottomRightRadius: 0,
                          top: (0, f.vW)(.4),
                          background: "#000",
                          color: "#fff",
                          padding: (0, f.vW)(.5) + "px " + (0, f.vW)(1) + "px"
                      };
                   return l["default"].createElement("div", null, l["default"].createElement("div", {
                       style: t
                   }, this.renderTitleText()), l["default"].createElement("div", {
                       style: e
                   }, "PP ", this.props.pp, "/", this.props.maxPp))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   cW: t.map.cW,
                   menuKey: t.battle.menuKey
               }
           })(e) || e
       }(l["default"].Component);
    p.propTypes = {}, e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
           n = [];
        for (var a in e) n = [].concat(r(n), r(e[a]));
        var i = n.find(function (e) {
            return e.optionId == t
        }),
           u = i ? i.descriptionBarText : "";
        "back" == t && (u = "BACK to previous menu"), "prev-page" == t && (u = "PREVIOUS actions"), "next-page" == t && (u = "MORE actions"), (0, o.setBattleValue)({
            descriptionBarText: u
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.updateDescriptionText = a;
    var o = n(3)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        var n = Object.keys(i["default"].getState().battle.history[i["default"].getState().battle.devTimeTravelTurn].combatants),
           r = i["default"].getState().battle.history[i["default"].getState().battle.devTimeTravelTurn].combatants[n[0]],
           a = new s.CombatantModel(r),
           o = (0, u.getMenuModel)(a).structure,
           c = o[t];
        return "attack" == e && "root" == t ? void (0, l.setBattleValue)({
            selectedOptionId: "root_attack"
        }) : "special" == e && "root" == t ? void (0, l.setBattleValue)({
            selectedOptionId: "root_special"
        }) : "items" == e && "root" == t ? void (0, l.setBattleValue)({
            selectedOptionId: "root_item"
        }) : void (0, l.setBattleValue)({
            selectedOptionId: c[0].optionId
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.updateSelectedId = a;
    var o = n(4),
       i = r(o),
       u = n(38),
       s = n(7),
       l = n(3)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = (n(2), n(18)),
       f = n(9),
       p = function (t) {
           function e(t) {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.timeout = null, this.acceptClick = !1, this.state = {
                   characterIndex: 0,
                   showBlinker: !1
               }
           }
           return o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   var t = this;
                   this.initTimeout = setTimeout(function () {
                       t.initMessaging()
                   }, 100)
               }
           }, {
               key: "handleClick",
               value: function () {
                   var t = this;
                   this.acceptClick && setTimeout(function () {
                       t.promptHandler()
                   }, 10)
               }
           }, {
               key: "promptHandler",
               value: function () {
                   this.setState({
                       showBlinker: !1
                   }), this.acceptClick = !1, (0, c.removeKeyboardSinglePress)("battle-text-line"), this.props.handleUserPrompt()
               }
           }, {
               key: "handleDone",
               value: function () {
                   var t = this;
                   this.setState({
                       showBlinker: !0
                   });
                   var e = function () {
                       t.promptHandler()
                   };
                   this.props.needsUserPrompt && (this.acceptClick = !0, (0, c.addKeyboardSinglePress)(13, e, "battle-text-line"))
               }
           }, {
               key: "initMessaging",
               value: function () {
                   function t() {
                       f.sfxTypeBlip.play(), e.setState({
                           characterIndex: e.state.characterIndex + 1
                       }, function () {
                           var n = e.props.content[e.state.characterIndex] || {
                               delayBefore: 0
                           };
                           e.state.characterIndex < e.props.content.length ? e.timeout = setTimeout(t, n.delayBefore) : e.handleDone()
                       })
                   }
                   var e = this;
                   t()
               }
           }, {
               key: "render",
               value: function () {
                   var t = this,
                      e = this.props.vW,
                      n = {
                          width: 1.2 * e,
                          height: 1.2 * e,
                          background: "#000",
                          position: "absolute",
                          right: 1.2 * e,
                          bottom: 1.2 * e,
                          animation: "blink 1.1s steps(2, start) infinite"
                      },
                      r = this.props.content.map(function (e, n) {
                          var r = {
                              visibility: n < t.state.characterIndex ? "visible" : "hidden"
                          };
                          return l["default"].createElement("span", {
                              style: r,
                              key: n
                          }, e.content)
                      }),
                      a = {
                          height: "100%"
                      };
                   return l["default"].createElement("div", {
                       onClick: this.handleClick.bind(this),
                       style: a,
                       className: "js-textline-autoclick-target"
                   }, r, this.state.showBlinker ? l["default"].createElement("div", {
                       style: n
                   }) : null)
               }
           }]), e
       }(l["default"].Component);
    e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(3),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "switchToConsole",
               value: function (t) {
                   return t.preventDefault(), this.props.isRollout ? !1 : ((0, f.setBattleValue)({
                       viewMode: "console"
                   }), void localStorage.setItem("b4CurrentView", "console"))
               }
           }, {
               key: "switchToArena",
               value: function (t) {
                   return t.preventDefault(), this.props.isRollout ? !1 : ((0, f.setBattleValue)({
                       viewMode: "battle"
                   }), void localStorage.setItem("b4CurrentView", "battle"))
               }
           }, {
               key: "switchToReporting",
               value: function (t) {
                   t.preventDefault(), (0, f.setBattleValue)({
                       viewMode: "reporting"
                   }), localStorage.setItem("b4CurrentView", "reporting")
               }
           }, {
               key: "render",
               value: function () {
                   if (this.props.isReportRunning) return null;
                   var t = {
                       background: "#4A90E2",
                       color: "#fff",
                       borderColor: "#2F619B"
                   },
                      e = {
                          opacity: this.props.isRollout ? "0.5" : "1",
                          marginBottom: "1em",
                          marginLeft: "1em"
                      };
                   return l["default"].createElement("div", {
                       style: e
                   }, l["default"].createElement("a", {
                       href: "#",
                       className: "hidden-sm-up",
                       onClick: this.switchToArena.bind(this),
                       style: "battle" == this.props.viewMode ? t : {}
                   }, "Arena"))
               }
           }]), e
       }(l["default"].Component);
    e["default"] = (0, c.connect)(function (t, e) {
        var n = Object.keys(t.battle.history[t.battle.devTimeTravelTurn].combatants);
        return {
            isReportRunning: t.battle.isReportRunning,
            viewMode: t.battle.viewMode,
            isRollout: t.battle.submissions.length == n.length
        }
    })(p), t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t, e, n, a) {
        var o = {};
        if (t.ppCost && (o.affectCasterPp = -1 * t.ppCost), t.affectCasterPpPoints > 0) {
            var i = e.maxPp,
               u = e.pp,
               s = u + t.affectCasterPpPoints > i ? i - u : t.affectCasterPpPoints;
            o.affectCasterPp = s
        }
        return r({}, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getPpChanges = n
}, function (t, e) {
    "use strict";

    function n(t, e, n, o) {
        var i = {};
        i.didActionFail = t.getFail(t, e, n, o), t.affectTargetStatus && (i.affectTargetStatus = r(t.affectTargetStatus, n)), t.affectCasterStatus && (i.affectCasterStatus = r(t.affectCasterStatus, e));
        for (var u in i) null === i[u] && delete i[u];
        return a({}, o, i)
    }

    function r(t, e) {
        return "string" == typeof t ? t : Array.isArray(t) && e.status == t[0] ? t[1] : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getStatusChanges = n
}, function (t, e) {
    "use strict";

    function n(t, e, n, a) {
        var o = {};
        if (t.increaseDangerMeter > 0) {
            var i = t.increaseDangerMeter,
               u = e.maxDangerMeter,
               s = e.dangerMeter + u * i;
            o.casterDangerMeter = u > s ? s : u
        }
        if (t.superChargedFrameworkId && (o.casterDangerMeter = 0), 0 != t.affectTargetDangerMeter) {
            var u = n.maxDangerMeter,
               l = n.dangerMeter + u * t.affectTargetDangerMeter;
            o.targetDangerMeter = l > 0 ? l : 0
        }
        return r({}, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getDangerMeter = n
}, function (t, e) {
    "use strict";

    function n(t, e, n, a) {
        var o = {};
        return a.didActionFail ? o.addActionToCloudQueue = [] : o.addActionToCloudQueue = t.getFollowupActions(t, e, n, a), r({}, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getExtraActionAdds = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e, n, r) {
        var a = i["default"][e],
           o = 0;
        a.strongAgainst.forEach(function (t) {
            var e = i["default"][t];
            o += r[e.playerProperty]
        });
        var u = 0;
        a.weakAgainst.forEach(function (t) {
            var e = i["default"][t];
            u += r[e.playerProperty]
        }), u = s(u, r);
        var l = n[a.playerProperty],
           c = .1 * (o - u),
           f = Math.round(10 * c) / 10,
           p = t - l,
           d = p - Math.round(p * -f);
        return -1 > d ? d : -1
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.applyFrameworkBonus = a;
    var o = n(14),
       i = r(o),
       u = n(16),
       s = function (t, e) {
           void 0 === t && (t = 0);
           var n = e.characterUpgrades;
           return (0, u.hasUpgrade)("character-upgrade-006-ii", n) ? t + 2 : (0, u.hasUpgrade)("character-upgrade-006-i", n) ? t + 1 : t
       }
}, function (t, e) {
    "use strict";

    function n(t, e, n, a) {
        var o = {};
        return o.didActionMiss = e.getMiss(t.accuracyModifier), r({}, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getMiss = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e, n, r) {
        var a = {};
        if (0 != t.affectTargetHpPoints || 0 != t.affectTargetHpPointsByPercent)
            if (t.repetitions.length) ! function () {
                var e = (0, i.getRandomInRange)(t.repetitions[0], t.repetitions[1]),
                   n = Array.isArray(t.affectTargetHpPoints) ? t.affectTargetHpPoints : [2, 3, 4, 5, 6],
                   r = (0, u.randomFromArray)(n),
                   o = 0;
                (0, l["default"])(0, e).forEach(function (e, a) {
                    "random" == t.repetitionType && (o += (0, u.randomFromArray)(n)), "map" == t.repetitionType && (o += r), "reduce" == t.repetitionType && (o += r + a)
                }), a.repetitionsCount = e, a.affectTargetHp = -o
            }();
            else {
                if (0 != t.affectTargetHpPoints) {
                    var s = e.attackRoll(t.affectTargetHpPoints, n.defenseRating, n.status, t, n);
                    t.statusMultiplier && n.status == t.statusMultiplier[0] && (s = Math.round(s * t.statusMultiplier[1]), a.wasSuperEffective = !0), t.bypassCasterAttackStats && (s = t.affectTargetHpPoints), a.affectTargetHp = s
                }
                0 != t.affectTargetHpPointsByPercent && (a.affectTargetHp = Math.round(t.affectTargetHpPointsByPercent * n.maxHp))
            }
        if (0 != t.affectCasterHpPointsByPercent && (a.affectCasterHp = Math.round(t.affectCasterHpPointsByPercent * e.maxHp)), a.affectTargetHp < 0 && r.isSuperCharged && (a.affectTargetHp = (0, c.applyFrameworkBonus)(a.affectTargetHp, t.superChargedFrameworkId, e, n)), t.affectCasterHpPoints > 0) {
            var f = e.maxHp,
               p = e.hp,
               d = p + t.affectCasterHpPoints > f ? f - p : t.affectCasterHpPoints;
            a.affectCasterHp = d
        }
        return o({}, r, a)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getRegularAttackChanges = a;
    var i = n(29),
       u = n(17),
       s = n(21),
       l = r(s),
       c = n(107)
}, function (t, e) {
    "use strict";

    function n(t, e, n, a) {
        if (a.didActionFail) return r({}, a);
        var o = {};
        if (t.changeCasterCommittedData && (o.casterCommitData = {
            casterHp: e.hp,
            casterStatus: e.status,
            targetHp: n.hp,
            targetStatus: n.status
        }), t.clearTargetCommittedData && (o.targetCommitData = null), t.useCasterCommittedData) {
            console.log(a);
            var i = e.committedTurnData;
            o.blanketSetCasterHp = i.casterHp, o.blanketSetTargetHp = i.targetHp, o.affectCasterStatus = i.casterStatus, o.affectTargetStatus = i.targetStatus, o.casterCommitData = null
        }
        return r({}, a, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getRevertChanges = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e, n, r) {
        var a = {},
           i = t.superChargedFrameworkId;
        return a.isSuperCharged = Boolean(i), i && (a.frameworkName = u["default"][i].name), o({}, r, a)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getSuperCharged = a;
    var i = n(14),
       u = r(i)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t, e, n, r) {
        var o = {};
        if (t.theftQuantity > 0) {
            var u = [].concat(a((0, s["default"])(n.items))).filter(function (e, n) {
                return n < t.theftQuantity
            }),
               l = f(u, e.items),
               d = p(u, n.items);
            o.setCasterItemsList = l, o.setTargetItemsList = d, o.stolenItemNames = u.map(function (t) {
                return c["default"][t].name
            }), t.stealAndUseItem === !0 && u.length && (o.shouldImmediatelyUse = u[0])
        }
        return "Item" == t.type && ! function () {
            var n = e.items.indexOf(t.actionId),
               r = e.items.filter(function (t, e) {
                   return e != n
               });
            r.length != e.items.length && (o.setCasterItemsList = r)
        }(), i({}, r, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getUpdatedItemsList = o;
    var u = n(201),
       s = r(u),
       l = n(6),
       c = r(l),
       f = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
              e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
           return [].concat(a(e), a(t))
       },
       p = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
              e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
              n = [].concat(a(e));
           return t.forEach(function (t) {
               var e = n.indexOf(t);
               n = n.filter(function (t, n) {
                   return n != e
               })
           }), n
       }
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        (0, a.isDangerMeterUsable)(t);
        var n = (0, a.findLeastExpensivePpMove)(t);
        return n ? {
            casterId: t.id,
            targetId: e.id,
            superChargedFrameworkId: null,
            actionId: n
        } : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.conservativeAiPath = r;
    var a = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        var n = (0, a.doesCombatantHaveAnyStatus)(e);
        if (n) return null;
        var r = (0, a.findAttackThatGivesEnemyNegativeStatus)(t);
        return r ? {
            casterId: t.id,
            targetId: e.id,
            superChargedFrameworkId: null,
            actionId: r
        } : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.cursingAiPath = r;
    var a = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        if (!(0, a.doesCombatantHaveItems)(e)) return null;
        var n = (0, a.findAttackThatCanStealItems)(t);
        return n ? {
            casterId: t.id,
            targetId: e.id,
            superChargedFrameworkId: null,
            actionId: n
        } : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.kleptoAiPath = r;
    var a = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        var n = null;
        if ((0, a.doesCombatantHaveNegativeStatus)(t) && (n = (0, a.findAttackThatCanHealStatus)(t), n || (n = (0, a.findItemThatCanHealStatus)(t))), !n) {
            var r = (0, a.isCombatantHpFull)(t);
            r || (n = (0, a.findItemThatCanRecoverHp)(t))
        }
        return n || (0, a.doesCombatantHaveAnyStatus)(t) || (n = (0, a.findAttackThatGivesMePositiveStatus)(t)), n ? {
            casterId: t.id,
            targetId: t.id,
            superChargedFrameworkId: null,
            actionId: n
        } : null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.protectiveAiPath = r;
    var a = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        return {
            casterId: t.id,
            targetId: e.id,
            superChargedFrameworkId: null,
            actionId: (0, a.findRandomAttack)(t)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.randomAiPath = r;
    var a = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        var n = (0, o.findMostDamagingAttack)(t);
        if ("lag" == t.status) return null;
        var r = {
            casterId: t.id,
            targetId: e.id,
            actionId: n
        };
        return (0, o.isDangerMeterUsable)(t) ? a({}, r) : a({}, r, {
            superChargedFrameworkId: null
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.viciousAiPath = r;
    var o = n(10)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e, n) {
        void 0 === t && (t = {});
        var r = (0, i.randomFromArray)(o(t));
        return v(r, e, n)
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
           e = [];
        for (var n in t) (0, m["default"])(t[n]).forEach(function (t) {
            e.push(n)
        });
        return e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getTraitPathChoice = a, e.concatTraits = o;
    var i = n(17),
       u = n(118),
       s = n(116),
       l = n(114),
       c = n(115),
       f = n(113),
       p = n(117),
       d = n(21),
       m = r(d),
       v = function (t, e, n) {
           void 0 === t && (t = "");
           var r = null;
           return "vicious" == t && (r = (0, u.viciousAiPath)(e, n)), "protective" == t && (r = (0, s.protectiveAiPath)(e, n)), "cursing" == t && (r = (0, l.cursingAiPath)(e, n)), "klepto" == t && (r = (0, c.kleptoAiPath)(e, n)), "conservative" == t && (r = (0, f.conservativeAiPath)(e, n)), "random" == t && (r = (0, p.randomAiPath)(e, n)), r || (0, p.randomAiPath)(e, n)
       }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(3),
       d = n(16),
       m = n(122),
       v = r(m),
       h = n(121),
       y = r(h),
       g = n(14),
       b = r(g),
       O = n(40),
       _ = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), u(e, [{
               key: "handleChange",
               value: function () {
                   var t = i({}, this.props.combatant, {
                       name: this.refs.name.value,
                       "class": this.refs["class"].value,
                       level: this.refs.level.value,
                       skin: this.refs.skin.value
                   });
                   (0, p.setCombatantValue)(this.props.combatantId, i({}, t, (0, d.getCombatantStats)(t)))
               }
           }, {
               key: "renderStatus",
               value: function () {
                   var t = this.props.combatant;
                   return c["default"].createElement("div", null, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Stats"), c["default"].createElement("div", null, c["default"].createElement("label", null, "HP"), c["default"].createElement("span", null, t.hp), "/", c["default"].createElement("span", null, t.maxHp)), c["default"].createElement("div", null, c["default"].createElement("label", null, "PP"), c["default"].createElement("span", null, t.pp), "/", c["default"].createElement("span", null, t.maxPp)), c["default"].createElement("div", null, c["default"].createElement("label", null, "DM"), c["default"].createElement("span", null, t.dangerMeter), "/", c["default"].createElement("span", null, t.maxDangerMeter)), c["default"].createElement("div", null, c["default"].createElement("label", null, "Sts"), c["default"].createElement("span", null, t.status)))
               }
           }, {
               key: "renderDiff",
               value: function (t, e) {
                   return t > e ? c["default"].createElement("span", {
                       style: {
                           color: "#29C09E"
                       }
                   }, "(+", t - e, ")") : null
               }
           }, {
               key: "renderStatsInfo",
               value: function () {
                   var t = (0, d.getCombatantStats)(this.props.combatant),
                      e = (0, d.getCombatantStats)(this.props.opponentCombatant);
                   return c["default"].createElement("div", null, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Stats"), c["default"].createElement("div", null, c["default"].createElement("label", null, "HP"), c["default"].createElement("span", null, t.maxHp), " ", c["default"].createElement("span", null, this.renderDiff(t.maxHp, e.maxHp))), c["default"].createElement("div", null, c["default"].createElement("label", null, "PP"), c["default"].createElement("span", null, t.maxPp), " ", c["default"].createElement("span", null, this.renderDiff(t.maxPp, e.maxPp))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Atk"), c["default"].createElement("span", null, t.attackStatPoints), " ", c["default"].createElement("span", null, this.renderDiff(t.attackStatPoints, e.attackStatPoints))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Def"), c["default"].createElement("span", null, t.defenseStatPoints), " ", c["default"].createElement("span", null, this.renderDiff(t.defenseStatPoints, e.defenseStatPoints))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Spec"), c["default"].createElement("span", null, t.specialStatPoints), " ", c["default"].createElement("span", null, this.renderDiff(t.specialStatPoints, e.specialStatPoints))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Spd"), c["default"].createElement("span", null, t.speedStatPoints), " ", c["default"].createElement("span", null, this.renderDiff(t.speedStatPoints, e.speedStatPoints))))
               }
           }, {
               key: "renderAlignmentInfo",
               value: function () {
                   var t = this,
                      e = (0, O.getAlignmentByUpgrades)(this.props.combatant.laptopUpgrades),
                      n = (0, O.getAlignmentByUpgrades)(this.props.opponentCombatant.laptopUpgrades);
                   return c["default"].createElement("div", null, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Alignment"), Object.keys(b["default"]).map(function (r) {
                       var a = b["default"][r];
                       return c["default"].createElement("div", {
                           key: r
                       }, c["default"].createElement("label", {
                           className: "label-long"
                       }, a.name), c["default"].createElement("span", null, e[a.playerProperty]), " ", c["default"].createElement("span", null, t.renderDiff(e[a.playerProperty], n[a.playerProperty])))
                   }))
               }
           }, {
               key: "renderCharacterInfo",
               value: function () {
                   var t = this.props.combatant;
                   return c["default"].createElement("div", {
                       className: "combatant-card-section"
                   }, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Character"), c["default"].createElement("div", null, c["default"].createElement("label", null, "Name"), c["default"].createElement("input", {
                       onChange: this.handleChange.bind(this),
                       value: t.name,
                       ref: "name"
                   })), c["default"].createElement("div", null, c["default"].createElement("label", null, "Level"), c["default"].createElement("select", {
                       onChange: this.handleChange.bind(this),
                       value: t.level,
                       ref: "level"
                   }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(function (t) {
                       return c["default"].createElement("option", {
                           value: t,
                           key: t
                       }, t)
                   }))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Class"), c["default"].createElement("select", {
                       onChange: this.handleChange.bind(this),
                       value: t["class"],
                       ref: "class"
                   }, c["default"].createElement("option", {
                       value: "ninja"
                   }, "Ninja"), c["default"].createElement("option", {
                       value: "monk"
                   }, "Monk"), c["default"].createElement("option", {
                       value: "captain"
                   }, "Captain"))), c["default"].createElement("div", null, c["default"].createElement("label", null, "Skin"), c["default"].createElement("select", {
                       ref: "skin",
                       value: t.skin,
                       onChange: this.handleChange.bind(this)
                   }, c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg"
                   }, "svJacob"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg"
                   }, "Punky"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg"
                   }, "Travis"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg"
                   }, "Matt"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg"
                   }, "Berg"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg"
                   }, "Jessie"), c["default"].createElement("option", {
                       value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg"
                   }, "Marie"))))
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.combatant;
                   return c["default"].createElement("div", {
                       className: "card combatant-card"
                   }, c["default"].createElement("div", null, c["default"].createElement("div", {
                       className: "combatant-image",
                       style: {
                           backgroundImage: "url(" + t.skin + ")"
                       }
                   })), c["default"].createElement("div", null, c["default"].createElement("div", {
                       className: "combatant-card-section"
                   }, this.renderCharacterInfo()), c["default"].createElement("div", {
                       className: "combatant-card-section"
                   }, this.renderStatus()), c["default"].createElement("div", {
                       className: "combatant-card-section _flex-row _flex-row-top"
                   }, c["default"].createElement("div", {
                       className: "_c50"
                   }, this.renderStatsInfo()), c["default"].createElement("div", {
                       className: "_c50"
                   }, this.renderAlignmentInfo())), c["default"].createElement("div", {
                       className: "combatant-card-section"
                   }, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Laptop Upgrades"), c["default"].createElement(v["default"], {
                       combatantId: this.props.combatantId
                   })), c["default"].createElement("div", {
                       className: "combatant-card-section"
                   }, c["default"].createElement("div", {
                       className: "combatant-card-section-label"
                   }, "Character Upgrade"), c["default"].createElement(y["default"], {
                       combatantId: this.props.combatantId
                   }))))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               var n = Object.keys(t.battle.history[t.battle.devTimeTravelTurn].combatants).find(function (t) {
                   return t != e.combatantId
               });
               return {
                   combatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[e.combatantId] || {},
                   opponentCombatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[n] || {}
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = _, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(60),
       d = r(p),
       m = n(3),
       v = function (t) {
           function e() {
               o(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           i(e, t), u(e, [{
               key: "render",
               value: function () {
                   var t = this,
                      e = Object.keys(d["default"]).map(function (e, n) {
                          var r = d["default"][e],
                             a = t.props.combatant.characterUpgrades.find(function (t) {
                                 return t.libraryId == e
                             });
                          return c["default"].createElement(h, {
                              key: n,
                              isChecked: !!a,
                              name: r.name,
                              upgradeId: e,
                              combatantId: t.props.combatantId,
                              characterUpgrades: t.props.combatant.characterUpgrades
                          })
                      });
                   return c["default"].createElement("div", null, e)
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   combatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[e.combatantId] || {}
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = v;
    var h = function (t) {
        function e() {
            o(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
        }
        return i(e, t), u(e, [{
            key: "handleUpgradeChange",
            value: function () {
                var t = this;
                return this.props.isChecked ? void (0, m.setCombatantValue)(this.props.combatantId, {
                    characterUpgrades: this.props.characterUpgrades.filter(function (e) {
                        return e.libraryId != t.props.upgradeId
                    })
                }) : void (0, m.setCombatantValue)(this.props.combatantId, {
                    characterUpgrades: [].concat(a(this.props.characterUpgrades), [{
                        libraryId: this.props.upgradeId
                    }])
                })
            }
        }, {
            key: "render",
            value: function () {
                return c["default"].createElement("div", null, this.props.name, c["default"].createElement("input", {
                    ref: "checkbox",
                    onChange: this.handleUpgradeChange.bind(this),
                    checked: this.props.isChecked,
                    type: "checkbox"
                }))
            }
        }]), e
    }(c["default"].Component);
    t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(3),
       d = n(34),
       m = r(d),
       v = function (t) {
           function e() {
               o(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           i(e, t), u(e, [{
               key: "handleRemove",
               value: function (t) {
                   (0, p.setCombatantValue)(this.props.combatantId, {
                       laptopUpgrades: this.props.combatant.laptopUpgrades.filter(function (e, n) {
                           return n != t
                       })
                   })
               }
           }, {
               key: "handleAdd",
               value: function (t) {
                   (0, p.setCombatantValue)(this.props.combatantId, {
                       laptopUpgrades: [].concat(a(this.props.combatant.laptopUpgrades), [{
                           libraryId: this.refs.adder.value,
                           isEnabled: !0
                       }])
                   }), this.refs.adder.value = ""
               }
           }, {
               key: "render",
               value: function () {
                   var t = this,
                      e = this.props.combatant.laptopUpgrades.map(function (e, n) {
                          return c["default"].createElement(h, {
                              key: n,
                              handleRemove: t.handleRemove.bind(t),
                              listIndex: n,
                              libraryId: e.libraryId
                          })
                      });
                   return c["default"].createElement("div", null, c["default"].createElement("div", null, e), c["default"].createElement("div", null, c["default"].createElement("select", {
                       onChange: this.handleAdd.bind(this),
                       ref: "adder"
                   }, c["default"].createElement("option", {
                       value: ""
                   }, "Add Upgrade..."), Object.keys(m["default"]).map(function (t) {
                       return c["default"].createElement("option", {
                           value: t,
                           key: t
                       }, m["default"][t].name)
                   }))))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   combatant: t.battle.history[t.battle.devTimeTravelTurn].combatants[e.combatantId] || {}
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = v;
    var h = function (t) {
        function e() {
            o(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
        }
        return i(e, t), u(e, [{
            key: "handleRemove",
            value: function () {
                this.props.handleRemove(this.props.listIndex)
            }
        }, {
            key: "render",
            value: function () {
                var t = m["default"][this.props.libraryId];
                return c["default"].createElement("div", {
                    className: "_flex-row upgrade-row"
                }, c["default"].createElement("div", null, t.name), c["default"].createElement("button", {
                    onClick: this.handleRemove.bind(this)
                }, "Remove"))
            }
        }]), e
    }(c["default"].Component);
    t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(120),
       p = r(f),
       d = n(127),
       m = r(d),
       v = n(125),
       h = r(v),
       y = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "render",
               value: function () {
                   var t = this.props.combatantIds.map(function (t) {
                       return l["default"].createElement(p["default"], {
                           key: t,
                           combatantId: t
                       })
                   });
                   return l["default"].createElement("div", {
                       style: {
                           background: "#E0E5EE",
                           padding: "1em",
                           height: "100%"
                       }
                   }, l["default"].createElement("div", {
                       className: "b4"
                   }, l["default"].createElement("div", {
                       className: "wrap"
                   }, l["default"].createElement(m["default"], null)), l["default"].createElement("div", {
                       className: "wrap"
                   }, l["default"].createElement("div", {
                       className: "col1"
                   }, t), l["default"].createElement("div", {
                       className: "col2"
                   }, l["default"].createElement("div", {
                       className: "card"
                   }, l["default"].createElement(h["default"], null))))))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   combatantIds: Object.keys(t.battle.history[t.battle.devTimeTravelTurn].combatants)
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = y, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(126),
       p = r(f),
       d = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "getText",
               value: function (t) {
                   return "message" == t.type ? t.content.filter(function (t) {
                       return !t.match(/^@@/)
                   }).join("").replace(/\[FAST\]/g, "") : "animation" == t.type ? "[Animation: " + t.animationName + "]" : "stateChange" == t.type ? "___{State Change}___" : void 0
               }
           }, {
               key: "render",
               value: function () {
                   var t = this,
                      e = this.props.model.steps.map(function (e, n) {
                          var r = "message" == e.type ? "" : "battle-turn-sub-event";
                          return l["default"].createElement("div", {
                              key: n,
                              className: "battle-log-line " + r
                          }, t.getText(e))
                      });
                   return l["default"].createElement("div", null, l["default"].createElement(p["default"], {
                       turnId: this.props.model.turnId
                   }), l["default"].createElement("div", {
                       className: "battle-turn"
                   }, 0 == this.props.model.turnId ? "INIT" : e))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {}
           })(e) || e
       }(l["default"].Component);
    e["default"] = d, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(124),
       p = r(f),
       d = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "render",
               value: function () {
                   return l["default"].createElement("div", null, this.props.turnRolloutHistoryEntries.map(function (t, e) {
                       return l["default"].createElement(p["default"], {
                           key: e,
                           turnId: e,
                           model: t
                       })
                   }).reverse())
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   turnRolloutHistoryEntries: t.battle.turnRolloutHistoryEntries
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = d, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(3),
       p = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "handleClick",
               value: function (t) {
                   var e = this;
                   t.preventDefault(), (0, f.setBattleValue)({
                       history: this.props.history.filter(function (t, n) {
                           return n <= e.props.turnId
                       }),
                       turnRolloutHistoryEntries: this.props.turnRolloutHistoryEntries.filter(function (t, n) {
                           return n <= e.props.turnId
                       }),
                       devTimeTravelTurn: this.props.turnId
                   })
               }
           }, {
               key: "render",
               value: function () {
                   return this.props.devTimeTravelTurn == this.props.turnId ? null : l["default"].createElement("a", {
                       href: "#",
                       onClick: this.handleClick.bind(this),
                       className: "battle-revert-link"
                   }, "Revert to here (#", this.props.turnId, ")")
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   history: t.battle.history,
                   turnRolloutHistoryEntries: t.battle.turnRolloutHistoryEntries,
                   devTimeTravelTurn: t.battle.devTimeTravelTurn
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(26),
       d = n(3),
       m = (n(24), n(7)),
       v = n(12),
       h = n(25),
       y = n(6),
       g = r(y),
       b = n(14),
       O = r(b),
       _ = function (t) {
           function e() {
               o(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           i(e, t), u(e, [{
               key: "runWholeBattle",
               value: function () {
                   var t = this,
                      e = function n() {
                          var e = t.runSmartTurn();
                          (0, v.getDeadCombatantId)(e.nextState) ? console.log("BATTLE OVER!") : setTimeout(function () {
                              n()
                          }, 10)
                      };
                   e()
               }
           }, {
               key: "runSmartTurn",
               value: function () {
                   var t = this.props.history[this.props.history.length - 1].combatants,
                      e = Object.keys(t)[0],
                      n = Object.keys(t)[1],
                      r = [(0, h.getSmartAttack)(t[e], t[n], {}, null, null), (0, h.getSmartAttack)(t[n], t[e], {}, null, null)],
                      o = (0, p.executeTurn)(r);
                   return (0, d.setBattleValue)({
                       history: [].concat(a(this.props.history), [o.nextState]),
                       turnRolloutHistoryEntries: [].concat(a(this.props.turnRolloutHistoryEntries), [{
                           turnId: this.props.turnRolloutHistoryEntries.length,
                           steps: o.rolloutSteps
                       }]),
                       devTimeTravelTurn: this.props.devTimeTravelTurn + 1
                   }), o
               }
           }, {
               key: "handleSmartTurnClick",
               value: function () {
                   this.runSmartTurn()
               }
           }, {
               key: "handleRunActionsClick",
               value: function () {
                   var t = this.props.history[this.props.history.length - 1].combatants,
                      e = Object.keys(t)[0],
                      n = Object.keys(t)[1],
                      r = this.refs[e + "-select"].value,
                      o = this.refs[n + "-select"].value,
                      i = this.refs[e + "-dangercheckbox"].checked ? this.refs[e + "-framework"].value || null : null,
                      u = this.refs[n + "-dangercheckbox"].checked ? this.refs[n + "-framework"].value || null : null,
                      s = [(0, h.getSmartAttack)(t[e], t[n], {}, r, i), (0, h.getSmartAttack)(t[n], t[e], {}, o, u)],
                      l = (0, p.executeTurn)(s);
                   (0, d.setBattleValue)({
                       history: [].concat(a(this.props.history), [l.nextState]),
                       turnRolloutHistoryEntries: [].concat(a(this.props.turnRolloutHistoryEntries), [{
                           turnId: this.props.turnRolloutHistoryEntries.length,
                           steps: l.rolloutSteps
                       }]),
                       devTimeTravelTurn: this.props.devTimeTravelTurn + 1
                   })
               }
           }, {
               key: "renderActions",
               value: function (t) {
                   var e = [].concat(a(t.attacks), a(t.items));
                   return e.map(function (t, e) {
                       var n = g["default"][t],
                          r = "Item" == n.type ? "ITEM: " : "";
                       return c["default"].createElement("option", {
                           key: e,
                           value: t
                       }, r, n.name)
                   })
               }
           }, {
               key: "renderCombForm",
               value: function (t) {
                   var e = this.props.history[this.props.history.length - 1].combatants,
                      n = new m.CombatantModel(e[t]),
                      r = n.isDangerMeterUsable(),
                      a = n.getAvailableFrameworkOptions().map(function (t) {
                          var e = O["default"][t];
                          return c["default"].createElement("option", {
                              key: t,
                              value: t
                          }, e.name)
                      });
                   return c["default"].createElement("div", null, c["default"].createElement("span", null, n.name, " "), c["default"].createElement("select", {
                       ref: t + "-select"
                   }, this.renderActions(n)), c["default"].createElement("span", null, c["default"].createElement("input", {
                       ref: t + "-dangercheckbox",
                       type: "checkbox",
                       disabled: !r
                   }), "Danger Charge"), c["default"].createElement("span", null, c["default"].createElement("select", {
                       ref: t + "-framework",
                       disabled: !r
                   }, a)))
               }
           }, {
               key: "render",
               value: function () {
                   var t = this.props.history[this.props.history.length - 1].combatants,
                      e = Object.keys(t)[0],
                      n = Object.keys(t)[1];
                   return c["default"].createElement("div", null, c["default"].createElement("button", {
                       onClick: this.runWholeBattle.bind(this)
                   }, "Run Whole Battle"), c["default"].createElement("button", {
                       onClick: this.handleSmartTurnClick.bind(this)
                   }, "Run Smart Turn"), c["default"].createElement("hr", null), c["default"].createElement("div", null, c["default"].createElement("button", {
                       onClick: this.handleRunActionsClick.bind(this)
                   }, "Run Actions"), c["default"].createElement("div", null, this.renderCombForm(e), this.renderCombForm(n))))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   history: t.battle.history,
                   turnRolloutHistoryEntries: t.battle.turnRolloutHistoryEntries,
                   devTimeTravelTurn: t.battle.devTimeTravelTurn
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = _, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t, e) {
        var n = {};
        return Object.keys(e.combatants).forEach(function (a) {
            n[a] = r({}, e.combatants[a], t.combatants[a])
        }), r({}, e, t, {
            combatants: r({}, e.combatants, n)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getMergedCombatantState = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        if (["natural-death-a", "attack-008-a-resolve", "attack-special-006-a", "natural-recover-lag"].indexOf(t) > -1) return t;
        var n = i["default"][t];
        return "lag" == e.status && "Item" != n.type ? "natural-lag-a" : t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getReplacedActionIdMiddleware = a;
    var o = n(6),
       i = r(o)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o(t, e) {
        var n = new l.CombatantModel(e.combatants[t.casterId]),
           r = new l.CombatantModel(e.combatants[t.targetId]),
           o = (0, h.getReplacedActionIdMiddleware)(t.actionId, n),
           u = i({
               actionId: o,
               superChargedFrameworkId: t.superChargedFrameworkId
           }, s["default"][o]);
        if ((0, v.getDeadCombatantId)(e) && "natural-death-a" != t.actionId) return null;
        if (u.dependentOnCasterStatus && u.dependentOnCasterStatus != n.status) return null;
        var y = (0, c.getStepDescriptionObject)(u, n, r),
           g = (0, f.getStateChangesFromDescription)(y, e.combatants),
           b = (0, d.getUpdatedCloudQueue)(y, e.cloudQueue),
           O = (0, p.getMergedCombatantState)({
               cloudQueue: b,
               combatants: g
           }, e),
           _ = (0, m.getStepOutput)(u, n, r, y, O);
        return {
            nextState: O,
            steps: [].concat(a(_), [{
                type: "stateChange",
                newState: O
            }]),
            stepDescriptionObject: y
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getRolloutStep = o;
    var u = n(6),
       s = r(u),
       l = n(7),
       c = n(133),
       f = n(131),
       p = n(128),
       d = n(135),
       m = n(134),
       v = n(12),
       h = n(129)
}, function (t, e) {
    "use strict";

    function n(t, e) {
        var n = {};
        return n[t.casterId] = {}, n[t.targetId] = {}, [{
            forId: t.casterId,
            descriptionProp: "affectCasterPp",
            stateProp: "pp",
            addToOld: !0
        }, {
            forId: t.targetId,
            descriptionProp: "affectTargetPp",
            stateProp: "pp",
            addToOld: !0
        }, {
            forId: t.casterId,
            descriptionProp: "affectCasterHp",
            stateProp: "hp",
            addToOld: !0
        }, {
            forId: t.targetId,
            descriptionProp: "affectTargetHp",
            stateProp: "hp",
            addToOld: !0
        }, {
            forId: t.casterId,
            descriptionProp: "blanketSetCasterHp",
            stateProp: "hp",
            addToOld: !1
        }, {
            forId: t.targetId,
            descriptionProp: "blanketSetTargetHp",
            stateProp: "hp",
            addToOld: !1
        }, {
            forId: t.casterId,
            descriptionProp: "affectCasterStatus",
            stateProp: "status",
            addToOld: !1
        }, {
            forId: t.targetId,
            descriptionProp: "affectTargetStatus",
            stateProp: "status",
            addToOld: !1
        }, {
            forId: t.casterId,
            descriptionProp: "setCasterItemsList",
            stateProp: "items",
            addToOld: !1
        }, {
            forId: t.targetId,
            descriptionProp: "setTargetItemsList",
            stateProp: "items",
            addToOld: !1
        }, {
            forId: t.casterId,
            descriptionProp: "casterDangerMeter",
            stateProp: "dangerMeter",
            addToOld: !1
        }, {
            forId: t.targetId,
            descriptionProp: "targetDangerMeter",
            stateProp: "dangerMeter",
            addToOld: !1
        }, {
            forId: t.casterId,
            descriptionProp: "casterCommitData",
            stateProp: "committedTurnData",
            addToOld: !1
        }, {
            forId: t.targetId,
            descriptionProp: "targetCommitData",
            stateProp: "committedTurnData",
            addToOld: !1
        }].forEach(function (r) {
            if (Object.keys(t).indexOf(r.descriptionProp) > -1) {
                if (r.addToOld) return void (n[r.forId][r.stateProp] = e[r.forId][r.stateProp] + t[r.descriptionProp]);
                n[r.forId][r.stateProp] = t[r.descriptionProp]
            }
        }), r({}, n)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getStateChangesFromDescription = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1],
           n = i["default"][t],
           r = e - 1;
        return {
            maxHp: n.hpGrowthPattern[r],
            maxPp: n.ppGrowthPattern[r],
            atk: n.atkGrowthPattern[r],
            def: n.defGrowthPattern[r],
            spec: n.specGrowthPattern[r],
            spd: n.spdGrowthPattern[r]
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getClassStatsByLevel = a;
    var o = n(61),
       i = r(o)
}, function (t, e, n) {
    "use strict";

    function r(t, e, n) {
        var r = {
            casterId: e.id,
            targetId: n.id,
            addActionToCloudQueue: [],
            isCasterComputerControlled: e.isComputerControlled
        };
        return r = (0, l.getSuperCharged)(t, e, n, r), r = (0, u.getPpChanges)(t, e, n, r), r = (0, s.getMiss)(t, e, n, r), r.didActionMiss ? a({}, r) : (r = (0, o.getRegularAttackChanges)(t, e, n, r), r = (0, i.getStatusChanges)(t, e, n, r), r = (0, c.getExtraActionAdds)(t, e, n, r), r = (0, f.getUpdatedItemsList)(t, e, n, r), r = (0, p.getDangerMeter)(t, e, n, r), r = (0, d.getRevertChanges)(t, e, n, r), a({}, r))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.getStepDescriptionObject = r;
    var o = n(109),
       i = n(104),
       u = n(103),
       s = n(108),
       l = n(111),
       c = n(106),
       f = n(112),
       p = n(105),
       d = n(110)
}, function (t, e) {
    "use strict";

    function n(t, e, n, r, u) {
        var s = a(t, e, n, r, u);
        return s || (s = o(t, e, n, r, u)), s || (s = i(t, e, n, r, u)), s
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getStepOutput = n;
    var r = function (t, e, n, r, a) {
        return t.superChargedFrameworkId ? {
            type: "message",
            content: [e.name + " SUPER CHARGES the power of ", "[FAST]" + r.frameworkName.toUpperCase() + "!"]
        } : {
            type: "message",
            content: [e.name + " used ", "@@pause_400@@", "[FAST]" + t.name + "!"]
        }
    },
       a = function (t, e, n, a, o) {
           return a.didActionMiss ? "function" == typeof t.customMissStep ? t.customMissStep(t, e, n, a, o) : [r(t, e, n, a, o), {
               type: "message",
               content: ["but it missed!"]
           }] : null
       },
       o = function (t, e, n, a, o) {
           return a.didActionFail ? "function" == typeof t.customFailStep ? t.customFailStep(t, e, n, a, o) : [r(t, e, n, a, o), {
               type: "message",
               content: ["but it failed."]
           }] : null
       },
       i = function (t, e, n, a, o) {
           return "function" == typeof t.customSuccessStep ? t.customSuccessStep(t, e, n, a, o) : [r(t, e, n, a, o), {
               type: "animation",
               animationName: t.animation,
               actionDescription: a
           }]
       }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function a(t, e) {
        if (t.addActionToCloudQueue.length > 0) {
            var n = [].concat(r(e));
            return t.addActionToCloudQueue.forEach(function (t) {
                n = (0, i.addQueuedSubmissions)(n, t.action, (0, o.getRandomInt)(t.turnRange[0], t.turnRange[1]))
            }), n
        }
        return e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getUpdatedCloudQueue = a;
    var o = n(29),
       i = n(24)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        var e = i(t),
           n = l["default"].getState().battle.history,
           r = n[n.length - 1],
           a = (0, p.modelsFromObject)(r.combatants),
           u = (0, p.modelsFromObject)(e.combatants),
           s = [];
        a[0].hp != u[0].hp && s.push({
            combatantId: a[0]._id,
            wasHp: a[0].hp,
            changeInStartValue: -1 * (a[0].hp - u[0].hp)
        }), a[1].hp != u[1].hp && s.push({
            combatantId: a[1]._id,
            wasHp: a[1].hp,
            changeInStartValue: -1 * (a[1].hp - u[1].hp)
        });
        var c = 0,
           v = function () {
               c += 1, c == s.length && o(e)
           };
        s.length > 0 ? s.forEach(function (t) {
            var e = function (e) {
                (0, f.setCombatantValue)(t.combatantId, {
                    hp: e
                })
            };
            t.changeInStartValue < 0 && ((0, f.setCombatantValue)(t.combatantId, {
                animation: "blink 0.3s steps(2, start) infinite"
            }), m.sfxBabum.play()), (0, d.runEaseOut)(t.wasHp, t.changeInStartValue, 120, e, v)
        }) : o(e)
    }

    function o(t) {
        var e = i(t);
        (0, f.setLatestHistory)(e), (0, c.doStep)()
    }

    function i(t) {
        var e = l["default"].getState().battle.history,
           n = e[e.length - 1],
           r = {};
        for (var a in t.combatants) {
            var o = u({}, t.combatants[a]),
               i = n.combatants[a].animation;
            o.animation = i.match(/blink/) ? "initial" : i, r[a] = u({}, o)
        }
        return u({}, t, {
            combatants: u({}, r)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.gradualStateChange = a, e.removeAnimationFromState = i;
    var s = n(4),
       l = r(s),
       c = n(5),
       f = n(3),
       p = n(44),
       d = n(151),
       m = n(9)
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        name: "Combatant Name",
        level: 3,
        xp: 0,
        "class": "ninja",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
        laptopUpgrades: [],
        characterUpgrades: [],
        items: [],
        hp: 50,
        maxHp: 50,
        pp: 50,
        maxPp: 50,
        maxDangerMeter: 100,
        dangerMeter: 0,
        committedTurnData: null,
        status: "normal",
        healthStatPoints: 0,
        attackStatPoints: 0,
        defenseStatPoints: 0,
        speedStatPoints: 0,
        efficiencyStatPoints: 0,
        healthModifier: 0,
        attackModifier: 0,
        defenseModifier: 0,
        speedModifier: 0,
        efficiencyModifier: 0,
        accuracyModifier: 0,
        isComputerControlled: !1,
        isChallenger: !1,
        computerAiTraits: {
            vicious: 1,
            protective: 1,
            cursing: 1,
            conservative: 1
        },
        animation: "initial"
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
           n = [e],
           r = function () {
               var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
               n.push(t)
           },
           o = function () {
               return u({}, n[n.length - 1])
           },
           c = [],
           f = function () {
               var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
               c = [].concat(a(c), a(t))
           };
        return t.forEach(function (t) {
            var e = o(),
               n = i(t, e.combatants[t.casterId]);
            n.forEach(function (e) {
                var n = o(),
                   a = (0, s.getRolloutStep)(e, n);
                if (a) {
                    if (r(u({}, a.nextState)), f(a.steps), a.stepDescriptionObject.shouldImmediatelyUse) {
                        var i = {
                            casterId: t.casterId,
                            targetId: t.casterId,
                            actionId: a.stepDescriptionObject.shouldImmediatelyUse
                        },
                           c = (0, s.getRolloutStep)(i, a.nextState);
                        r(u({}, c.nextState)), f(c.steps)
                    }
                    var p = (0, l.getDeadCombatantId)(a.nextState);
                    if (p) {
                        var d = {
                            casterId: p,
                            targetId: p,
                            actionId: "natural-death-a"
                        },
                           m = (0, s.getRolloutStep)(d, a.nextState);
                        r(u({}, m.nextState)), f(m.steps)
                    }
                }
            })
        }), {
            rolloutSteps: c,
            nextState: o()
        }
    }

    function i(t, e) {
        return "memory-leak" == e.status ? [t, {
            casterId: t.casterId,
            targetId: t.casterId,
            actionId: "natural-memory-leak-a"
        }] : "fire" == e.status ? [t, {
            casterId: t.casterId,
            targetId: t.casterId,
            actionId: "natural-fire-a"
        }] : [t]
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.processActions = o, e.getSubactions = i;
    var s = n(130),
       l = n(12),
       c = n(6);
    r(c)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        return Object.keys(t).map(function (e) {
            var n = t[e];
            return new a.CombatantModel(n)
        }).filter(function (t) {
            return e(t)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getCombatantsByQuery = r;
    var a = n(7)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = function (t) {
           function e() {
               a(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), u(e, [{
               key: "getBackground",
               value: function (t) {
                   return "number" == typeof t ? t >= 7 ? {
                       color: "white",
                       background: "#27ae60"
                   } : 3 >= t ? {
                       color: "white",
                       background: "#e74c3c"
                   } : 5 == t ? {
                       background: "#bdc3c7"
                   } : {
                       background: "#f1c40f"
                   } : {}
               }
           }, {
               key: "render",
               value: function () {
                   var t = i({}, this.getBackground(this.props.content));
                   return c["default"].createElement("td", {
                       style: t
                   }, this.props.content)
               }
           }]), e
       }(c["default"].Component);
    e["default"] = f, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function o() {
        var t = l["default"].getState().battle.history[l["default"].getState().battle.history.length - 1].combatants,
           e = Object.keys(t)[0],
           n = Object.keys(t)[1],
           r = [(0, c.getSmartAttack)(t[e], t[n], {}, null, null), (0, c.getSmartAttack)(t[n], t[e], {}, null, null)],
           o = (0, v.executeTurn)(r);
        return (0, h.setBattleValue)({
            history: [].concat(a(l["default"].getState().battle.history), [o.nextState]),
            turnRolloutHistoryEntries: [].concat(a(l["default"].getState().battle.turnRolloutHistoryEntries), [{
                turnId: l["default"].getState().battle.turnRolloutHistoryEntries.length,
                steps: o.rolloutSteps
            }]),
            devTimeTravelTurn: l["default"].getState().battle.devTimeTravelTurn + 1
        }), o
    }

    function i(t, e, n, r) {
        (0, p["default"])(u({}, t), u({}, e));
        var i = function s() {
            var t = o();
            if ((0, m.getDeadCombatantId)(t.nextState)) {
                var e = (0, d.getWinningCombatantId)(t.nextState);
                console.log("BATTLE OVER!", e), r([].concat(a(n), [e]))
            } else setTimeout(function () {
                s()
            }, 10)
        };
        i()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.runWholeBattle = i;
    var s = n(4),
       l = r(s),
       c = n(25),
       f = n(27),
       p = r(f),
       d = n(41),
       m = n(12),
       v = n(26),
       h = n(3)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(143),
       o = n(141),
       i = function () {
           var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
              e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
           return e.filter(function (e) {
               return e === t
           }).length
       };
    e["default"] = function (t, e, n) {
        void 0 === t && (t = []);
        var u = function l() {
            function t() {
                var s = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                if (s.length < 10) u[0] != u[1] ? (0, o.runWholeBattle)(n[u[0]], n[u[1]], s, t) : t([].concat(r(s), [u[0]]));
                else if (e({
                        firstCombatantId: u[0],
                        firstCombatantWins: i(u[0], s),
                        secondCombatantId: u[1],
                        secondCombatantWins: i(u[1], s)
                }), a.length > 1) {
                    var c = a.filter(function (t, e) {
                        return e > 0
                    });
                    l(c)
                }
            }
            var a = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
               u = a[0];
            console.log(u), t()
        },
           s = (0, a.getMatchupPairs)(t);
        u(s)
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = [];
        return t.forEach(function (n) {
            t.forEach(function (t) {
                var a = [n, t],
                   o = !0;
                n !== t && e.forEach(function (t) {
                    r(a, t) && (o = !1)
                }), o && e.push(a)
            })
        }), e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getMatchupPairs = n;
    var r = function () {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [1, 2] : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? [2, 1] : arguments[1];
        return e.indexOf(t[0]) > -1 && e.indexOf(t[1]) > -1
    }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
        return t
    },
       u = function () {
           function t(t, e) {
               for (var n = 0; n < e.length; n++) {
                   var r = e[n];
                   r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
               }
           }
           return function (e, n, r) {
               return n && t(e.prototype, n), r && t(e, r), e
           }
       }(),
       s = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       l = n(1),
       c = r(l),
       f = n(2),
       p = n(145),
       d = r(p),
       m = n(44),
       v = n(22),
       h = (r(v), n(142)),
       y = r(h),
       g = n(3),
       b = function (t) {
           function e() {
               a(this, n), s(Object.getPrototypeOf(n.prototype), "constructor", this).call(this), this.GeneratedCombatants = (0, v.getGeneratedCharacters)(), this.state = {
                   columns: (0, m.modelsFromObject)(this.GeneratedCombatants),
                   rowData: {}
               }
           }
           o(e, t), u(e, [{
               key: "handleRunReportButton",
               value: function () {
                   var t = this;
                   this.setState({
                       rowData: {}
                   }, function () {
                       (0, g.setBattleValue)({
                           isReportRunning: !0
                       });
                       var e = Object.keys(t.GeneratedCombatants);
                       (0, y["default"])(e, t.handleNewMatchupResult.bind(t), t.GeneratedCombatants)
                   })
               }
           }, {
               key: "handleNewMatchupResult",
               value: function (t) {
                   var e = i({}, this.state.rowData),
                      n = t.firstCombatantId == t.secondCombatantId ? "X" : t.firstCombatantWins,
                      r = t.firstCombatantId == t.secondCombatantId ? "X" : t.secondCombatantWins;
                   e[t.firstCombatantId + "_x_" + t.secondCombatantId] = n, e[t.secondCombatantId + "_x_" + t.firstCombatantId] = r, this.setState({
                       rowData: e
                   })
               }
           }, {
               key: "render",
               value: function () {
                   return c["default"].createElement("div", null, c["default"].createElement("button", {
                       disabled: this.props.isReportRunning,
                       onClick: this.handleRunReportButton.bind(this)
                   }, "Run Report"), c["default"].createElement(d["default"], {
                       columns: this.state.columns,
                       rowData: this.state.rowData
                   }))
               }
           }]);
           var n = e;
           return e = (0, f.connect)(function (t, e) {
               return {
                   isReportRunning: t.battle.isReportRunning
               }
           })(e) || e
       }(c["default"].Component);
    e["default"] = b, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(140),
       f = r(c),
       p = function (t) {
           function e() {
               a(this, e), u(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
           }
           return o(e, t), i(e, [{
               key: "render",
               value: function () {
                   var t = this,
                      e = this.props.columns.map(function (e, n) {
                          return l["default"].createElement("tr", {
                              key: n
                          }, l["default"].createElement("td", null, e.name), t.props.columns.map(function (n, r) {
                              var a = e._id + "_x_" + n._id,
                                 o = t.props.rowData[a];
                              return l["default"].createElement(f["default"], {
                                  key: r,
                                  content: o
                              })
                          }))
                      });
                   return l["default"].createElement("table", {
                       className: "b4-reporting-table"
                   }, l["default"].createElement("thead", null, l["default"].createElement("tr", null, l["default"].createElement("td", null), this.props.columns.map(function (t) {
                       return l["default"].createElement("td", {
                           key: t._id
                       }, t.name)
                   }))), l["default"].createElement("tbody", null, e))
               }
           }]), e
       }(l["default"].Component);
    e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1],
           n = i["default"].getState().battle.history,
           r = n[n.length - 1].combatants,
           a = Object.keys(r)[0],
           o = Object.keys(r)[1],
           s = new u.CombatantModel(r[a]),
           c = l["default"][t];
        return {
            casterId: a,
            targetId: o,
            actionId: t,
            superChargedFrameworkId: e,
            speedRoll: s.speedRoll(c.speedModifier)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getSubmission = a;
    var o = n(4),
       i = r(o),
       u = n(7),
       s = n(6),
       l = r(s)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
           n = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2],
           r = c["default"].getState().battle.history[c["default"].getState().battle.history.length - 1].combatants[e],
           a = new s.CombatantModel(r),
           o = u["default"][t].speedModifier,
           i = a.speedRoll(o || 0);
        return {
            actionId: t,
            casterId: e,
            targetId: n,
            speedRoll: i
        }
    }

    function o() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
        return t.sort(function (t, e) {
            return t.speedRoll < e.speedRoll ? 1 : -1
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.SubmissionModel = a, e.getOrderedActionsFromSubmissions = o;
    var i = n(6),
       u = r(i),
       s = n(7),
       l = n(4),
       c = r(l)
}, function (t, e) {
    "use strict";

    function n(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function r() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = [];
        return t.forEach(function (t) {
            var r = o(t, e);
            e = [].concat(n(r))
        }), e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.generateVariations = r;
    var o = function (t) {
        var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
           n = t.possibilities.map(function (e) {
               var n = {};
               return n[t.property] = e, n
           });
        if (0 == e.length) return n;
        var r = [];
        return e.forEach(function (t) {
            n.forEach(function (e) {
                r.push(a({}, t, e))
            })
        }), r
    }
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = function () {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
           e = [];
        t.forEach(function (t, n) {
            var r = e.filter(function (e) {
                return e.name == t
            });
            0 == r.length ? e.push({
                name: t,
                quantity: 1
            }) : e.forEach(function (e) {
                e.name == t && (e.quantity = e.quantity + 1)
            })
        });
        var n = "";
        return e.map(function (t, e) {
            var n = t.quantity > 1 ? "s" : "";
            return t.quantity + " " + t.name + n
        }).forEach(function (t, r) {
            n += t, r == e.length - 2 && (e.length > 2 && (n += ","), n += " and "), r < e.length - 2 && (n += ", ")
        }), n
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = function (t, e) {
        t = t || "", e = e || 10;
        for (var n = "", r = "0123456789", a = 0; e > a; a++) n += r.charAt(Math.floor(Math.random() * r.length));
        return t + "_" + n
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t, e, n, r) {
        return n * (Math.pow(t / r - 1, 3) + 1) + e
    }

    function r() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
           r = arguments.length <= 2 || void 0 === arguments[2] ? 100 : arguments[2],
           a = arguments.length <= 3 || void 0 === arguments[3] ? function () { } : arguments[3],
           o = arguments.length <= 4 || void 0 === arguments[4] ? function () { } : arguments[4],
           i = 0,
           u = 0,
           s = function l() {
               u = Math.round(n(i, t, e, r)), a(u), i += 1, r > i ? requestAnimationFrame(l) : o()
           };
        requestAnimationFrame(s)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.runEaseOut = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var a = n(1),
       o = r(a),
       i = n(224),
       u = n(2),
       s = n(4),
       l = r(s),
       c = n(162),
       f = r(c),
       p = n(27),
       d = r(p),
       m = n(102),
       v = r(m),
       h = n(22),
       y = r(h),
       g = n(156),
       b = r(g),
       O = o["default"].createClass({
           displayName: "RootComponent",
           componentWillMount: function () {
               (0, d["default"])(y["default"].player, y["default"].meatsim)
           },
           render: function () {
               return o["default"].createElement(u.Provider, {
                   store: this.props.store
               }, o["default"].createElement("div", null, o["default"].createElement(v["default"], null), o["default"].createElement(f["default"], null), o["default"].createElement(b["default"], null)))
           }
       }),
       _ = null;
    _ = (0, i.render)(o["default"].createElement(O, {
        store: l["default"]
    }), document.getElementById("app-root"))
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e["default"] = t, e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    },
       o = n(56),
       i = n(158),
       u = r(i),
       s = n(157),
       l = r(s),
       c = n(159),
       f = r(c);
    e["default"] = function (t) {
        var e = (0, o.combineReducers)(a({}, l, f, u));
        if ("object" == typeof window) var n = (0, o.createStore)(e, t, window.devToolsExtension ? window.devToolsExtension() : void 0);
        else var n = (0, o.createStore)(e, t);
        return n
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        name: "Jacob",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
        level: 1,
        hp: 8,
        maxHp: 25,
        pp: 2,
        maxPp: 20,
        xp: 0,
        coins: 10,
        healthStatPoints: 3,
        attackStatPoints: 3,
        defenseStatPoints: 3,
        speedStatPoints: 3,
        efficiencyStatPoints: 3,
        attacks: ["action_attack_basic_001", "action_attack_theft_001"],
        items: [{
            libraryId: "action_item_hp_001",
            instanceId: "action_item_hp_001_a"
        }, {
            libraryId: "action_item_hp_001",
            instanceId: "action_item_hp_001_b"
        }, {
            libraryId: "action_item_hp_001",
            instanceId: "action_item_hp_001_c"
        }, {
            libraryId: "action_item_pp_001",
            instanceId: "action_item_pp_001_a"
        }, {
            libraryId: "action_item_accuracy_001",
            instanceId: "action_item_accuracy_001_a"
        }, {
            libraryId: "action_item_accuracy_002",
            instanceId: "action_item_accuracy_002_a"
        }, {
            libraryId: "action_item_clearStatus_lag_001",
            instanceId: "action_item_clearStatus_lag_001_a"
        }, {
            libraryId: "action_item_clearStatus_lag_001",
            instanceId: "action_item_clearStatus_lag_001_b"
        }, {
            libraryId: "action_item_clearStatus_lag_001",
            instanceId: "action_item_clearStatus_lag_001_c"
        }, {
            libraryId: "action_item_sticker_attack_001",
            instanceId: "action_item_sticker_attack_001_a"
        }, {
            libraryId: "action_item_sticker_attack_001",
            instanceId: "action_item_sticker_attack_001_b"
        }, {
            libraryId: "action_item_sticker_speed_001",
            instanceId: "action_item_sticker_speed_001_a"
        }, {
            libraryId: "action_item_sticker_speed_001",
            instanceId: "action_item_sticker_speed_001_b"
        }],
        laptopParts: [{
            _id: "laptop_model_000_a",
            partId: "laptop_model_000"
        }, {
            _id: "laptop_model_001_a",
            partId: "laptop_model_001"
        }, {
            _id: "laptop_ram_002_a",
            partId: "laptop_ram_002"
        }, {
            _id: "laptop_ram_003_aa",
            partId: "laptop_ram_003"
        }, {
            _id: "laptop_ram_003_bb",
            partId: "laptop_ram_003"
        }, {
            _id: "laptop_ram_003_ccc",
            partId: "laptop_ram_003"
        }, {
            _id: "laptop_ram_007_a",
            partId: "laptop_ram_007"
        }, {
            _id: "laptop_ram_007_b",
            partId: "laptop_ram_007"
        }, {
            _id: "laptop_ram_008_a",
            partId: "laptop_ram_008"
        }, {
            _id: "laptop_screen_003_a",
            partId: "laptop_screen_003"
        }, {
            _id: "laptop_keyboard_001_a",
            partId: "laptop_keyboard_001"
        }],
        laptopModel: {
            _id: "laptop_model_001_a",
            partId: "laptop_model_001"
        },
        laptopRam: {
            _id: "laptop_ram_002_a",
            partId: "laptop_ram_002"
        },
        laptopScreen: {
            _id: "laptop_screen_003_a",
            partId: "laptop_screen_003"
        },
        laptopKeyboard: null,
        laptopDrive: null
    }, t.exports = e["default"]
}, function (t, e) {
    "use strict";

    function n(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function r(t) {
        var e = [];
        return t.forEach(function (t, r) {
            if (t.match(/@@pause_/)) {
                var a = t.match(/\d+/g)[0];
                e = [].concat(n(e), [{
                    content: " ",
                    delayBefore: a
                }])
            } else ! function () {
                var r = 70;
                t.match(/^\[LIGHTNING\]/i) && (t = t.replace("[LIGHTNING]", ""), r = 10), t.match(/^\[FAST\]/i) && (t = t.replace("[FAST]", ""), r = 35), t.match(/^\[SLOW\]/i) && (t = t.replace("[SLOW]", ""), r = 140), t.match(/^\[CRAWL\]/i) && (t = t.replace("[CRAWL]", ""), r = 360);
                var a = t.split("").map(function (t) {
                    return {
                        content: t,
                        delayBefore: " " != t ? r : 0
                    }
                });
                e = [].concat(n(e), n(a))
            }()
        }), e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.convertText = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(3),
       p = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "handleSwitch",
               value: function (t) {
                   t.preventDefault();
                   var e = !this.props.isAllowingMusic;
                   return (0, f.setBattleValue)({
                       isAllowingMusic: e
                   }), 1 == e ? (Howler.mute(!1), void this.refs.link.blur()) : (Howler.mute(!0), void this.refs.link.blur())
               }
           }, {
               key: "render",
               value: function () {
                   return l["default"].createElement("div", {
                       style: {
                           padding: "1em",
                           visibility: "hidden"
                       }
                   }, "MUSIC:", l["default"].createElement("a", {
                       ref: "link",
                       href: "#",
                       onClick: this.handleSwitch.bind(this)
                   }, this.props.isAllowingMusic ? "ON" : "OFF"))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   isAllowingMusic: t.battle.isAllowingMusic
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = p, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length) ; e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function a(t, e) {
        switch (void 0 === t && (t = {}), e.type) {
            case "SET_BATTLE_VALUE":
                return (0, i.setValue)(t, e.payload.changes);
            case "MERGE_COMBATANT":
                var n = [].concat(r(t.history)),
                   a = n[n.length - 1],
                   u = (0, i.editNode)(a.combatants, e.payload.key, o({}, e.payload.changes)),
                   s = n.filter(function (t, e) {
                       return e < n.length - 1
                   });
                return o({}, t, {
                    history: [].concat(r(s), [{
                        cloudQueue: a.cloudQueue,
                        combatants: o({}, u)
                    }])
                });
            default:
                return t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.battle = a;
    var i = n(30)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        switch (void 0 === t && (t = {}), e.type) {
            case "SET_MAP_VALUE":
                return (0, a.setValue)(t, e.payload.changes);
            case "SET_VIEWPORT_SIZE":
                return {
                    viewportWidth: e.width,
                    viewportHeight: e.height
                };
            default:
                return t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.map = r;
    var a = n(30)
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        switch (void 0 === t && (t = {}), e.type) {
            case "SET_PLAYERDATA_VALUE":
                return (0, a.setValue)(t, e.payload.changes);
            default:
                return t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.playerData = r;
    var a = n(30)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
           e = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
           n = (0, i["default"])(1, 99).map(function (t) {
               var e = 11 * t;
               return {
                   width: e,
                   height: 7 / 11 * e
               }
           }).filter(function (n) {
               return n.width <= t - 22 && n.height <= e - 44
           });
        return n.length ? n[n.length - 1] : {
            width: 11,
            height: 7
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getViewportSize = a;
    var o = n(21),
       i = r(o)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(4),
       o = r(a),
       i = n(160);
    e["default"] = function () {
        var t, e = function () {
            var t = (0, i.getViewportSize)($(window).width(), $(window).height());
            o["default"].dispatch({
                type: "SET_VIEWPORT_SIZE",
                width: t.width,
                height: t.height
            }), o["default"].dispatch({
                type: "SET_MAP_VALUE",
                payload: {
                    changes: {
                        cW: t.width / 100
                    }
                }
            })
        };
        window.onresize = function () {
            clearTimeout(t), t = setTimeout(function () {
                e()
            }, 50)
        }, e()
    }, t.exports = e["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(),
       u = function (t, e, n) {
           for (var r = !0; r;) {
               var a = t,
                  o = e,
                  i = n;
               r = !1, null === a && (a = Function.prototype);
               var u = Object.getOwnPropertyDescriptor(a, o);
               if (void 0 !== u) {
                   if ("value" in u) return u.value;
                   var s = u.get;
                   if (void 0 === s) return;
                   return s.call(i)
               }
               var l = Object.getPrototypeOf(a);
               if (null === l) return;
               t = l, e = o, n = i, r = !0, u = l = void 0
           }
       },
       s = n(1),
       l = r(s),
       c = n(2),
       f = n(161),
       p = r(f),
       d = n(123),
       m = r(d),
       v = n(84),
       h = r(v),
       y = n(144),
       g = r(y),
       b = function (t) {
           function e() {
               a(this, n), u(Object.getPrototypeOf(n.prototype), "constructor", this).apply(this, arguments)
           }
           o(e, t), i(e, [{
               key: "componentDidMount",
               value: function () {
                   (0, p["default"])()
               }
           }, {
               key: "render",
               value: function () {
                   if (this.props.isBattleConsoleView) return l["default"].createElement("div", null, l["default"].createElement(m["default"], null));
                   if (this.props.isReportingView) return l["default"].createElement("div", null, l["default"].createElement(g["default"], null));
                   var t = {
                       width: this.props.vpWidth,
                       height: this.props.vpHeight
                   };
                   return l["default"].createElement("div", {
                       className: "ui-wrapper"
                   }, l["default"].createElement("div", {
                       style: t,
                       className: "viewport viewport-" + this.props.vpWidth
                   }, l["default"].createElement(h["default"], null)))
               }
           }]);
           var n = e;
           return e = (0, c.connect)(function (t, e) {
               return {
                   isBattleConsoleView: "console" == t.battle.viewMode,
                   isReportingView: "reporting" == t.battle.viewMode,
                   vpWidth: t.map.viewportWidth,
                   vpHeight: t.map.viewportHeight
               }
           })(e) || e
       }(l["default"].Component);
    e["default"] = b, t.exports = e["default"]
}, function (t, e, n) {
    var r = n(13),
       a = n(8),
       o = r(a, "DataView");
    t.exports = o
}, function (t, e, n) {
    var r = n(13),
       a = n(8),
       o = r(a, "Map");
    t.exports = o
}, function (t, e, n) {
    var r = n(13),
       a = n(8),
       o = r(a, "Promise");
    t.exports = o
}, function (t, e, n) {
    var r = n(13),
       a = n(8),
       o = r(a, "Set");
    t.exports = o
}, function (t, e, n) {
    var r = n(8),
       a = r.Symbol;
    t.exports = a
}, function (t, e, n) {
    var r = n(13),
       a = n(8),
       o = r(a, "WeakMap");
    t.exports = o
}, function (t, e) {
    function n(t, e) {
        for (var n = -1, r = t ? t.length : 0, a = Array(r) ; ++n < r;) a[n] = e(t[n], n, t);
        return a
    }
    t.exports = n
}, function (t, e) {
    function n(t, e, n) {
        return t === t && (void 0 !== n && (t = n >= t ? t : n), void 0 !== e && (t = t >= e ? t : e)), t
    }
    t.exports = n
}, function (t, e, n) {
    function r(t, e) {
        return null != t && (i.call(t, e) || "object" == typeof t && e in t && null === a(t))
    }
    var a = n(184),
       o = Object.prototype,
       i = o.hasOwnProperty;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        if (!u(t) || i(t)) return !1;
        var e = a(t) || o(t) ? m : c;
        return e.test(s(t))
    }
    var a = n(32),
       o = n(188),
       i = n(189),
       u = n(20),
       s = n(47),
       l = /[\\^$.*+?()[\]{}|]/g,
       c = /^\[object .+?Constructor\]$/,
       f = Object.prototype,
       p = Function.prototype.toString,
       d = f.hasOwnProperty,
       m = RegExp("^" + p.call(d).replace(l, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    t.exports = r
}, function (t, e) {
    function n(t) {
        return r(Object(t))
    }
    var r = Object.keys;
    t.exports = n
}, function (t, e) {
    function n(t) {
        return function (e) {
            return null == e ? void 0 : e[t]
        }
    }
    t.exports = n
}, function (t, e) {
    function n(t, e) {
        return t + r(a() * (e - t + 1))
    }
    var r = Math.floor,
       a = Math.random;
    t.exports = n
}, function (t, e) {
    function n(t, e, n, o) {
        for (var i = -1, u = a(r((e - t) / (n || 1)), 0), s = Array(u) ; u--;) s[o ? u : ++i] = t, t += n;
        return s
    }
    var r = Math.ceil,
       a = Math.max;
    t.exports = n
}, function (t, e) {
    function n(t, e) {
        for (var n = -1, r = Array(t) ; ++n < t;) r[n] = e(n);
        return r
    }
    t.exports = n
}, function (t, e, n) {
    function r(t, e) {
        return a(e, function (e) {
            return t[e]
        })
    }
    var a = n(169);
    t.exports = r
}, function (t, e) {
    function n(t) {
        return t && t.Object === Object ? t : null
    }
    t.exports = n
}, function (t, e) {
    function n(t, e) {
        var n = -1,
           r = t.length;
        for (e || (e = Array(r)) ; ++n < r;) e[n] = t[n];
        return e
    }
    t.exports = n
}, function (t, e, n) {
    var r = n(8),
       a = r["__core-js_shared__"];
    t.exports = a
}, function (t, e, n) {
    function r(t) {
        return function (e, n, r) {
            return r && "number" != typeof r && o(e, n, r) && (n = r = void 0), e = i(e), e = e === e ? e : 0, void 0 === n ? (n = e, e = 0) : n = i(n) || 0, r = void 0 === r ? n > e ? 1 : -1 : i(r) || 0, a(e, n, r, t)
        }
    }
    var a = n(176),
       o = n(46),
       i = n(51);
    t.exports = r
}, function (t, e, n) {
    var r = n(174),
       a = r("length");
    t.exports = a
}, function (t, e) {
    function n(t) {
        return r(Object(t))
    }
    var r = Object.getPrototypeOf;
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        return y.call(t)
    }
    var a = n(163),
       o = n(164),
       i = n(165),
       u = n(166),
       s = n(168),
       l = n(47),
       c = "[object Map]",
       f = "[object Object]",
       p = "[object Promise]",
       d = "[object Set]",
       m = "[object WeakMap]",
       v = "[object DataView]",
       h = Object.prototype,
       y = h.toString,
       g = l(a),
       b = l(o),
       O = l(i),
       _ = l(u),
       P = l(s);
    (a && r(new a(new ArrayBuffer(1))) != v || o && r(new o) != c || i && r(i.resolve()) != p || u && r(new u) != d || s && r(new s) != m) && (r = function (t) {
        var e = y.call(t),
           n = e == f ? t.constructor : void 0,
           r = n ? l(n) : void 0;
        if (r) switch (r) {
            case g:
                return v;
            case b:
                return c;
            case O:
                return p;
            case _:
                return d;
            case P:
                return m
        }
        return e
    }), t.exports = r
}, function (t, e) {
    function n(t, e) {
        return null == t ? void 0 : t[e]
    }
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        var e = t ? t.length : void 0;
        return u(e) && (i(t) || s(t) || o(t)) ? a(e, String) : null
    }
    var a = n(177),
       o = n(196),
       i = n(48),
       u = n(49),
       s = n(50);
    t.exports = r
}, function (t, e) {
    function n(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString) try {
            e = !!(t + "")
        } catch (n) { }
        return e
    }
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        return !!o && o in t
    }
    var a = n(181),
       o = function () {
           var t = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "");
           return t ? "Symbol(src)_1." + t : ""
       }();
    t.exports = r
}, function (t, e) {
    function n(t) {
        var e = t && t.constructor,
           n = "function" == typeof e && e.prototype || r;
        return t === n
    }
    var r = Object.prototype;
    t.exports = n
}, function (t, e) {
    function n(t) {
        for (var e, n = []; !(e = t.next()).done;) n.push(e.value);
        return n
    }
    t.exports = n
}, function (t, e) {
    function n(t) {
        var e = -1,
           n = Array(t.size);
        return t.forEach(function (t, r) {
            n[++e] = [r, t]
        }), n
    }
    t.exports = n
}, function (t, e) {
    function n(t) {
        var e = -1,
           n = Array(t.size);
        return t.forEach(function (t) {
            n[++e] = t
        }), n
    }
    t.exports = n
}, function (t, e) {
    function n(t) {
        return t.match(O)
    }
    var r = "\\ud800-\\udfff",
       a = "\\u0300-\\u036f\\ufe20-\\ufe23",
       o = "\\u20d0-\\u20f0",
       i = "\\ufe0e\\ufe0f",
       u = "[" + r + "]",
       s = "[" + a + o + "]",
       l = "\\ud83c[\\udffb-\\udfff]",
       c = "(?:" + s + "|" + l + ")",
       f = "[^" + r + "]",
       p = "(?:\\ud83c[\\udde6-\\uddff]){2}",
       d = "[\\ud800-\\udbff][\\udc00-\\udfff]",
       m = "\\u200d",
       v = c + "?",
       h = "[" + i + "]?",
       y = "(?:" + m + "(?:" + [f, p, d].join("|") + ")" + h + v + ")*",
       g = h + v + y,
       b = "(?:" + [f + s + "?", s, p, d, u].join("|") + ")",
       O = RegExp(l + "(?=" + l + ")|" + b + g, "g");
    t.exports = n
}, function (t, e) {
    function n(t, e) {
        return t === e || t !== t && e !== e
    }
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        return a(t) && u.call(t, "callee") && (!l.call(t, "callee") || s.call(t) == o)
    }
    var a = n(197),
       o = "[object Arguments]",
       i = Object.prototype,
       u = i.hasOwnProperty,
       s = i.toString,
       l = i.propertyIsEnumerable;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        return o(t) && a(t)
    }
    var a = n(19),
       o = n(33);
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        return "symbol" == typeof t || a(t) && u.call(t) == o
    }
    var a = n(33),
       o = "[object Symbol]",
       i = Object.prototype,
       u = i.toString;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        var e = l(t);
        if (!e && !u(t)) return o(t);
        var n = i(t),
           r = !!n,
           c = n || [],
           f = c.length;
        for (var p in t) !a(t, p) || r && ("length" == p || s(p, f)) || e && "constructor" == p || c.push(p);
        return c
    }
    var a = n(171),
       o = n(173),
       i = n(187),
       u = n(19),
       s = n(45),
       l = n(190);
    t.exports = r
}, function (t, e, n) {
    function r(t, e, n) {
        var r = -1,
           l = u(t),
           c = l.length,
           f = c - 1;
        for (e = (n ? i(t, e, n) : void 0 === e) ? 1 : a(s(e), 0, c) ; ++r < e;) {
            var p = o(r, f),
               d = l[p];
            l[p] = l[r], l[r] = d
        }
        return l.length = e, l
    }
    var a = n(170),
       o = n(175),
       i = n(46),
       u = n(202),
       s = n(204);
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        return a(t, o)
    }
    var a = n(200),
       o = 4294967295;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        if (!t) return [];
        if (u(t)) return s(t) ? p(t) : o(t);
        if (h && t[h]) return l(t[h]());
        var e = i(t),
           n = e == m ? c : e == v ? f : d;
        return n(t)
    }
    var a = n(167),
       o = n(180),
       i = n(185),
       u = n(19),
       s = n(50),
       l = n(191),
       c = n(192),
       f = n(193),
       p = n(194),
       d = n(205),
       m = "[object Map]",
       v = "[object Set]",
       h = "symbol" == typeof (h = a && a.iterator) ? h : void 0;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        if (!t) return 0 === t ? t : 0;
        if (t = a(t), t === o || t === -o) {
            var e = 0 > t ? -1 : 1;
            return e * i
        }
        return t === t ? t : 0
    }
    var a = n(51),
       o = 1 / 0,
       i = 1.7976931348623157e308;
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        var e = a(t),
           n = e % 1;
        return e === e ? n ? e - n : e : 0
    }
    var a = n(203);
    t.exports = r
}, function (t, e, n) {
    function r(t) {
        return t ? a(t, o(t)) : []
    }
    var a = n(178),
       o = n(199);
    t.exports = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    e.__esModule = !0, e["default"] = void 0;
    var u = n(1),
       s = n(52),
       l = r(s),
       c = n(53),
       f = (r(c), function (t) {
           function e(n, r) {
               a(this, e);
               var i = o(this, t.call(this, n, r));
               return i.store = n.store, i
           }
           return i(e, t), e.prototype.getChildContext = function () {
               return {
                   store: this.store
               }
           }, e.prototype.render = function () {
               var t = this.props.children;
               return u.Children.only(t)
           }, e
       }(u.Component));
    e["default"] = f, f.propTypes = {
        store: l["default"].isRequired,
        children: u.PropTypes.element.isRequired
    }, f.childContextTypes = {
        store: l["default"].isRequired
    }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function u(t) {
        return t.displayName || t.name || "Component"
    }

    function s(t, e) {
        try {
            return t.apply(e)
        } catch (n) {
            return C.value = n, C
        }
    }

    function l(t, e, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
           l = Boolean(t),
           p = t || k,
           m = void 0;
        m = "function" == typeof e ? e : e ? (0, y["default"])(e) : S;
        var h = n || j,
           g = r.pure,
           b = void 0 === g ? !0 : g,
           O = r.withRef,
           P = void 0 === O ? !1 : O,
           E = b && h !== j,
           M = I++;
        return function (t) {
            function e(t, e, n) {
                var r = h(t, e, n);
                return r
            }
            var n = "Connect(" + u(t) + ")",
               r = function (r) {
                   function u(t, e) {
                       a(this, u);
                       var i = o(this, r.call(this, t, e));
                       i.version = M, i.store = t.store || e.store, (0, w["default"])(i.store, 'Could not find "store" in either the context or ' + ('props of "' + n + '". ') + "Either wrap the root component in a <Provider>, " + ('or explicitly pass "store" as a prop to "' + n + '".'));
                       var s = i.store.getState();
                       return i.state = {
                           storeState: s
                       }, i.clearCache(), i
                   }
                   return i(u, r), u.prototype.shouldComponentUpdate = function () {
                       return !b || this.haveOwnPropsChanged || this.hasStoreStateChanged
                   }, u.prototype.computeStateProps = function (t, e) {
                       if (!this.finalMapStateToProps) return this.configureFinalMapState(t, e);
                       var n = t.getState(),
                          r = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(n, e) : this.finalMapStateToProps(n);
                       return r
                   }, u.prototype.configureFinalMapState = function (t, e) {
                       var n = p(t.getState(), e),
                          r = "function" == typeof n;
                       return this.finalMapStateToProps = r ? n : p, this.doStatePropsDependOnOwnProps = 1 !== this.finalMapStateToProps.length, r ? this.computeStateProps(t, e) : n
                   }, u.prototype.computeDispatchProps = function (t, e) {
                       if (!this.finalMapDispatchToProps) return this.configureFinalMapDispatch(t, e);
                       var n = t.dispatch,
                          r = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(n, e) : this.finalMapDispatchToProps(n);
                       return r
                   }, u.prototype.configureFinalMapDispatch = function (t, e) {
                       var n = m(t.dispatch, e),
                          r = "function" == typeof n;
                       return this.finalMapDispatchToProps = r ? n : m, this.doDispatchPropsDependOnOwnProps = 1 !== this.finalMapDispatchToProps.length, r ? this.computeDispatchProps(t, e) : n
                   }, u.prototype.updateStatePropsIfNeeded = function () {
                       var t = this.computeStateProps(this.store, this.props);
                       return this.stateProps && (0, v["default"])(t, this.stateProps) ? !1 : (this.stateProps = t, !0)
                   }, u.prototype.updateDispatchPropsIfNeeded = function () {
                       var t = this.computeDispatchProps(this.store, this.props);
                       return this.dispatchProps && (0, v["default"])(t, this.dispatchProps) ? !1 : (this.dispatchProps = t, !0)
                   }, u.prototype.updateMergedPropsIfNeeded = function () {
                       var t = e(this.stateProps, this.dispatchProps, this.props);
                       return this.mergedProps && E && (0, v["default"])(t, this.mergedProps) ? !1 : (this.mergedProps = t, !0)
                   }, u.prototype.isSubscribed = function () {
                       return "function" == typeof this.unsubscribe
                   }, u.prototype.trySubscribe = function () {
                       l && !this.unsubscribe && (this.unsubscribe = this.store.subscribe(this.handleChange.bind(this)), this.handleChange())
                   }, u.prototype.tryUnsubscribe = function () {
                       this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null)
                   }, u.prototype.componentDidMount = function () {
                       this.trySubscribe()
                   }, u.prototype.componentWillReceiveProps = function (t) {
                       b && (0, v["default"])(t, this.props) || (this.haveOwnPropsChanged = !0)
                   }, u.prototype.componentWillUnmount = function () {
                       this.tryUnsubscribe(), this.clearCache()
                   }, u.prototype.clearCache = function () {
                       this.dispatchProps = null, this.stateProps = null, this.mergedProps = null, this.haveOwnPropsChanged = !0, this.hasStoreStateChanged = !0, this.haveStatePropsBeenPrecalculated = !1, this.statePropsPrecalculationError = null, this.renderedElement = null, this.finalMapDispatchToProps = null, this.finalMapStateToProps = null
                   }, u.prototype.handleChange = function () {
                       if (this.unsubscribe) {
                           var t = this.store.getState(),
                              e = this.state.storeState;
                           if (!b || e !== t) {
                               if (b && !this.doStatePropsDependOnOwnProps) {
                                   var n = s(this.updateStatePropsIfNeeded, this);
                                   if (!n) return;
                                   n === C && (this.statePropsPrecalculationError = C.value), this.haveStatePropsBeenPrecalculated = !0
                               }
                               this.hasStoreStateChanged = !0, this.setState({
                                   storeState: t
                               })
                           }
                       }
                   }, u.prototype.getWrappedInstance = function () {
                       return (0, w["default"])(P, "To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."), this.refs.wrappedInstance
                   }, u.prototype.render = function () {
                       var e = this.haveOwnPropsChanged,
                          n = this.hasStoreStateChanged,
                          r = this.haveStatePropsBeenPrecalculated,
                          a = this.statePropsPrecalculationError,
                          o = this.renderedElement;
                       if (this.haveOwnPropsChanged = !1, this.hasStoreStateChanged = !1, this.haveStatePropsBeenPrecalculated = !1, this.statePropsPrecalculationError = null, a) throw a;
                       var i = !0,
                          u = !0;
                       b && o && (i = n || e && this.doStatePropsDependOnOwnProps, u = e && this.doDispatchPropsDependOnOwnProps);
                       var s = !1,
                          l = !1;
                       r ? s = !0 : i && (s = this.updateStatePropsIfNeeded()), u && (l = this.updateDispatchPropsIfNeeded());
                       var p = !0;
                       return p = s || l || e ? this.updateMergedPropsIfNeeded() : !1, !p && o ? o : (P ? this.renderedElement = (0, f.createElement)(t, c({}, this.mergedProps, {
                           ref: "wrappedInstance"
                       })) : this.renderedElement = (0, f.createElement)(t, this.mergedProps), this.renderedElement)
                   }, u
               }(f.Component);
            return r.displayName = n, r.WrappedComponent = t, r.contextTypes = {
                store: d["default"]
            }, r.propTypes = {
                store: d["default"]
            }, (0, _["default"])(r, t)
        }
    }
    var c = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e.__esModule = !0, e["default"] = l;
    var f = n(1),
       p = n(52),
       d = r(p),
       m = n(208),
       v = r(m),
       h = n(209),
       y = r(h),
       g = n(53),
       b = (r(g), n(215)),
       O = (r(b), n(210)),
       _ = r(O),
       P = n(211),
       w = r(P),
       k = function (t) {
           return {}
       },
       S = function (t) {
           return {
               dispatch: t
           }
       },
       j = function (t, e, n) {
           return c({}, n, t, e)
       },
       C = {
           value: null
       },
       I = 0
}, function (t, e) {
    "use strict";

    function n(t, e) {
        if (t === e) return !0;
        var n = Object.keys(t),
           r = Object.keys(e);
        if (n.length !== r.length) return !1;
        for (var a = Object.prototype.hasOwnProperty, o = 0; o < n.length; o++)
            if (!a.call(e, n[o]) || t[n[o]] !== e[n[o]]) return !1;
        return !0
    }
    e.__esModule = !0, e["default"] = n
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return function (e) {
            return (0, a.bindActionCreators)(t, e)
        }
    }
    e.__esModule = !0, e["default"] = r;
    var a = n(56)
}, function (t, e) {
    "use strict";
    var n = {
        childContextTypes: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0
    },
       r = {
           name: !0,
           length: !0,
           prototype: !0,
           caller: !0,
           arguments: !0,
           arity: !0
       };
    t.exports = function (t, e) {
        if ("string" != typeof e)
            for (var a = Object.getOwnPropertyNames(e), o = 0; o < a.length; ++o)
                if (!n[a[o]] && !r[a[o]]) try {
                    t[a[o]] = e[a[o]]
                } catch (i) { }
        return t
    }
}, function (t, e, n) {
    "use strict";
    var r = function (t, e, n, r, a, o, i, u) {
        if (!t) {
            var s;
            if (void 0 === e) s = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var l = [n, r, a, o, i, u],
                   c = 0;
                s = new Error(e.replace(/%s/g, function () {
                    return l[c++]
                })), s.name = "Invariant Violation"
            }
            throw s.framesToPop = 1, s
        }
    };
    t.exports = r
}, function (t, e) {
    function n(t) {
        return r(Object(t))
    }
    var r = Object.getPrototypeOf;
    t.exports = n
}, function (t, e) {
    function n(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString) try {
            e = !!(t + "")
        } catch (n) { }
        return e
    }
    t.exports = n
}, function (t, e) {
    function n(t) {
        return !!t && "object" == typeof t
    }
    t.exports = n
}, function (t, e, n) {
    function r(t) {
        if (!i(t) || p.call(t) != u || o(t)) return !1;
        var e = a(t);
        if (null === e) return !0;
        var n = c.call(e, "constructor") && e.constructor;
        return "function" == typeof n && n instanceof n && l.call(n) == f
    }
    var a = n(212),
       o = n(213),
       i = n(214),
       u = "[object Object]",
       s = Object.prototype,
       l = Function.prototype.toString,
       c = s.hasOwnProperty,
       f = l.call(Object),
       p = s.toString;
    t.exports = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        for (var t = arguments.length, e = Array(t), n = 0; t > n; n++) e[n] = arguments[n];
        return function (t) {
            return function (n, r, a) {
                var i = t(n, r, a),
                   s = i.dispatch,
                   l = [],
                   c = {
                       getState: i.getState,
                       dispatch: function (t) {
                           return s(t)
                       }
                   };
                return l = e.map(function (t) {
                    return t(c)
                }), s = u["default"].apply(void 0, l)(i.dispatch), o({}, i, {
                    dispatch: s
                })
            }
        }
    }
    e.__esModule = !0;
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e["default"] = a;
    var i = n(54),
       u = r(i)
}, function (t, e) {
    "use strict";

    function n(t, e) {
        return function () {
            return e(t.apply(void 0, arguments))
        }
    }

    function r(t, e) {
        if ("function" == typeof t) return n(t, e);
        if ("object" != typeof t || null === t) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === t ? "null" : typeof t) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        for (var r = Object.keys(t), a = {}, o = 0; o < r.length; o++) {
            var i = r[o],
               u = t[i];
            "function" == typeof u && (a[i] = n(u, e))
        }
        return a
    }
    e.__esModule = !0, e["default"] = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        var n = e && e.type,
           r = n && '"' + n.toString() + '"' || "an action";
        return "Given action " + r + ', reducer "' + t + '" returned undefined. To ignore an action, you must explicitly return the previous state.'
    }

    function o(t) {
        Object.keys(t).forEach(function (e) {
            var n = t[e],
               r = n(void 0, {
                   type: u.ActionTypes.INIT
               });
            if ("undefined" == typeof r) throw new Error('Reducer "' + e + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
            var a = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
            if ("undefined" == typeof n(void 0, {
                type: a
            })) throw new Error('Reducer "' + e + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + u.ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")
        })
    }

    function i(t) {
        for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++) {
            var i = e[r];
            "function" == typeof t[i] && (n[i] = t[i])
        }
        var u, s = Object.keys(n);
        try {
            o(n)
        } catch (l) {
            u = l
        }
        return function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
               e = arguments[1];
            if (u) throw u;
            for (var r = !1, o = {}, i = 0; i < s.length; i++) {
                var l = s[i],
                   c = n[l],
                   f = t[l],
                   p = c(f, e);
                if ("undefined" == typeof p) {
                    var d = a(l, e);
                    throw new Error(d)
                }
                o[l] = p, r = r || p !== f
            }
            return r ? o : t
        }
    }
    e.__esModule = !0, e["default"] = i;
    var u = n(55),
       s = n(58),
       l = (r(s), n(57));
    r(l)
}, function (t, e) {
    function n(t) {
        return r(Object(t))
    }
    var r = Object.getPrototypeOf;
    t.exports = n
}, function (t, e) {
    function n(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString) try {
            e = !!(t + "")
        } catch (n) { }
        return e
    }
    t.exports = n
}, function (t, e) {
    function n(t) {
        return !!t && "object" == typeof t
    }
    t.exports = n
}, function (t, e, n) {
    (function (e) {
        "use strict";
        t.exports = n(223)(e || window || this)
    }).call(e, function () {
        return this
    }())
}, function (t, e) {
    "use strict";
    t.exports = function (t) {
        var e, n = t.Symbol;
        return "function" == typeof n ? n.observable ? e = n.observable : (e = n("observable"), n.observable = e) : e = "@@observable", e
    }
}, function (t, e) {
    t.exports = ReactDOM
}]);