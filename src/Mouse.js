(function () {

    'use strict';

    var Util = require('./Util');

    /**
     * Translate a DOM mouse event into the relevant
     * button identification string.
     *
     * @param {MouseEvent} event - The event.
     *
     * @returns {String} The event enumeration.
     */
    function getMouseButtonId( event ) {
        switch ( event.button ) {
            case 0: return 'left';
            case 1: return 'middle';
            case 2: return 'right';
        }
    }

    /**
     * Returns a function to handle a button press event by changing
     * the button state and executing bound callbacks.
     *
     * @param {Object} buttons - The button information object.
     */
    function handleMouseButtonPress( buttons ) {
        return function( event ) {
            var buttonId = getMouseButtonId( event ),
                button;
             // ensure the button info object exists
            button = buttons[ buttonId ] = buttons[ buttonId ] || {
                state: null
            };
            button.state = 'down';
            Util.executeCallbacks( button.callbacks, 'press', event );
        };
    }

    /**
     * Returns a function to handle a button release event by changing
     * the input state and executing bound callbacks.
     *
     * @param {Object} buttons - The button information object.
     */
    function handleMouseButtonRelease( buttons ) {
        return function( event ) {
            var buttonId = getMouseButtonId( event ),
                button = buttons[ buttonId ];
            // check if we processed the keydown event, sometimes due
            // to focus issues ( windows button, printscreen button, etc )
            // we miss the 'keydown' event and only receive
            // the 'keyup'
            if ( button && button.state === 'down' ) {
                Util.executeCallbacks( button.callbacks, 'release', event );
                button.state = 'up';
            }
        };
    }

    /**
     * Returns a function to handle mouse movement events.
     *
     * @param {Object} mouse - The mouse information object.
     */
    function handleMouseMove( mouse ) {
        var lastPosition = null;
        return function( event ) {
            // mousemove events sometimes fire when a mouse button is pressed, a mousemove
            // should only queue an event if the position has actually changed
            if ( lastPosition &&
                event.clientX === lastPosition.x &&
                event.clientY === lastPosition.y ) {
                return;
            }
            if ( lastPosition ) {
                event.previousClientX = lastPosition.x;
                event.previousClientY = lastPosition.y;
            }
            Util.executeCallbacks( mouse.callbacks, 'move', event );
            lastPosition = {
                x: event.clientX,
                y: event.clientY
            };
        };
    }

    /**
     * Returns a function to handle mouse wheel wheel events.
     *
     * @param {Object} mouse - The mouse information object.
     */
    function handleMouseWheel( mouse ) {
        return function( event ) {
            Util.executeCallbacks( mouse.callbacks, 'wheel', event );
        };
    }

    /**
     * Instantiates a mouse object.
     * @class Mouse
     * @classdesc A mouse input handling object.
     *
     * @param {String|HTMLElement} arg - The element to attach the listeners to.
     */
    function Mouse( arg ) {
        this.buttons = {};
        this.mouse = {};
        if ( typeof arg === 'string' ) {
            this.element = document.querySelector( arg );
        } else {
            this.element = arg || document;
        }
        // generate and attach the button event handlers
        this.element.addEventListener( 'mousedown', handleMouseButtonPress( this.buttons ) );
        this.element.addEventListener( 'mouseup', handleMouseButtonRelease( this.buttons ) );
        this.element.addEventListener( 'mousemove', handleMouseMove( this.mouse ) );
        this.element.addEventListener( 'wheel', handleMouseWheel( this.mouse ) );
    }

    /**
     * Attach a listener for a set of input and events.
     * @memberof Mouse
     *
     * @param {Array|String} inputs - The input identification strings.
     * @param {Function} callback - The callback function.
     * @param {Array|String} eventTypes - The button events to bind the callbacks to. Optional.
     */
    Mouse.prototype.on = function( inputs, callback, eventTypes ) {
        if ( Util.checkFunctionArg( 'Mouse.on', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs(
            'Mouse.on',
            inputs,
            [ 'left','middle','right','move','wheel' ]
        );
        var mouse = this.mouse,
            buttons = this.buttons;
        inputs.forEach( function( input ) {
            if ( input === 'move' || input === 'wheel' ) {
                mouse.callbacks = mouse.callbacks || {};
                mouse.callbacks[ input ] = mouse.callbacks[ input ] || [];
                mouse.callbacks[ input ].push( callback );
            } else {
                var button = buttons[ input ] = buttons[ input ] || {};
                eventTypes = Util.normalizeEventArgs( 'Mouse.on', eventTypes );
                eventTypes.forEach( function( eventType ) {
                    button.callbacks = button.callbacks || {};
                    button.callbacks[ eventType ] = button.callbacks[ eventType ] || [];
                    button.callbacks[ eventType ].push( callback );
                });
            }
        });
        return this;
    };

    /**
     * Remove a listener for a set of input and events.
     * @memberof Mouse
     *
     * @param {Array|String} inputs - The input identification strings.
     * @param {Function} callback - The callback function.
     * @param {Array|String} eventTypes - The button events to remove the callbacks from. Optional.
     */
    Mouse.prototype.off = function( inputs, callback, eventTypes ) {
        if ( Util.checkFunctionArg( 'Mouse.off', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs(
            'Mouse.off',
            inputs, [ 'left','middle','right','move','wheel' ]
        );
        var mouse = this.mouse,
            buttons = this.buttons;
        inputs.forEach( function( input ) {
            if ( input === 'move' || input === 'wheel' ) {
                if ( mouse.callbacks && mouse.callbacks[ input ] ) {
                    mouse.callbacks[ input ].splice( mouse.callbacks[ input ].indexOf( callback ) );
                }
            } else {
                var button = buttons[ input ] = buttons[ input ] || {};
                eventTypes = Util.normalizeEventArgs( 'Mouse.off', eventTypes );
                eventTypes.forEach( function( eventType ) {
                    if ( button.callbacks && button.callbacks[ eventType ] ) {
                        button.callbacks[ eventType ].splice( button.callbacks[ eventType ].indexOf( callback ) );
                    }
                });
            }
        });
        return this;
    };

    /**
     * Poll the states of the provided button identification strings.
     * @memberof Mouse
     *
     * @param {Array|String} buttonIds - The button identification strings.
     *
     * @returns {Array} The state of the provided buttons.
     */
    Mouse.prototype.poll = function( buttonIds ) {
        var buttons = this.buttons,
            states = {};
        buttonIds = Util.normalizeInputArgs(
            'Mouse.poll',
            buttonIds,
            [ 'left', 'middle', 'right' ]
        );
        buttonIds.forEach( function( buttonId ) {
            var button = buttons[ buttonId ];
            states[ buttonId ] = button ? button.state : 'up';
        });
        return buttonIds.length === 1 ? states[ buttonIds[0] ] : states;
    };

    module.exports = Mouse;

}());
