/**
 * A class that implements a perceptron (F. Rosenblatt, 1957).
 */
export default class Perceptron {
    /**
     * @param {number} n The # of weights
     * @param {number} c The learning rate. It defaults to 0.01
     * 
     * @param {p5} p5 An instance of p5.js. It defaults to the global instance of p5.js
     */
    constructor(n, c = 1e-3, _p5 = p5.instance) {
        /**
         * Input weights
         * 
         * @type {Array<number>}
         */
        this.weights = Array.from(
            {length: n}, 
            () => _p5.random(-1, 1)
        );

        /**
         * The bias
         */
        this.bias = _p5.random(-1, 1);

        /**
         * The learning rate.
         * It defaults to 0.01
         * 
         * @type {number}
         */
        this.c = c;

        /**
         * The activation function.
         * It defaults to {@link Math.sign}
         * 
         * @type {function}
         */
        this.activate = (x) => Math.sign(x) || -1;

        /**
         * The loss function.
         * It defaults to ``d - g``
         * 
         * @type {function}
         */
        this.loss = (g, d) => d - g;

        /**
         * An instance of p5.js
         * 
         * @type {p5}
         */
        this.p5 = _p5
    }

    /**
     * Guess the output from a set of inputs.
     * 
     * @param {Array<number>} inputs Input values
     * 
     * @returns {number} The predicted output
     */
    forward(inputs) {
        const {weights} = this;

        if (weights.length !== inputs.length) {
            throw 'Inputs and weights must have the same length';
        }

        let sum = 0.0;
        let ninputs = weights.length;

        for (let i = 0; i < ninputs; i++) {
            sum += weights[i] * inputs[i];
        }

        sum += this.bias;

        return this.activate(sum);
    }

    /**
     * Adjust weights and the bias with error propagation.
     * 
     * @param {Array<number>} inputs Input values
     * 
     * @param {number} guess The predicted output
     * @param {number} desired The desired output
     */
    backward(inputs, guess, desired) {
        const l = this.loss(guess, desired);
        const e = this.c * l;

        let ninputs = inputs.length;

        for (let i = 0; i < ninputs; i++) {
            this.weights[i] += e * inputs[i];
        }

        this.bias += e
    }

    /**
     * Perform a forward/backward cycle.
     * 
     * @param {Array<number>} inputs Input values
     * @param {number} desired The desired output
     */
    fit(inputs, desired) {
        this.backward(
            inputs, 
            this.forward(inputs), 
            desired
        );
    }

    /**
     * Get the loss residual out of a forward pass.
     * 
     * @param {Array<number>} inputs Input values
     * @param {number} desired The desired output
     * 
     * @returns {number} The loss residual
     */
    score(inputs, desired) {
        return this.loss(
            this.forward(inputs),
            desired
        );
    }

    /**
     * Guess the output from a set of inputs.
     * It wraps {@link Perceptron.forward}.
     * 
     * @param {Array<number>} inputs Input values
     * 
     * @returns {number} The predicted output
     */
    predict(inputs) {
        return this.forward(inputs);
    }
}
