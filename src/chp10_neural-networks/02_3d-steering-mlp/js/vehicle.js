import MLP from './mlp/network.js';


/**
 * A class that implements a 2D autonomous agent, i.e., a vehicle.
 * 
 * This class implements our simple motion model based on Euler integration. To get more accurate results,
 * we should revert to Verlet integration using some physics engine (i.e., toxiclibs).
 *  * 
 * @property {}
 * 
 * @property {Vec2D} pos The 2D position of the vehicle
 * @property {Vec2D} vel The 2D velocity of the vehicle
 * @property {Vec2D} acc The 2D acceleration of the vehicle
 * 
 * @property {number} r The extent of the vehicle
 * @property {number} mass The mass of the vehicle
 * 
 * @property {number} max_vel_mag The maximum magnitude of the 2D velocity
 * @property {number} max_steering_mag The maximum magnitude of the 2D steering force
 */
class Vehicle {
    /**
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(_pos, _p5 = p5.instance) {
        /**
         * An instance of p5.js
         * 
         * @type {p5}
         */
        this.p5 = _p5;

        /**
         * The steering MLP network.
         * 
         * @type {MLP}
         */
        this.brain = new MLP();

        let p_x = _p5.random(-3, 3);
        let p_y = _p5.random(-3, 3);

        this.pos = new Vec2D(p_x, p_y);
        this.vel = new Vec2D(-1, 1);
        this.acc = new Vec2D(0, 0);

        this.r = 4;
        this.mass = 4*this.r;

        this.max_vel_mag = 4;
        this.max_steering_mag = 1;
    }

    /**
     * Seek a 2D still target with adaptive steering behaviour.
     * 
     * The strategy behind this behaviour is inspired by the *arriving* steering behaviour
     * that Reynold developed in 1999. It formalizes the concept of a landing radius, that is, 
     * a circle in the vicinity of the target wherein the distance from the target 
     * should be considered in the computation not to overshoot it.
     * 
     * @param {Vec2D} target The 2D position of the target
     */
    seek(target) {
        let desired_vel = Vec2D.sub(target, this.pos);
        let distance = desired_vel.mag();

        desired_vel.normalize();

        const r = 100;

        let vel_mag = this.max_vel_mag;

        if (distance < r) {
            vel_mag = this.p5.map(distance,
                                  0,
                                  r,
                                  0,
                                  this.max_vel_mag);
        }

        desired_vel.mult(vel_mag)

        let steering = Vec2D.sub(desired_vel, this.vel);
        steering.limit(this.max_steering_mag);

        this.apply_force(steering);
    }

    /**
     * Apply a 2D force to the vehicle (Newton's 2nd law).
     * 
     * @param {Vec2D} force The 2D force to apply
     */
    apply_force(force) {
        let force_acc = Vec2D.div(force, this.mass);
        this.acc.add(force_acc);
    }

    /**
     * Step the 2D vehicle motion one frame ahead (Euler integration).
     */
    step() {
        this.vel.add(this.acc);
        this.vel.limit(this.max_vel_mag);

        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    /**
     * Render the 2D vehicle onto the canvas.
     */
    render() {
        const {p5: _p5, r} = this;
        const d = 2*r;

        let theta = this.vel.heading() + _p5.PI / 2;

        _p5.push();
            _p5.fill(127);
            _p5.stroke(0);

            _p5.translate(this.pos.x, this.pos.y);
            _p5.rotate(theta);

            _p5.beginShape();
                _p5.vertex(+0, -d);
                _p5.vertex(-r, +d);
                _p5.vertex(+r, +d);
            _p5.endShape(_p5.CLOSE);
        _p5.pop();
    }
}
