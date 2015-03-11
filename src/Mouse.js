(function () {

    "use strict";

    var Util = require('./Util');

    function normalizeInputArgs( functionName, input ) {
        var validInputs = [],
            i;
        if ( !( input instanceof Array ) ) {
            input = [ input ];
        }
        for ( i=0; i<input.length; i++ ) {
            if ( input[i] !== 'left' &&
                input[i] !== 'middle' &&
                input[i] !== 'right' &&
                input[i] !== 'move' ) {
                // input is not valid
                console.log( "Argument 'input' to '"+functionName+"' does not match 'left', 'middle', 'right', or 'move', argument removed." );
            } else {
                validInputs.push( Util.normalizeString( input[i] ) );
            }
        }
        return validInputs;
    }

    function normalizeEventArgs( functionName, events ) {
        var i;
        if ( !events ) {
            events = [ 'press' ];
        }
        if ( !( events instanceof Array ) ) {
            events = [ events ];
        }
        for ( i=0; i<events.length; i++ ) {
            if ( events[i] !== 'press' &&
                events[i] !== 'release' ) {
                // event is not a string
                console.log( "Argument 'events' to '"+functionName+"' does not match 'press', 'release', argument removed." );
            } else {
                events[i] = Util.normalizeString( events[i] );
            }
        }
        return events;
    }

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
            case 0: return "left";
            case 1: return "middle";
            case 2: return "right";
        }
    }

    /**
     * Returns a function to handle a button press event by queuing the
     * event and changing the button state.
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
            button.state = "down";
            Util.executeCallbacks( button.callbacks, "press", event );
        };
    }

    /**
     * Returns a function to handle a button release event by queuing the
     * event and changing the input state.
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
            if ( button && button.state === "down" ) {
                Util.executeCallbacks( button.callbacks, "release", event );
                button.state = "up";
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
            Util.executeCallbacks( mouse.callbacks, "move", event );
            lastPosition = {
                x: event.clientX,
                y: event.clientY
            };
        };
    }

    function Mouse() {
        this.buttons = {};
        this.mouse = {};
        // generate and attach the button event handlers
        document.addEventListener( 'mousedown', handleMouseButtonPress( this.buttons ) );
        document.addEventListener( 'mouseup', handleMouseButtonRelease( this.buttons ) );
        document.addEventListener( 'mousemove', handleMouseMove( this.mouse ) );
    }

    /**
     * Attach a listener for a button and set of events.
     *
     * @param {Array|String} input - The input identification string.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The button events to bind the callbacks to.
     */
    Mouse.prototype.on = function( input, callback, events ) {
        var button,
            mouse,
            event,
            entry,
            i,
            j;
        if ( Util.checkFunctionArg( 'Keyboard.on', callback ) ) {
            return this;
        }
        input = normalizeInputArgs( 'Mouse.on', input );
        events = normalizeEventArgs( 'Mouse.on', events );
        for ( i=0; i<input.length; i++ ) {
            entry = input[i];
            if ( entry === "move" ) {
                mouse = this.mouse;
                mouse.callbacks = mouse.callbacks || {};
                mouse.callbacks.move = mouse.callbacks.move || [];
                mouse.callbacks.move.push( callback );
            } else {
                button = this.buttons[ entry ] = this.buttons[ entry ] || {};
                for ( j=0; j<events.length; j++ ) {
                    event = events[j];
                    button.callbacks = button.callbacks || {};
                    button.callbacks[ event ] = button.callbacks[ event ] || [];
                    button.callbacks[ event ].push( callback );
                }
            }
        }
        return this;
    };

    /**
     * Remove a listener for a button or event.
     *
     * @param {Array|String} input - The input identification string.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The button events to remove the callbacks from.
     */
    Mouse.prototype.off = function( input, callback, events ) {
        var button,
            mouse,
            event,
            entry,
            i,
            j;
        if ( Util.checkFunctionArg( 'Keyboard.off', callback ) ) {
            return this;
        }
        input = normalizeInputArgs( 'Mouse.off', input );
        events = normalizeEventArgs( 'Mouse.off', events );
        for ( i=0; i<input.length; i++ ) {
            entry = input[i];
            if ( entry === "move" ) {
                mouse = this.mouse;
                if ( mouse.callbacks && mouse.callbacks.move ) {
                    mouse.callbacks.move.splice( mouse.callbacks.move.indexOf( callback ) );
                }
            } else {
                button = this.buttons[ entry ] = this.buttons[ entry ] || {};
                for ( j=0; j<events.length; j++ ) {
                    event = events[j];
                    if ( button.callbacks && button.callbacks[ event ] ) {
                        button.callbacks[ event ].splice( button.callbacks[ event ].indexOf( callback ) );
                    }
                }
            }
        }
        return this;
    };

    /**
     * Poll the states of the provided button identification strings.
     *
     * @param {Array|String} input - The input identification strings.
     *
     * @returns {Array} The state of the provided buttons.
     */
    Mouse.prototype.poll = function( input ) {
        var states = [],
            button,
            i;
        input = normalizeInputArgs( 'Mouse.poll', input );
        for ( i=0; i<input.length; i++ ) {
            button = this.buttons[ input[i] ];
            states.push( button ? button.state : 'up' );
        }
        if ( states.length === 1 ) {
            return states[0];
        }
        return states;
    };

    module.exports = Mouse;

}());
