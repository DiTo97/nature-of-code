'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let start_angle = 0;

let ang_vel = 0.1;
let amp = 100;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
}

_p5.draw = () => {
    _p5.background(31);

    let angle = start_angle;

    _p5.push();
        _p5.stroke(255);
        _p5.strokeWeight(1.3);
        _p5.noFill();

        let o_x = 0;
        let o_y = _p5.height / 2;

        _p5.translate(o_x, o_y);

        _p5.beginShape();
            for (let x = 0; x <= _p5.width; x += 5) {
                let y = amp * _p5.sin(angle);

                _p5.vertex(x, y);

                angle += ang_vel;
            }
        _p5.endShape();
    _p5.pop();

    start_angle += 0.1;
}
