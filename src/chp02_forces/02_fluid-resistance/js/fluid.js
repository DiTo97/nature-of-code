/**
 * A class that implements a 2D fluid with a variable coefficient of drag.
 * 
 * @property {p5.Vector} P The 2D TL location of the fluid.
 * @property {number} w The width of the fluid.
 * @property {number} h The height of the fluid.
 * @property {number} c The coefficient of drag of the fluid.
 * @property {number} ro The density of the fluid.
 */
class Fluid {
    /**
     * @property {number} x The TL position along the X-axis.
     * @property {number} y The TL position along the Y-axis.
     * @property {number} w The width of the fluid.
     * @property {number} h The height of the fluid.
     * @property {number} c The coefficient of drag of the fluid.
     * @property {number} ro The density of the fluid.
     */
    constructor(x, y, w, h, c) {
        this.P = createVector(x, y);

        this.w = w;
        this.h = h;
        
        this.c = c;
        this.ro = 1;
    }

    display() {
        noStroke();
        fill(128);

        rect(this.P.x, this.P.y, this.w, this.h);
    }
}
