'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let particle_system;


_p5.setup = () => {
    _p5.createCanvas(720, 240);

    let x = _p5.width / 2;
    let y = 50;

    particle_system = new ParticleSystem(_p5, x, y);
}

_p5.draw = () => {
    _p5.background(31);

    particle_system.spawn();
    particle_system.run();
}
