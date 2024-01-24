/**
 * Generate equally spaced points between a start and a stop. 
 * 
 * @param {number} a The start point
 * @param {number} b The end point
 * @param {number} n The desired # of points
 * 
 * @returns {Array<number>} The space of {@link n} points
 */
function linspace(a, b, n) {
    if (typeof n === 'undefined') {
        n = Math.max(Math.round(b -a) + 1, 1);
    } 

    if (n < 2) { 
        return n === 1 ? [a] : [];
    }

    let space = Array(n);
    let nm1 = n - 1;

    for (let i = nm1; i > 0; i--) {
        space[i] = (i*b + (nm1 - i)*a) / n;
    }

    return space;
}


export default {linspace};
