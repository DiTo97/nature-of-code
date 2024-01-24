'use strict';

/**
 * Setup the DOM elems of the # of selection-reproduction (SR) cycles per frame.
 * 
 * @param {p5} _p5 An instance of p5.js
 */
function _setup_n_SR_cycles_elems(_p5) {
    const p = _p5.createElement('p');

    p.parent('p5-GUI');

    const label = _p5.createElement('label', 'N. of SR cycles:');

    label.parent(p);

    label.attribute('for', 'n-sr-cycles-slider')

    const input = _p5.createElement('input');

    input.parent(p);
    input.id('n-sr-cycles-slider');

    input.attribute('type', 'range');
    input.attribute('min', 1);
    input.attribute('max', 10);
    input.attribute('value', 1);

    GUI.n_sr_cycles_slider = _p5.select('#n-sr-cycles-slider');

    const span  = _p5.createElement('span', 1);

    span.parent(p);
    span.id('n-sr-cycles-span');    

    GUI.n_sr_cycles_span = _p5.select('#n-sr-cycles-span');
}


/**
 * Setup the DOM checkbox of 3D orbit control
 * 
 * @param {p5} _p5 An instance of p5.js
 */
function _setup_orbit_control_box(_p5) {
    const p = _p5.createElement('p');

    p.parent('p5-GUI');

    const label = _p5.createElement('label', 'Orbit control:');

    label.parent(p);

    label.attribute('for', 'orbit-control-box');

    const input = _p5.createElement('input');

    input.parent(p);
    input.id('orbit-control-box');

    input.attribute('type', 'checkbox');

    GUI.orbit_control_box = _p5.select('#orbit-control-box');
}


/**
 * Setup the DOM checkbox of debug mode. It defaults to checked
 * 
 * @param {p5} _p5 An instance of p5.js
 */
function _setup_debug_box(_p5) {
    const p = _p5.createElement('p');

    p.parent('p5-GUI');

    const label = _p5.createElement('label', 'Debug:');

    label.parent(p);

    label.attribute('for', 'debug-box')

    const input = _p5.createElement('input');

    input.parent(p);
    input.id('debug-box');

    input.attribute('type', 'checkbox');
    input.attribute('checked', true);

    GUI.debug_box = _p5.select('#debug-box');
}


/**
 * Setup all clickable GUI controls.
 * 
 * @param {Object} kwargs
 * @param {p5} kwargs._p5 An instance of p5.js. It defaults to the global p5.js 
 */
function _setup({_p5 = p5.instance}) {
    _setup_n_SR_cycles_elems(_p5);
    _setup_orbit_control_box(_p5);
    _setup_debug_box(_p5);
}


/**
 * An interface that controls the GUI.
 */
const GUI = {
    /**
     * The DOM slider of the # of SR cycles per frame
     * @type {p5.Element}
     */
    n_sr_cycles_slider: null,

    /**
     * The DOM span with the # of SR cycles per frame
     * @type {p5.Element} 
     */
    n_sr_cycles_span: null,

    /**
     * The DOM toggle for 3D orbit control
     * @type {p5.Element} 
     */
    orbit_control_box: null,

    /**
     * The DOM toggle for debug mode
     * @type {p5.Element}
     */
    debug_box: null,

    setup: _setup,
}


export default GUI;
