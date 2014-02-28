(function (color) {

    /**
     * @class color.Palette
     * Creating palettes based on root color
     * @singleton
     */
    color.Palette = {};

    /**
     * @property {Number} speed
     * The speed at which the gap increases
     */
    color.Palette.speed = 0.00025;

    /**
     * @property {Number} limit
     * The maximum acceptable gap
     */
    color.Palette.limit = 0.3;

    /**
     * @property {Object} hsvGap
     * The gap between the colors
     */
    color.Palette.hsvGap = {h: 0, s: 0, v: 0};


    /**
     * @method checkGyro
     * Checks if the device has moved enough in an axiss
     * to call the changeGap method
     * @param {String} a The angle of rotation of device
     * @param {String} p Which one of h/s/v will this affect
     * @param {Object} o The gyroscope object
     */
    color.Palette.checkGyro = function (a, p, o) {
        if(Math.abs(o[a] - color.Gyro[a]) > color.angleThreshold){
            if((o[a] - color.Gyro[a]) < 0) this.changeGap(p, this.speed);
            if((o[a] - color.Gyro[a]) > 0) this.changeGap(p, -this.speed);
        }
    }

    /**
     * @method changeGap
     * Shift the pallete if its tilted enough
     * @param {String} p The property h/s/v that will change
     * @param {String} s The amount the property will change
     */
    color.Palette.changeGap = function (p, s) {
        this.hsvGap[p] = this.hsvGap[p] + s;
        this.hsvGap[p] = (this.hsvGap[p] >= this.limit) ? this.limit : this.hsvGap[p];
        this.hsvGap[p] = (this.hsvGap[p] <= -this.limit) ? -this.limit : this.hsvGap[p];
    }

    /**
     * @method updatePalette
     * Update the palette on the interface
     */
    color.Palette.updatePalette = function () {
        var p = $("#combo div");

        color.updateColor(this.computePalette(2), $(p[0]), $(p[0]).find("p"));
        color.updateColor(this.computePalette(1), $(p[1]), $(p[1]).find("p"));

        color.updateColor(
            color.Converter.rgb2hex(
                color.Converter.hsv2rgb(color.Picker.hsv)
            ),
            $(p[2]),
            $(p[2]).find("p")
        );

        color.updateColor(this.computePalette(-1), $(p[3]), $(p[3]).find("p"));
        color.updateColor(this.computePalette(-2), $(p[4]), $(p[4]).find("p"));
    }


    /**
     * @method computePalette
     * Compute the color based on distance from the root color
     * @param {Number} diff The distance from the root color
     * @return {String} The color in hexadecimal
     */
    color.Palette.computePalette = function (diff) {
        var hsv = {
            h: color.Picker.hsv.h,
            s: color.Picker.hsv.s,
            v: color.Picker.hsv.v
        };

        hsv.h = (hsv.h + (this.hsvGap.h * diff)) % 1;
        hsv.s = hsv.s + (this.hsvGap.s * diff);
        hsv.v = hsv.v + (this.hsvGap.v * diff);

        hsv.s = (hsv.s > 1) ? 1 : hsv.s;
        hsv.s = (hsv.s < 0) ? 0 : hsv.s;

        hsv.v = (hsv.v > 1) ? 1 : hsv.v;
        hsv.v = (hsv.v < 0) ? 0 : hsv.v;


        return color.Converter.rgb2hex(
            color.Converter.hsv2rgb(hsv)
        );
    }

})(color);
