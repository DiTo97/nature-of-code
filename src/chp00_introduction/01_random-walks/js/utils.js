'use strict';

/**
 * Generate a qualified random number via Monte Carlo simulation.
 * 
 * A qualified random number is a random number which another random number,
 * known as qualifying random number, agrees to keep rather than throw away,
 * according to some qualifying distribution function.
 * 
 * @param {function(number): number} func The qualifying distribution function. The default is the linear distribution *p(x) = x*, i.e., the likelihood that a number is kept is equal to its value.
 * 
 * @returns {number} The qualified random number.
 */
function qualified_random(func = x => x) {
    while (true) {
        const r1 = random()
        const r2 = random()

        const proba = func(r1)

        if (r2 < proba)
            return r1;
    }
}
