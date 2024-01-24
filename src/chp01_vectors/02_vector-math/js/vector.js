/**
 * A class that implements a 2D vector.
 */
class _Vector {
    /**
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add a vector to the current one.
     * 
     * @param {Vector} v The vector to add.
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * Subtract a vector from the current one.
     * 
     * @param {Vector} v The vector to subtract.
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    /**
     * Multiply the vector of the given scale.
     * 
     * @param {number} n The scaling factor.
     */
    mult(n) {
        this.x *= n;
        this.y *= n;
    }

    /**
     * Divide the vector of the given scale.
     * 
     * @param {number} n The scaling factor.
     */
    div(n) {
        this.x /= n;
        this.y /= n;
    }

    /**
     * Get the given *p*-norm of the vector.
     * 
     * @param {number} p The order of the norm.
     * 
     * @returns {number} The *p*-norm of the vector.
     */
    norm(p) {
        return (abs(this.x)**p + abs(this.y)**p)**(1 / p);
    }

    /**
     * Get the magnitude (2-norm) of the vector.
     * 
     * @returns {number} The vector magnitude.
     */
    mag() {
        return this.norm(2);
    }

    /**
     * Normalize the vector to unit magnitude.
     */
    normalize() {
        let m = this.mag();

        if (m > 0) {
            this.div(m);
        }
    }
}
