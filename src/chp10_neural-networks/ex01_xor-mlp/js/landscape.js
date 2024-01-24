/* Module imports */
import MLP from './mlp/network.js';


/**
 * A class that implements a 3D grid landscape in WebGL.
 */
export default class Landscape {
    /**
     * @param {number} scl The size of each 2D cell
     * 
     * @param {number} w The 2D width of the landscape
     * @param {number} h The 2D height of the landscape
     * 
     * @param {p5} _p5 An instance of p5.js. It defaults to the global p5.js
     */
    constructor(scl, w, h, _p5 = _p5.instance) {
        /**
         * The size of each 2D cell
         * @type {number}
         */
        this.scl = scl;

        /**
         * The 2D width of the landscape
         * @type {number}
         */
        this.w = w;

        /**
         * The 2D height of the landscape
         * @type {number}
         */
        this.h = h;

        /**
         * The # of cell columns
         * @type {number}
         */
        this.ncols = w / scl;

        /**
         * The # of cell rows
         * @type {number}
         */
        this.nrows = h / scl;

        /**
         * The 2D altitude grid on the Z-axis
         * @type {Array<Array<number>>}
         */
        this.z = new Array(this.ncols).map(
            _ => new Array(this.nrows)
        );

        /**
         * An instance of p5.js.
         * It defaults to the global p5.js
         * 
         * @type {p5}
         */
        this._p5 = _p5;
    }

    /**
     * Compute the 2D altitude grid with an MLP.
     * 
     * @param {MLP} network The generating MLP network
     */
    compute_grid(network) {
        const {ncols, nrows} = this;

        const dx = 1.0 / ncols;
        const dy = 1.0 / nrows;

        const a = 0.95;  // The weight of z_tm1
        const b = 1 - a; // The weight of z_hat

        let x = 0;

        for (let i = 0; i < ncols; i++) { 
            let y = 0;

            for (let j = 0; j < nrows; j++) {
                let X = [x, y];

                let z_tm1 = this.z[i][j];
                let z_hat = network.predict(X);

                // Normalize z_hat
                z_hat = z_hat*280 - 140;

                // z_t = a*z_tm1 + b*z_hat
                this.z[i][j] = a*z_tm1 + b*z_hat;

                y += dy;
            }

            x += dx;
        }
    }

    /**
     * Display the 3D landscape on canvas.
     * Each 2D cell is a single quad.
     */
    render() {
        const {_p5, scl, z} = this;

        const half_w = this.w / 2;
        const half_h = this.h / 2;

        for (let x = 0; x < this.ncols; x++) {
            for (let y = 0; y < this.nrows; y++) {
                _p5.noStroke();

                // Get the x-y-th quad's 2D vertices
                const v1 = z[x][y];
                const v2 = z[x + 1][y];
                const v3 = z[x + 1][y + 1];
                const v4 = z[x][y + 1];

                _p5.push();
                    _p5.beginShape(_p5.QUADS);
                        // Translate to the x-y-th 2D cell 
                        _p5.translate(
                            x * scl - half_w, 
                            y * scl - half_h, 
                            0
                        );

                        _p5.fill(v1 + 127, 220);
                        _p5.vertex(0, 0, v1);
                        
                        _p5.fill(v2 + 127, 220);
                        _p5.vertex(scl, 0, v2);
                        
                        _p5.fill(v3 + 127, 220);
                        _p5.vertex(scl, scl, v3);
                        
                        _p5.fill(v4 + 127, 220);
                        _p5.vertex(0, scl, v4);
                    _p5.endShape();
                _p5.pop();
            }
        }
    }
}
