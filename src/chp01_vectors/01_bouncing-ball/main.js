'use strict';


let x = 100;
let y = 100;

let speed_x = 1;
let speed_y = 3.3;

// Position and velocity
let P;
let v;


function setup() {
    createCanvas(720, 240);

    P = new Vector(100, 100);
    v = new Vector(1, 3.3);
}

function draw() {
    background(255);

    P.add(v);

    if ((P.x > width) || (P.x < 0)) {
        v.x = -v.x;
    }

    if ((P.y > height) || (P.y < 0)) {
        v.y = -v.y;
    }

    fill(175);
    stroke(0);

    ellipse(P.x, P.y, 16, 16); 
}
