'use strict';


class Walker extends BaseObject {
    constructor() {
        super(width / 2, height / 2)

        /* I.5 Perlin noise walker */
        this.tx = 0;
        this.ty = 1e3;
    }

    display() {
        stroke(0)
        point(this.x, this.y)
    }

    step() {
        // /* I.1 Traditional random walk */

        // const choice = Math.trunc(random(4))

        // switch (choice) {
        //     case 0:
        //         this.x++;
        //         break;
        //     case 1:
        //         this.x--;
        //         break;
        //     case 2:
        //         this.y++;
        //         break;
        //     case 3:
        //         this.y--;
        //         break;
        //     default:
        //         throw new Error(`Invalid choice: ${choice}`)
        // }

        // const dx = Math.trunc(random(3)) - 1
        // const dy = Math.trunc(random(3)) - 1

        // this.x += dx
        // this.y += dy

        // const dx = random(-1, 1);
        // const dy = random(-1, 1);

        // this.x += dx
        // this.y += dy

        // /* I.3 Walker that tends to move to the right */

        // const choice = random();

        // if (choice < 0.4) {
        //     this.x++;
        // } else if (choice < 0.6) {
        //     this.x--;
        // } else if (choice < 0.8) {
        //     this.y++;
        // } else {
        //     this.y--;
        // }

        // /* I.5 Gaussian random walk */

        // const dx = randomGaussian();
        // const dy = randomGaussian();

        // this.x += dx
        // this.y += dy

        // /* I.6 Custom distribution of step sizes */

        // const stepsize = qualified_random(x => x**2)

        // const dx = random(-stepsize, stepsize);
        // const dy = random(-stepsize, stepsize);

        // this.x += dx
        // this.y += dy

        /* I.5 Perlin noise walker */
        const nx = noise(this.tx)
        const ny = noise(this.ty)

        this.x = map(nx, 0, 1, 0, width);
        this.y = map(ny, 0, 1, 0, height);

        this.tx += 0.01;
        this.ty += 0.01;
    }
}
