'use strict';

/* Module imports */
import Boundary from './js/boundary.js';
import Lollipop from './js/lollipop.js';


/* Constants */
const tstep = 1.0 / 30;

/* Global variables */
let world;

let boundaries = [];
let pops = [];


// p5.js instance mode
const _p5 = new p5(_ => {}, 'p5-main')

_p5.setup = () => {
    _p5.createCanvas(720, 240);

    world = box2d.p5Helper.create_world();

    let w = _p5.width;
    let h = _p5.height;

    // Add a bunch of fixed boundaries
    let b0 = new Boundary(w / 4, h - 5, w / 2 - 50, 10, world, _p5);
    let b1 = new Boundary(3*w / 4, h - 50, w / 2 - 50, 10, world, _p5);
    let b2 = new Boundary(w - 5, h / 2, 10, h, world, _p5);
    let b3 = new Boundary(5, h / 2, 10, h, world, _p5);

    boundaries.push(b0, b1, b2, b3);
}

_p5.draw = () => {
    _p5.background(220);

    // Box2D worlds step trough time [s]
    world.Step(tstep, 10, 10);

    for (let b of boundaries) {
        b.display();
    }

    let npops = pops.length;

    for (let i = npops - 1; i >= 0; i--) {
        let p = pops[i];

        if (!p.is_dead()) {
            p.display();
            continue;
        }

        pops.splice(i, 1);
    }
}

_p5.mousePressed = () => {
    let m_x = _p5.mouseX;
    let m_y = _p5.mouseY;

    let p = new Lollipop(m_x, m_y, world, _p5);
    pops.push(p);
}
