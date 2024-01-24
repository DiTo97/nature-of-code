'use strict';


const SCL = 16;


let azimuth;
let ncols
let nrows;
let w;
let h;


function setup() {
    createCanvas(720, 240, WEBGL);

    azimuth = 0.0;

    w = 2 * width;
    h = height;

    ncols = floor(w / SCL);
    nrows = floor(h / SCL);

    frameRate(30);
}

function draw() {
    // Reset the 3D terrain
    let terrain = []
    
    azimuth -= 0.1;
    let dy = azimuth;

    for (let y = 0; y < nrows; y++) {
        let dx = 0.0;

        terrain[y] = [];

        for (let x = 0; x < ncols; x++) {
            let n = noise(dx, dy);
            let z = map(n, 0, 1, -30, 100);

            terrain[y][x] = z;

            dx += 0.1;
        }

        dy += 0.1;
    }

    background(255);

    rotateX(PI / 3);
    rotateZ(PI / 6);

    translate(-w / 2, -h / 2);

    for(let y = 0; y < nrows - 1; y++) {
        beginShape(TRIANGLE_STRIP);

        for(let x = 0; x < ncols; x++) {
            let dist = y / nrows;
            fill(floor(255 * dist));

            let i = y;
            let j = y + 1;

            vertex(x * SCL, i * SCL, terrain[i][x]);
            vertex(x * SCL, j * SCL, terrain[j][x]);
        }

        endShape();
    }
}
