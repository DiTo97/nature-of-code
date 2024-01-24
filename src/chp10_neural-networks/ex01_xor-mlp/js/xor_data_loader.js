/**
 * @typedef {Object} XOR
 * 
 * @property {Array<number>} X The XOR input bits
 * @property {number} y The XOR output bit
 */

/**
 * A class that implements a dataloader of XOR inputs.
 */
export default class XORDataLoader {
    /**
     * @param {?number} seed The RNG seed. It defaults to null
     * @param {p5} _p5 An instance of p5.js. It defaults to the global p5.js
     */
    constructor(seed = null, _p5 = p5.instance) {
        /**
         * Input values as pairs of bits.
         * @type {Array<Array<number>>}
         */
        this.X = [
            [1, 0], 
            [0, 1], 
            [1, 1], 
            [0, 0]
        ];

        if (seed !== null) {
            _p5.randomSeed(seed);
        }

        /**
         * An instance of p5.js.
         * It defaults to the global p5.js

         * @type {p5}
         */
        this._p5 = _p5;
    }

    /**
     * Compute the XOR of two bits.
     * 
     * @param {number} a The 1st bit
     * @param {number} b The 2nd bit
     * 
     * @returns {number} The XOR of the bits
     */
    #xor(a, b) {
        return Math.sign(a === b);
    }

    /**
     * Get a random XOR input/output.
     * 
     * @returns {XOR} The XOR input/output bits
     */
    get_random() {
        const {_p5} = this;

        let x = _p5.random(this.X);

        return {
            X: x,
            y: this.#xor(x[0], x[1])
        }
    }
}
