'use strict';


const mu = 1e-3;

const n = 100;


/* Ecosystem objects */
let movers;


function setup() {
    createCanvas(720, 240);
    background(192);

    movers = [];

    for (let i = 0; i < n; i++) {
        let m = new BaseMover(random(0.1, 5), 0, 0)
        movers.push(m);
    }
}

function draw() {
    background(192);

    let wind = createVector(1e-3, 1e-3);

    for (let m of movers) {
        /* 2.3 Gravity scaled by mass */
        let gravity = createVector(0, 1e-1 * m.mass);

        /* 2.4 Kinetic friction */
        let friction = kinetic_friction(m.v, mu, gravity);

        // Net force on the object
        let F = [friction, wind, gravity];

        for (let f of F)
            m.apply_force(f);

        m.step();
        m.check_edges();
        m.display();
    }
}
