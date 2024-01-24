'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

// Polar coordinates
const r = 75;
let theta = 0;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);
}

_p5.draw = () => {
    _p5.background(255);

    // Cartesian coordinates
    let x = r * _p5.cos(theta);
    let y = r * _p5.sin(theta);

    _p5.push();
        _p5.noStroke();
        _p5.fill(0);

        let o_x = _p5.width / 2;
        let o_y = _p5.height / 2;

        _p5.translate(o_x, o_y);

        _p5.ellipse(x, y, 16, 16);
    _p5.pop();

    theta += 1e-1;
}
