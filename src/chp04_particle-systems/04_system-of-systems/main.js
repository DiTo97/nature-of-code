'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let systems = [];


_p5.setup = () => {
    _p5.createCanvas(720, 240);
}

_p5.draw = () => {
    _p5.background(255);

    for (let system of systems) {
        system.spawn();
        system.run();
    }
}

_p5.mousePressed = () => {
    let x = _p5.mouseX;
    let y = _p5.mouseY;

    let system = new ParticleSystem(_p5, x, y);
    systems.push(system);
}
