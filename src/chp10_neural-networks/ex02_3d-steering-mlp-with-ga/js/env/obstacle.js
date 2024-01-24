'use strict';

/**
 * A class that implements a 3D obstacle subject to gravity.
 */
export default class Obstacle {
    /**
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     * 
     * @param {Object} kwargs
     * @param {number} kwargs.z The position along the Z-axis. It defaults to 0
     * @param {p5} kwargs._p5 An instance of p5.js. It defaults to the global p5.js
     */
    constructor(x, y, {z = 0, _p5 = p5.instance}) {
        /**
         * An instance of p5.js.
         * It defaults to the global p5.js
         * 
         * @type {p5}
         */
        this._p5 = _p5;
        
        /**
         * The 3D position of the obstacle
         * @type {p5.Vector}
         */
        this.pos = _p5.createVector(x, y, z);

        /**
         * The extent of the obstacle
         * @type {number}
         */
        this.r = 10;
    }

    /**
     * Progress the simulation by one timestep.  
     * 
     * It applies gravity via a de-facto Euler integration.
     */
    step() {
        this.pos.y += 3;
    }

    /**
     * Render the 3D obstacle onto the canvas.
     */
    render() {
        const {_p5, pos: {x, y, z}, r} = this;

        _p5.push();
            _p5.translate(x, y, z);

            _p5.stroke(255);
            _p5.noFill();
            
            _p5.sphere(r);
        _p5.pop();
    }
}
