'use strict';

/* Module imports */
import Agent from './js/env/agent.js';
import Obstacle from './js/env/obstacle.js';

import GUI from './js/gui.js';


/* Constants */
/** 
 * An instance of p5.js 
 * @type {p5} 
 */
const _p5 = new p5(_ => {}, 'p5-container')

/** 
 * The # of training iters per frame 
 * @type {number} 
 */
const k = 5;

/**
 * The RNG seed
 * @type {number}
 */
const seed = 1;

/**
 * The maximum # of generations
 * @type {number}
 */
const max_n_gens = 5000;

/**
 * The minimum # of agents allowed to evolve in the simulation. 
 * A reptroduction cycle is triggered until the threshold is met.
 * 
 * @type {number}
 */
const min_n_agents = 16;

/**
 * The crossover rate (CR).
 * @type {number}
 */
const cr = 0.1;


/* Global variables */
/**
 * The 3D agent with the highest fitness
 * @type {Agent}
 */
let best = null;

/**
 * The origin of the 3D space
 * @type {p5.Vector}
 */
 let O;

/**
 * Agents in the environment
 * @type {Array<Agent>}
 */
let agents = []

/**
 * Obstacles in the environment
 * @type {Array<Obstacle>}
 */
let obstacles = [];

/**
 * A trainable genetic NN
 * @type {GNN}
 */
let network;

 /**
 * The total # of generations
 * @type {number}
 */
let n_gens = 0;
 

_p5.setup = () => {
    if (seed !== -1) {
        _p5.randomSeed(seed);
    }
    
    _p5.createCanvas(720, 480, _p5.WEBGL);

    GUI.setup({_p5: _p5});

    _p5.frameRate(30);

    O = _p5.createVector(
        _p5.width / 2,
        _p5.height / 2, 
        0
    )
}

_p5.draw = () => {
    _p5.background(0);

    if (GUI.orbit_control_box.checked()) {
        _p5.orbitControl();
    }

    const n_sr_cycles = GUI.n_sr_cycles_slider.value();
    GUI.n_sr_cycles_span.html(n_sr_cycles);

    for (let i = 0; i < n_sr_cycles; i++) {
        if (n_gens >= max_n_gens) {
            _p5.noLoop();
            break;
        }

        if (n_gens % 16 == 0) {
            const o_x = _p5.random(-O.x, O.x);
            const o_y = -O.y;

            const o = new Obstacle(o_x,
                                   o_y,
                                   {_p5: _p5});

            obstacles.push(o);
        }

        let max_fitness = -1;

        for (let j = agents.length - 1; j >= 0; j--) {
            let a = agents[j];

            a.step();

            const dead = a.check(obstacles);

            if (dead) {
                agents.splice(j, 1);
            } else {
                if (a.fitness > max_fitness) {
                    max_fitness = a.fitness;
                    best = a;
                }
            }
        }

        // while (agents.length < min_n_agents) {
        //     for (let a of agents) {
        //         let p = a.fitness / max_fitness;
        //         let offspring = a.crossover(cr * p);

        //         if (offspring !== null) {
        //             offspring.mutate(0.1);
        //             agents.push(offspring);
        //         }
        //     }
        // }

        for (let o of obstacles)
            o.step();

        n_gens++;
    }

    for (let o of obstacles) 
        o.render();

    // best.highlight();

    if (GUI.debug_box.checked()) {
        for (let a of agents) 
            a.debug();
    }
}
