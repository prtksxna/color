(function (color, gyro) {

    /**
     * @class color.Gyro
     * Utility functions for Gyroscope stuff
     * @singleton
     */
    color.Gyro = {}

    /**
     * @property alpha
     */
    color.Gyro.alpha = undefined;

    /**
     * @property beta
     */
    color.Gyro.beta = undefined;

    /**
     * @property gamma
     */
    color.Gyro.gamma = undefined;

    /**
     * @method init
     * Starts the gyroscope listener
     */
    color.Gyro.init = function () {
        gyro.frequency = 1;
        gyro.startTracking(function(o) {
            color.Gyro.setCalibration(o);
            color.Gyro.move(o);
        });
    }

    /**
     * @method setCalibration
     * @param {Object} o
     * @return {Boolean}
     *  Whether the calibration was set are not
     */
    color.Gyro.setCalibration =  function (o) {
        if(this.alpha === undefined ||
           this.alpha === null ||
           this.beta === undefined ||
           this.beta === null ||
           this.gamma === undefined ||
           this.gamma === null
          ){
            this.alpha = o.alpha;
            this.beta = o.beta;
            this.gamma = o.gamma;
            return true;
        }else{
            return false;
        }
    }

    /**
     * @method move
     * Move colors according to whice axis is tilted
     * @param {Object} o
     */
    color.Gyro.move = function (o) {
        if(color.mode === "picker"){
            color.Picker.checkGyro("alpha", "h", o);
            color.Picker.checkGyro("beta", "s", o);
            color.Picker.checkGyro("gamma", "v", o);

            color.updateColor(
                color.Converter.rgb2hex(
                    color.Converter.hsv2rgb(color.Picker.hsv)
                ),
                $("#color"),
                $("#hex")
            );

        }else if(color.mode === "palette") {
            color.Palette.checkGyro("alpha", "h", o);
            color.Palette.checkGyro("beta", "s", o);
            color.Palette.checkGyro("gamma", "v", o);

            color.Palette.updatePalette();
        }
    }

    /**
     * @method resetCalibration
     * Reset the calibration by removing current values
     */
    color.Gyro.resetCalibration = function () {
        this.alpha = this.beta = this.gamma = undefined;
    }

})(color, gyro);
