'use strict';

import Particle from "./particle.js";

/**
 * A class that implements a dynamic 2D particle system.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {p5.Vector} emitter The 2D position of the emitter.
 * @property {p5.Image} texture The texture of particles.
 * 
 * @property {Particle[]} particles Particles living in the system.
 */
export default class ParticleSystem {
    /**
     * @param {number} n The # of particles to spawn at start-up
     * 
     * @param {p5.Vector} emitter The 2D position of the emitter
     * @param {p5.Image} texture The texture of particles
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(n, emitter, texture, _p5 = p5.instance) {
        this.p5 = _p5;

        this.emitter = emitter.copy();
        this.texture = texture;

        this.particles = [];

        for (let i = 0; i < n; i++) {
            const p = new Particle(emitter, 
                                   texture, 
                                   _p5);

            this.particles.push(p);
        }
    }

    /**
     * Add a new particle to the system at the 2D origin.
     */
    spawn() {
        let p = new Particle(this.emitter,
                             this.texture,
                             this.p5);

        this.particles.push(p);
    }

    /**
     * Apply a given 2D force to the system.
     * 
     * @param {p5.Vector} f The 2D force to apply
     */
    apply_force(f) {
        for (const p of this.particles)
            p.apply_force(f);
    }

    /**
     * Run a full step-display cycle.
     */
    run() {
        for (const p of this.particles)
            p.run();

        // Remove dead particles
        this.particles = this.particles.filter(p => !p.is_dead());
    }
}
