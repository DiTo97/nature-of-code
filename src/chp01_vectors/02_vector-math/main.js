'use strict';


let C;


function setup() {
    createCanvas(720, 240);

    C = new _Vector(width / 2, height / 2);
}

function draw() {
    background(255);

    let x = limit(mouseX, 0, width);
    let y = limit(mouseY, 0, height);

    /* 1.3 Vector subtraction */
    let P_mouse = new _Vector(x, y);
    P_mouse.sub(C);

    /* 1.4 Vector multiplication */
    P_mouse.mult(0.5);

    // /* 1.6 Vector normalization */
    // P_mouse.normalize();
    // P_mouse.mult(50); // Always a magnitude of 50

    /* 1.5 Vector magnitude */
    let m = P_mouse.mag();

    fill(0);
    rect(0, 0, m, 10),

    translate(C.x, C.y);
    line(0, 0, P_mouse.x, P_mouse.y);
}
