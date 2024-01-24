'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

const n = 20;

let movers = [];
let attractor;


_p5.setup = () => {
    _p5.createCanvas(720, 240);
    _p5.background(255);

    for (let i = 0; i < n; i++) {
        let mass = _p5.random(0.1, 2);

        let x = _p5.random(_p5.width);
        let y = _p5.random(_p5.height);

        let m = new BaseMover(_p5, 
                              mass, 
                              x, 
                              y);

        movers.push(m);
    }

    attractor = new Attractor(_p5,
                              20,
                              _p5.width / 2,
                              _p5.height / 2);
}

_p5.draw = () => {
    _p5.background(64);

    attractor.display();

    for (let m of movers) {
        let force = attractor.attraction(m);

        m.apply_force(force);
        
        m.step();
        m.display();
    }
}
