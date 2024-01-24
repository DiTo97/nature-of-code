'use strict';

/**
 * A class that implements a 2D attractor.
 * 
 * An attractor is an object whose location is fixed.
 * 
 * @property {p5} _p5 An instance of p5.js
 * 
 * @property {number} mass The mass of the object
 * @property {number} r The extension of the object
 * 
 * @property {p5.Vector} pos The 2D position of the object
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas.
 */
class Attractor {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} mass The mass of the object
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, mass, x, y) {
        this.p5 = _p5

        this.mass = mass;
        this.r = 4*mass;

        this.pos = _p5.createVector(x, y);

        this.color = 128;
    }
    
    /**
     * Display the object on the canvas.
     */
    display() {
        this.p5.push()

        this.p5.ellipseMode(this.p5.CENTER);

        this.p5.fill(this.color);
        this.p5.stroke(0);

        this.p5.ellipse(this.pos.x, 
                        this.pos.y, 
                        this.r);

        this.p5.pop();
    }

    /**
     * Compute the 2D attraction force of the object on another.
     * 
     * @param {Attractor} o The other object
     * @param {number} G The Newtonian gravitational constant. It defaults to 1.
     * 
     * @returns {p5.Vector} The 2D attraction force
     */
    attraction(o, G = 1) {
        // Compute the 2D force direction
        let force = p5.Vector.sub(this.pos, o.pos);

        // Compute the Euclidean distance between objects
        let distance = force.mag();
        distance = this.p5.constrain(distance, 
                                     5, 
                                     25);

        // Compute the 2D force magnitude
        let mag = (G / distance**2)*(this.mass * o.mass);

        return force.setMag(mag);
    }
}
