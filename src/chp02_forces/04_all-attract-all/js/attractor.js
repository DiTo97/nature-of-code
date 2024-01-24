/**
 * A class that implements a 2D attractor.
 * 
 * An attractor is an object whose location is fixed.
 * 
 * @property {number} mass The mass of the object.
 * @property {number} r The extension of the object;
 * @property {number} color The gray-scale color in [0, 255];
 * 
 * @property {p5.Vector} P The 2D location of the object.
 */
class Attractor {
    /**
     * @param {number} mass The mass of the object.
     * @param {number} x The position along the X-axis.
     * @param {number} y The position along the Y-axis.
     */
    constructor(mass, x, y) {
        this.P = createVector(x, y);
        this.mass = mass;
        this.r = 2 * mass;

        this.color = 64;
    }
    
    /**
     * Display the object on the canvas.
     */
    display() {
        fill(this.color);
        stroke(0);

        ellipse(this.P.x, this.P.y, this.r, this.r);
    }

    /**
     * Compute the 2D attraction force of the object on another.
     * 
     * @param {Attractor} m The other object.
     * 
     * @returns {p5.Vector} The 2D attraction force.
     */
    attraction(m) {
        const G = 0.5;

        let force = p5.Vector.sub(this.P, m.P);
        let r  = force.mag();

        r = constrain(r, 5, 25);

        force.normalize();

        let strength = (G * this.mass * m.mass) / (r**2);
        force.mult(strength);

        return force
    }
}
