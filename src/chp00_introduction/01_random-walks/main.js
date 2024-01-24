'use strict';


let w;


function setup() {
    createCanvas(720, 240);

    w = new Walker();

    background(255);
}

function draw() {
    w.step();
    w.display();
}
