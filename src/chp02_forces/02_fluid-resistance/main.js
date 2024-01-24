'use strict';


const n = 100;


/* Ecosystem objects */
let liquid;
let movers;


function setup() {
    createCanvas(720, 240);
    background(255);

    liquid = new Fluid(0, height / 2, width, height / 2, 0.1); 

    movers = [];

    for (let i = 0; i < n; i++) {
        let mass = random(0.1, 5);

        let x = random(0, width);
        let y = random(0, height - liquid.h);

        let m = new BaseMover(mass, x, y)

        movers.push(m);
    }
}

function draw() {
    background(255);

    liquid.display();

    for (let m of movers) {
        let drag = createVector(0, 0);        

        if (m.is_inside(liquid))
            drag = m.drag(liquid);

        let gravity = createVector(0, 1e-1 * m.mass);

        // Net force on the object
        let F = p5.Vector.add(drag, gravity);

        // FIXME: Avoid bouncing objects
        if (F.y < 0) {
            F.y = 0;
        }

        m.apply_force(F);

        m.step();
        m.check_edges();
        m.display();
    }
}
