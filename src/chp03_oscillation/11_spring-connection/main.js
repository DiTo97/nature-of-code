'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let bob;
let spring;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.setFrameRate(60);

    let x = _p5.width / 2;

    spring = new Spring(_p5, x, 10, 100);
    bob = new Bob(_p5, x, 100);
}

_p5.draw = () => {
    _p5.background(255);

    // Apply some gravity
    let gravity = _p5.createVector(0, 1);
    bob.apply_force(gravity);

    // Apply the connection force
    spring.connect(bob);
    spring.constrain_length(bob, 30, 180);

    bob.step();

    spring.display_line(bob);
    bob.display();
    spring.display();
}

_p5.mousePressed = () => {
    bob.handle_mouse_pressed(_p5.mouseX, _p5.mouseY);
}

_p5.mouseDragged = () => {
    bob.drag(_p5.mouseX, _p5.mouseY);
}

_p5.mouseReleased = () => {
    bob.stop_dragging();
}
