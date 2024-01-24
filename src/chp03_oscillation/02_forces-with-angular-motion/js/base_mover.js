'use strict';

/**
 * A class that implements the base 2D mover object. 
 * 
 * @property {p5} _p5 An instance of p5.js
 * 
 * @property {number} mass The mass of the object
 * @property {number} r The extension of the object
 * 
 * @property {number} angle The 2D angle of the object
 * @property {number} ang_vel The 2D angular velocity of the object
 * @property {number} ang_acc The 2D angular acceleration of the object
 * 
 * @property {p5.Vector} pos The 2D location of the object
 * @property {p5.Vector} vel The 2D velocity of the object
 * @property {p5.Vector} acc The 2D acceleration of the object
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
class BaseMover extends Attractor {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} mass The mass of the object
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, mass, x, y) {
        super(_p5, mass, x, y);

        this.r = 16*mass;

        this.vel = _p5.createVector(0, 0);
        this.acc = _p5.createVector(0, 0);

        this.angle = 0;
        this.ang_vel = 0;
        this.ang_acc = 0;

        this.color = 192;
    }

    /**
     * Move the object in the canvas (Euler integration).
     */
    step() {
        /* 
         * Linear motion 
         */
        this.vel.add(this.acc);
        this.vel.limit(5);

        this.pos.add(this.vel);

        /* 
         * Angular motion (i.e, X-axis)
         */
        this.ang_acc = this.acc.x / 10.;

        this.ang_vel += this.ang_acc;
        this.ang_vel = this.p5.constrain(this.ang_vel,
                                         -0.1,
                                         0.1);

        this.angle += this.ang_vel;

        this.acc.mult(0);
    }

    /**
     * Display the object on the canvas.
     */
     display() {
        this.p5.push()

        this.p5.fill(this.color);
        this.p5.stroke(0);

        this.p5.rectMode(this.p5.CENTER);

        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.rotate(this.angle);

        this.p5.rect(0, 
                     0, 
                     2*this.r);

        this.p5.pop();
    }

    /**
     * Apply a given 2D force to the object.
     * 
     * @param {p5.Vector} f The force to apply
     */
    apply_force(f) {
        let acc = p5.Vector.div(f, this.mass); // Newton's 2nd law

        this.acc.add(acc);
    }

    /**
     * Move the object to the opposite side, if it has reached any edge.
     */
    check_edges() {
        if (this.pos.x + this.r > this.p5.width) {
            this.pos.x = this.p5.width - this.r;
            this.vel.x *= -1;
        } else if (this.pos.x - this.r < 0) {
            this.vel.x *= -1;
            this.pos.x = this.r;
        }

        if (this.pos.y + this.r > this.p5.height) {
            this.pos.y = this.p5.height - this.r;
            this.vel.y *= -1;
        } else if (this.pos.y - this.r < 0) {
            this.pos.y = this.r;
            this.vel.y *= -1;
        }
    }

    /**
     * Compute the 2D normal force given gravity.
     * 
     * @param {p5.Vector} gravity The 2D force of gravity
     * 
     * @returns {p5.Vector} The 2D normal force
     */
    normal_force(gravity) {
        let u = this.vel.copy();

        u.normalize();
        u.rotate(-this.p5.PI / 2);

        if (this.vel.x < 0)
            u.mult(-1);

        let mag = this.p5.abs(gravity.dot(u));
        return u.setMag(mag);
    }

    /**
     * Compute the 2D (kinetic or static) friction given gravity.
     * 
     * @param {p5.Vector} gravity The 2D force of gravity
     * @param {number} mu The coefficient of friction
     * 
     * @returns {p5.Vector} The 2D kinetic friction
     */
    friction(gravity, mu) {
        let friction = this.vel.copy()
                               .normalize()
                               .mult(-1);

        let N = this.normal_force(gravity).mag();

        return friction.mult(mu * N);
    }
}
