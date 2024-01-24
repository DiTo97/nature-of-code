'use strict';

/* Module imports */
import { draw_vec_arrow } from './js/utils.js';

import ParticleSystem from './js/particle_system.js';


/* Constants */
const TEXTURE_FILEPATH = './data/texture.png';

/* Global variables */
let psystem;
let texture;


// p5.js instance mode
const _p5 = new p5(_ => {}, 'p5-main')

_p5.preload = () => {
    texture = _p5.loadImage(TEXTURE_FILEPATH);
}

_p5.setup = () => {
    _p5.createCanvas(720, 240);

    const e_x = _p5.width / 2;
    const e_y = _p5.height - 50;

    const emitter = _p5.createVector(e_x, e_y);

    psystem = new ParticleSystem(0, 
                                 emitter,
                                 texture, 
                                 _p5);
}

_p5.draw = () => {
    // Additive blending
    _p5.blendMode(_p5.ADD);
    _p5.clear();

    _p5.background(0);

    // Compute a wind force based on the position
    // of the mouse along the X-axis
    const w_x = _p5.map(_p5.mouseX, 
                        0, 
                        _p5.width, 
                        -0.2, 
                        0.2);
    const w_y = 0;

    const wind = _p5.createVector(w_x, w_y);

    psystem.apply_force(wind);
    psystem.run();

    // Spawn 3 particles per draw cycle
    for (let i = 0; i < 1; i++)
        psystem.spawn();

    const o_x = _p5.width / 2;
    const o_y = 50;

    const origin = _p5.createVector(o_x, o_y);

    // Draw the wind force
    draw_vec_arrow(origin, wind, 500, _p5);
}
