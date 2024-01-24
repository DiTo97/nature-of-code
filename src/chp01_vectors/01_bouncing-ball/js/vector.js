/**
 * A class that implements a 2D vector.
 */
class Vector {
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
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
}
