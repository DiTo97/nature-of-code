/**
 * A class that implements the base 2D canvas object.
 */
class BaseObject {
    /**
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis 
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Display the object on the canvas.
     */
    display() { 
        throw new Error('Not implemented method: display')
    }

    /**
     * Move the object in the canvas.
     */
    step() {
        throw new Error('Not implemented method: step')
    }
}
