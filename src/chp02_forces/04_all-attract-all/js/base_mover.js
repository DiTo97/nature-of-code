/**
 * A class that implements the base 2D mover object. 
 * 
 * @property {number} mass The mass of the object.
 * @property {number} topspeed The maximum velocity of the object.
 * @property {number} r The extension of the object;
 * 
 * @property {p5.Vector} P The 2D location of the object.
 * @property {p5.Vector} v The 2D velocity of the object. 
 * @property {p5.Vector} a The 2D acceleration of the object. 
 */
class BaseMover extends Attractor {
    /**
     * @param {number} mass The mass of the object.
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(mass, x, y) {
        super(mass, x, y);

        this.v = createVector(0, 0);
        this.a = createVector(0, 0);

        this.topspeed = 5;

        this.r = 16 * mass;
        this.color = 192;
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
        let r = this.r / 2;

        if (this.P.x + r > width) {
            this.P.x = width - r;
            this.v.x *= -1;
        } else if (this.P.x - r < 0) {
            this.v.x *= -1;
            this.P.x = r;
        }

        if (this.P.y + r > height) {
            this.P.y = height - r;
            this.v.y *= -1;
        } else if (this.P.y - r < 0) {
            this.P.y = r;
            this.v.y *= -1;
        }
    }

    /**
     * Check whether the object is inside a given 2D fluid.
     * 
     * @param {Fluid} l The reference 2D fluid.
     * 
     * @returns {boolean} Whether the object is inside.
     */
    is_inside(l) {
        let r = this.r / 2;

        if (this.P.x + r > l.P.x 
                    && this.P.x - r < l.P.x + l.w 
                    && this.P.y + r > l.P.y 
                    && this.P.y - r < l.P.y + l.h) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Compute the 2D drag force of the object in a fluid.
     * 
     * @param {Fluid} l The reference 2D fluid
     *  
     * @returns {p5.Vector} The 2D drag force.
     */
    drag(l) {
        let drag_mag = l.ro * l.c * this.r * this.v.magSq(); 
        let drag = this.v.copy();

        drag.normalize();
        drag.mult(-0.5 * drag_mag);
        
        return drag;
    }

    /**
     * Compute the 2D normal force given gravity.
     * 
     * @param {P5.Vector} gravity The 2D force of gravity.
     * 
     * @returns {p5.Vector} The 2D normal force.
     */
    normal_force(gravity) {
        let u = this.v.copy();

        u.normalize();
        u.rotate(-PI / 2);

        if (this.v.x < 0)
            u.mult(-1);

        let mag = abs(gravity.dot(u));
        return u.mult(mag);
    }

    /**
     * Compute the 2D (kinetic or static) friction given gravity.
     * 
     * @param {p5.Vector} v The reference 2D motion.
     * @param {number} mu The coefficient of friction.
     * @param {p5.Vector} gravity The 2D force of gravity.
     * 
     * @returns {p5.Vector} The 2D kinetic friction.
     */
    friction(gravity, mu) {
        let friction = this.v.copy();

        friction.normalize();
        friction.mult(-1);

        let N = this.normal_force(this.v, gravity).mag();

        friction.mult(mu * N);

        return friction;
    }
}
