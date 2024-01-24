'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

const amplitude = 100;

let angle = 0;
let ang_vel = 0.05;

_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);

    const T = _p5.TWO_PI / ang_vel;
    console.log(`The period is: ${T} frames`);
}

_p5.draw = () => {
    _p5.background(255);

    let x = amplitude * _p5.cos(angle);

    angle += ang_vel;

    _p5.push();
        _p5.stroke(0);
        _p5.fill(127);

        let o_x = _p5.width / 2;
        let o_y = _p5.height / 2;

        _p5.translate(o_x, o_y);

        _p5.line(0, 0, x, 0);
        _p5.ellipse(x, 0, 16, 16);
    _p5.pop();
}
