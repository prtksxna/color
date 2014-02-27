(function (color) {

    color.color = {};

    /**
     * @method rgb2hex
     * @param {Object} rgb {r: 0, g: 0, b: 0}
     * @return {String} hex #000000
     */
    color.color.rgb2hex = function (rgb) {
	r = rgb.r.toString(16);
	g = rgb.g.toString(16);
	b = rgb.b.toString(16);

	r = (r.length === 1) ? "0" + r : r;
	g = (g.length === 1) ? "0" + g : g;
	b = (b.length === 1) ? "0" + b : b;

	return "#" + r + "" + g + "" + b;
    }

    /**
     * @method hex2rgb
     * @param {String} hex #000000
     * @return {Object} rgb {r:0, g:0, b: 0}
     */
    color.color.hex2rgb = function (hex) {
	hex = hex.substring(1);
	var r = hex[0] + hex[1];
	var g = hex[2] + hex[3];
	var b = hex[4] + hex[5];

	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);

	return {
	    "r": r,
	    "g": g,
	    "b": b
	};
    }

    /**
     * @methof rgb2hsv
     * @param {Object} rgb {r:0, g:0, b: 0}
     * @return {Object} hsv {h: 0, s: 0, v: 0}
     */
    color.color.rgb2hsv = function (rgb) {
	var rr, gg, bb,
	r = rgb.r,
	g = rgb.g,
	b = rgb.b,
	h, s,
	v = Math.max(r, g, b),
	diff = v - Math.min(r, g, b),
	diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff == 0) {
            h = s = 0;
	} else {
            s = diff / v;
            rr = diffc(r);
            gg = diffc(g);
            bb = diffc(b);

            if (r === v) {
		h = bb - gg;
            }else if (g === v) {
		h = (1 / 3) + rr - bb;
            }else if (b === v) {
		h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
		h += 1;
            }else if (h > 1) {
		h -= 1;
            }
	}
	return {
            h: h,
            s: s,
            v: v/255.0
	};
    }

    /**
     * @method hsv2rgb
     * @param {Object} hsv {h: 0, s: 0, v: 0}
     * @return {Object} rgb {r: 0, g: 0, b: 0}
     */
    color.color.hsv2rgb = function (hsv) {
	h = hsv.h;
	s = hsv.s;
	v = hsv.v;

	var r, g, b, i, f, p, q, t;
	if (h && s === undefined && v === undefined) {
            s = h.s, v = h.v, h = h.h;
	}
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
	}
	return {
            r: Math.floor(r * 255),
            g: Math.floor(g * 255),
            b: Math.floor(b * 255)
	};
    }

})(color);
