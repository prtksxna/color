(function (color, $) {

    /**
     * @class color.Interface
     * Manages all interface events
     * @singleton
     */
    color.Interface = {};

    /**
     * @method init
     * Initialize the interface
     */
    color.Interface.init = function () {
        // Resize UI and bind event
        this.resize();
        $(window).on("resize", function () {
            color.Interface.resize();
        });

        // Initialize with a color
        var c = color.startColors[Math.floor(Math.random() * 5)];
        color.updateColor(c, $("#color"), $("#hex"));
        color.Picker.hsv = color.Converter.rgb2hsv(
            color.Converter.hex2rgb(c)
        );

        $("#combo").hide();
        $("#color").on("click", color.Interface.colorClick);
        $("#combo > div").on("click", color.Interface.comboClick);
    }

    /**
     * @method resize
     * Resize all elements according to window size
     */
    color.Interface.resize = function () {
        var h = $(window).height();
        var w = $(window).width();

        var h_hex = w/2;
        var w_hex = w/2;

        $("#hex").css({
            "top": ((h/2) - (h_hex/2)) + "px",
            "left": ((w/2) - (w_hex/2)) + "px",
            "width": w_hex + "px",
            "height": h_hex + "px",
            "lineHeight": h_hex + "px",
            "borderRadius": h_hex + "px"
        });

        $("#menu >  h1, #menu > ul > li > a").css("lineHeight", h/3 + "px");

        $("body").css("fontSize", h/100 + "px");

        $("#menu, #color, #combo")
            .height(h)
            .width(w);

        $("#combo > div > p").css("lineHeight", h/5 + "px");
    }

    /**
     * @event colorClick
     */
    color.Interface.colorClick = function () {
        $("#color").hide();
        $("#combo").show();

        color.mode = "palette";
        color.Gyro.resetCalibration();
        color.Palette.updatePalette();
    }

    /**
     * @event comboClick
     */
    color.Interface.comboClick = function () {
        color.Gyro.resetCalibration();
        var c = $(this).css("backgroundColor") + "";
        c = c.substring(4, c.length -1).split(", ");
        c = {
            r: +c[0],
            g: +c[1],
            b: +c[2]
        };

        $("#color").show();
        $("#combo").hide();

        color.Picker.hsv = color.Converter.rgb2hsv(c);
        color.Palette.hsvGap = {h:0, s:0,v:0};
        color.mode = "picker";
        color.updateColor(
            color.Converter.rgb2hex(c),
            $("#color"),
            $("hex")
        );
    }

})(color, jQuery);
