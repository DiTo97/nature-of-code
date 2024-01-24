/**
 * A class that implements a 2D oscillator object. 
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} angle The 2D angle of the oscillator
 * @property {number} ang_vel The 2D angular velocity of the oscillator
 * @property {number} amp The 2D amplitude of the oscillator
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
class Oscillator {
    /**
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(_p5) {
        this.p5 = _p5;

        this.angle = _p5.createVector(0, 0);

        let ang_vel_x = _p5.random(-0.05, 0.05);
        let ang_vel_y = _p5.random(-0.05, 0.05);

        this.ang_vel = _p5.createVector(ang_vel_x, ang_vel_y);

        let amp_x = _p5.random(_p5.width / 2);
        let amp_y = _p5.random(_p5.height / 2);

        this.amp = _p5.createVector(amp_x, amp_y);

        this.color = 127;
    }

    /**
     * Oscillate the object in the canvas.
     */
    oscillate() {
        this.angle.add(this.ang_vel);
    }

    /**
     * Display the object on the canvas.
     */
    display() {
        let x = this.amp.x * this.p5.sin(this.angle.x);
        let y = this.amp.y * this.p5.sin(this.angle.y);

        this.p5.push();
            this.p5.stroke(0);
            this.p5.fill(this.color);

            let o_x = this.p5.width / 2;
            let o_y = this.p5.height / 2;

            this.p5.translate(o_x, o_y);

            this.p5.line(0, 0, x, y);
            this.p5.ellipse(x, y, 16, 16);
        this.p5.pop();
    }
}