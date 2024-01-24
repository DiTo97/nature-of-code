'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let particles = [];


_p5.setup = () => {
    _p5.createCanvas(720, 240);
}

_p5.draw = () => {
    _p5.background(255);

    const x = _p5.width / 2;
    const y = 50;

    let p = new Particle(_p5, x, y);
    particles.push(p);

    let n = particles.length - 1;

    for (let i = n; i >= 0; i--) {
        let _p = particles[i];

        _p.run();

        if (_p.is_dead()) {
            particles.splice(i, 1);
        }
    }
}
