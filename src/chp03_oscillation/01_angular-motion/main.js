'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')


let angle = 0;
let angular_velocity = 0;
let angular_acceleration = 1e-3;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);
}

_p5.draw = () => {
    _p5.background(255);
    _p5.fill(128);
    _p5.stroke(0);

    // Draw the baton
    _p5.push();

    let x = _p5.width / 2;
    let y = _p5.height / 2;

    _p5.rectMode(_p5.CENTER);
    _p5.translate(x, y);
    _p5.rotate(ang);

    _p5.line(-100, 0, 100, 0);
    _p5.ellipse(100, 0, 16, 16);
    _p5.ellipse(-100, 0, 16, 16);

    _p5.pop();

    angular_velocity += angular_acceleration
    angle += angular_velocity
}
