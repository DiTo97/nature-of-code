/**
 * Draw a given 2D vector as an arrow from a given 2D origin.
 * 
 * @param {p5.Vector} origin The 2D origin.
 * @param {p5.Vector} v The reference 2D vector.
 * 
 * @param {number} scl The scale of the 2D vector
 * 
 * @param {p5} _p5 An instance of p5.js
 */
 function draw_vec_arrow(origin, v, scl = 1, _p5 = p5.instance) {
    const ARROW_SIZE = 10;
    
    _p5.push();
        _p5.stroke(255);
        _p5.fill(255);

        // Draw the shaft
        _p5.translate(origin.x, origin.y);

        const _v = p5.Vector.mult(v, scl);
        _p5.line(0, 0, _v.x, _v.y);
        
        _p5.rotate(v.heading());

        // Draw the arrowhead
        _p5.translate(_v.mag() - ARROW_SIZE, 0);
        
        _p5.triangle(0,  
                     ARROW_SIZE / 2, 
                     0, 
                     -ARROW_SIZE / 2, 
                     ARROW_SIZE,
                     0);
    _p5.pop();
}

export { draw_vec_arrow };
