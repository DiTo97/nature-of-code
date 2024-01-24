/**
 * A class that implements the base 2D mover object. 
 * 
 * @property {number} mass The mass of the object.
 * @property {number} topspeed The maximum velocity of the object.
 * 
 * @property {p5.Vector} P The 2D location of the object.
 * @property {p5.Vector} v The 2D velocity of the object. 
 * @property {p5.Vector} a The 2D acceleration of the object. 
 */
class BaseMover {
    /**
     * @param {number} mass The mass of the object.
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(mass, x, y) {
        this.P = createVector(x, y);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);

        this.mass = mass;
        this.topspeed = 5;
    }

    /**
     * Display the object on the canvas.
     */
    display() { 
        fill(175);
        stroke(0);

        let r = 16 * this.mass;

        ellipse(this.P.x, this.P.y, r, r);
    }

    /**
     * Move the object in the canvas.
     */
    step() {
        this.v.add(this.a);
        this.v.limit(this.topspeed);

        this.P.add(this.v);

        this.a.mult(0);
    }

    /**
     * Apply a given 2D force to the object.
     * 
     * @param {p5.Vector} f The force to apply.
     */
    apply_force(f) {
        let a = p5.Vector.div(f, this.mass); // Newton's 2nd law

        this.a.add(a);
    }

    /**
     * Move the object to the opposite side, if it has reached any edge.
     */
    check_edges() {
        if (this.P.x > width) {
            this.P.x = width;
            this.v.x *= -1;
        } else if (this.P.x < 0) {
            this.v.x *= -1;
            this.P.x = 0;
        }

        if (this.P.y > height) {
            this.P.y = height;
            this.v.y *= -1;
        } else if (this.P.y < 0) {
            this.P.y = 0;
            this.v.y *= -1;
        }
    }
}
