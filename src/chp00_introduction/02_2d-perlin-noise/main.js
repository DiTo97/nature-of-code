'use strict';


let d;

/* I.9 Animated 2D Perlin noise */
let dz;


function setup() {
    createCanvas(720, 240);

    d = pixelDensity();

    /* I.9 Animated 2D Perlin noise */
    dz = 0.0;
}

function draw() {
    loadPixels();

    // /* I.8 2D Perlin noise */
    // let dx = 0.0;

    // for (let x = 0; x < width; x++) {
    //     let dy = 0.0;

    //     for (let y = 0; y < height; y++) {
    //         const n = noise(dx, dy);
    //         const bright = map(n, 0, 1, 0, 255);
    //         const c = color(bright)['levels'];

    //         for (let i = 0; i < d; i++) {
    //             for (let j = 0; j < d; j++) {
    //                 const k = 4*(d*(y * d + j)*width + (x * d + i));

    //                 pixels[k + 0] = c[0];
    //                 pixels[k + 1] = c[1];
    //                 pixels[k + 2] = c[2];
    //                 pixels[k + 3] = c[3];
    //             }
    //         }

    //         dy += 0.01;
    //     }

    //     dx += 0.01;
    // }

    /* I.9 Animated 2D Perlin noise */
    let dx = 0.0;

    for (let x = 0; x < width; x++) {
        let dy = 0.0;

        for (let y = 0; y < height; y++) {
            const n = noise(dx, dy, dz);
            const bright = map(n, 0, 1, 0, 255);
            const c = color(bright)['levels'];

            for (let i = 0; i < d; i++) {
                for (let j = 0; j < d; j++) {
                    const k = 4*(d*(y * d + j)*width + (x * d + i));

                    pixels[k + 0] = c[0];
                    pixels[k + 1] = c[1];
                    pixels[k + 2] = c[2];
                    pixels[k + 3] = c[3];
                }
            }

            dy += 0.01;
        }

        dx += 0.01;
    }
    
    updatePixels();

    dz += 0.01;
}
