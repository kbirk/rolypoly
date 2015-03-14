!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.rolypoly=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        Keyboard: require('./Keyboard'),
        Mouse: require('./Mouse')
        
    };

}());


},{"./Keyboard":4,"./Mouse":6}],2:[function(require,module,exports){
(function () {

    "use strict";

    function mod( num, n ) {
        return ( ( num % n ) + n ) % n;
    }

    function CircularArray( length ) {
        this.buffer = new Array( length );
        this.length = length;
        this.index = 0;
    }

    CircularArray.prototype.push = function( data ) {
        this.buffer[ this.index ] = data;
        this.index = (this.index + 1) % this.length;
    };

    CircularArray.prototype.back = function( offset ) {
        return this.buffer[ mod( this.index-1-offset, this.length ) ];
    };

    module.exports = CircularArray;

}());

},{}],3:[function(require,module,exports){
(function () {

    "use strict";

    var keys = require('./Keys');

    module.exports = {

        '8': keys.BACKSPACE,
        '9': keys.TAB,
        '13': keys.ENTER,
        '16': keys.SHIFT,
        '17': keys.CTRL,
        '18': keys.ALT,
        '19': keys.PAUSE_BREAK,
        '20': keys.CAPS_LOCK,
        '27': keys.ESC,
        '32': keys.SPACE_BAR,
        '33': keys.PAGE_UP,
        '34': keys.PAGE_DOWN,
        '35': keys.END,
        '36': keys.HOME,
        '37': keys.LEFT_ARROW,
        '38': keys.UP_ARROW,
        '39': keys.RIGHT_ARROW,
        '40': keys.DOWN_ARROW,
        '44': keys.PRINT_SCREEN,
        '45': keys.INSERT,
        '46': keys.DELETE,
        '48': '0',
        '49': '1',
        '50': '2',
        '51': '3',
        '52': '4',
        '53': '5',
        '54': '6',
        '55': '7',
        '56': '8',
        '57': '9',
        '65': 'a',
        '66': 'b',
        '67': 'c',
        '68': 'd',
        '69': 'e',
        '70': 'f',
        '71': 'g',
        '72': 'h',
        '73': 'i',
        '74': 'j',
        '75': 'k',
        '76': 'l',
        '77': 'm',
        '78': 'n',
        '79': 'o',
        '80': 'p',
        '81': 'q',
        '82': 'r',
        '83': 's',
        '84': 't',
        '85': 'u',
        '86': 'v',
        '87': 'w',
        '88': 'x',
        '89': 'y',
        '90': 'z',
        '91': keys.WINDOWS,
        '92': keys.WINDOWS,
        '93': keys.SELECT,
        '96': '0',
        '97': '1',
        '98': '2',
        '99': '3',
        '100': '4',
        '101': '5',
        '102': '6',
        '103': '7',
        '104': '8',
        '105': '9',
        '106': '*',
        '107': '+',
        '109': '-',
        '110': '.',
        '111': '/',
        '112': 'f1',
        '113': 'f2',
        '114': 'f3',
        '115': 'f4',
        '116': 'f5',
        '117': 'f6',
        '118': 'f7',
        '119': 'f8',
        '120': 'f9',
        '121': 'f10',
        '122': 'f11',
        '123': 'f12',
        '144': keys.NUM_LOCK,
        '145': keys.SCROLL_LOCK,
        '186': ':',
        '187': '=',
        '188': ',',
        '189': '-',
        '190': '.',
        '191': '/',
        '192': '`',
        '219': '[',
        '220': '\\',
        '221': ']',
        '222': '\''

    };

}());
},{"./Keys":5}],4:[function(require,module,exports){
(function () {

    "use strict";

    var Util = require('./Util'),
        Keys = require('./Keys'),
        KeyMap = require('./KeyMap'),
        ShiftMap = require('./ShiftMap'),
        CircularArray = require('./CircularArray'),
        SEQUENCE_TIMEOUT = 800;

    function normalizeInputArgs( functionName, input ) {
        var validInputs = [],
            i;
        if ( !( input instanceof Array ) ) {
            input = [ input ];
        }
        for ( i=0; i<input.length; i++ ) {
            if ( typeof input[i] !== 'string' ) {
                // input is not a recognized key
                console.log( "Argument 'input' to '"+functionName+"' is not of type 'string', argument removed." );
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
                console.log( "Argument 'events' to '"+functionName+"' does not match 'press' or 'release', argument removed." );
            } else {
                events[i] = Util.normalizeString( events[i] );
            }
        }
        return events;
    }

    /**
     * Parses a sequence key into the individual key ids.
     *
     * @param {String} sequenceKey - The sequence key.
     *
     * @returns {Array} The array of key ids.
     */
    function parseSequence( sequenceKey ) {
        return sequenceKey.length > 1 ? sequenceKey.split(' ') : [ sequenceKey ];
    }

    /**
     * Parses a combination key into the individual key ids.
     *
     * @param {String} comboKey - The combination key.
     *
     * @returns {Array} The array of key ids.
     */
    function parseCombination( comboKey ) {
        return comboKey.length > 1 ? comboKey.split('+') : [ comboKey ];
    }

    /**
     * Adds a new sequence key to the Keyboard object, and binds the callback
     * for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} sequenceKey - The sequence key to be added.
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addSequence( keyboard, sequenceKey, events, callback ) {
        var keyIds = parseSequence( sequenceKey ),
            keys = keyboard.keys,
            sequences = keyboard.sequences,
            sequence,
            event,
            keyId,
            i;
        // create sequence entry if it does not already exist
        sequences[ sequenceKey ] = sequences[ sequenceKey ] || {
            keys: keyIds,
            lastKey: keyIds[ keyIds.length - 1], // store the last key of the sequence
            callbacks: {}
        };
        sequence = sequences[ sequenceKey ];
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            sequence.callbacks[ event ] = sequence.callbacks[ event ] || [];
            sequence.callbacks[ event ].push( callback );
            // add the sequence key under each key for the event
            for ( i=0; i<keyIds.length; i++ ) {
                keyId = keyIds[i];
                keys[ keyId ] = keys[ keyId ] || {};
                keys[ keyId ].sequences = keys[ keyId ].sequences || {};
                keys[ keyId ].sequences[event] = keys[ keyId ].sequences[event] || [];
                if ( keys[ keyId ].sequences[event].indexOf( sequenceKey ) === -1 ) {
                    // don't add duplicates
                    keys[ keyId ].sequences[event].push( sequenceKey );
                }
            }
        }
    }

    /**
     * Removes the sequence key from the Keyboard object, and removes the callback
     * for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} sequenceKey - The sequence key to be removed.
     * @param {Array} events - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeSequence( keyboard, sequenceKey, events, callback ) {
        var keyIds = parseSequence( sequenceKey ),
            keys = keyboard.keys,
            sequences = keyboard.sequences,
            sequence = sequences[ sequenceKey ],
            callbacks,
            event,
            keyId,
            i;
        // exit early if entry doesnt even exist for sequence
        if ( !sequence ) {
            return;
        }
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            callbacks = sequence.callbacks;
            if ( callbacks && callbacks[ event ] ) {
                callbacks[ event ].splice( callbacks[ event ].indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( callbacks[ event ].length === 0 ) {
                    delete callbacks[ event ];
                }
            }
        }
        // if no more callbacks for the sequence, delete the sequence
        // and remove sequence from all keys
        if ( Util.isEmpty( sequence.callbacks ) ) {
            delete sequences[ sequenceKey ];
            for ( i=0; i<events.length; i++ ) {
                event = events[i];
                // if there are no more instances of the sequence, remove from keys
                for ( i=0; i<keyIds.length; i++ ) {
                    keyId = keyIds[i];
                    sequences = keys[ keyId ].sequences[ event ]; // re-assigning sequences
                    sequences.splice( sequences.indexOf( sequenceKey ), 1 );
                }
            }
        }
    }

    /**
     * Adds a new combination key to the Keyboard object, and binds
     * the callback for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} comboKey - The combination key to be added.
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addCombination( keyboard, comboKey, events, callback ) {
        var keyIds = parseCombination( comboKey ),
            keys = keyboard.keys,
            combos = keyboard.combos,
            combo,
            event,
            keyId,
            i;
        // create combination entry if it does not already exist
        combos[ comboKey ] = combos[ comboKey ] || {
            keys: keyIds,
            callbacks: {}
        };
        combo = combos[ comboKey ];
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            combo.callbacks[ event ] = combo.callbacks[ event ] || [];
            combo.callbacks[ event ].push( callback );
            // add the combination key under each key for the event
            for ( i=0; i<keyIds.length; i++ ) {
                keyId = keyIds[i];
                keys[ keyId ] = keys[ keyId ] || {};
                keys[ keyId ].combos = keys[ keyId ].combos || {};
                keys[ keyId ].combos[event] = keys[ keyId ].combos[event]  || [];
                keys[ keyId ].combos[event] .push( comboKey );
                if ( keys[ keyId ].combos[event] .indexOf( comboKey ) === -1 ) {
                    // don't add duplicates
                    keys[ keyId ].combos[event] .push( comboKey );
                }
            }
        }

    }

    /**
     * Removes the combination key from the Keyboard object, and removes the callback
     * for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} comboKey - The combination key to be removed.
     * @param {Array} events - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeCombination( keyboard, comboKey, events, callback ) {
        var keyIds = parseCombination( comboKey ),
            keys = keyboard.keys,
            combos = keyboard.combos,
            combo = combos[ comboKey ],
            callbacks,
            event,
            keyId,
            i;
        // exit early if entry doesnt even exist for combo
        if ( !combo ) {
            return;
        }
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            callbacks = combo.callbacks;
            if ( callbacks && callbacks[ event ] ) {
                callbacks[ event ].splice( callbacks[ event ].indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( callbacks[ event ].length === 0 ) {
                    delete callbacks[ event ];
                }
            }
        }
        // if no more callbacks for the combo, delete the combo
        // and remove combo from all keys
        if ( Util.isEmpty( combo.callbacks ) ) {
            delete combos[ comboKey ];
            // if there are no more instances of the combo, remove from keys
            for ( i=0; i<events.length; i++ ) {
                event = events[i];
                for ( i=0; i<keyIds.length; i++ ) {
                    keyId = keyIds[i];
                    combos = keys[ keyId ].combos[ event ]; // re-assigning combos
                    combos.splice( combos.indexOf( comboKey ), 1 );
                }
            }
        }
    }

    /**
     * Adds a callback to the Keyboard object for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} keyId - The key id.
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addKey( keyboard, keyId, events, callback ) {
        var keys = keyboard.keys,
            key = keys[ keyId ] = keys[ keyId ] || {},
            event,
            i;
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            key.callbacks = key.callbacks || {};
            key.callbacks[ event ] = key.callbacks[ event ] || [];
            key.callbacks[ event ].push( callback );
        }
    }

    /**
     * Removes a callback from the Keyboard object for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} keyId - The key id.
     * @param {Array} events - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeKey( keyboard, keyId, events, callback ) {
        var keys = keyboard.keys,
            key = keys[ keyId ],
            callbacks,
            event,
            i;
        // exit early if entry doesnt even exist for key
        if ( !key ) {
            return;
        }
        // bind callback under the provided events
        for ( i=0; i<events.length; i++ ) {
            event = events[i];
            callbacks = key.callbacks;
            if ( callbacks && callbacks[ event ] ) {
                callbacks[ event ].splice( callbacks[ event ].indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( callbacks[ event ].length === 0 ) {
                    delete callbacks[ event ];
                }
            }
        }
    }

    /**
     * Returns true if the all the keys in the combination are
     * of the required state.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} combo - The combination entry.
     * @param {String} eventType - The event type to check for.
     *
     * @returns {boolean} Whether or not the combination is satisfied.
     */
    function isComboSatisfied( keyboard, combo, eventType ) {
        var keys = keyboard.keys,
            keyIds = combo.keys,
            key,
            i;
        // for each key in the combo
        for ( i=0; i<keyIds.length; i++ ) {
            key = keys[ keyIds[i] ];
            // if the key does not have a state, the combo fails
            if ( !key ) {
                return false;
            }
            // a "release" combo can only be triggered if the keys had all
            // been down together at one point
            if ( eventType === "release" &&
                 ( !combo.pressed || key.state !== "up" ) ) {
                return false;
            }
            // a "press" combo only needs all keys to be down together
            if ( eventType === "press" && key.state !== "down" ) {
                return false;
            }
        }
        if ( eventType === "press" ) {
            // flag that all keys have been down
            combo.pressed = true;
        } else if ( eventType === "release" ) {
            // clear the flag
            delete combo.pressed;
        }
        return true;
    }

    /**
     * Check all combinations that are attached to the key. If any are
     * satisfied, execute the bound callback functions.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} key - The key for the current event.
     * @param {String} eventType - The event type to check for.
     * @param {KeyboardEvent} event - The KeyboardEvent object.
     */
    function checkCombos( keyboard, key, eventType, event ) {
        var combos = keyboard.combos,
            combo,
            i;
        if ( key.combos && key.combos[eventType] ) {
            // for every combo in the key
            for ( i=0; i<key.combos[eventType].length; i++ ) {
                combo = combos[ key.combos[eventType][i] ];
                if ( combo &&
                    isComboSatisfied( keyboard, combo, eventType ) ) {
                    // all keys in combo satisfy conditions, execute callbacks
                    Util.executeCallbacks( combo.callbacks, eventType, event );
                }
            }
        }
    }

    /**
     * Compares two timestamps, and returns true if they occur
     * within the timeout interval from eachother.
     *
     * @param {number} previousTimestamp - The previous timestmap.
     * @param {number} timestamp - The timestmap.
     *
     * @returns {boolean} Whether or not they are within the timeout interval.
     */
    function isWithinTimeout( previousTimestamp, timestamp ) {
        var delta;
        if ( !previousTimestamp ) {
            return true;
        }
        delta = previousTimestamp - timestamp;
        return delta < SEQUENCE_TIMEOUT;
    }

    /**
     * Returns true if the all the keys in the sequence have been
     * pressed or released (depending on the event type).
     *
     * @param {Array} history - The key event history array.
     * @param {Array} keyIds - The sequence key ids.
     *
     * @returns {boolean} Whether or not the sequence is satisfied.
     */
    function isSequenceSatisfied( history, keyIds ) {
        var previousTimestamp,
            sequenceKey,
            key,
            i, j;
        // debugCircular( history, keyIds.length+5 );
        // for each key in the combo
        for ( i=0, j=0; i<keyIds.length; i++, j++ ) {
            sequenceKey = keyIds[ keyIds.length-1-i ];
            key = history.back( j );
            // ignore shift keys
            while ( sequenceKey !== "shift" &&
                key &&
                key.keyId === "shift" ) {
                j++;
                key = history.back( j );
            }
            // see if it is the correct state
            if ( !key || // no key
                 key.keyId !== sequenceKey || // has not been pressed
                 !isWithinTimeout( previousTimestamp, key.timestamp ) ) {
                return false;
            }
            previousTimestamp = key.timestamp;
        }
        return true;
    }

    /**
     * Check all sequences that are attached to the key. If any are
     * satisfied, execute the bound callback functions.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} key - The key for the current event.
     * @param {String} keyId - The key id for the current event.
     * @param {String} eventType - The event type to check for.
     * @param {KeyboardEvent} event - The KeyboardEvent object.
     */
    function checkSequences( keyboard, key, keyId, eventType, event ) {
        var sequences = keyboard.sequences,
            sequence,
            history,
            i;
        if ( key.sequences && key.sequences[eventType] ) {
            if ( eventType === "press" ) {
                history = keyboard.pressHistory;
            } else {
                history = keyboard.releaseHistory;
            }
            // for every sequence in the key
            for ( i=0; i<key.sequences[eventType].length; i++ ) {
                sequence = sequences[ key.sequences[eventType][i] ];
                // only check sequence if this key is the LAST KEY
                if ( sequence.lastKey === keyId &&
                     isSequenceSatisfied( history, sequence.keys ) ) {
                    // all keys in sequence satisfy conditions, execute callbacks
                    Util.executeCallbacks( sequence.callbacks, eventType, event );
                }
            }
        }
    }

    /**
     * Translate a DOM keyboard event into the relevant
     * key identification string.
     *
     * @param {KeyboardEvent} event - The keyboard event.
     *
     * @returns {String} The key enumeration.
     */
    function getKeyboardKeyId( event ) {
        var charCode = event.charCode || event.keyCode;
        return KeyMap[ charCode ] || charCode;
    }

    /**
     * If the key id has a shift component, if the shift button
     * is down, return the shift key id.
     *
     * @param {Object} key - The key map object.
     * @param {String} keyId - The key id string.
     *
     * @returns {String} The shifted or original key id.
     */
    function shiftKeyId( keys, keyId ) {
        var shift = keys[ Keys.SHIFT ];
        if ( shift && shift.state === "down" ) {
            return ShiftMap[ keyId ] || keyId;
        }
        return keyId;
    }

    /**
     * Returns a function to handle a key press event by changing the state
     * to down and executing either the press or hold callbacks.
     *
     * @param {Object} keyboard - The Keyboard object.
     *
     * @returns {Function} The key press callback function.
     */
    function handleKeyboardKeyPress( keyboard ) {
        return function( event ) {
            var keyId = getKeyboardKeyId( event ),
                keys = keyboard.keys,
                key;
            keyId = shiftKeyId( keys, keyId );
            key = keys[ keyId ] = keys[ keyId ] || {};
            key.state = "down";
            keyboard.pressHistory.push({
                keyId: keyId,
                timestamp: Date.now()
            });
            Util.executeCallbacks( key.callbacks, "press", event );
            checkCombos( keyboard, key, "press", event );
            checkSequences( keyboard, key, keyId, "press", event );
        };
    }

    /**
     * Returns a function to handle a key release event by changing the
     * state and executing the relevant callbacks.
     *
     * @param {Object} keyboard - The Keyboard object.
     *
     * @returns {Function} The key release callback function.
     */
    function handleKeyboardKeyRelease( keyboard ) {
        return function( event ) {
            var keyId = getKeyboardKeyId( event ),
                keys = keyboard.keys,
                key;
            // check if we processed the keydown event, sometimes due
            // to focus issues ( windows key, printscreen key, etc )
            // we miss the 'keydown' event and only receive
            // the 'keyup'
            keyId = shiftKeyId( keys, keyId );
            key = keys[ keyId ];
            if ( key && key.state === "down" ) {
                key.state = "up";
                keyboard.releaseHistory.push({
                    keyId: keyId,
                    timestamp: Date.now()
                });
                Util.executeCallbacks( key.callbacks, "release", event );
                checkCombos( keyboard, key, "release", event );
                checkSequences( keyboard, key, keyId, "release", event );
            }
        };
    }

    function Keyboard() {
        this.keys = {};
        this.combos = {};
        this.sequences = {};
        this.pressHistory = new CircularArray( 64 );
        this.releaseHistory = new CircularArray( 64 );
        // generate and attach the key event handlers
        document.addEventListener( 'keydown', handleKeyboardKeyPress( this ) );
        document.addEventListener( 'keyup', handleKeyboardKeyRelease( this ) );
    }

    /**
     * Attach a listener for a key and set of events.
     *
     * @param {Array|String} input - The input identification strings.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The key events to bind the callbacks to.
     */
    Keyboard.prototype.on = function( input, callback, events ) {
        var entry,
            i;
        if ( Util.checkFunctionArg( 'Keyboard.on', callback ) ) {
            return this;
        }
        input = normalizeInputArgs( 'Keyboard.on', input );
        events = normalizeEventArgs( 'Keyboard.on', events );
        // for each input, determine type and store accordingly
        for ( i=0; i<input.length; i++ ) {
            entry = input[i];
            if ( parseSequence( entry ).length > 1 ) {
                addSequence( this, entry, events, callback );
            } else if ( parseCombination( entry ).length > 1 ) {
                addCombination( this, entry, events, callback );
            } else {
                addKey( this, entry, events, callback );
            }
        }
        return this;
    };

    /**
     * Remove a listener for a key or event.
     *
     * @param {Array|String} input - The input identification strings.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The key events to remove the callbacks from.
     */
    Keyboard.prototype.off = function( input, callback, events ) {
        var entry,
            i;
        if ( Util.checkFunctionArg( 'Keyboard.off', callback ) ) {
            return this;
        }
        input = normalizeInputArgs( 'Keyboard.off', input );
        events = normalizeEventArgs( 'Keyboard.off', events );
        // for each input, determine type and store accordingly
        for ( i=0; i<input.length; i++ ) {
            entry = input[i];
            if ( parseSequence( entry ).length > 1 ) {
                removeSequence( this, entry, events, callback );
            } else if ( parseCombination( entry ).length > 1 ) {
                removeCombination( this, entry, events, callback );
            } else {
                removeKey( this, entry, events, callback );
            }
        }
        return this;
    };

    /**
     * Poll the states of the provided key identification strings.
     *
     * @param {Array|String} input - The input identification strings.
     *
     * @returns {Array} The state of the provided keys.
     */
    Keyboard.prototype.poll = function( input ) {
        var states = [],
            key,
            i;
        input = normalizeInputArgs( 'Keyboard.poll', input );
        for ( i=0; i<input.length; i++ ) {
            key = this.keys[ input[i] ];
            states.push( key ? key.state : 'up' );
        }
        if ( states.length === 1 ) {
            return states[0];
        }
        return states;
    };

    module.exports = Keyboard;

}());

},{"./CircularArray":2,"./KeyMap":3,"./Keys":5,"./ShiftMap":7,"./Util":8}],5:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        BACKSPACE: 'backspace',
        TAB: 'tab',
        ENTER: 'enter',
        SHIFT: 'shift',
        CTRL: 'ctrl',
        ALT: 'alt',
        PAUSE_BREAK: 'pausebreak',
        CAPS_LOCK: 'capslock',
        ESC: 'esc',
        PAGE_UP: 'pageup',
        PAGE_DOWN: 'pagedown',
        END: 'end',
        HOME: 'home',
        LEFT_ARROW: 'left',
        UP_ARROW: 'up',
        RIGHT_ARROW: 'right',
        DOWN_ARROW: 'down',
        PRINT_SCREEN: 'printscreen',
        INSERT: 'insert',
        DELETE: 'delete',
        WINDOWS: 'windows',
        SELECT: 'select',
        SPACE_BAR: 'space',
        NUM_LOCK: 'numlock',
        SCROLL_LOCK: 'scrolllock',

    };

}());

},{}],6:[function(require,module,exports){
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

},{"./Util":8}],7:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',

        '{': '[',
        '}': ']',
        '|': '\\',
        ':': ';',
        '"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',

        '`': '~',
        '1': '!',
        '2': '@',
        '3': '#',
        '4': '$',
        '5': '%',
        '6': '^',
        '7': '&',
        '8': '*',
        '9': '(',
        '0': ')',
        '-': '_',
        '=': '+',

        '[': '{',
        ']': '}',
        '\\': '|',
        ';': ':',
        '': '"',
        ',': '<',
        '.': '>',
        '/': '?',

    };

}());

},{}],8:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        normalizeString: function( str ) {
            // convert to lowercase
            str = str.toLowerCase();
            // if string is longer than 1 character, underscores, and dashes
            str = ( str.length > 1 ) ? str.replace(/[_-]/g, "") : str;
            // set all whitespace to a single space character
            return str.replace(/[\s]/g, " ");
        },

        checkFunctionArg: function( functionName, func ) {
            if ( typeof func !== 'function' ) {
                console.log( "Argument 'callback' to '"+functionName+"' is not of type 'function', command ignored.");
                return true;
            }
            return false;
        },

        executeCallbacks: function( callbacks, eventName, event ) {
            var i;
            if ( !callbacks || !callbacks[ eventName ] ) {
                return;
            }
            callbacks = callbacks[ eventName ];
            for ( i=0; i<callbacks.length; i++ ) {
                callbacks[i]( event );
            }
        },

        /**
         * Returns whether or not the object has no attributes.
         *
         * @param {Object} obj - The object to test.
         *
         * @returns {boolean} true if the object has keys, false if not.
         */
        isEmpty: function( obj ) {
            for( var prop in obj ) {
                if( obj.hasOwnProperty( prop ) ) {
                    return false;
                }
            }
            return true;
        },

    };

}());

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBpLmpzIiwic3JjL0NpcmN1bGFyQXJyYXkuanMiLCJzcmMvS2V5TWFwLmpzIiwic3JjL0tleWJvYXJkLmpzIiwic3JjL0tleXMuanMiLCJzcmMvTW91c2UuanMiLCJzcmMvU2hpZnRNYXAuanMiLCJzcmMvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM29CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBLZXlib2FyZDogcmVxdWlyZSgnLi9LZXlib2FyZCcpLFxyXG4gICAgICAgIE1vdXNlOiByZXF1aXJlKCcuL01vdXNlJylcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG59KCkpO1xyXG5cclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBtb2QoIG51bSwgbiApIHtcclxuICAgICAgICByZXR1cm4gKCAoIG51bSAlIG4gKSArIG4gKSAlIG47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJBcnJheSggbGVuZ3RoICkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IEFycmF5KCBsZW5ndGggKTtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJbIHRoaXMuaW5kZXggXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgQ2lyY3VsYXJBcnJheS5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKCBvZmZzZXQgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyWyBtb2QoIHRoaXMuaW5kZXgtMS1vZmZzZXQsIHRoaXMubGVuZ3RoICkgXTtcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDaXJjdWxhckFycmF5O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIga2V5cyA9IHJlcXVpcmUoJy4vS2V5cycpO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAnOCc6IGtleXMuQkFDS1NQQUNFLFxyXG4gICAgICAgICc5Jzoga2V5cy5UQUIsXHJcbiAgICAgICAgJzEzJzoga2V5cy5FTlRFUixcclxuICAgICAgICAnMTYnOiBrZXlzLlNISUZULFxyXG4gICAgICAgICcxNyc6IGtleXMuQ1RSTCxcclxuICAgICAgICAnMTgnOiBrZXlzLkFMVCxcclxuICAgICAgICAnMTknOiBrZXlzLlBBVVNFX0JSRUFLLFxyXG4gICAgICAgICcyMCc6IGtleXMuQ0FQU19MT0NLLFxyXG4gICAgICAgICcyNyc6IGtleXMuRVNDLFxyXG4gICAgICAgICczMic6IGtleXMuU1BBQ0VfQkFSLFxyXG4gICAgICAgICczMyc6IGtleXMuUEFHRV9VUCxcclxuICAgICAgICAnMzQnOiBrZXlzLlBBR0VfRE9XTixcclxuICAgICAgICAnMzUnOiBrZXlzLkVORCxcclxuICAgICAgICAnMzYnOiBrZXlzLkhPTUUsXHJcbiAgICAgICAgJzM3Jzoga2V5cy5MRUZUX0FSUk9XLFxyXG4gICAgICAgICczOCc6IGtleXMuVVBfQVJST1csXHJcbiAgICAgICAgJzM5Jzoga2V5cy5SSUdIVF9BUlJPVyxcclxuICAgICAgICAnNDAnOiBrZXlzLkRPV05fQVJST1csXHJcbiAgICAgICAgJzQ0Jzoga2V5cy5QUklOVF9TQ1JFRU4sXHJcbiAgICAgICAgJzQ1Jzoga2V5cy5JTlNFUlQsXHJcbiAgICAgICAgJzQ2Jzoga2V5cy5ERUxFVEUsXHJcbiAgICAgICAgJzQ4JzogJzAnLFxyXG4gICAgICAgICc0OSc6ICcxJyxcclxuICAgICAgICAnNTAnOiAnMicsXHJcbiAgICAgICAgJzUxJzogJzMnLFxyXG4gICAgICAgICc1Mic6ICc0JyxcclxuICAgICAgICAnNTMnOiAnNScsXHJcbiAgICAgICAgJzU0JzogJzYnLFxyXG4gICAgICAgICc1NSc6ICc3JyxcclxuICAgICAgICAnNTYnOiAnOCcsXHJcbiAgICAgICAgJzU3JzogJzknLFxyXG4gICAgICAgICc2NSc6ICdhJyxcclxuICAgICAgICAnNjYnOiAnYicsXHJcbiAgICAgICAgJzY3JzogJ2MnLFxyXG4gICAgICAgICc2OCc6ICdkJyxcclxuICAgICAgICAnNjknOiAnZScsXHJcbiAgICAgICAgJzcwJzogJ2YnLFxyXG4gICAgICAgICc3MSc6ICdnJyxcclxuICAgICAgICAnNzInOiAnaCcsXHJcbiAgICAgICAgJzczJzogJ2knLFxyXG4gICAgICAgICc3NCc6ICdqJyxcclxuICAgICAgICAnNzUnOiAnaycsXHJcbiAgICAgICAgJzc2JzogJ2wnLFxyXG4gICAgICAgICc3Nyc6ICdtJyxcclxuICAgICAgICAnNzgnOiAnbicsXHJcbiAgICAgICAgJzc5JzogJ28nLFxyXG4gICAgICAgICc4MCc6ICdwJyxcclxuICAgICAgICAnODEnOiAncScsXHJcbiAgICAgICAgJzgyJzogJ3InLFxyXG4gICAgICAgICc4Myc6ICdzJyxcclxuICAgICAgICAnODQnOiAndCcsXHJcbiAgICAgICAgJzg1JzogJ3UnLFxyXG4gICAgICAgICc4Nic6ICd2JyxcclxuICAgICAgICAnODcnOiAndycsXHJcbiAgICAgICAgJzg4JzogJ3gnLFxyXG4gICAgICAgICc4OSc6ICd5JyxcclxuICAgICAgICAnOTAnOiAneicsXHJcbiAgICAgICAgJzkxJzoga2V5cy5XSU5ET1dTLFxyXG4gICAgICAgICc5Mic6IGtleXMuV0lORE9XUyxcclxuICAgICAgICAnOTMnOiBrZXlzLlNFTEVDVCxcclxuICAgICAgICAnOTYnOiAnMCcsXHJcbiAgICAgICAgJzk3JzogJzEnLFxyXG4gICAgICAgICc5OCc6ICcyJyxcclxuICAgICAgICAnOTknOiAnMycsXHJcbiAgICAgICAgJzEwMCc6ICc0JyxcclxuICAgICAgICAnMTAxJzogJzUnLFxyXG4gICAgICAgICcxMDInOiAnNicsXHJcbiAgICAgICAgJzEwMyc6ICc3JyxcclxuICAgICAgICAnMTA0JzogJzgnLFxyXG4gICAgICAgICcxMDUnOiAnOScsXHJcbiAgICAgICAgJzEwNic6ICcqJyxcclxuICAgICAgICAnMTA3JzogJysnLFxyXG4gICAgICAgICcxMDknOiAnLScsXHJcbiAgICAgICAgJzExMCc6ICcuJyxcclxuICAgICAgICAnMTExJzogJy8nLFxyXG4gICAgICAgICcxMTInOiAnZjEnLFxyXG4gICAgICAgICcxMTMnOiAnZjInLFxyXG4gICAgICAgICcxMTQnOiAnZjMnLFxyXG4gICAgICAgICcxMTUnOiAnZjQnLFxyXG4gICAgICAgICcxMTYnOiAnZjUnLFxyXG4gICAgICAgICcxMTcnOiAnZjYnLFxyXG4gICAgICAgICcxMTgnOiAnZjcnLFxyXG4gICAgICAgICcxMTknOiAnZjgnLFxyXG4gICAgICAgICcxMjAnOiAnZjknLFxyXG4gICAgICAgICcxMjEnOiAnZjEwJyxcclxuICAgICAgICAnMTIyJzogJ2YxMScsXHJcbiAgICAgICAgJzEyMyc6ICdmMTInLFxyXG4gICAgICAgICcxNDQnOiBrZXlzLk5VTV9MT0NLLFxyXG4gICAgICAgICcxNDUnOiBrZXlzLlNDUk9MTF9MT0NLLFxyXG4gICAgICAgICcxODYnOiAnOicsXHJcbiAgICAgICAgJzE4Nyc6ICc9JyxcclxuICAgICAgICAnMTg4JzogJywnLFxyXG4gICAgICAgICcxODknOiAnLScsXHJcbiAgICAgICAgJzE5MCc6ICcuJyxcclxuICAgICAgICAnMTkxJzogJy8nLFxyXG4gICAgICAgICcxOTInOiAnYCcsXHJcbiAgICAgICAgJzIxOSc6ICdbJyxcclxuICAgICAgICAnMjIwJzogJ1xcXFwnLFxyXG4gICAgICAgICcyMjEnOiAnXScsXHJcbiAgICAgICAgJzIyMic6ICdcXCcnXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpLFxyXG4gICAgICAgIEtleXMgPSByZXF1aXJlKCcuL0tleXMnKSxcclxuICAgICAgICBLZXlNYXAgPSByZXF1aXJlKCcuL0tleU1hcCcpLFxyXG4gICAgICAgIFNoaWZ0TWFwID0gcmVxdWlyZSgnLi9TaGlmdE1hcCcpLFxyXG4gICAgICAgIENpcmN1bGFyQXJyYXkgPSByZXF1aXJlKCcuL0NpcmN1bGFyQXJyYXknKSxcclxuICAgICAgICBTRVFVRU5DRV9USU1FT1VUID0gODAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUlucHV0QXJncyggZnVuY3Rpb25OYW1lLCBpbnB1dCApIHtcclxuICAgICAgICB2YXIgdmFsaWRJbnB1dHMgPSBbXSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoICEoIGlucHV0IGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBbIGlucHV0IF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgaW5wdXRbaV0gIT09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICAgICAgLy8gaW5wdXQgaXMgbm90IGEgcmVjb2duaXplZCBrZXlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdpbnB1dCcgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IG9mIHR5cGUgJ3N0cmluZycsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkSW5wdXRzLnB1c2goIFV0aWwubm9ybWFsaXplU3RyaW5nKCBpbnB1dFtpXSApICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkSW5wdXRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUV2ZW50QXJncyggZnVuY3Rpb25OYW1lLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgaWYgKCAhZXZlbnRzICkge1xyXG4gICAgICAgICAgICBldmVudHMgPSBbICdwcmVzcycgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhKCBldmVudHMgaW5zdGFuY2VvZiBBcnJheSApICkge1xyXG4gICAgICAgICAgICBldmVudHMgPSBbIGV2ZW50cyBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50c1tpXSAhPT0gJ3ByZXNzJyAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldICE9PSAncmVsZWFzZScgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBldmVudCBpcyBub3QgYSBzdHJpbmdcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdldmVudHMnIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGRvZXMgbm90IG1hdGNoICdwcmVzcycgb3IgJ3JlbGVhc2UnLCBhcmd1bWVudCByZW1vdmVkLlwiICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHNbaV0gPSBVdGlsLm5vcm1hbGl6ZVN0cmluZyggZXZlbnRzW2ldICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIHNlcXVlbmNlIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApIHtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VLZXkubGVuZ3RoID4gMSA/IHNlcXVlbmNlS2V5LnNwbGl0KCcgJykgOiBbIHNlcXVlbmNlS2V5IF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBjb21iaW5hdGlvbiBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJvS2V5Lmxlbmd0aCA+IDEgPyBjb21ib0tleS5zcGxpdCgnKycpIDogWyBjb21ib0tleSBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBzZXF1ZW5jZSBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCwgYW5kIGJpbmRzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleSB0byBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjcmVhdGUgc2VxdWVuY2UgZW50cnkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSB8fCB7XHJcbiAgICAgICAgICAgIGtleXM6IGtleUlkcyxcclxuICAgICAgICAgICAgbGFzdEtleToga2V5SWRzWyBrZXlJZHMubGVuZ3RoIC0gMV0sIC8vIHN0b3JlIHRoZSBsYXN0IGtleSBvZiB0aGUgc2VxdWVuY2VcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF07XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIHNlcXVlbmNlLmNhbGxiYWNrc1sgZXZlbnQgXSA9IHNlcXVlbmNlLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc2VxdWVuY2Uga2V5IHVuZGVyIGVhY2gga2V5IGZvciB0aGUgZXZlbnRcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlcyA9IGtleXNbIGtleUlkIF0uc2VxdWVuY2VzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbZXZlbnRdID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbZXZlbnRdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1tldmVudF0uaW5kZXhPZiggc2VxdWVuY2VLZXkgKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGR1cGxpY2F0ZXNcclxuICAgICAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1tldmVudF0ucHVzaCggc2VxdWVuY2VLZXkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcXVlbmNlIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QsIGFuZCByZW1vdmVzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleSB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIHNlcXVlbmNlXHJcbiAgICAgICAgaWYgKCAhc2VxdWVuY2UgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IHNlcXVlbmNlLmNhbGxiYWNrcztcclxuICAgICAgICAgICAgaWYgKCBjYWxsYmFja3MgJiYgY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja3NbIGV2ZW50IF0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50IF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBzZXF1ZW5jZSwgZGVsZXRlIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgc2VxdWVuY2UgZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBzZXF1ZW5jZS5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXTtcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBzZXF1ZW5jZSwgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXTsgLy8gcmUtYXNzaWduaW5nIHNlcXVlbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlcy5zcGxpY2UoIHNlcXVlbmNlcy5pbmRleE9mKCBzZXF1ZW5jZUtleSApLCAxICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNvbWJpbmF0aW9uIGtleSB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0LCBhbmQgYmluZHNcclxuICAgICAqIHRoZSBjYWxsYmFjayBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjb21iaW5hdGlvbiBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgY29tYm9zWyBjb21ib0tleSBdID0gY29tYm9zWyBjb21ib0tleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb21ibyA9IGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY29tYm8uY2FsbGJhY2tzWyBldmVudCBdID0gY29tYm8uY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjb21iby5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBjb21iaW5hdGlvbiBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gPSBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbZXZlbnRdIC5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gLmluZGV4T2YoIGNvbWJvS2V5ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbZXZlbnRdIC5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGNvbWJpbmF0aW9uIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QsIGFuZCByZW1vdmVzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleSB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ29tYmluYXRpb24oIGtleWJvYXJkLCBjb21ib0tleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGNvbWJvS2V5IF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIGNvbWJvXHJcbiAgICAgICAgaWYgKCAhY29tYm8gKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNvbWJvLmNhbGxiYWNrcztcclxuICAgICAgICAgICAgaWYgKCBjYWxsYmFja3MgJiYgY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja3NbIGV2ZW50IF0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50IF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBjb21ibywgZGVsZXRlIHRoZSBjb21ib1xyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgY29tYm8gZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBjb21iby5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBjb21ibywgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbWJvcyA9IGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdOyAvLyByZS1hc3NpZ25pbmcgY29tYm9zXHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zLnNwbGljZSggY29tYm9zLmluZGV4T2YoIGNvbWJvS2V5ICksIDEgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjYWxsYmFjayB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0IGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlJZCAtIFRoZSBrZXkgaWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZEtleSgga2V5Ym9hcmQsIGtleUlkLCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge30sXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBrZXkuY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAga2V5LmNhbGxiYWNrc1sgZXZlbnQgXSA9IGtleS5jYWxsYmFja3NbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgIGtleS5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgY2FsbGJhY2sgZnJvbSB0aGUgS2V5Ym9hcmQgb2JqZWN0IGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlJZCAtIFRoZSBrZXkgaWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVLZXkoIGtleWJvYXJkLCBrZXlJZCwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3Iga2V5XHJcbiAgICAgICAgaWYgKCAha2V5ICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrcyAmJiBjYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBjYWxsYmFja3NbIGV2ZW50IF0uaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrc1sgZXZlbnQgXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnQgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxsIHRoZSBrZXlzIGluIHRoZSBjb21iaW5hdGlvbiBhcmVcclxuICAgICAqIG9mIHRoZSByZXF1aXJlZCBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbWJvIC0gVGhlIGNvbWJpbmF0aW9uIGVudHJ5LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGNvbWJpbmF0aW9uIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXlJZHMgPSBjb21iby5rZXlzLFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2gga2V5IGluIHRoZSBjb21ib1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkc1tpXSBdO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUga2V5IGRvZXMgbm90IGhhdmUgYSBzdGF0ZSwgdGhlIGNvbWJvIGZhaWxzXHJcbiAgICAgICAgICAgIGlmICggIWtleSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhIFwicmVsZWFzZVwiIGNvbWJvIGNhbiBvbmx5IGJlIHRyaWdnZXJlZCBpZiB0aGUga2V5cyBoYWQgYWxsXHJcbiAgICAgICAgICAgIC8vIGJlZW4gZG93biB0b2dldGhlciBhdCBvbmUgcG9pbnRcclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicmVsZWFzZVwiICYmXHJcbiAgICAgICAgICAgICAgICAgKCAhY29tYm8ucHJlc3NlZCB8fCBrZXkuc3RhdGUgIT09IFwidXBcIiApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGEgXCJwcmVzc1wiIGNvbWJvIG9ubHkgbmVlZHMgYWxsIGtleXMgdG8gYmUgZG93biB0b2dldGhlclxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICYmIGtleS5zdGF0ZSAhPT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgLy8gZmxhZyB0aGF0IGFsbCBrZXlzIGhhdmUgYmVlbiBkb3duXHJcbiAgICAgICAgICAgIGNvbWJvLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIGV2ZW50VHlwZSA9PT0gXCJyZWxlYXNlXCIgKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBmbGFnXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb21iby5wcmVzc2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFsbCBjb21iaW5hdGlvbnMgdGhhdCBhcmUgYXR0YWNoZWQgdG8gdGhlIGtleS4gSWYgYW55IGFyZVxyXG4gICAgICogc2F0aXNmaWVkLCBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICB2YXIgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIGtleS5jb21ib3MgJiYga2V5LmNvbWJvc1tldmVudFR5cGVdICkge1xyXG4gICAgICAgICAgICAvLyBmb3IgZXZlcnkgY29tYm8gaW4gdGhlIGtleVxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5LmNvbWJvc1tldmVudFR5cGVdLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGtleS5jb21ib3NbZXZlbnRUeXBlXVtpXSBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjb21ibyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgZXZlbnRUeXBlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gY29tYm8gc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggY29tYm8uY2FsbGJhY2tzLCBldmVudFR5cGUsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlcyB0d28gdGltZXN0YW1wcywgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGV5IG9jY3VyXHJcbiAgICAgKiB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwgZnJvbSBlYWNob3RoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZpb3VzVGltZXN0YW1wIC0gVGhlIHByZXZpb3VzIHRpbWVzdG1hcC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXAgLSBUaGUgdGltZXN0bWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGV5IGFyZSB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzV2l0aGluVGltZW91dCggcHJldmlvdXNUaW1lc3RhbXAsIHRpbWVzdGFtcCApIHtcclxuICAgICAgICB2YXIgZGVsdGE7XHJcbiAgICAgICAgaWYgKCAhcHJldmlvdXNUaW1lc3RhbXAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWx0YSA9IHByZXZpb3VzVGltZXN0YW1wIC0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJldHVybiBkZWx0YSA8IFNFUVVFTkNFX1RJTUVPVVQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFsbCB0aGUga2V5cyBpbiB0aGUgc2VxdWVuY2UgaGF2ZSBiZWVuXHJcbiAgICAgKiBwcmVzc2VkIG9yIHJlbGVhc2VkIChkZXBlbmRpbmcgb24gdGhlIGV2ZW50IHR5cGUpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGhpc3RvcnkgLSBUaGUga2V5IGV2ZW50IGhpc3RvcnkgYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlJZHMgLSBUaGUgc2VxdWVuY2Uga2V5IGlkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHNlcXVlbmNlIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNTZXF1ZW5jZVNhdGlzZmllZCggaGlzdG9yeSwga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c1RpbWVzdGFtcCxcclxuICAgICAgICAgICAgc2VxdWVuY2VLZXksXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaSwgajtcclxuICAgICAgICAvLyBkZWJ1Z0NpcmN1bGFyKCBoaXN0b3J5LCBrZXlJZHMubGVuZ3RoKzUgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBrZXkgaW4gdGhlIGNvbWJvXHJcbiAgICAgICAgZm9yICggaT0wLCBqPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrLCBqKysgKSB7XHJcbiAgICAgICAgICAgIHNlcXVlbmNlS2V5ID0ga2V5SWRzWyBrZXlJZHMubGVuZ3RoLTEtaSBdO1xyXG4gICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHNoaWZ0IGtleXNcclxuICAgICAgICAgICAgd2hpbGUgKCBzZXF1ZW5jZUtleSAhPT0gXCJzaGlmdFwiICYmXHJcbiAgICAgICAgICAgICAgICBrZXkgJiZcclxuICAgICAgICAgICAgICAgIGtleS5rZXlJZCA9PT0gXCJzaGlmdFwiICkge1xyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICAgICAga2V5ID0gaGlzdG9yeS5iYWNrKCBqICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2VlIGlmIGl0IGlzIHRoZSBjb3JyZWN0IHN0YXRlXHJcbiAgICAgICAgICAgIGlmICggIWtleSB8fCAvLyBubyBrZXlcclxuICAgICAgICAgICAgICAgICBrZXkua2V5SWQgIT09IHNlcXVlbmNlS2V5IHx8IC8vIGhhcyBub3QgYmVlbiBwcmVzc2VkXHJcbiAgICAgICAgICAgICAgICAgIWlzV2l0aGluVGltZW91dCggcHJldmlvdXNUaW1lc3RhbXAsIGtleS50aW1lc3RhbXAgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91c1RpbWVzdGFtcCA9IGtleS50aW1lc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIHNlcXVlbmNlcyB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUga2V5LiBJZiBhbnkgYXJlXHJcbiAgICAgKiBzYXRpc2ZpZWQsIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleUlkIC0gVGhlIGtleSBpZCBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gY2hlY2sgZm9yLlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBLZXlib2FyZEV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlLFxyXG4gICAgICAgICAgICBoaXN0b3J5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICgga2V5LnNlcXVlbmNlcyAmJiBrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV0gKSB7XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucHJlc3NIaXN0b3J5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZvciBldmVyeSBzZXF1ZW5jZSBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV0ubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlc1sga2V5LnNlcXVlbmNlc1tldmVudFR5cGVdW2ldIF07XHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNoZWNrIHNlcXVlbmNlIGlmIHRoaXMga2V5IGlzIHRoZSBMQVNUIEtFWVxyXG4gICAgICAgICAgICAgICAgaWYgKCBzZXF1ZW5jZS5sYXN0S2V5ID09PSBrZXlJZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICBpc1NlcXVlbmNlU2F0aXNmaWVkKCBoaXN0b3J5LCBzZXF1ZW5jZS5rZXlzICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gc2VxdWVuY2Ugc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggc2VxdWVuY2UuY2FsbGJhY2tzLCBldmVudFR5cGUsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYSBET00ga2V5Ym9hcmQgZXZlbnQgaW50byB0aGUgcmVsZXZhbnRcclxuICAgICAqIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBrZXlib2FyZCBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUga2V5IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRLZXlib2FyZEtleUlkKCBldmVudCApIHtcclxuICAgICAgICB2YXIgY2hhckNvZGUgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIHJldHVybiBLZXlNYXBbIGNoYXJDb2RlIF0gfHwgY2hhckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUga2V5IGlkIGhhcyBhIHNoaWZ0IGNvbXBvbmVudCwgaWYgdGhlIHNoaWZ0IGJ1dHRvblxyXG4gICAgICogaXMgZG93biwgcmV0dXJuIHRoZSBzaGlmdCBrZXkgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgbWFwIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlJZCAtIFRoZSBrZXkgaWQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzaGlmdGVkIG9yIG9yaWdpbmFsIGtleSBpZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKSB7XHJcbiAgICAgICAgdmFyIHNoaWZ0ID0ga2V5c1sgS2V5cy5TSElGVCBdO1xyXG4gICAgICAgIGlmICggc2hpZnQgJiYgc2hpZnQuc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICByZXR1cm4gU2hpZnRNYXBbIGtleUlkIF0gfHwga2V5SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXlJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcHJlc3MgZXZlbnQgYnkgY2hhbmdpbmcgdGhlIHN0YXRlXHJcbiAgICAgKiB0byBkb3duIGFuZCBleGVjdXRpbmcgZWl0aGVyIHRoZSBwcmVzcyBvciBob2xkIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSBwcmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcygga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICBrZXlJZCA9IHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICk7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICBrZXkuc3RhdGUgPSBcImRvd25cIjtcclxuICAgICAgICAgICAga2V5Ym9hcmQucHJlc3NIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZyB0aGVcclxuICAgICAqIHN0YXRlIGFuZCBleGVjdXRpbmcgdGhlIHJlbGV2YW50IGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSByZWxlYXNlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIGtleWJvYXJkICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJZCA9IGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgICAgIGtleTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3Mga2V5LCBwcmludHNjcmVlbiBrZXksIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXTtcclxuICAgICAgICAgICAgaWYgKCBrZXkgJiYga2V5LnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIGtleS5zdGF0ZSA9IFwidXBcIjtcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkOiBrZXlJZCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBrZXkuY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEtleWJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29tYm9zID0ge307XHJcbiAgICAgICAgdGhpcy5zZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnByZXNzSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCA2NCApO1xyXG4gICAgICAgIHRoaXMucmVsZWFzZUhpc3RvcnkgPSBuZXcgQ2lyY3VsYXJBcnJheSggNjQgKTtcclxuICAgICAgICAvLyBnZW5lcmF0ZSBhbmQgYXR0YWNoIHRoZSBrZXkgZXZlbnQgaGFuZGxlcnNcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleWJvYXJkS2V5UHJlc3MoIHRoaXMgKSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsIGhhbmRsZUtleWJvYXJkS2V5UmVsZWFzZSggdGhpcyApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBsaXN0ZW5lciBmb3IgYSBrZXkgYW5kIHNldCBvZiBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUga2V5IGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgZW50cnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdLZXlib2FyZC5vbicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IG5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLm9uJywgaW5wdXQgKTtcclxuICAgICAgICBldmVudHMgPSBub3JtYWxpemVFdmVudEFyZ3MoICdLZXlib2FyZC5vbicsIGV2ZW50cyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggcGFyc2VTZXF1ZW5jZSggZW50cnkgKS5sZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICAgICAgYWRkU2VxdWVuY2UoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHBhcnNlQ29tYmluYXRpb24oIGVudHJ5ICkubGVuZ3RoID4gMSApIHtcclxuICAgICAgICAgICAgICAgIGFkZENvbWJpbmF0aW9uKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkS2V5KCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIGtleSBvciBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBrZXkgZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnS2V5Ym9hcmQub2ZmJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gbm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQub2ZmJywgaW5wdXQgKTtcclxuICAgICAgICBldmVudHMgPSBub3JtYWxpemVFdmVudEFyZ3MoICdLZXlib2FyZC5vZmYnLCBldmVudHMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIHBhcnNlU2VxdWVuY2UoIGVudHJ5ICkubGVuZ3RoID4gMSApIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVNlcXVlbmNlKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJzZUNvbWJpbmF0aW9uKCBlbnRyeSApLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDb21iaW5hdGlvbiggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUtleSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2xsIHRoZSBzdGF0ZXMgb2YgdGhlIHByb3ZpZGVkIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHN0YXRlIG9mIHRoZSBwcm92aWRlZCBrZXlzLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCBpbnB1dCApIHtcclxuICAgICAgICB2YXIgc3RhdGVzID0gW10sXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpbnB1dCA9IG5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLnBvbGwnLCBpbnB1dCApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAga2V5ID0gdGhpcy5rZXlzWyBpbnB1dFtpXSBdO1xyXG4gICAgICAgICAgICBzdGF0ZXMucHVzaCgga2V5ID8ga2V5LnN0YXRlIDogJ3VwJyApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0YXRlcy5sZW5ndGggPT09IDEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGF0ZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmQ7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBCQUNLU1BBQ0U6ICdiYWNrc3BhY2UnLFxyXG4gICAgICAgIFRBQjogJ3RhYicsXHJcbiAgICAgICAgRU5URVI6ICdlbnRlcicsXHJcbiAgICAgICAgU0hJRlQ6ICdzaGlmdCcsXHJcbiAgICAgICAgQ1RSTDogJ2N0cmwnLFxyXG4gICAgICAgIEFMVDogJ2FsdCcsXHJcbiAgICAgICAgUEFVU0VfQlJFQUs6ICdwYXVzZWJyZWFrJyxcclxuICAgICAgICBDQVBTX0xPQ0s6ICdjYXBzbG9jaycsXHJcbiAgICAgICAgRVNDOiAnZXNjJyxcclxuICAgICAgICBQQUdFX1VQOiAncGFnZXVwJyxcclxuICAgICAgICBQQUdFX0RPV046ICdwYWdlZG93bicsXHJcbiAgICAgICAgRU5EOiAnZW5kJyxcclxuICAgICAgICBIT01FOiAnaG9tZScsXHJcbiAgICAgICAgTEVGVF9BUlJPVzogJ2xlZnQnLFxyXG4gICAgICAgIFVQX0FSUk9XOiAndXAnLFxyXG4gICAgICAgIFJJR0hUX0FSUk9XOiAncmlnaHQnLFxyXG4gICAgICAgIERPV05fQVJST1c6ICdkb3duJyxcclxuICAgICAgICBQUklOVF9TQ1JFRU46ICdwcmludHNjcmVlbicsXHJcbiAgICAgICAgSU5TRVJUOiAnaW5zZXJ0JyxcclxuICAgICAgICBERUxFVEU6ICdkZWxldGUnLFxyXG4gICAgICAgIFdJTkRPV1M6ICd3aW5kb3dzJyxcclxuICAgICAgICBTRUxFQ1Q6ICdzZWxlY3QnLFxyXG4gICAgICAgIFNQQUNFX0JBUjogJ3NwYWNlJyxcclxuICAgICAgICBOVU1fTE9DSzogJ251bWxvY2snLFxyXG4gICAgICAgIFNDUk9MTF9MT0NLOiAnc2Nyb2xsbG9jaycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVJbnB1dEFyZ3MoIGZ1bmN0aW9uTmFtZSwgaW5wdXQgKSB7XHJcbiAgICAgICAgdmFyIHZhbGlkSW5wdXRzID0gW10sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCAhKCBpbnB1dCBpbnN0YW5jZW9mIEFycmF5ICkgKSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gWyBpbnB1dCBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5wdXRbaV0gIT09ICdsZWZ0JyAmJlxyXG4gICAgICAgICAgICAgICAgaW5wdXRbaV0gIT09ICdtaWRkbGUnICYmXHJcbiAgICAgICAgICAgICAgICBpbnB1dFtpXSAhPT0gJ3JpZ2h0JyAmJlxyXG4gICAgICAgICAgICAgICAgaW5wdXRbaV0gIT09ICdtb3ZlJyApIHtcclxuICAgICAgICAgICAgICAgIC8vIGlucHV0IGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ2lucHV0JyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBkb2VzIG5vdCBtYXRjaCAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnLCBvciAnbW92ZScsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkSW5wdXRzLnB1c2goIFV0aWwubm9ybWFsaXplU3RyaW5nKCBpbnB1dFtpXSApICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkSW5wdXRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUV2ZW50QXJncyggZnVuY3Rpb25OYW1lLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgaWYgKCAhZXZlbnRzICkge1xyXG4gICAgICAgICAgICBldmVudHMgPSBbICdwcmVzcycgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhKCBldmVudHMgaW5zdGFuY2VvZiBBcnJheSApICkge1xyXG4gICAgICAgICAgICBldmVudHMgPSBbIGV2ZW50cyBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50c1tpXSAhPT0gJ3ByZXNzJyAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldICE9PSAncmVsZWFzZScgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBldmVudCBpcyBub3QgYSBzdHJpbmdcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdldmVudHMnIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGRvZXMgbm90IG1hdGNoICdwcmVzcycsICdyZWxlYXNlJywgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldID0gVXRpbC5ub3JtYWxpemVTdHJpbmcoIGV2ZW50c1tpXSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYSBET00gbW91c2UgZXZlbnQgaW50byB0aGUgcmVsZXZhbnRcclxuICAgICAqIGJ1dHRvbiBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIFRoZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXZlbnQgZW51bWVyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICkge1xyXG4gICAgICAgIHN3aXRjaCAoIGV2ZW50LmJ1dHRvbiApIHtcclxuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFwibWlkZGxlXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgYnV0dG9uIHByZXNzIGV2ZW50IGJ5IHF1ZXVpbmcgdGhlXHJcbiAgICAgKiBldmVudCBhbmQgY2hhbmdpbmcgdGhlIGJ1dHRvbiBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b247XHJcbiAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGJ1dHRvbiBpbmZvIG9iamVjdCBleGlzdHNcclxuICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gfHwge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYnV0dG9uLnN0YXRlID0gXCJkb3duXCI7XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgYnV0dG9uIHJlbGVhc2UgZXZlbnQgYnkgcXVldWluZyB0aGVcclxuICAgICAqIGV2ZW50IGFuZCBjaGFuZ2luZyB0aGUgaW5wdXQgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSBidXR0b25zWyBidXR0b25JZCBdO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBwcm9jZXNzZWQgdGhlIGtleWRvd24gZXZlbnQsIHNvbWV0aW1lcyBkdWVcclxuICAgICAgICAgICAgLy8gdG8gZm9jdXMgaXNzdWVzICggd2luZG93cyBidXR0b24sIHByaW50c2NyZWVuIGJ1dHRvbiwgZXRjIClcclxuICAgICAgICAgICAgLy8gd2UgbWlzcyB0aGUgJ2tleWRvd24nIGV2ZW50IGFuZCBvbmx5IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gdGhlICdrZXl1cCdcclxuICAgICAgICAgICAgaWYgKCBidXR0b24gJiYgYnV0dG9uLnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uc3RhdGUgPSBcInVwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBtb3VzZSBtb3ZlbWVudCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vdXNlIC0gVGhlIG1vdXNlIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKCBtb3VzZSApIHtcclxuICAgICAgICB2YXIgbGFzdFBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnRzIHNvbWV0aW1lcyBmaXJlIHdoZW4gYSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZCwgYSBtb3VzZW1vdmVcclxuICAgICAgICAgICAgLy8gc2hvdWxkIG9ubHkgcXVldWUgYW4gZXZlbnQgaWYgdGhlIHBvc2l0aW9uIGhhcyBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIGlmICggbGFzdFBvc2l0aW9uICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID09PSBsYXN0UG9zaXRpb24ueCAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA9PT0gbGFzdFBvc2l0aW9uLnkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBsYXN0UG9zaXRpb24gKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2aW91c0NsaWVudFggPSBsYXN0UG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZpb3VzQ2xpZW50WSA9IGxhc3RQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggbW91c2UuY2FsbGJhY2tzLCBcIm1vdmVcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1vdXNlKCkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHt9O1xyXG4gICAgICAgIHRoaXMubW91c2UgPSB7fTtcclxuICAgICAgICAvLyBnZW5lcmF0ZSBhbmQgYXR0YWNoIHRoZSBidXR0b24gZXZlbnQgaGFuZGxlcnNcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgaGFuZGxlTW91c2VCdXR0b25QcmVzcyggdGhpcy5idXR0b25zICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIGhhbmRsZU1vdXNlQnV0dG9uUmVsZWFzZSggdGhpcy5idXR0b25zICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKCB0aGlzLm1vdXNlICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIGJ1dHRvbiBhbmQgc2V0IG9mIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gYmluZCB0aGUgY2FsbGJhY2tzIHRvLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbixcclxuICAgICAgICAgICAgbW91c2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBlbnRyeSxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgajtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gbm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2Uub24nLCBpbnB1dCApO1xyXG4gICAgICAgIGV2ZW50cyA9IG5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9uJywgZXZlbnRzICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIGVudHJ5ID09PSBcIm1vdmVcIiApIHtcclxuICAgICAgICAgICAgICAgIG1vdXNlID0gdGhpcy5tb3VzZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcyA9IG1vdXNlLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcy5tb3ZlID0gbW91c2UuY2FsbGJhY2tzLm1vdmUgfHwgW107XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBlbnRyeSBdID0gdGhpcy5idXR0b25zWyBlbnRyeSBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICggaj0wOyBqPGV2ZW50cy5sZW5ndGg7IGorKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzID0gYnV0dG9uLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdID0gYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgYnV0dG9uIG9yIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUgYnV0dG9uIGV2ZW50cyB0byByZW1vdmUgdGhlIGNhbGxiYWNrcyBmcm9tLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBidXR0b24sXHJcbiAgICAgICAgICAgIG1vdXNlLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGo7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdLZXlib2FyZC5vZmYnLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBub3JtYWxpemVJbnB1dEFyZ3MoICdNb3VzZS5vZmYnLCBpbnB1dCApO1xyXG4gICAgICAgIGV2ZW50cyA9IG5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9mZicsIGV2ZW50cyApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBlbnRyeSA9PT0gXCJtb3ZlXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IHRoaXMubW91c2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG1vdXNlLmNhbGxiYWNrcyAmJiBtb3VzZS5jYWxsYmFja3MubW92ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5zcGxpY2UoIG1vdXNlLmNhbGxiYWNrcy5tb3ZlLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGo9MDsgajxldmVudHMubGVuZ3RoOyBqKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBidXR0b24uY2FsbGJhY2tzICYmIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBzdGF0ZSBvZiB0aGUgcHJvdmlkZWQgYnV0dG9ucy5cclxuICAgICAqL1xyXG4gICAgTW91c2UucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IFtdLFxyXG4gICAgICAgICAgICBidXR0b24sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaW5wdXQgPSBub3JtYWxpemVJbnB1dEFyZ3MoICdNb3VzZS5wb2xsJywgaW5wdXQgKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgaW5wdXRbaV0gXTtcclxuICAgICAgICAgICAgc3RhdGVzLnB1c2goIGJ1dHRvbiA/IGJ1dHRvbi5zdGF0ZSA6ICd1cCcgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBzdGF0ZXMubGVuZ3RoID09PSAxICkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdGVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNlO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJ34nOiAnYCcsXHJcbiAgICAgICAgJyEnOiAnMScsXHJcbiAgICAgICAgJ0AnOiAnMicsXHJcbiAgICAgICAgJyMnOiAnMycsXHJcbiAgICAgICAgJyQnOiAnNCcsXHJcbiAgICAgICAgJyUnOiAnNScsXHJcbiAgICAgICAgJ14nOiAnNicsXHJcbiAgICAgICAgJyYnOiAnNycsXHJcbiAgICAgICAgJyonOiAnOCcsXHJcbiAgICAgICAgJygnOiAnOScsXHJcbiAgICAgICAgJyknOiAnMCcsXHJcbiAgICAgICAgJ18nOiAnLScsXHJcbiAgICAgICAgJysnOiAnPScsXHJcblxyXG4gICAgICAgICd7JzogJ1snLFxyXG4gICAgICAgICd9JzogJ10nLFxyXG4gICAgICAgICd8JzogJ1xcXFwnLFxyXG4gICAgICAgICc6JzogJzsnLFxyXG4gICAgICAgICdcIic6ICdcXCcnLFxyXG4gICAgICAgICc8JzogJywnLFxyXG4gICAgICAgICc+JzogJy4nLFxyXG4gICAgICAgICc/JzogJy8nLFxyXG5cclxuICAgICAgICAnYCc6ICd+JyxcclxuICAgICAgICAnMSc6ICchJyxcclxuICAgICAgICAnMic6ICdAJyxcclxuICAgICAgICAnMyc6ICcjJyxcclxuICAgICAgICAnNCc6ICckJyxcclxuICAgICAgICAnNSc6ICclJyxcclxuICAgICAgICAnNic6ICdeJyxcclxuICAgICAgICAnNyc6ICcmJyxcclxuICAgICAgICAnOCc6ICcqJyxcclxuICAgICAgICAnOSc6ICcoJyxcclxuICAgICAgICAnMCc6ICcpJyxcclxuICAgICAgICAnLSc6ICdfJyxcclxuICAgICAgICAnPSc6ICcrJyxcclxuXHJcbiAgICAgICAgJ1snOiAneycsXHJcbiAgICAgICAgJ10nOiAnfScsXHJcbiAgICAgICAgJ1xcXFwnOiAnfCcsXHJcbiAgICAgICAgJzsnOiAnOicsXHJcbiAgICAgICAgJyc6ICdcIicsXHJcbiAgICAgICAgJywnOiAnPCcsXHJcbiAgICAgICAgJy4nOiAnPicsXHJcbiAgICAgICAgJy8nOiAnPycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIG5vcm1hbGl6ZVN0cmluZzogZnVuY3Rpb24oIHN0ciApIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIC8vIGlmIHN0cmluZyBpcyBsb25nZXIgdGhhbiAxIGNoYXJhY3RlciwgdW5kZXJzY29yZXMsIGFuZCBkYXNoZXNcclxuICAgICAgICAgICAgc3RyID0gKCBzdHIubGVuZ3RoID4gMSApID8gc3RyLnJlcGxhY2UoL1tfLV0vZywgXCJcIikgOiBzdHI7XHJcbiAgICAgICAgICAgIC8vIHNldCBhbGwgd2hpdGVzcGFjZSB0byBhIHNpbmdsZSBzcGFjZSBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxzXS9nLCBcIiBcIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hlY2tGdW5jdGlvbkFyZzogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgZnVuYyApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdjYWxsYmFjaycgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IG9mIHR5cGUgJ2Z1bmN0aW9uJywgY29tbWFuZCBpZ25vcmVkLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBleGVjdXRlQ2FsbGJhY2tzOiBmdW5jdGlvbiggY2FsbGJhY2tzLCBldmVudE5hbWUsIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgaWYgKCAhY2FsbGJhY2tzIHx8ICFjYWxsYmFja3NbIGV2ZW50TmFtZSBdICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrc1sgZXZlbnROYW1lIF07XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxjYWxsYmFja3MubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0oIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBvYmplY3QgaGFzIG5vIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byB0ZXN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBoYXMga2V5cywgZmFsc2UgaWYgbm90LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIGZvciggdmFyIHByb3AgaW4gb2JqICkge1xyXG4gICAgICAgICAgICAgICAgaWYoIG9iai5oYXNPd25Qcm9wZXJ0eSggcHJvcCApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iXX0=
