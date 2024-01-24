/**
 * A class that implements a 2D attractor.
 * 
 * An attractor is an object whose location is fixed.
 */
class Attractor {
    constructor(mass, x, y) {
        this.P = createVector(x, y);
        this.mass = mass;
    }
    
    display() {
        fill(64);
        stroke(0);

        let r = 2 * this.mass;

        ellipse(this.P.x, this.P.y, r, r);
    }

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
