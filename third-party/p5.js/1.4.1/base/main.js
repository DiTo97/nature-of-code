'use strict';

/* Module imports */


/* Constants */

/* Global variables */


// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')


_p5.setup = () => {
    _p5.createCanvas(720, 240);
}

_p5.draw = () => {
    _p5.background(31);
}
