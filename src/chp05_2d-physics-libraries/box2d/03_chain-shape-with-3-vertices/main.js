'use strict';

/* Module imports */
import Box from './js/box.js';
import Surface from './js/surface.js';


/* Constants */
const tstep = 1.0 / 30;

/* Global variables */
let world;

let boxes = [];
let surface;


// p5.js instance mode
const _p5 = new p5(_ => {}, 'p5-main')

_p5.setup = () => {
    _p5.createCanvas(720, 240);

    world = box2d.p5Helper.create_world();
    surface = new Surface(world, _p5);
}

_p5.draw = () => {
    _p5.background(31);

    // Box2D worlds step trough time [s]
    world.Step(tstep, 10, 10);

    // Spawn a new box with 0.5 proba
    if (_p5.random(1) < 0.5) {
        let w = _p5.random(4, 16);
        let h = _p5.random(4, 16);

        boxes.push(new Box(_p5.width / 2, 
                           30, 
                           w, 
                           h, 
                           world, 
                           _p5));
    }

    surface.display();

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
