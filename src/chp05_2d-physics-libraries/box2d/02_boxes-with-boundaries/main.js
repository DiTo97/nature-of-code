'use strict';

/* Module imports */
import Box from './js/box.js';
import Boundary from './js/boundary.js';


/* Constants */
const tstep = 1.0 / 30;

/* Global variables */
let world;

let boxes = [];
let boundaries = [];


// p5.js instance mode
const _p5 = new p5(_ => {}, 'p5-main')

_p5.setup = () => {
    _p5.createCanvas(720, 240);

    world = box2d.p5Helper.create_world();

    let w = _p5.width;
    let h = _p5.height;

    // Create 2 boundaries
    boundaries.push(new Boundary(w / 4, h - 5, w / 2 - 50, 10, world, _p5));
    boundaries.push(new Boundary(3 * w / 4, h - 50, w / 2 - 50, 10, world, _p5));

    // Create 1 box
    boxes.push(new Box(w / 2, 30, world, _p5));
}

_p5.draw = () => {
    _p5.background(220);

    // Box2D worlds step trough time [s]
    world.Step(tstep, 10, 10);

    // Spawn a new box with 0.2 proba
    if (_p5.random(1) < 0.2) {
        boxes.push(new Box(_p5.width / 2, 30, world, _p5));
    }

    for (let b of boundaries) {
        b.display();
    }

    let nboxes = boxes.length;

    for (let i = nboxes - 1; i >= 0; i--) {
        let b = boxes[i];

        if (!b.is_killed()) {
            b.display();
            continue;
        }

        boxes.splice(i, 1);
    }
}
