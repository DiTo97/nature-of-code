/**
 * A class that implements a 2D rectangular box object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} w The width of the box
 * @property {number} h The height of the box
 * 
 * @property {box2d.b2World} world The real Box2D world
 * 
 * @property {box2d.b2Body} body The Box2D body attached to the box
 */
export default class Box {
    /**
     * @param {number} x The position of the box along the X-axis
     * @param {number} y The position of the box along the Y-axis
     * @param {number} w The width of the box
     * @param {number} h The height of the box
     * 
     * @param {box2d.b2World} world The real Box2D world
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(x, y, w, h, world, _p5 = p5.instance) {
        this.p5 = _p5;
        this.world = world;

        this.w = w;
        this.h = h;

        // Define a dynamic body
        let bd = new box2d.b2BodyDef();

        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = box2d.p5Helper.scale_to_world(x, y);

        // Define a fixture
        let fd = new box2d.b2FixtureDef();

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;
        
        // Attach a shape to the fixture
        fd.shape = new box2d.b2PolygonShape();

        let c_x = box2d.p5Helper.scale_to_world(this.w / 2);
        let c_y = box2d.p5Helper.scale_to_world(this.h / 2);

        fd.shape.SetAsBox(c_x, c_y);

        // Create the body
        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);

        // Linear motion
        let v_x = _p5.random(-5, 5);
        let v_y = _p5.random(2, 5);

        let vel = new box2d.b2Vec2(v_x, v_y);
        this.body.SetLinearVelocity(vel);

        // Angular motion
        let ang_vel = _p5.random(-5, 5);
        this.body.SetAngularVelocity(ang_vel);
    }

    /**
     * Display the Box2D box on the canvas.
     */
    display() {
        const {p5: _p5} = this;

        // Get the 2D position of the body
        let b2pos = this.body.GetPosition();
        let pos = box2d.p5Helper.scale_to_pixels(b2pos);

        // Get its heading
        let a = this.body.GetAngleRadians();

        _p5.push();
            _p5.rectMode(_p5.CENTER);

            _p5.translate(pos.x, pos.y);
            _p5.rotate(a);

            _p5.fill(127);
            _p5.stroke(0);
            _p5.strokeWeight(1.3);

            _p5.rect(0, 0, this.w, this.h);
        _p5.pop();
    }

    /**
     * Clear the object from the Box2D world.
     */
    clear() {
        this.world.DestroyBody(this.body);
    }

    /**
     * Kill the object if it is outside the 2D canvas.
     * 
     * @returns {boolean} True if the object was killed.
     */
    is_killed() {
        // Get the 2D position of the body
        let b2pos = this.body.GetPosition();
        let pos = box2d.p5Helper.scale_to_pixels(b2pos);

        let A = this.w * this.h;

        if (pos.y > this.p5.height + A) {
            this.clear();
            return true;
        }

        return false;
    }
}
