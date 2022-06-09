(() => {
    var e = {
            50743: function(e, n) {
                ! function(r, t) {
                    var o = {
                            version: "0.4.1",
                            settings: {
                                currency: {
                                    symbol: "$",
                                    format: "%s%v",
                                    decimal: ".",
                                    thousand: ",",
                                    precision: 2,
                                    grouping: 3
                                },
                                number: {
                                    precision: 0,
                                    grouping: 3,
                                    thousand: ",",
                                    decimal: "."
                                }
                            }
                        },
                        a = Array.prototype.map,
                        i = Array.isArray,
                        u = Object.prototype.toString;

                    function c(e) {
                        return !!("" === e || e && e.charCodeAt && e.substr)
                    }

                    function m(e) {
                        return i ? i(e) : "[object Array]" === u.call(e)
                    }

                    function f(e) {
                        return e && "[object Object]" === u.call(e)
                    }

                    function s(e, n) {
                        var r;
                        for (r in e = e || {}, n = n || {}) n.hasOwnProperty(r) && null == e[r] && (e[r] = n[r]);
                        return e
                    }

                    function l(e, n, r) {
                        var t, o, i = [];
                        if (!e) return i;
                        if (a && e.map === a) return e.map(n, r);
                        for (t = 0, o = e.length; t < o; t++) i[t] = n.call(r, e[t], t, e);
                        return i
                    }

                    function d(e, n) {
                        return e = Math.round(Math.abs(e)), isNaN(e) ? n : e
                    }

                    function v(e) {
                        var n = o.settings.currency.format;
                        return "function" == typeof e && (e = e()), c(e) && e.match("%v") ? {
                            pos: e,
                            neg: e.replace("-", "").replace("%v", "-%v"),
                            zero: e
                        } : e && e.pos && e.pos.match("%v") ? e : c(n) ? o.settings.currency.format = {
                            pos: n,
                            neg: n.replace("%v", "-%v"),
                            zero: n
                        } : n
                    }
                    var g = o.unformat = o.parse = function(e, n) {
                            if (m(e)) return l(e, (function(e) {
                                return g(e, n)
                            }));
                            if ("number" == typeof(e = e || 0)) return e;
                            n = n || o.settings.number.decimal;
                            var r = new RegExp("[^0-9-" + n + "]", ["g"]),
                                t = parseFloat(("" + e).replace(/\((.*)\)/, "-$1").replace(r, "").replace(n, "."));
                            return isNaN(t) ? 0 : t
                        },
                        y = o.toFixed = function(e, n) {
                            n = d(n, o.settings.number.precision);
                            var r = Math.pow(10, n);
                            return (Math.round(o.unformat(e) * r) / r).toFixed(n)
                        },
                        p = o.formatNumber = o.format = function(e, n, r, t) {
                            if (m(e)) return l(e, (function(e) {
                                return p(e, n, r, t)
                            }));
                            e = g(e);
                            var a = s(f(n) ? n : {
                                    precision: n,
                                    thousand: r,
                                    decimal: t
                                }, o.settings.number),
                                i = d(a.precision),
                                u = e < 0 ? "-" : "",
                                c = parseInt(y(Math.abs(e || 0), i), 10) + "",
                                v = c.length > 3 ? c.length % 3 : 0;
                            return u + (v ? c.substr(0, v) + a.thousand : "") + c.substr(v).replace(/(\d{3})(?=\d)/g, "$1" + a.thousand) + (i ? a.decimal + y(Math.abs(e), i).split(".")[1] : "")
                        },
                        h = o.formatMoney = function(e, n, r, t, a, i) {
                            if (m(e)) return l(e, (function(e) {
                                return h(e, n, r, t, a, i)
                            }));
                            e = g(e);
                            var u = s(f(n) ? n : {
                                    symbol: n,
                                    precision: r,
                                    thousand: t,
                                    decimal: a,
                                    format: i
                                }, o.settings.currency),
                                c = v(u.format);
                            return (e > 0 ? c.pos : e < 0 ? c.neg : c.zero).replace("%s", u.symbol).replace("%v", p(Math.abs(e), d(u.precision), u.thousand, u.decimal))
                        };
                    o.formatColumn = function(e, n, r, t, a, i) {
                        if (!e) return [];
                        var u = s(f(n) ? n : {
                                symbol: n,
                                precision: r,
                                thousand: t,
                                decimal: a,
                                format: i
                            }, o.settings.currency),
                            y = v(u.format),
                            h = y.pos.indexOf("%s") < y.pos.indexOf("%v"),
                            b = 0,
                            S = l(e, (function(e, n) {
                                if (m(e)) return o.formatColumn(e, u);
                                var r = ((e = g(e)) > 0 ? y.pos : e < 0 ? y.neg : y.zero).replace("%s", u.symbol).replace("%v", p(Math.abs(e), d(u.precision), u.thousand, u.decimal));
                                return r.length > b && (b = r.length), r
                            }));
                        return l(S, (function(e, n) {
                            return c(e) && e.length < b ? h ? e.replace(u.symbol, u.symbol + new Array(b - e.length + 1).join(" ")) : new Array(b - e.length + 1).join(" ") + e : e
                        }))
                    }, e.exports && (n = e.exports = o), n.accounting = o
                }()
            }
        },
        n = {};

    function r(t) {
        var o = n[t];
        if (void 0 !== o) return o.exports;
        var a = n[t] = {
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, r), a.exports
    }
    r.n = e => {
        var n = e && e.__esModule ? () => e.default : () => e;
        return r.d(n, {
            a: n
        }), n
    }, r.d = (e, n) => {
        for (var t in n) r.o(n, t) && !r.o(e, t) && Object.defineProperty(e, t, {
            enumerable: !0,
            get: n[t]
        })
    }, r.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n), (() => {
        "use strict";
        var e = r(50743),
            n = r.n(e);

        function t(e, n) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function(e, n) {
                        if (!e) return;
                        if ("string" == typeof e) return o(e, n);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === r && e.constructor && (r = e.constructor.name);
                        if ("Map" === r || "Set" === r) return Array.from(e);
                        if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return o(e, n)
                    }(e)) || n && e && "number" == typeof e.length) {
                    r && (e = r);
                    var t = 0,
                        a = function() {};
                    return {
                        s: a,
                        n: function() {
                            return t >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[t++]
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: a
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, u = !0,
                c = !1;
            return {
                s: function() {
                    r = r.call(e)
                },
                n: function() {
                    var e = r.next();
                    return u = e.done, e
                },
                e: function(e) {
                    c = !0, i = e
                },
                f: function() {
                    try {
                        u || null == r.return || r.return()
                    } finally {
                        if (c) throw i
                    }
                }
            }
        }

        function o(e, n) {
            (null == n || n > e.length) && (n = e.length);
            for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r];
            return t
        }
        window.GiveDonationSummary = {
            init: function() {
                GiveDonationSummary.initAmount(), GiveDonationSummary.initFrequency(), GiveDonationSummary.initFees(), GiveDonationSummary.initTotal()
            },
            initAmount: function() {
                GiveDonationSummary.observe('[name="give-amount"]', (function(e, n) {
                    n.find('[data-tag="amount"]').html(GiveDonationSummary.format_amount(e.value, n))
                }))
            },
            initFrequency: function() {
                GiveDonationSummary.observe('[name="give-recurring-period"]', GiveDonationSummary.handleDonorsChoiceRecurringFrequency), GiveDonationSummary.observe('[name="give-price-id"]', GiveDonationSummary.handleAdminDefinedRecurringFrequency), GiveDonationSummary.observe('[name="_give_is_donation_recurring"]', GiveDonationSummary.handleAdminDefinedSetDonationFrequency), GiveDonationSummary.observe('[name="give-price-id"]', GiveDonationSummary.handleAdminDefinedRecurringFrequency)
            },
            handleDonorsChoiceRecurringFrequency: function(e, n) {
                n.find(".js-give-donation-summary-frequency-help-text").toggle(!e.checked), n.find('[data-tag="frequency"]').toggle(!e.checked), n.find('[data-tag="recurring"]').toggle(e.checked).html(e.dataset.periodLabel);
                var r = document.querySelector('[name="give-recurring-period-donors-choice"]');
                if (r) {
                    var t = r.options[r.selectedIndex].value || !1;
                    t && n.find('[data-tag="recurring"]').html(GiveDonationSummaryData.recurringLabelLookup[t])
                }
            },
            handleAdminDefinedRecurringFrequency: function(e, n) {
                var r = e.value,
                    t = document.querySelector(".give_recurring_donation_details");
                if (t) {
                    var o = JSON.parse(t.value);
                    if (void 0 !== o.multi) {
                        var a = "yes" === o.multi[r]._give_recurring,
                            i = o.multi[r].give_recurring_pretty_text;
                        n.find(".js-give-donation-summary-frequency-help-text").toggle(!a), n.find('[data-tag="frequency"]').toggle(!a), n.find('[data-tag="recurring"]').toggle(a).html(i)
                    }
                }
            },
            handleAdminDefinedSetDonationFrequency: function(e, n) {
                var r = e.value,
                    t = document.querySelector(".give-recurring-admin-choice");
                r && t && (n.find(".js-give-donation-summary-frequency-help-text").toggle(!r), n.find('[data-tag="frequency"]').toggle(!r), n.find('[data-tag="recurring"]').html(t.textContent))
            },
            initFees: function() {
                GiveDonationSummary.observe(".give_fee_mode_checkbox", GiveDonationSummary.handleFees)
            },
            handleFees: function(e, n) {
                if (n.find(".fee-break-down-message").hide(), n.find(".js-give-donation-summary-fees").toggle(e.checked), e.checked) {
                    var r = new FormData(n[0]).get("give-fee-amount");
                    n.find('[data-tag="fees"]').html(GiveDonationSummary.format_amount(r, n))
                }
            },
            initTotal: function() {
                GiveDonationSummary.observe(".give-final-total-amount", (function(e, n) {
                    var r = e.dataset.total.replace(".", Give.form.fn.getInfo("decimal_separator", n));
                    n.find('[data-tag="total"]').html(GiveDonationSummary.format_amount(r, n))
                }));
                var e = document.querySelector(".give-final-total-amount");
                e && (e.dataset.total = e.dataset.total)
            },
            handleNavigateBack: function() {},
            onGatewayLoadSuccess: function() {
                var e = jQuery("#give_purchase_form_wrap .give-donation-summary-section").detach();
                e.length && (jQuery(".give-donation-summary-section").remove(), e.appendTo("#donate-fieldset"), GiveDonationSummary.initTotal(), GiveDonationSummary.handleNavigateBack = function(e) {
                    e.stopPropagation(), e.preventDefault(), window.formNavigator.back()
                })
            },
            observe: function(e, n) {
                var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    o = document.querySelector(e);
                if (o) {
                    var a = jQuery(o.closest(".give-form"));
                    new MutationObserver((function(e) {
                        var r, o = t(e);
                        try {
                            for (o.s(); !(r = o.n()).done;) {
                                var i = r.value;
                                "attributes" === i.type && n(i.target, a)
                            }
                        } catch (e) {
                            o.e(e)
                        } finally {
                            o.f()
                        }
                    })).observe(o, {
                        attributes: !0
                    }), r && n(o, a)
                }
            },
            format_amount: function(e, r) {
                e = e.replace(Give.form.fn.getInfo("thousands_separator", r), "").replace(Give.form.fn.getInfo("decimal_separator", r), ".");
                var t = Give.form.fn.getInfo("currency_code", r),
                    o = GiveDonationSummaryData.currencyPrecisionLookup[t];
                return n().formatMoney(e, {
                    symbol: Give.form.fn.getInfo("currency_symbol", r),
                    format: "before" === Give.form.fn.getInfo("currency_position", r) ? "%s%v" : "%v%s",
                    decimal: Give.form.fn.getInfo("decimal_separator", r),
                    thousand: Give.form.fn.getInfo("thousands_separator", r),
                    precision: o
                })
            }
        }, jQuery(document).on("give:postInit", GiveDonationSummary.init), jQuery(document).on("Give:onGatewayLoadSuccess", GiveDonationSummary.onGatewayLoadSuccess)
    })()
})();