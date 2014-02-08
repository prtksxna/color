var UI = {

    init: function() {
	$("#combo").hide();

	$("#color").on("click", function(){
	    $("#color").hide();
	    $("#combo").show();
	    UI.mode = "combo";
	    UI.updatePalette();
	});

	$("#combo > div").on("click", function(){
	    var color = $(this).css("backgroundColor") + "";
	    color = color.substring(4, color.length -1).split(", ");
	    color = {
		r: +color[0],
		g: +color[1],
		b: +color[2]
	    };


	    $("#color").show();
	    $("#combo").hide();
	    UI.hsv = rgb2hsv(color);
	    UI.hsvGap = {h:0, s:0,v:0};
	    UI.mode = "color";
	    UI.updateColor(rgb2hex(color), $("#color"), $("hex"));

	});

	var colors = [
	    "#FC1525",
	    "#F26226",
	    "#D00D6D",
	    "#22A8FF",
	    "#30CA52",
	];
	var color = colors[Math.floor(Math.random() * 5)];
	this.updateColor(color, $("#color"), $("#hex"));
	this.hsv = rgb2hsv(hex2rgb(color));

	this.hsvGap = {h:0, s:0,v:0};

	this.mode = "color";
    },

    updatePalette: function() {
	var p = $("#combo div");

	this.updateColor(this.paletteColor(2), $(p[0]), $(p[0]).find("p"));
	this.updateColor(this.paletteColor(1), $(p[1]), $(p[1]).find("p"));
	this.updateColor(rgb2hex(hsv2rgb(this.hsv)), $(p[2]), $(p[2]).find("p"));
	this.updateColor(this.paletteColor(-1), $(p[3]), $(p[3]).find("p"));
	this.updateColor(this.paletteColor(-2), $(p[4]), $(p[4]).find("p"));
    },

    paletteColor: function(diff) {
	var hsv = {
	    h: this.hsv.h,
	    s: this.hsv.s,
	    v: this.hsv.v
	}

	hsv.h = hsv.h + (this.hsvGap.h * diff);
	hsv.s = hsv.s + (this.hsvGap.s * diff);
	hsv.v = hsv.v + (this.hsvGap.v * diff);

	hsv.s = (hsv.s > 1) ? 1 : hsv.s;
	hsv.s = (hsv.s < 0) ? 0 : hsv.s;

	hsv.v = (hsv.v > 1) ? 1 : hsv.v;
	hsv.v = (hsv.v < 0) ? 0 : hsv.v;


	return rgb2hex(hsv2rgb(hsv));
    },

    setCalibration: function(o) {
	if(this.gamma === undefined || this.gamma === null){
	    this.alpha = o.alpha;
	    this.beta = o.beta;
	    this.gamma = o.gamma;
	    return true;
	}else{
	    return false
	}
    },

    move: function(o) {
	if(this.mode === "color"){
	    this.colorShifter("gamma", "h", o);
	    this.colorShifter("alpha", "s", o);
	    this.colorShifter("beta", "v", o);
	    this.updateColor(rgb2hex(hsv2rgb(this.hsv)), $("#color"), $("#hex"));
	}else{
	    this.gapShifter("gamma", "h", o);
	    this.gapShifter("alpha", "s", o);
	    this.gapShifter("beta", "v", o);
	    this.updatePalette();
	}
    },

    colorShifter: function(d, v, o) {
	if(Math.abs(o[d] - this[d]) > 8){
	    if((o[d] - this[d]) < 0) UI.colorShift(v, 0.0025);
	    if((o[d] - this[d]) > 0) UI.colorShift(v, -0.0025);
	}
    },

    colorShift: function(p,v){
	this.hsv[p] = Math.abs(this.hsv[p] + v);
	this.hsv[p] = (this.hsv[p] >= 1) ? 1 : this.hsv[p];
	this.hsv[p] = (this.hsv[p] <= 0) ? 0 : this.hsv[p];
    },


    gapShifter: function(d, v, o) {
	if(Math.abs(o[d] - this[d]) > 8){
	    if((o[d] - this[d]) < 0) UI.gapShift(v,  0.00025);
	    if((o[d] - this[d]) > 0) UI.gapShift(v, -0.00025);
	}
    },

    gapShift: function(p,v){
	this.hsvGap[p] = this.hsvGap[p] + v;
	this.hsvGap[p] = (this.hsvGap[p] >= 0.3) ? 0.3 : this.hsvGap[p];
	this.hsvGap[p] = (this.hsvGap[p] <= -0.3) ? -0.3 : this.hsvGap[p];
    },

    updateColor: function(color, $el, $p) {
	$el.css("background", color);
	$p.text(color)
	if($p.attr("id") === "hex"){
	    $p.css("color", color);
	}
    },

    resize: function(){
	var h = $(window).height();
	var w = $(window).width();

	var h_hex = w/4;
	var w_hex = w/4;

	$("#hex").css({
	    "top": ((h/2) - (h_hex/2)) + "px",
	    "left": ((w/2) - (w_hex/2)) + "px",
	    "width": w_hex + "px",
	    "height": h_hex + "px",
	    "lineHeight": h_hex + "px",
	    "borderRadius": h_hex + "px"
	});


	$("#menu, #color, #combo")
	    .height(h)
	    .width(w);

	$("#combo > div >p").css("lineHeight", h/5 + "px");
    }
};

$(function(){
    UI.init();
    UI.resize();
    $(window).on("resize", function(){
	UI.resize();
    });
});

gyro.frequency = 1;
gyro.startTracking(function(o) {
    UI.setCalibration(o);
    UI.move(o);
});
