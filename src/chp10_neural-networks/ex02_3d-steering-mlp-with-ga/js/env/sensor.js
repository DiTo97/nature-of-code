'use strict';

/**
 * A class that implements a 3D range sensor with a given angle of view (AoV).
 * 
 * It acts as a 2D sensor perceiving objects only on the (polar) XY plane.
 */
export default class Sensor {
    /**
     * @param {number} angle The polar angle [rad]
     * @param {number} aov The polar AoV on the XY plane
     * 
     * @param {Object} kwargs
     * @param {p5} kwargs._p5 An instance of p5.js. It defaults to the global p5.js
     */
    constructor(angle, aov, {_p5 = p5.instance}) {
        /**
         * An instance of p5.js.  
         * It defaults to the global p5.js
         * 
         * @type {p5}
         */
        this._p5 = _p5;
        
        /**
         * The 3D orientation of the sensor
         * @type {p5.Vector}
         */
        this.dir = p5.Vector.fromAngles(angle, _p5.HALF_PI);

        /**
         * The polar AoV on the XY plane
         * @type {number}
         */
        this.aov = aov;

        /**
         * The maximum range of perception.  
         * It defaults to 250
         * 
         * @type {number}
         */
        this.max_range = 250;

        /**
         * The sensor's reading in [0, {@link max_range}].  
         * It defaults to 0
         * 
         * @type {number}
         */
        this.val = 0;
    }

    /**
     * The normalized sensor's reading in [0, 1].
     * @type {number}
     */
    get normalized() {
        return this.val / this.max_range;
    }

    /**
     * Reset the sensor's reading to {@link max_range}.
     */
     reset() {
        this.val = this.max_range;
    }

    /**
     * Render the 3D sensor onto the canvas.
     */
    render() {
        const {_p5, dir, val} = this;

        if (val > 0) {
            _p5.stroke(255);
            _p5.strokeWeight(this.normalized);

            const x = dir.x * val;
            const y = dir.y * val;
            const z = dir.z * val;

            _p5.line(0, 0, 0, x, y, z);
        }
    }
}
