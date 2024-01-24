'use strict';

/* Module imports */
import Box from './js/box.js';


/* Constants */
const tstep = 1.0 / 30;

/* Global variables */
let world;

let boxes = [];


// p5.js instance mode
const _p5 = new p5(_ => {}, 'p5-main')

_p5.setup = () => {
    _p5.createCanvas(720, 240);

    world = box2d.p5Helper.create_world();
}

_p5.draw = () => {
    _p5.background(31);

    // Box2D worlds step trough time [s]
    world.Step(tstep, 10, 10);

    if (_p5.mouseIsPressed) {
        let b_x = _p5.mouseX;
        let b_y = _p5.mouseY;

        let b = new Box(b_x, b_y, world, _p5);
        boxes.push(b);
    }

    for (let b of boxes) {
        b.display();
    }
}
