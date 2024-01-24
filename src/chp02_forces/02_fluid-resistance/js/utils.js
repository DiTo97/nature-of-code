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
