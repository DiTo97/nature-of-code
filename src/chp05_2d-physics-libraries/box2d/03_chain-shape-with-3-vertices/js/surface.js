/**
 * A class that implements a static 2D curved surface object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {box2d.b2Vec2[]} vertices Vertices of the surface
 * 
 * @property {box2d.b2Body} body The Box2D body attached to the surface
 */
export default class Surface {
    /**
     * @param {box2d.b2World} world The real Box2D world
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(world, _p5 = p5.instance) {
        this.p5 = _p5;

        const w = _p5.width;
        const h = _p5.height;

        let angle = 0;

        this.vertices = []

        for (let _x = 0; _x <= w; _x += 3) {
            let _y = _p5.map(_p5.sin(angle), -1, 1, 50, h);

            let v = new box2d.b2Vec2(_x, _y);
            this.vertices.push(v);

            angle += 0.1;
        }

        let nvertices = this.vertices.length;

        // Convert to 2D world coords
        for (let i = 0; i < nvertices; i++) {
            let v = this.vertices[i];
            this.vertices[i] = box2d.p5Helper.scale_to_world(v);
        }

        let shape = new box2d.b2ChainShape();
        shape.CreateChain(this.vertices, nvertices);

        let bd = new box2d.b2BodyDef();
        this.body = world.CreateBody(bd);

        let fd = new box2d.b2FixtureDef();
        fd.shape = shape;

        fd.density = 1;
        fd.friction = 0.1;
        fd.restitution = 0.3;

        this.body.CreateFixture(fd);
    }

    /**
     * Display the Box2D box on the canvas.
     */
     display() {
        const {p5: _p5} = this;

        const w = _p5.width;
        const h = _p5.height;

        _p5.push();
            _p5.fill(200);
            _p5.stroke(200);

            _p5.beginShape();
                _p5.vertex(0, h);

                for (let v of this.vertices) {
                    let _v = box2d.p5Helper.scale_to_pixels(v);
                    _p5.vertex(_v.x, _v.y);
                }
                
                _p5.vertex(w, h);
            _p5.endShape(_p5.CLOSE);
        _p5.pop();
    }
}
