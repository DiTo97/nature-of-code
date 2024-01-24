/**
 * A class that implements a 2D static boundary object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} x The position of the boundary along the X-axis
 * @property {number} y The position of the boundary along the Y-axis
 * @property {number} w The width of the boundary
 * @property {number} h The height of the boundary
 * 
 * @property {box2d.b2Body} body The Box2D body attached to the boundary
 */
export default class Boundary {
    /**
     * @param {number} x The position of the boundary along the X-axis
     * @param {number} y The position of the boundary along the Y-axis
     * 
     * @param {box2d.b2World} world The real Box2D world
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(x, y, w, h, world, _p5 = p5.instance) {
        this.p5 = _p5;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        let bd = new box2d.b2BodyDef();

        bd.type = box2d.b2BodyType.b2_staticBody;
        bd.position = box2d.p5Helper.scale_to_world(x, y);

        let fd = new box2d.b2FixtureDef();

        fd.density = 1;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        fd.shape = new box2d.b2PolygonShape();

        let scl = box2d.p5Helper.get_scl();

        let c_x = box2d.p5Helper.scale_to_world(this.w / 2);
        let c_y = box2d.p5Helper.scale_to_world(this.h / 2);

        fd.shape.SetAsBox(c_x, c_y);

        this.body = world.CreateBody(bd)
                         .CreateFixture(fd);
    }

    /**
     * Display the Box2D box on the canvas.
     */
     display() {
        const {p5: _p5} = this;

        _p5.push();
            _p5.rectMode(_p5.CENTER);

            _p5.translate(this.x, this.y);

            _p5.fill(0);
            _p5.stroke(0);

            _p5.rect(0, 0, this.w, this.h);
        _p5.pop();
    }
}
