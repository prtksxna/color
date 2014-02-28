(function () {

    /**
     * @class color
     * @singleton
     */
    color = {};

    /**
     * @property mode
     * The mode in which the app currently is in
     */
    color.mode = "picker";

    /**
     * @property startColors
     * The mode in which the app currently is in
     */
    color.startColors = [
        "#FC1525",
        "#F26226",
        "#D00D6D",
        "#22A8FF",
        "#30CA52"
    ];

    /**
     * @property {Number} angleThreshold
     * The threshold after which the color changes
     */
    color.Picker.angleThreshold = 12;

    /**
     * @method updateColor
     * Change the color and update the color name
     * for the given DOM element
     * @param {String} color The hex code of the color
     * @param {Object} $el The jQuery element that needs to be updated
     * @param {Object} $p The element where the hex number is dplayed
     */
    color.updateColor = function (color, $el, $p) {
        $el.css("background", color);
        $p.text(color)
        if($p.attr("id") === "hex"){
            $p.css("color", color);
        }
    }

    /**
     * @method init
     * Initialize the interface and the Gyro
     */
    color.init = function () {
        this.Interface.init();
        this.Gyro.init();
    }

})();
