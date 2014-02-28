(function (color) {

    /*
     * @class Picker
     * Picking colors based on gyro movement
     */
    color.Picker = {};

    /*
     * @method checkGyro
     * Checks if device has moved enough in an axis to
     * call the colorChange method
     */
    color.Picker.checkGryo = function (d, v, o) {
        if(Math.abs(o[d] - this[d]) > 12){
            if((o[d] - this[d]) < 0) UI.colorShift(v, 0.001);
            if((o[d] - this[d]) > 0) UI.colorShift(v, -0.001);
        }
    }

    /*
     * @method changeColor
     * Shift the color if its tilted enough
     */
    color.Picker.changeColor = function (p, v) {
        this.hsv[p] = Math.abs(this.hsv[p] + v);
        this.hsv[p] = (this.hsv[p] >= 1) ? 1 : this.hsv[p];
        this.hsv[p] = (this.hsv[p] <= 0) ? 0 : this.hsv[p];
    }

    /*
     * @method updateColor
     * Update the color on the interface
     */
    color.Picker.updateColor = function(color, $el, $p) {
        $el.css("background", color);
        $p.text(color)
        if($p.attr("id") === "hex"){
            $p.css("color", color);
        }
    }

})(color);
