/**
 * A class that implements a custom 2D multi-shape lollipop.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} w The width of the object [px]
 * @property {number} h The height of the object [px]
 * @property {number} r The extent of the object [px]
 * 
 * @property {box2d.b2Body} body The Box2D body attached to the object
 */
export default class Lollipop {
    /**
     * @param {number} x The position of the object along the X-axis
     * @param {number} y The position of the object along the Y-axis
     * 
     * @param {box2d.b2World} world The real Box2D world
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(x, y, world, _p5) {
        this.p5 = _p5;
        this.world = world;

        this.w = 8;
        this.h = 24;
        this.r = 8;

        let bd = new box2d.b2BodyDef();

        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = box2d.p5Helper.scale_to_world(x, y);

        /* Combine a 2D rectangle and ellipse */
        let fd1 = new box2d.b2FixtureDef(); 

        fd1.density = 1.0;
        fd1.friction = 0.5;
        fd1.restitution = 0.2;
        
        fd1.shape = new box2d.b2PolygonShape();   

        let c_x = box2d.p5Helper.scale_to_world(this.w / 2);
        let c_y = box2d.p5Helper.scale_to_world(this.h / 2);

        fd1.shape.SetAsBox(c_x, c_y);

        let fd2 = new box2d.b2FixtureDef();

        fd2.density = 1.0;
        fd2.friction = 0.5;
        fd2.restitution = 0.2;

        fd2.shape = new box2d.b2CircleShape();
        fd2.shape.m_radius = box2d.p5Helper.scale_to_world(this.r);

        // Translate the 2D ellipse on top of the rectangle
        fd2.shape.m_p = new box2d.b2Vec2(0, -c_y);

        this.body = world.CreateBody(bd);

        this.body.CreateFixture(fd1);
        this.body.CreateFixture(fd2);

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
            _p5.ellipse(0, -this.h / 2, 2*this.r, 2*this.r);
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
    is_dead() {
        const {p5: _p5} = this;

        // Get the 2D position of the body
        let b2pos = this.body.GetPosition();
        let pos = box2d.p5Helper.scale_to_pixels(b2pos);

        let A = this.w * this.h;
        const h = _p5.height;

        if (pos.y > h + A) {
            this.clear();
            return true;
        }

        return false;
    }
}