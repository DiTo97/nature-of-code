/**
 * A class that implements a 2D repeller object, i.e., a static object that repels 
 * any other object sufficiently close in the environment.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} strength The strength of repulsion
 * @property {number} r The extent of the repeller
 * 
 * @property {p5.Vector} pos The 2D position of the repeller
 */
class Repeller {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, x, y) {
        this.p5 = _p5;

        this.strength = 100;
        this.r = 16;

        this.pos = _p5.createVector(x, y);
    }

    /**
     * Display the repeller on the canvas.
     */
    display() {
        this.p5.push();
            this.p5.stroke(255);
            this.p5.fill(255);

            this.p5.ellipseMode(this.p5.CENTER);

            this.p5.ellipse(this.pos.x, 
                            this.pos.y, 
                            this.r, 
                            this.r);
        this.p5.pop();
    }
    
    /**
     * Compute the 2D repulsion force of the object on a particle.
     * 
     * @param {Particle} p The particle to repel
     * 
     * @returns {p5.Vector} The 2D repulsion force
     */
    repulsion(p) {
        let force = p5.Vector.sub(this.pos, p.pos);

        let distance = force.mag();
        distance = this.p5.constrain(distance, 
                                     5, 
                                     100);

        let N = -this.strength / distance**2

        force.normalize();
        return force.mult(N);
    }
}