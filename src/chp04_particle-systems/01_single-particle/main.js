'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let particle;


_p5.setup = () => {
    _p5.createCanvas(720, 240);

    let x = _p5.width / 2;
    let y = 10;

    particle = new Particle(_p5, x, y);
}

_p5.draw = () => {
    _p5.background(255);

    particle.run();

    if (particle.is_dead()) {
        console.log('Dead particle!')
        _p5.noLoop();
    }
}
