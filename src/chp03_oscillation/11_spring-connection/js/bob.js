/**
 * A class that implements a 2D bob object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} mass The mass of the bob
 * @property {number} r The extent of the bob
 * 
 * @property {p5.Vector} pos The 2D position of the bob
 * @property {p5.Vector} vel The 2D velocity of the bob
 * @property {p5.Vector} acc The 2D acceleration of the bob
 * 
 * @property {number} damping An arbitrary damping amount (i.e., friction on the 2D acceleration)
 * 
 * @property {p5.Vector} drag_offset How much has mouse dragging moved the bob's 2D position.
 * @property {boolean} dragging Whether mouse dragging is happening.
 * 
 * @property {number} color The gray-scale color in [0, 255]. It is used for visualization purposes within a p5.js canvas
 */
 class Bob {
    /**
     * @param {p5} _p5 An instance of p5.js
     * 
     * @param {number} x The position along the X-axis
     * @param {number} y The position along the Y-axis
     */
    constructor(_p5, x, y) {
        this.p5 = _p5;

        this.mass = 16;
        this.r = 2*this.mass;

        this.pos = _p5.createVector(x, y);
        this.vel = _p5.createVector();
        this.acc = _p5.createVector();

        this.damping = 0.99;

        this.drag_offset = _p5.createVector();
        this.dragging = false;

        this.color = 127;
    }

    /**
     * Move the bob in the canvas (Euler integration).
     */
    step() {
        this.vel.add(this.acc);
        this.vel.mult(this.damping);

        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    /**
     * Apply a given 2D force to the bob.
     * 
     * @param {p5.Vector} f The force to apply
     */
    apply_force(f) {
        let f_acc = p5.Vector.div(f, this.mass); // Newton's 2nd law
        this.acc.add(f_acc);
    }

    /**
     * Display the bob on the canvas.
     */
    display() {
        this.p5.push();
            this.p5.stroke(255);
            this.p5.strokeWeight(1.3);

            this.p5.ellipseMode(this.p5.CENTER);
            this.p5.fill(this.color);

            if (this.dragging)
                this.p5.fill(220);

            this.p5.ellipse(this.pos.x, 
                            this.pos.y, 
                            this.r, 
                            this.r);
        this.p5.pop();
    }

    /**
     * Handle mouse pressed events on the canvas.
     * 
     * @param {number} m_x The mouse along the X-axis
     * @param {number} m_y The mouse along the Y-axis
     */
    handle_mouse_pressed(m_x, m_y) {
        let distance = this.p5.dist(m_x,
                                    m_y,
                                    this.pos.x,
                                    this.pos.y);

        if (distance < this.r / 2) {
            this.dragging = true;

            this.drag_offset.x = this.pos.x - m_x;
            this.drag_offset.y = this.pos.y - m_y;
        }
    }

    /**
     * Drag the bob around within the canvas.
     * 
     * @param {number} m_x The mouse along the X-axis
     * @param {number} m_y The mouse along the Y-axis
     */
    drag(m_x, m_y) {
        if (this.dragging) {
            this.pos.x = m_x + this.drag_offset.x;
            this.pos.y = m_y + this.drag_offset.y;
        }
    }

    /**
     * Stop a mouse dragging event.
     */
     stop_dragging() {
        this.dragging = false;
    }
}
