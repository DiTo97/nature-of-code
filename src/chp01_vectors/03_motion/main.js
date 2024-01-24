'use strict';


// let mover;

/* I.11 Array of movers towards the mouse */
const N = 16;

let movers;


function setup() {
    createCanvas(720, 240);
    background(192);

    // mover = new BaseMover();

    movers = [];

    for (let i = 0; i < N; i++) {
        movers.push(new BaseMover());
    }
}

function draw() {
    background(192);

    // /* 1.7 Motion velocity 101 */
    // mover.step();
    // mover.check_edges();
    // mover.display();

    /* I.11 Array of movers towards the mouse */
    for (let mover of movers) {
        mover.step();
        mover.check_edges();
        mover.display();
    }
}
