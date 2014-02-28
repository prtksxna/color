(function (color) {

    /*
     * @class Palette
     * Creating palettes based on root color
     */
    color.Palette = {};

    /*
     * @method checkGyro
     * Checks if the device has moved enough in an axiss
     * to call the changeGap method
     */
    color.Palette.checkGyro = function (d, v, o) {
        if(Math.abs(o[d] - this[d]) > 12){
            if((o[d] - this[d]) < 0) UI.gapShift(v,  0.00025);
            if((o[d] - this[d]) > 0) UI.gapShift(v, -0.00025);
        }
    }

    /*
     * @method changeGap
     * Shift the pallete if its tilted enough
     */
    color.Pallete.changeGap = function (p,v) {
        this.hsvGap[p] = this.hsvGap[p] + v;
        this.hsvGap[p] = (this.hsvGap[p] >= 0.3) ? 0.3 : this.hsvGap[p];
        this.hsvGap[p] = (this.hsvGap[p] <= -0.3) ? -0.3 : this.hsvGap[p];
    }

    /*
     * @method updatePalette
     * Update the palette on the interface
     */
    color.Palette.updatePalette = function () {
        var p = $("#combo div");

        this.updateColor(this.paletteColor(2), $(p[0]), $(p[0]).find("p"));
        this.updateColor(this.paletteColor(1), $(p[1]), $(p[1]).find("p"));
        this.updateColor(rgb2hex(hsv2rgb(this.hsv)), $(p[2]), $(p[2]).find("p"));
        this.updateColor(this.paletteColor(-1), $(p[3]), $(p[3]).find("p"));
        this.updateColor(this.paletteColor(-2), $(p[4]), $(p[4]).find("p"));
    }


    /*
     * @method computePalette
     * Compute the color based on distance from the root color
     */
    color.Palette.computePalette = function (diff) {
        var hsv = {
            h: this.hsv.h,
            s: this.hsv.s,
            v: this.hsv.v
        };

        hsv.h = (hsv.h + (this.hsvGap.h * diff)) % 1;
        hsv.s = hsv.s + (this.hsvGap.s * diff);
        hsv.v = hsv.v + (this.hsvGap.v * diff);

        hsv.s = (hsv.s > 1) ? 1 : hsv.s;
        hsv.s = (hsv.s < 0) ? 0 : hsv.s;

        hsv.v = (hsv.v > 1) ? 1 : hsv.v;
        hsv.v = (hsv.v < 0) ? 0 : hsv.v;


        return rgb2hex(hsv2rgb(hsv));
    }

})(color);
