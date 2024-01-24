'use strict';

/**
 * A class that implements a 2D confetti object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
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
 class Confetti extends Particle {
    /**
     * Display confetti on the canvas.
     */
    display() {
        this.p5.push();
            this.p5.stroke(255, this.lifespan);
            this.p5.strokeWeight(1.3);
            this.p5.fill(255, this.lifespan);

            this.p5.translate(this.pos.x, this.pos.y);

            let theta = this.p5.map(this.pos.x, 
                                    0, 
                                    this.p5.width, 
                                    0, 
                                    8*this.p5.PI);

            this.p5.rotate(theta);

            this.p5.rectMode(this.p5.CENTER);

            this.p5.rect(0,
                         0,
                         this.r, 
                         this.r);
        this.p5.pop();
    }
}
