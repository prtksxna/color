(function (color) {

    /**
     * @class color.Picker
     * Picking colors based on gyro movement
     * @singleton
     */
    color.Picker = {};


    /**
     * @property {Number} speed
     * The speed at which the color changes
     */
    color.Picker.speed = 0.001;

    /**
     * @property {Object} hsv
     * The current color being displayed
     */
    color.Picker.hsv = {h: 0, s: 0, v: 0};

    /**
     * @method checkGyro
     * Checks if device has moved enough in an axis to
     * call the colorChange method
     * @param {String} a The angle of rotation of device
     * @param {String} p Which one of h/s/v will this affect
     * @param {Object} o The gyroscope object
     */
    color.Picker.checkGryo = function (a, p, o) {
        if(Math.abs(o[a] - color.Gyro[a]) > color.angleThreshold){
            if((o[a] - color.Gyro[a]) < 0) this.changeColor(p, this.speed);
            if((o[a] - color.Gyro[a]) > 0) this.chaneColor(p, -this.speed);
        }
    }

    /**
     * @method changeColor
     * Shift the color if its tilted enough
     * @param {String} p The property h/s/v that will change
     * @param {String} s The amount the property will change
     */
    color.Picker.changeColor = function (p, s) {
        this.hsv[p] = Math.abs(this.hsv[p] + s);
        this.hsv[p] = (this.hsv[p] >= 1) ? 1 : this.hsv[p];
        this.hsv[p] = (this.hsv[p] <= 0) ? 0 : this.hsv[p];
    }

})(color);
