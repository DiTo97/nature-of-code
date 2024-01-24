'use strict';

/* Module imports */


/* Constants */

/* Global variables */
/** An instance of p5.js */
const _p5 = new p5(_ => {}, 'p5-main')

_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.frameRate(30);
}

_p5.draw = () => {
    _p5.background(0);
}
