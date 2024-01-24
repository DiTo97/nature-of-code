'use strict';

/* Module imports*/
import Sensor from './sensor.js';

import p5nn from '../p5nn/p5nn.js';


/**
 * A class that implements a genetic 3D autonomous agent, i.e., a vehicle. 
 * It means that the agent will evolve according to a genetic algorithm (GA).
 * 
 * It acts as a 1D agent able to move only along the X-axis.
 * 
 * An agent is made up of a sequence of (non-overlapping) range sensors (i.e., RaDARs),
 * that allow it to perceive the surrounding 3D world. All sensors are assumed to have
 * a common center of projection at the agent's 3D position.
 * 
 * All agents look alike, i.e, they have the same 3D "physical" properties.
 */
export default class Agent {
    /**
     * @param {Object} kwargs
     * @param {p5nn.GNN} kwargs.network A parent genetic NN. It defaults to null
     * @param {p5} kwargs._p5 An instance of p5.js. It defaults to the global p5.js
     */
    constructor({network = null, _p5 = p5.instance}) {
        /**
         * An instance of p5.js.  
         * It defaults to the global p5.js
         * 
         * @type {p5}
         */
        this._p5 = _p5;

        /**
         * The extent of the agent
         * @type {number}
         */
        this.r = 5;

        /**
         * The fitness of the agent.
         * @type {number}
         */
        this.fitness = 0;

        // The extent of the 3D world
        const x = _p5.width  / 2;
        const y = _p5.height / 2;

        const p_x = _p5.random(-x, x);
        const p_y = y - 2*this.r;

        /**
         * The 3D position of the agent
         * @type {p5.Vector}
         */
        this.pos = _p5.createVector(p_x, p_y, 0);

        /**
         * The 3D velocity of the agent
         * @type {p5.Vector}
         */
        this.vel = _p5.createVector(0, 0, 0);

        /**
         * The 3D acceleration of the agent
         * @type {p5.Vector}
         */
        this.acc = _p5.createVector(0, 0, 0);

        /**
         * The maximum magnitude of the 3D velocity
         * @type {number}
         */
        this.max_vel_mag = 4;

        /**
         * Mounted 3D range sensors
         * @type {Array<Sensor>}
         */
        this.sensors = [];

        const AoV   = _p5.PI // The AoV of the agent
        const s_AoV = _p5.radians(30); // The AoV of each sensor

        const n = 6; // The # of sensors

        const s_n_AoV = n * s_AoV;

        if (s_n_AoV > AoV) {
            throw 'Too many 3D range sensors. They will overlap.'
        }

        const angles = p5nn.math.linspace(_p5.PI, _p5.TWO_PI, n);

        for (let a of angles) {
            this.sensors.push(new Sensor(a, s_AoV));
        }

        const n_sensors = this.sensors.length;

        /**
         * The agent's brain, i.e., a genetic NN.
         * @type {p5nn.GNN}
         */
        this.network = network !== null 
                     ? network.clone() 
                     : new GNN(n_sensors);
    }

    seek() {

    }

    /**
     * Progress the simulation by one timestep.
     * 
     * Each step is assumed to be large to neglect finer details, i.e., Euler integration. 
     * To reproduce faithful results, a proper 3D physics engine should be involved.
     * 
     * It updates the 3D physics and the fitness.
     */
    step() {
        this.vel.add(this.acc);
        this.vel.limit(this.max_vel_mag);

        this.pos.add(this.vel);

        this.acc.mult(0);
        
        this.fitness += 1;
    }

    check() {
        
    }

    /**
     * Clone the agent based on some proba.
     * 
     * @param {number} proba The probability
     * 
     * @returns {?Agent} The cloned agent, or null.
     */
    clone(proba) {
        const {_p5, network} = this;
        const n = _p5.random(1);

        if (n < proba) {
            return new Agent(network);
        }

        return null;
    }
}
