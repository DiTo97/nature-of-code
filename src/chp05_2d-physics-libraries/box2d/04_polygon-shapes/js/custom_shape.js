/**
 * A class that implements a custom 2D quadrilateral object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} r The extent of the object [px]
 * 
 * @property {box2d.b2Body} body The Box2D body attached to the object
 */
export default class CustomShape {
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

        let bd = new box2d.b2BodyDef();

        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = box2d.p5Helper.scale_to_world(x, y);

        let fd = new box2d.b2FixtureDef();

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        let vertices = [];
        
        let v0 = box2d.p5Helper.scale_to_world(-10, -10);
        let v1 = box2d.p5Helper.scale_to_world(20, -15);
        let v2 = box2d.p5Helper.scale_to_world(15, 0);
        let v3 = box2d.p5Helper.scale_to_world(-15, 25);

        vertices[3] = v3;
        vertices[2] = v2;
        vertices[1] = v1;
        vertices[0] = v0;

        const nvertices = vertices.length;

        fd.shape = new box2d.b2PolygonShape();
        fd.shape.SetAsArray(vertices, nvertices);

        let _r = fd.shape.m_radius;
        this.r = box2d.p5Helper.scale_to_pixels(_r);

        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);
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

        let shape = this.body.GetFixtureList()
                             .GetShape();

        _p5.push();
            _p5.rectMode(_p5.CENTER);

            _p5.translate(pos.x, pos.y);
            _p5.rotate(a);

            _p5.fill(127);
            _p5.stroke(0);
            _p5.strokeWeight(1.3);

            _p5.ellipse(0, 0, 20, 20);

            _p5.beginShape();
                for (let i = 0; i < shape.m_count; i++ ) {
                    let v = shape.m_vertices[i];
                    v = box2d.p5Helper.scale_to_pixels(v);

                    _p5.vertex(v.x, v.y);
                }
            _p5.endShape(_p5.CLOSE);
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

        let A = this.r**2;
        const h = _p5.height;

        if (pos.y > h + A) {
            this.clear();
            return true;
        }

        return false;
    }
}