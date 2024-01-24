'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let mover;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);

    let x = _p5.width / 2;
    let y = _p5.height / 2;

    mover = new MouseMover(_p5, x, y);
}

_p5.draw = () => {
    _p5.background(64);

    mover.step();
    mover.check_edges();
    mover.display();
}
