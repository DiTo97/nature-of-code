'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let pendulum;


_p5.setup = () => {
    _p5.createCanvas(720, 240);

    pendulum = new Pendulum(_p5, 
                            _p5.width / 2, 
                            0, 
                            128);
}

_p5.draw = () => {
    _p5.background(31);

    pendulum.step();
    pendulum.display();
}
