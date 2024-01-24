/**
 * A class that implements the 2D mover object that follows the mouse. 
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} w The width of the object
 * @property {number} h The height of the object
 * 
 * @property {p5.Vector} pos The 2D location of the object
 * @property {p5.Vector} vel The 2D velocity of the object
 * @property {p5.Vector} acc The 2D acceleration of the object
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
class MouseMover {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, x, y) {
        this.p5 = _p5;

        this.w = 32;
        this.h = 16;

        this.pos = _p5.createVector(x, y);
        this.vel = _p5.createVector(0, 0);
        this.acc = _p5.createVector(0, 0);

        this.color = 127;
    }

    /**
     * Move the object in the canvas (Euler integration).
     */
    step() {
        let mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
        let force = p5.Vector.sub(mouse, this.pos);

        force.normalize();
        force.mult(0.5);

        this.acc = force;

        this.vel.add(this.acc);
        this.vel.limit(4);

        this.pos.add(this.vel);
    }

    /**
     * Display the object on the canvas.
     */
    display() {
        let angle = this.vel.heading();

        this.p5.push();
            this.p5.stroke(0);
            this.p5.strokeWeight(1.3);
            this.p5.fill(this.color);

            this.p5.rectMode(this.p5.CENTER);

            this.p5.translate(this.pos.x, this.pos.y);
            this.p5.rotate(angle);

            this.p5.rect(0, 
                         0, 
                         this.w, 
                         this.h);
        this.p5.pop();
    }

    /**
     * Invert the object's motion if it bounces off any edge.
     */
     check_edges() {
        let half_w = this.w / 2;
        let half_h = this.h / 2;

        if (this.pos.x + half_w > this.p5.width) {
            this.pos.x = this.p5.width - half_w;
            this.vel.x *= -1;
        } else if (this.pos.x - half_w < 0) {
            this.vel.x *= -1;
            this.pos.x = half_w;
        }

        if (this.pos.y + half_h > this.p5.height) {
            this.pos.y = this.p5.height - half_h;
            this.vel.y *= -1;
        } else if (this.pos.y - half_h < 0) {
            this.pos.y = half_h;
            this.vel.y *= -1;
        }
    }
}