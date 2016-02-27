(function () {

    'use strict';

    var Util = require('./Util');

    /**
     * Returns a function to handle a touch event by executing bound callbacks.
     *
     * @param {Object} touch - The touch action information object.
     * @param {Object} action - The action identification string.
     */
    function handleTouchAction( touch, action ) {
        return function( event ) {
            touch[ action ] = touch[ action ] || {
                type: action,
                callbacks: []
            };
            touch[ action ].callbacks.forEach( function( callback ) {
                callback( event );
            });
        };
    }

    /**
     * Instantiates a touch object.
     * @class Touch
     * @classdesc A touch input handling object.
     */
    function Touch() {
        this.touch = {};
        // generate and attach the button event handlers
        document.addEventListener( 'touchstart', handleTouchAction( this.touch, 'start' ), false );
        document.addEventListener( 'touchend', handleTouchAction( this.touch, 'end' ), false );
        document.addEventListener( 'touchcancel', handleTouchAction( this.touch, 'cancel' ), false );
        document.addEventListener( 'touchleave', handleTouchAction( this.touch, 'leave' ), false );
        document.addEventListener( 'touchmove', handleTouchAction( this.touch, 'move' ), false );
    }

    /**
     * Attach a listener for a set of input and events.
     * @memberof Touch
     *
     * @param {Array|String} inputs - The input identification strings.
     * @param {Function} callback - The callback function.
     */
    Touch.prototype.on = function( inputs, callback ) {
        var touch,
            input,
            i;
        if ( Util.checkFunctionArg( 'Touch.on', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs( 'Touch.on',
            inputs, [ 'start', 'end', 'cancel', 'leave', 'move' ] );
        for ( i=0; i<inputs.length; i++ ) {
            input = inputs[i];
            touch = this.touch;
            touch[ input ] = touch[ input ] || {
                type: input,
                callbacks: []
            };
            touch[ input ].callbacks.push( callback );
        }
        return this;
    };

    /**
     * Remove a listener for a set of input and events.
     * @memberof Touch
     *
     * @param {Array|String} inputs - The input identification strings.
     * @param {Function} callback - The callback function.
     */
    Touch.prototype.off = function( inputs, callback ) {
        var touch,
            index,
            input,
            i;
        if ( Util.checkFunctionArg( 'Touch.off', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs( 'Touch.off',
            inputs, [ 'start', 'end', 'cancel', 'leave', 'move' ] );
        for ( i=0; i<inputs.length; i++ ) {
            input = inputs[i];
            touch = this.touch;
            index = touch[ input ].callbacks.indexOf( callback );
            if ( touch[ input ] ) {
                touch[ input ].callbacks.splice( index, 1 );
            }
        }
        return this;
    };

    module.exports = Touch;

}());
