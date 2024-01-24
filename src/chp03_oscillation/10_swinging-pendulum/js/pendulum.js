/**
 * A class that implements a 2D single pendulum object. 
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {p5.Vector} origin The 2D origin of the arm
 * @property {p5.Vector} pos The 2D position of the bob
 * 
 * @property {number} r The length of the arm
 * @property {number} bob_r The extension of the bob
 * 
 * @property {number} angle The 2D angle of the arm
 * @property {number} ang_vel The 2D angular velocity of the arm
 * @property {number} ang_acc The 2D angular acceleration of the arm
 * @property {number} damping An arbitrary damping amount (i.e., friction on the 2D angular acceleration)
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
class Pendulum {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The origin along the X-axis
     * @param {number} y The origin along the Y-axis
     * @param {number} r The length of the arm
     */
    constructor(_p5, x, y, r) {
        this.p5 = _p5;

        this.origin = _p5.createVector(x, y);
        this.pos = _p5.createVector();

        this.r = r;
        this.bob_r = 32;

        this.angle = _p5.PI / 4;
        this.ang_vel = 0;
        this.ang_acc = 0;
        this.damping = 0.995;

        this.color = 127;
    }

    /**
     * Move the object in the canvas (Euler integration).
     * 
     * http://www.myphysicslab.com/pendulum1.html
     */
    step() {
        const g_acc = 0.4; 

        this.ang_acc = -1*(g_acc / this.r)*this.p5.sin(this.angle);

        this.ang_vel += this.ang_acc;
        this.ang_vel *= this.damping;

        this.angle += this.ang_vel;
    }

    /**
     * Display the object on the canvas.
     */
    display() {
        // Polar to Cartesian conversion
        let x = this.r * this.p5.sin(this.angle);
        let y = this.r * this.p5.cos(this.angle);

        this.pos.set(x, y, 0);
        this.pos.add(this.origin);

        this.p5.push();
            this.p5.stroke(255);
            this.p5.strokeWeight(1.3);

            // Draw the arm
            this.p5.line(this.origin.x, 
                         this.origin.y, 
                         this.pos.x, 
                         this.pos.y);

            this.p5.ellipseMode(this.p5.CENTER);
            this.p5.fill(this.color);

            // Draw the bob
            this.p5.ellipse(this.pos.x, 
                            this.pos.y, 
                            this.bob_r, 
                            this.bob_r);
        this.p5.pop();
    }
}