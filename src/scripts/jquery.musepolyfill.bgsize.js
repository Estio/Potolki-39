/*
 Copyright 2011-2016 Adobe Systems Incorporated. All Rights Reserved.
 */
(function (a) {
    function b(a) {
        var b = a.css("background-image");
        a.css("background-image", "");
        var c = a.css("background-image");
        b != c && a.css("background-image", b);
        return c.replace(/^\s*url\(\"?/, "").replace(/['"]?\)$/, "")
    }

    if (!Muse.Browser.Features.checkCSSFeature("background-size")) {
        var c = function (c) {
            var f = a(c), d = b(f), h = document.createElement("img"), j = document.createElement("div"), i = this, l = !1, n = !1, o = !0, p = {};
            a(j).css({
                overflow: "hidden",
                position: "absolute",
                top: "0px",
                left: "0px",
                width: c.clientWidth + "px",
                height: c.clientHeight +
                "px",
                marginBottom: "-" + c.clientHeight + "px",
                marginRight: "-" + c.clientWidth + "px",
                zIndex: "-1"
            }).addClass("museBgSizePolyfill");
            h.src = d;
            h.alt = "";
            h.style.position = "absolute";
            j.appendChild(h);
            c.children.length > 0 ? c.insertBefore(j, c.children[0]) : c.appendChild(j);
            if (c === document.body)f = a("html"), c = f.get(0), d = b(f), h.src = d, f.css("background-attachment") == "fixed" ? (j.style.position = "fixed", o = !1) : j.style.position = "absolute"; else if (f.is("#page"))f.css("marginLeft").toLowerCase() == "auto" && (n = !0), j.style.top = f.offset().top +
                parseInt(f.css("borderTopWidth")) + "px", j.style.bottom = parseInt(f.parent().css("paddingBottom")) + parseInt(f.css("borderBottomWidth")) + "px", j.style.left = f.offset().left + parseInt(f.css("borderLeftWidth")) + "px", j.style.right = f.offset().left + parseInt(f.css("borderRightWidth")) + "px", j.style.zIndex = 0; else if (f.css("position") == "static")c.style.position = "relative";
            this.reloadImage = function () {
                var a = b(f), d = f.css("background-color");
                if (a != h.src)h.src = a;
                c.style.backgroundImage = "none";
                c.style.backgroundColor =
                    "transparent";
                j.style.backgroundColor = d;
                a = (f.css("background-position-x") + " " + f.css("background-position-y")).replace(/^\s+/, "").replace(/\s+$/, "");
                "0px 0px" == a && (a = "left top");
                a = a.split(/\s+/);
                a.length == 1 && a[0].indexOf("center") >= 0 && a.push("center");
                if (f.data("hasBackgroundPositionScrollEffect") != !0)for (var d = 0, k = a.length; d < k; d++)switch (a[d]) {
                    case "center":
                    case "50%":
                        d == 0 ? (h.style.right = "", h.style.left = "50%", h.style.marginLeft = "-" + Math.ceil(h.offsetWidth / 2) + "px") : (h.style.bottom = "", h.style.top = "50%",
                            h.style.marginTop = "-" + Math.ceil(h.offsetHeight / 2) + "px");
                        break;
                    case "left":
                        h.style.right = "";
                        h.style.left = "0px";
                        h.style.marginLeft = "0px";
                        break;
                    case "right":
                        h.style.left = "";
                        h.style.right = "0px";
                        h.style.marginLeft = "0px";
                        break;
                    case "top":
                        h.style.bottom = "";
                        h.style.top = "0px";
                        h.style.marginTop = "0px";
                        break;
                    case "bottom":
                        h.style.top = "";
                        h.style.bottom = "0px";
                        h.style.marginTop = "0px";
                        break;
                    default:
                        d == 0 ? (h.style.left = a[d], h.style.marginLeft = "-" + Math.ceil(h.offsetWidth / 2) + "px") : (h.style.top = a[d], h.style.marginTop =
                            "-" + Math.ceil(h.offsetHeight / 2) + "px")
                }
            };
            this.resizeImage = function (a) {
                var b = c.getBoundingClientRect(), d = c.scrollWidth - (Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder ? b.right - b.left - f.innerWidth() : 0), b = c.scrollHeight - (Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder ? b.bottom - b.top - f.innerHeight() : 0), d = !o ? c.clientWidth : Math.max(d, c.clientWidth), b = !o ? c.clientHeight : Math.max(b, c.clientHeight);
                !p[h.src] && h.clientWidth && (p[h.src] = {width: h.clientWidth, height: h.clientHeight});
                var k = d / (p[h.src] ? p[h.src].width :
                        1), i = b / (p[h.src] ? p[h.src].height : 1);
                j.style.height = b + "px";
                j.style.marginBottom = "-" + b + "px";
                j.style.width = d + "px";
                j.style.marginRight = "-" + d + "px";
                k < i == a ? (h.style.height = b + 1 + "px", h.style.width = "auto") : (h.style.width = d + 1 + "px", h.style.height = "auto")
            };
            this.update = function () {
                if (l) {
                    c.style.backgroundImage = "";
                    f.css("background-color", "");
                    var a = f.css("background-image").toLowerCase(), b = (c.currentStyle || window.getComputedStyle(c, null))["background-size"];
                    b && b.toLowerCase();
                    if (a != "none" && (b == "cover" || b == "contain")) {
                        if (i.reloadImage(),
                                j.style.display = "block", j.style.width = "0px", j.style.height = "0px", i.resizeImage(b == "cover"), n)j.style.left = f.offset().left + parseInt(f.css("borderLeftWidth")) + "px", j.style.right = f.offset().left + parseInt(f.css("borderRightWidth")) + "px"
                    } else j.style.display = "none"
                }
            };
            if (h.complete || d == "none")l = !0; else a(h).one("load", function () {
                l = !0;
                i.update()
            });
            this.update()
        }, d = function () {
            this.updateList = []
        };
        d.prototype.initialize = function (b) {
            var f = this;
            b.each(function () {
                var b = new c(this);
                this !== document.body ? f.updateList.push(b) :
                    (a(window).resize(function () {
                        setTimeout(function () {
                            b.update()
                        }, 10)
                    }), a(window).load(function () {
                        setTimeout(function () {
                            b.update()
                        }, 10)
                    }))
            });
            var d = f.updateList.length;
            d > 0 && setInterval(function () {
                for (var a = 0; a < d; a++)f.updateList[a].update()
            }, Math.max(120, 16 * d))
        };
        a(window).data("musePolyfill.bgSize", new d)
    }
})(jQuery);
;(function () {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function (a, b) {
            for (var c = 0, d = a.length; c < d; c++)if (a[c] == b)return c;
            return -1
        }(Muse.assets.required, "jquery.musepolyfill.bgsize.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2015.1.2.344" != d.getAttribute("content") && Muse.assets.outOfDate.push("jquery.musepolyfill.bgsize.js");
                    break
                }
            }
        }
    }
})();
