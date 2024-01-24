'use strict';

/* Module imports */
import Landscape from './js/landscape.js';
import XORDataLoader from './js/xor_data_loader.js';

import MLP from './js/mlp/network.js';


/* Constants */
/** 
 * An instance of p5.js 
 * @type {p5} 
 */
const _p5 = new p5(_ => {}, 'p5-main')

/** 
 * The # of training iters per frame 
 * @type {number} 
 */
const k = 5;

/**
 * The origin of the 3D space
 * @type {p5.Vector}
 */
const O = _p5.createVector(
    _p5.width / 2, 
    _p5.height / 2 + 20, 
    -160
);

/**
 * The RNG seed
 * @type {number}
 */
const seed = 1;


/* Global variables */
/**
 * The total # of training iters
 * @type {number}
 */
let n_iters = 0;

/**
 * The 3D solution space
 * @type {Landscape}
 */
let landscape;

/**
 * A trainable MLP network
 * @type {MLP}
 */
let network;

/**
 * A dataloader of XOR inputs
 * @type {XORDataLoader}
 */
 let dataloader;

/**
 * The rotation angle about the Z-axis
 * @type {number}
 */
 let theta = 0.0;


_p5.setup = () => {
    _p5.createCanvas(720, 720, _p5.WEBGL);
    _p5.frameRate(30);

    landscape = new Landscape(36, 540, 540, _p5);
    network = new MLP();
    dataloader = new XORDataLoader(seed, _p5);
}

_p5.draw = () => {
    for (let i = 0; i < k; i++) {
        const {X, y} = dataloader.get_random();

        n_iters++;
    }

    _p5.background(127);

    _p5.push();
        _p5.translate(O.x, O.y, O.z);

        _p5.rotateX(_p5.PI / 2);
        _p5.rotateZ(theta);

        _p5.push();
            _p5.stroke(50);
            _p5.noFill();

            _p5.box(280);
        _p5.pop();

        landscape.compute_grid(network);
        landscape.render();

        theta += 0.0025;
    _p5.pop();
}
