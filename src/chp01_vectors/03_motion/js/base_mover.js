/**
 * A class that implements the base 2D mover object. 
 * 
 * @property {number} topspeed The maximum velocity of the object.
 * 
 * @property {_Vector} P The 2D location of the object.
 * @property {_Vector} v The 2D velocity of the object. 
 * @property {_Vector} a The 2D acceleration of the object. 
 * @property {_Vector} t The 2D Perlin noise generator. 
 */
class BaseMover {
    constructor() {
        this.P = new _Vector(random(width), random(height));
        this.v = new _Vector(0, 0);

        /* 1.8 Constant acceleration 101 */ 
        // this.a = new _Vector(-1e-3, 1e-3);
        this.topspeed = 5;

        /* 1.9b Perlin acceleration 101 */
        this.t = new _Vector(0, 0);
    }

    /**
     * Display the object on the canvas.
     */
    display() { 
        fill(175);
        stroke(0);

        ellipse(this.P.x, this.P.y, 16, 16);
    }

    /**
     * Move the object in the canvas.
     */
    step() {
        // /* 1.9a Random acceleration 101 */
        // this.a = p5.Vector.random2D();
        // this.a.mult(random(3));

        // /* 1.9b Perlin acceleration 101 */
        // const nx = noise(this.t.x)
        // const ny = noise(this.t.y)

        // const ax = map(nx, 0, 1, -1e-3, 1e-3);
        // const ay = map(ny, 0, 1, -1e-3, 1e-3);

        // this.a = new _Vector(ax, ay);

        // this.t.x += 1e3;
        // this.t.y += 1e-3;

        /* 1.10 Acceleration towards the mouse */
        let x = limit(mouseX, 0, width);
        let y = limit(mouseY, 0, height);

        let P_mouse = new _Vector(x, y);
        let dir = _Vector.sub(P_mouse, this.P);

        // Compute a variable magnitude of acceleration,
        // i.e., stronger when it is closer.
        let dist = dir.mag();
        let max_dist = sqrt(width**2 + height**2)

        let m = map(dist, 0, max_dist, 0.5, 0);

        dir.normalize();
        dir.mult(m);

        this.a = dir;

        /* 1.8 Constant acceleration 101 */
        this.v.add(this.a);
        this.v.limit(this.topspeed);

        this.P.add(this.v);
    }

    /**
     * Move the object to the opposite side, if it has reached any edge.
     */
    check_edges() {
        if (this.P.x > width) {
            this.P.x = 0
        } else if (this.P.x < 0) {
            this.P.x = width;
        }

        if (this.P.y > height) {
            this.P.y = 0
        } else if (this.P.y < 0) {
            this.P.y = height;
        }
    }
}
