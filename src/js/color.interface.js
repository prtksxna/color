(function (color, $) {

    /**
     * @class color.Interface
     * Manages all interface events
     */
    color.Interface = {};

    /**
     * @method init
     * Initialize the interface
     */
    color.Interface.init = function () {
        // Initialize with a color
        var color = this.startColors[Math.floor(Math.random() * 5)];
        this.updateColor(color, $("#color"), $("#hex"));
        this.Picker.hsv = this.converter.rgb2hsv(
            this.converter.hex2rgb(color)
        );

        // Resize UI and bind event
        this.resizeInterface();
        $(window).on("resize", function () {
            color.resizeInterface();
        });

        $("#combo").hide();
        $("#color").on("click", color.Interface..evColorClick);
        $("#combo > div").on("click", color.Interface.evComboClick);
    }

    /**
     * @method resize
     * Resize all elements according to window size
     */
    color.Interface.resize = function () {
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

        $("body").css("fontSize", h/100 + "px");

        $("#menu, #color, #combo")
            .height(h)
            .width(w);

        $("#combo > div >p").css("lineHeight", h/5 + "px");
    }

    /**
     * @method evColorClick
     */
    color.Interface.evColorClick = function () {
        $("#color").hide();
        $("#combo").show();

        color.mode = "combo";
        colorGyro.resetCalibration();
        color.Palette.updatePalette();
    }

    /**
     * @method evComboClick
     */
    color.Interface.evComboClick = function () {
        color.Gyro.resetCalibration();
        var color = $(this).css("backgroundColor") + "";
        color = color.substring(4, color.length -1).split(", ");
        color = {
            r: +color[0],
            g: +color[1],
            b: +color[2]
        };

        $("#color").show();
        $("#combo").hide();

        color.Picker.hsv = color.Converter.rgb2hsv(color);
        color.Palette.hsvGap = {h:0, s:0,v:0};
        color.mode = "color";
        color.updateColor(
            color.Converter.rgb2hex(color),
            $("#color"),
            $("hex")
        );
    }

})(color, jQuery);
