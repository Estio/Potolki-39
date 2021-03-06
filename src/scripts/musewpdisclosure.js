/*
 Copyright 2011-2016 Adobe Systems Incorporated. All Rights Reserved.
 */
(function (a, b, c) {
    c.Plugins.TabbedPanelsPlugin = {
        defaultOptions: {
            widgetClassName: "TabbedPanelsWidget",
            tabClassName: "TabbedPanelsTab",
            tabHoverClassName: "TabbedPanelsTabHover",
            tabDownClassName: "TabbedPanelsTabDown",
            tabActiveClassName: "TabbedPanelsTabSelected",
            panelClassName: "TabbedPanelsContent",
            panelActiveClassName: "TabbedPanelsContentVisible",
            defaultIndex: 0,
            canCloseAll: !1
        }, initialize: function (c, g) {
            var f = this;
            a.extend(g, a.extend({}, f.defaultOptions, g));
            b.Widget.Disclosure.DisplayPropertyTransitionPlugin.initialize(c,
                g);
            c.bind("attach-behavior", function () {
                f._attachBehavior(c)
            })
        }, _attachBehavior: function (a) {
            var b = a.tabs ? a.tabs.$element : null;
            if (b && (b.first().addClass("TabbedPanelsTabFirst"), b.last().addClass("TabbedPanelsTabLast"), a.options.event !== "click"))b.on(a.options.event, function () {
                a.tabs.selectTab(this)
            })
        }
    };
    c.Plugins.AccordionPlugin = {
        defaultOptions: {
            widgetClassName: "AccordionWidget",
            tabClassName: "AccordionPanelTab",
            tabHoverClassName: "AccordionPanelTabHover",
            tabDownClassName: "AccordionPanelTabDown",
            tabActiveClassName: "AccordionPanelTabOpen",
            panelClassName: "AccordionPanelContent",
            panelActiveClassName: "AccordionPanelContentActive",
            defaultIndex: 0,
            canCloseAll: !1,
            transitionDirection: "vertical"
        }, initialize: function (c, g) {
            var f = this;
            a.extend(g, a.extend({}, f.defaultOptions, g));
            g.toggleStateEnabled = g.canCloseAll;
            b.Widget.Disclosure.AccordionTransitionPlugin.initialize(c, g);
            c.bind("transform-markup", function () {
                f._transformMarkup(c)
            });
            c.bind("attach-behavior", function () {
                f._attachBehavior(c)
            })
        }, _transformMarkup: function (c) {
            var g = c.$element[0], f =
                c.options, k = f.transitionDirection === "vertical";
            c.$element.data("initialized") || (c.$element.data("initialized", !0), b.scopedFind(g, ".AccordionPanelContent", f.widgetClassName, g).each(function () {
                var b = a(this), c = !k ? parseInt(b.css("left")) : 0;
                b.removeClass(k ? "AccordionPanelContent colelem" : "AccordionPanelContent grpelem").wrap(k ? '<div class="AccordionPanelContent colelem"><div class="AccordionPanelContentClip"></div></div>' : '<div class="AccordionPanelContent grpelem"><div class="AccordionPanelContentClip"></div></div>').closest(".AccordionPanelContent").css({
                    width: "100%",
                    height: "100%", position: "relative", left: c + "px"
                });
                k || b.css({left: "0px", marginRight: "0px"})
            }))
        }, _attachBehavior: function (c) {
            var g = c.$element[0], f = c.options, k = 0, h = f.transitionDirection === "vertical", i = h ? "offsetWidth" : "offsetHeight", j = h ? "width" : "height", l = 0;
            b.scopedFind(g, ".AccordionPanel", f.widgetClassName, g).each(function () {
                k = k < this[i] ? this[i] : k
            }).each(function () {
                k > this[i] && (this.style[j] = k + "px");
                if (!h) {
                    var b = a(this);
                    b.css({width: "auto", marginRight: "0px", left: l + "px"});
                    l += b.children("." + f.tabClassName).outerWidth()
                }
            })
        }
    };
    b.Widget.TabbedPanels.prototype.defaultPlugins = [c.Plugins.TabbedPanelsPlugin];
    b.Widget.Accordion.prototype.defaultPlugins = [c.Plugins.AccordionPlugin]
})(jQuery, WebPro, Muse, window);
;(function () {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function (a, b) {
            for (var c = 0, d = a.length; c < d; c++)if (a[c] == b)return c;
            return -1
        }(Muse.assets.required, "musewpdisclosure.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2015.1.2.344" != d.getAttribute("content") && Muse.assets.outOfDate.push("musewpdisclosure.js");
                    break
                }
            }
        }
    }
})();
