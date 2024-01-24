'use strict';

/**
 * A class that implements a dynamic 2D particle system.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {p5.Vector} origin The 2D position of the emitter.
 * 
 * @property {Particle[]} particles Particles living in the system.
 */
class ParticleSystem {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The origin along the X-axis
     * @param {number} y The origin along the Y-axis
     */
    constructor(_p5, x, y) {
        this.p5 = _p5;

        this.origin = _p5.createVector(x, y);

        this.particles = [];
    }

    /**
     * Add a new particle to the system at the 2D origin.
     */
    spawn() {
        let p = new Particle(_p5, 
                             this.origin.x, 
                             this.origin.y);

        this.particles.push(p);
    }

    /**
     * Run a full step-display cycle.
     */
    run() {
        for (let p of this.particles)
            p.run();

        // Remove dead particles
        this.particles = this.particles.filter(p => !p.is_dead());
    }
}