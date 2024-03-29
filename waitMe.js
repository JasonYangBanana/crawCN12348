/*
waitMe - 1.17 [29.07.16]
Author: vadimsva
Github: https://github.com/vadimsva/waitMe
*/
(function (b) {
  b.fn.waitMe = function (p) {
    return this.each(function () {
      function y() {
        var a = f.attr("data-waitme_id");
        f.removeClass("waitMe_container").removeAttr("data-waitme_id");
        f.find('.waitMe[data-waitme_id="' + a + '"]').remove()
      }
      var f = b(this),
        z, g, e, r = !1,
        t = "background-color",
        u = "",
        q = "",
        v, a, w, n = {
          init: function () {
            function n(a) {
              l.css({
                top: "auto",
                transform: "translateY(" + a + "px) translateZ(0)"
              })
            }
            a = b.extend({
              effect: "bounce",
              text: "",
              bg: "rgba(255,255,255,0.7)",
              color: "#000",
              maxSize: "",
              waitTime: -1,
              textPos: "vertical",
              fontSize: "",
              source: "",
              onClose: function () {}
            }, p);
            w = (new Date).getMilliseconds();
            v = b('<div class="waitMe" data-waitme_id="' + w + '"></div>');
            switch (a.effect) {
              case "none":
                e = 0;
                break;
              case "bounce":
                e = 3;
                break;
              case "rotateplane":
                e = 1;
                break;
              case "stretch":
                e = 5;
                break;
              case "orbit":
                e = 2;
                r = !0;
                break;
              case "roundBounce":
                e = 12;
                break;
              case "win8":
                e = 5;
                r = !0;
                break;
              case "win8_linear":
                e = 5;
                r = !0;
                break;
              case "ios":
                e = 12;
                break;
              case "facebook":
                e = 3;
                break;
              case "rotation":
                e = 1;
                t = "border-color";
                break;
              case "timer":
                e = 2;
                var c = b.isArray(a.color) ? a.color[0] : a.color;
                u = "border-color:" + c;
                break;
              case "pulse":
                e = 1;
                t = "border-color";
                break;
              case "progressBar":
                e = 1;
                break;
              case "bouncePulse":
                e = 3;
                break;
              case "img":
                e = 1
            }
            "" !== u && (u += ";");
            if (0 < e) {
              if ("img" === a.effect)
                q = '<img src="' + a.source + '">';
              else
                for (var d = 1; d <= e; ++d)
                  b.isArray(a.color) ? (c = a.color[d],
                    void 0 == c && (c = "#000")) : c = a.color,
                  q = r ? q + ('<div class="waitMe_progress_elem' + d + '"><div style="' + t + ":" + c + '"></div></div>') : q + ('<div class="waitMe_progress_elem' + d + '" style="' + t + ":" + c + '"></div>');
              g = b('<div class="waitMe_progress ' + a.effect + '" style="' + u + '">' + q + "</div>")
            }
            a.text && (c = b.isArray(a.color) ? a.color[0] : a.color,
              z = b('<div class="waitMe_text" style="color:' + c + ";" + ("" != a.fontSize ? "font-size:" + a.fontSize : "") + '">' + a.text + "</div>"));
            var k = f.find("> .waitMe");
            k && k.remove();
            c = b('<div class="waitMe_content ' + a.textPos + '"></div>');
            c.append(g, z);
            v.append(c);
            "HTML" == f[0].tagName && (f = b("body"));
            f.addClass("waitMe_container").attr("data-waitme_id", w).append(v);
            k = f.find("> .waitMe");
            var l = f.find(".waitMe_content");
            k.css({
              background: a.bg
            });
            "" !== a.maxSize && "none" != a.effect && (c = g.outerHeight(),
              g.outerWidth(),
              "img" === a.effect ? (g.css({
                  height: a.maxSize + "px"
                }),
                g.find(">img").css({
                  maxHeight: "100%"
                }),
                l.css({
                  marginTop: -l.outerHeight() / 2 + "px"
                })) : a.maxSize < c && ("stretch" == a.effect ? (g.css({
                  height: a.maxSize + "px",
                  width: a.maxSize + "px"
                }),
                g.find("> div").css({
                  margin: "0 5%"
                })) : (c = a.maxSize / c - .2,
                d = "-50%",
                "roundBounce" == a.effect ? (d = "-75%",
                  a.text && (d = "75%")) : "win8" == a.effect || "timer" == a.effect || "orbit" == a.effect ? (d = "-20%",
                  a.text && (d = "20%")) : "ios" == a.effect && (d = "-15%",
                  a.text && (d = "15%")),
                "rotation" == a.effect && a.text && (d = "75%"),
                g.css({
                  transform: "scale(" + c + ") translateX(" + d + ")",
                  whiteSpace: "nowrap"
                }))));
            l.css({
              marginTop: -l.outerHeight() / 2 + "px"
            });
            if (f.outerHeight() > b(window).height()) {
              c = b(window).scrollTop();
              var h = l.outerHeight(),
                m = f.offset().top,
                x = f.outerHeight();
              d = c - m + b(window).height() / 2;
              0 > d && (d = Math.abs(d));
              0 <= d - h && d + h <= x ? m - c > b(window).height() / 2 && (d = h) : d = c > m + x - h ? c - m - h : c - m + h;
              n(d);
              b(document).scroll(function () {
                var a = b(window).scrollTop() - m + b(window).height() / 2;
                0 <= a - h && a + h <= x && n(a)
              })
            }
            0 < a.waitTime && setTimeout(function () {
              y()
            }, a.waitTime);
            k.on("destroyed", function () {
              if (a.onClose && b.isFunction(a.onClose))
                a.onClose(f);
              k.trigger("close", {
                el: f
              })
            });
            b.event.special.destroyed = {
              remove: function (a) {
                a.handler && a.handler()
              }
            };
            return k
          },
          hide: function () {
            y()
          }
        };
      if (n[p])
        return n[p].apply(this, Array.prototype.slice.call(arguments, 1));
      if ("object" === typeof p || !p)
        return n.init.apply(this, arguments)
    })
  };
  b(window).on("load", function () {
    b("body.waitMe_body").addClass("hideMe");
    setTimeout(function () {
      b("body.waitMe_body").find(".waitMe_container:not([data-waitme_id])").remove();
      b("body.waitMe_body").removeClass("waitMe_body hideMe")
    }, 200)
  })
})(jQuery);