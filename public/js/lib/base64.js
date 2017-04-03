!function () {
    "use strict";
    angular.module("base64", []).constant("$base64", function () {
        function a(a, b) {
            var c = f.indexOf(a.charAt(b));
            if (-1 == c)throw"Cannot decode base64";
            return c
        }

        function b(b) {
            b = "" + b;
            var c, d, f, g = b.length;
            if (0 == g)return b;
            if (0 != g % 4)throw"Cannot decode base64";
            c = 0, b.charAt(g - 1) == e && (c = 1, b.charAt(g - 2) == e && (c = 2), g -= 4);
            var h = [];
            for (d = 0; g > d; d += 4)f = a(b, d) << 18 | a(b, d + 1) << 12 | a(b, d + 2) << 6 | a(b, d + 3), h.push(String.fromCharCode(f >> 16, 255 & f >> 8, 255 & f));
            switch (c) {
                case 1:
                    f = a(b, d) << 18 | a(b, d + 1) << 12 | a(b, d + 2) << 6, h.push(String.fromCharCode(f >> 16, 255 & f >> 8));
                    break;
                case 2:
                    f = a(b, d) << 18 | a(b, d + 1) << 12, h.push(String.fromCharCode(f >> 16))
            }
            return h.join("")
        }

        function c(a, b) {
            var c = a.charCodeAt(b);
            if (c > 255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";
            return c
        }

        function d(a) {
            if (1 != arguments.length)throw"SyntaxError: Not enough arguments";
            var b, d, g = [];
            a = "" + a;
            var h = a.length - a.length % 3;
            if (0 == a.length)return a;
            for (b = 0; h > b; b += 3)d = c(a, b) << 16 | c(a, b + 1) << 8 | c(a, b + 2), g.push(f.charAt(d >> 18)), g.push(f.charAt(63 & d >> 12)), g.push(f.charAt(63 & d >> 6)), g.push(f.charAt(63 & d));
            switch (a.length - h) {
                case 1:
                    d = c(a, b) << 16, g.push(f.charAt(d >> 18) + f.charAt(63 & d >> 12) + e + e);
                    break;
                case 2:
                    d = c(a, b) << 16 | c(a, b + 1) << 8, g.push(f.charAt(d >> 18) + f.charAt(63 & d >> 12) + f.charAt(63 & d >> 6) + e)
            }
            return g.join("")
        }

        var e = "=", f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        return {encode: d, decode: b}
    }())
}();
