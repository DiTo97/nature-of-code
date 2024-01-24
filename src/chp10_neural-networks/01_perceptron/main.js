'use strict';

/* Module imports */
import Perceptron from './js/perceptron.js';


/* Constants */
/** The min value on the X-axis */
const min_x = -1

/** The max value on the X-axis */
const max_x = 1

/** The min value on the Y-axis */
const min_y = -1

/** The max value on the Y-axis */
const max_y = 1

/** The total # of samples */
const n = 1000;

/** The batch size */
const B = 50;

/** 
 * The tolerance on the per-epoch cumulative loss residual.
 * Once the abs value of the residual goes below the tolerance, the training is over.
 */
const tol = 1e-3;

/* Global variables */
/** A training set of {@link n} samples */
let training = new Array(n);

/** A trainable perceptron */
let ptron;

/** The current batch # */
let j = 0;

/** The current epoch # */
let n_epoch = 0;

/** 
 * The per-epoch cumulative loss residual.
 * It accumulates over {@link n} / {@link B} batches
 */
let cum_e = 0;


/** An instance of p5.js */
const _p5 = new p5(_ => {}, 'p5-main')

/**
 * Generate a point from the desired data distribution, i.e., a 2D line equation.
 * 
 * @param {number} x A point on the X-axis
 * 
 * @returns {number} The resulting point on the Y-axis
 */
function f(x) {
    return 0.3*x + 0.4;
}

/**
 * Map a value on the X-axis in the desired range.
 * 
 * @param {number} x A point on the X-axis
 * 
 * @returns {number} The point in the desired X range
 */
function map_x(x) {
    return _p5.map(x, min_x, max_x, 0, _p5.width);
}

/**
 * Map a value on the Y-axis in the desired range.
 * 
 * @param {number} y A point on the Y-axis
 * 
 * @returns {number} The point in the desired Y range
 */
 function map_y(y) {
    return _p5.map(y, min_y, max_y, _p5.height, 0);
}

_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.frameRate(30);

    ptron = new Perceptron(2, 1e-3, _p5);

    // Generate the training set
    for (let i = 0; i < n; i++) {
        let _x = _p5.random(min_x, max_x);
        let _y = _p5.random(min_y, max_y);

        let desired = 1;

        if (_y < f(_x)) {
            desired = -1;
        }

        training[i] = {
            X: [_x, _y],
            y: desired
        }
    }
}

_p5.draw = () => {
    _p5.background(0);
    _p5.strokeWeight(1.3);

    // Draw the desired 2D distribution
    let x1 = map_x(min_x);
    let y1 = map_y(f(min_x));
    let x2 = map_x(max_x);
    let y2 = map_y(f(max_x));

    _p5.stroke(255, 0, 0);
    _p5.line(x1, y1, x2, y2);

    // Draw the 2D guess: w_0*x + w_1*y + b = 0,
    // where w_0 and w_1 are the weights and b the bias
    let W = ptron.weights;
    let b = ptron.bias;

    x1 = min_x;
    y1 = (-b - W[0] * x1) / W[1];
    x2 = max_x;
    y2 = (-b - W[0] * x2) / W[1];

    x1 = map_x(x1);
    y1 = map_y(y1);
    x2 = map_x(x2);
    y2 = map_y(y2);

    _p5.stroke(0, 255, 0);
    _p5.line(x1, y1, x2, y2);

    let e = 0;

    // Train on the j-th batch
    for (let i = j * B; i < (j + 1)*B; i++) {
        ptron.fit(training[i].X, training[i].y);
        let e_B = ptron.score(training[i].X, training[i].y);

        e += Math.abs(e_B);
    }

    console.log(`epoch: #${n_epoch + 1} - B: #${j + 1} - Training error: ${e / B}`)

    _p5.strokeWeight(1);

    // Draw the guessed 2D points
    for (let i = 0; i < (j + 1)*B; i++) {
        _p5.stroke(255);
        _p5.fill(255);

        let guess = ptron.predict(training[i].X);

        if (guess > 0) {
            _p5.noFill();
        }
    
        let x = map_x(training[i].X[0]);
        let y = map_y(training[i].X[1]);
        
        _p5.ellipse(x, y, 8, 8);
    }

    cum_e += e;
    j = (j + 1) % (Math.floor(n / B));

    // Update the epoch #
    if (j == 0) {
        const avg_e = cum_e / n;

        if (avg_e < tol) {
            _p5.noLoop();

            W = ptron.weights;
            b = ptron.bias;

            console.log(`Completed training in ${n_epoch + 1} epochs:`);
            console.log(`e: ${avg_e} - W: ${W} - b: ${b}`);

            return;
        }
        
        cum_e = 0;
        n_epoch += 1;
    }
}
