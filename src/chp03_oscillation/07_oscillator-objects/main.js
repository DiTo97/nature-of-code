'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let oscillator;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);

    oscillator = new Oscillator(_p5);
}

_p5.draw = () => {
    _p5.background(255);

    oscillator.oscillate();
    oscillator.display();
}
