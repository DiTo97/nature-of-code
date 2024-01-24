/**
 * A class that implements a 2D spring object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} k The elastic constant of the spring
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
class Spring {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The anchor along the X-axis
     * @param {number} y The anchor along the Y-axis
     * 
     * @param {number} len The rest length of the spring
     */
    constructor(_p5, x, y, len) {
        this.p5 = _p5;

        this.anchor = _p5.createVector(x, y);
        this.rest_len = len;
        this.k = 0.1;

        this.color = 63;
    }

    /**
     * Apply the connection force between the spring and a bob via Hooke's law.
     * 
     * @param {Bob} bob The bob to connect to
     */
    connect(bob) {
        let force = p5.Vector.sub(bob.pos, this.anchor);
        let distance = force.mag();

        // Compute the difference between the current length 
        // of the spring and the rest length
        let stretch = distance - this.rest_len;

        force.normalize();
        force.mult(-this.k * stretch);

        bob.apply_force(force);
    }

    /**
     * Constrain the distance between the bob and the anchor.
     * 
     * @param {Bob} bob The bob to connect to
     * @param {number} l The minimum distance allowed
     * @param {number} h The maximum distance allowed
     */
    constrain_length(bob, l, h) {
        let force = p5.Vector.sub(bob.pos, this.anchor);
        let distance = force.mag();

        if (distance < l) {
            force.normalize();
            force.mult(l);
        } else if (distance > h) {
            force.normalize();
            force.mult(h);
        } else {
            return;
        }

        bob.pos = p5.Vector.add(this.anchor, force);
        bob.vel.mult(0);
    }

    /**
     * Display the spring on the canvas.
     */
    display() {
        this.p5.push();
            this.p5.fill(this.color);

            this.p5.rectMode(this.p5.CENTER);

            this.p5.rect(this.anchor.x, 
                         this.anchor.y, 
                         10, 
                         10);
        this.p5.pop();
    }

    /**
     * Display the spring-bob connection on the canvas.
     * 
     * @param {Bob} bob The bob to connect to
     */
    display_line(bob) {
        this.p5.push();
            this.p5.strokeWeight(1.3);
            this.p5.stroke(this.color);

            this.p5.line(bob.pos.x,
                         bob.pos.y,
                         this.anchor.x,
                         this.anchor.y);
        this.p5.pop();
      }
}