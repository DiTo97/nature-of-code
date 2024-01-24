/**
 * @typedef {number} n_inps The # of input neurons
 * @typedef {number} n_outs The # of output neurons
 * 
 * @typedef {[n_inps, n_outs]} Layer
 */

/**
 * A class that implements a multi-layer perceptron (MLP).
 */
export default class MLP {
    /**
     * @param {Array<Layer>} layers 
     */
    constructor(layers) { 
        const nlayers = layers.length;

        for (let i = 0; i < nlayers - 1; i++) {
            let n_outs = layers[i][1];
            let n_inps = layers[i + 1][0];

            if (n_outs !== n_inps) {
                throw 'Output and input shapes on subsequent MLP layers must match'
            }
        }
    }

    /**
     * Guess the output from a set of inputs.
     * 
     * @param {Array<number>} X Input values
     * 
     * @returns {number} The predicted output
     */
    predict(X) {
        return 1.0;
    }
}
