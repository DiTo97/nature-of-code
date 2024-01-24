'use strict';


const n = 10;


/* Ecosystem objects */
let movers;
let attractor;


function setup() {
    createCanvas(720, 240);
    background(255);

    attractor = new Attractor(50, width / 2, height / 2);

    movers = [];

    for (let i = 0; i < n; i++) {
        let mass = random(0.1, 5);

        let x = random(0, width);
        let y = random(0, height);

        let m = new BaseMover(mass, x, y)

        movers.push(m);
    }
}

function draw() {
    background(255);

    attractor.display();

    for (let m of movers) {
        let f = attractor.attraction(m);
        m.apply_force(f);

        m.step();
        m.check_edges();
        m.display();
    }
}
