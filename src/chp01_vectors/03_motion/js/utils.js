/**
 * Limit a value in a given range.
 * 
 * @param {number} x The value to limit.
 * @param {number} l The lower bound of the range.
 * @param {number} h The upper bound of the range.
 * 
 * @returns The value itself, or a bound of the range.
 */
function limit(x, l, h) {
    if (x > h) {
        return h;
    } else if (x < l) {
        return l;
    } else {
        return x;
    }
}
