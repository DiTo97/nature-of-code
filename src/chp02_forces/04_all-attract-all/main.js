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

    for (let i = 0; i < movers.length; i++) {
        let m = movers[i];

        let f = attractor.attraction(m);

        // Net force on the object
        let F = f;

        for (let j = 0; j < movers.length; j++) {
            if (i !== j) {
                let attraction = movers[j].attraction(m);
                F.add(attraction);
            }
        }

        m.apply_force(F);

        m.step();
        m.check_edges();
        m.display();
    }
}
