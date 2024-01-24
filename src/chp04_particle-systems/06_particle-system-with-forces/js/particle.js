'use strict';

/**
 * A class that implements a 2D particle object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} mass The mass of the particle
 * @property {p5.Vector} r The extent of the particle
 * 
 * @property {p5.Vector} pos The 2D position of the particle
 * @property {p5.Vector} vel The 2D velocity of the particle
 * @property {p5.Vector} acc The 2D acceleration of the particle
 * 
 * @property {number} lifespan The lifespan of the particle in [0, 255].
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
 class Particle {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, x, y) {
        this.p5 = _p5;

        this.mass = 4;
        this.r = 2*this.mass;

        this.pos = _p5.createVector(x, y);
        this.vel = _p5.createVector(_p5.random(-1, 1), _p5.random(-1, 0));
        this.acc = _p5.createVector();

        this.lifespan = 255;

        this.color = 127;
    }

    /**
     * Move the particle in the canvas (Euler integration).
     */
    step() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);

        this.lifespan -= 1.3;
    }

    /**
     * Apply a given 2D force to the particle.
     * 
     * @param {p5.Vector} f The force to apply
     */
     apply_force(f) {
        let f_acc = p5.Vector.div(f, this.mass); // Newton's 2nd law
        this.acc.add(f_acc);
    }

    /**
     * Display the particle on the canvas.
     */
    display() {
        this.p5.push();
            this.p5.stroke(0, this.lifespan);

            this.p5.ellipseMode(this.p5.CENTER);
            this.p5.fill(this.color, this.lifespan);

            this.p5.ellipse(this.pos.x, 
                            this.pos.y, 
                            this.r, 
                            this.r);
        this.p5.pop();
    }

    /**
     * Run a full step-display cycle.
     */
    run() {
        this.step();
        this.display();
    }

    /**
     * Check whether the particle is dead.
     * 
     * @returns {boolean} True if the particle's lifespan > 0.
     */
    is_dead() {
        return this.lifespan < 0.0;
    }
}
