/**
 * Limit a value in a given range.
 * 
 * @param {number} x The value to limit.
 * @param {number} l The lower bound of the range.
 * @param {number} h The upper bound of the range.
 * 
 * @returns The value itself, or a bound of the range.
 */
function limit(x, l, h) {
    if (x > h) {
        return h;
    } else if (x < l) {
        return l;
    } else {
        return x;
    }
}

/**
 * Compute the 2D normal of motion given gravity.
 * 
 * @param {p5.Vector} v The reverence 2D motion.
 * @param {P5.Vector} gravity The 2D vorce of gravity.
 * 
 * @returns {p5.Vector} The 2D normal force.
 */
function normal_force(v, gravity) {
    let u = v.copy();

    u.normalize();
    u.rotate(-PI / 2);

    if (v.x < 0)
        u.mult(-1);

    let mag = abs(gravity.dot(u));
    return u.mult(mag);
}

/**
 * Compute the 2D kinetic friction of motion given gravity.
 * 
 * @param {p5.Vector} v The reference 2D motion.
 * @param {number} mu The coefficient of friction.
 * @param {p5.Vector} gravity The 2D force of gravity.
 * 
 * @returns {p5.Vector} The 2D kinetic friction.
 */
function kinetic_friction(v, mu, gravity) {
    let friction = v.copy();

    friction.normalize();
    friction.mult(-1);

    let N = normal_force(v, gravity).mag();

    friction.mult(mu * N);

    return friction;
}

/**
 * Draw a given 2D force as an arrow from a given origin.
 * 
 * @param {p5.Vector} O The 2D origin.
 * @param {p5.Vector} f The reference 2D force.
 * @param {string} color_ The name of the color.
 */
function draw_force_arrow(O, f, color_) {
    const ARROW_SIZE = 7;
    
    push();

    stroke(color_);
    strokeWeight(3);
    fill(color_);

    translate(O.x, O.y);
    line(0, 0, f.x, f.y);
    rotate(f.heading());

    translate(f.mag() - ARROW_SIZE, 0);
    triangle(0, ARROW_SIZE / 2, 0, -ARROW_SIZE / 2, ARROW_SIZE, 0);

    pop();
  }
