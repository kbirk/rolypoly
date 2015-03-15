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

    var Util = require('./Util');

    /**
     * A simple circular array that is allocated to a fixed size.
     * When elements are pushed beyond its allocated length, they
     * will instead overwrite exsting indices.
     *
     * @param {number} length - The length of the array.
     */
    function CircularArray( length ) {
        this.buffer = new Array( length );
        this.length = length;
        this.index = 0;
    }

    /**
     * Push an element to the current index of the array.
     *
     * @param {*} data - The data to insert into the array.
     */
    CircularArray.prototype.push = function( data ) {
        this.buffer[ this.index ] = data;
        this.index = (this.index + 1) % this.length;
    };

    /**
     * Return the most recently pushed element. An index offset may
     * be provided.
     *
     * @param {number} offset - An offset from the current index. Optional.
     */
    CircularArray.prototype.back = function( offset ) {
        offset = offset ? offset : 0;
        return this.buffer[ Util.mod( this.index-1-offset, this.length ) ];
    };

    module.exports = CircularArray;

}());

},{"./Util":8}],3:[function(require,module,exports){
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
        SEQUENCE_TIMEOUT = 800,
        KEY_HISTORY_BUFFER_LENGTH = 64;

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
     * Adds a new sequence key to the Keyboard object and binds the callback
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
     * Removes the sequence key from the Keyboard object and removes the callback
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
     * Adds a new combination key to the Keyboard object and binds
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
     * Removes the combination key from the Keyboard object and removes the callback
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
     * is down, return the shift key id. Otherwise return the original
     * key id.
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
     * Returns a function to handle a key press event by changing
     * the key state and executing bound callbacks.
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
     * Returns a function to handle a key release event by changing
     * the key state and executing bound callbacks.
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
        this.pressHistory = new CircularArray( KEY_HISTORY_BUFFER_LENGTH );
        this.releaseHistory = new CircularArray( KEY_HISTORY_BUFFER_LENGTH );
        // generate and attach the key event handlers
        document.addEventListener( 'keydown', handleKeyboardKeyPress( this ) );
        document.addEventListener( 'keyup', handleKeyboardKeyRelease( this ) );
    }

    /**
     * Attach a listener for a set of input and events.
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
        input = Util.normalizeInputArgs( 'Keyboard.on', input );
        events = Util.normalizeEventArgs( 'Keyboard.on', events );
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
     * Remove a listener for a set of input and events.
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
        input = Util.normalizeInputArgs( 'Keyboard.off', input );
        events = Util.normalizeEventArgs( 'Keyboard.off', events );
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
     * @param {Array|String} keys - The key identification strings.
     *
     * @returns {Array} The state of the provided keys.
     */
    Keyboard.prototype.poll = function( keys ) {
        var states = [],
            key,
            i;
            keys = Util.normalizeInputArgs( 'Keyboard.poll', keys );
        for ( i=0; i<keys.length; i++ ) {
            key = this.keys[ keys[i] ];
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
            button.state = "down";
            Util.executeCallbacks( button.callbacks, "press", event );
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
     * Attach a listener for a set of input and events.
     *
     * @param {Array|String} input - The input identification string.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The button events to bind the callbacks to. Optional.
     */
    Mouse.prototype.on = function( input, callback, events ) {
        var button,
            mouse,
            event,
            entry,
            i,
            j;
        if ( Util.checkFunctionArg( 'Mouse.on', callback ) ) {
            return this;
        }
        input = Util.normalizeInputArgs( 'Mouse.on',
            input, [ 'left','middle','right','move' ] );
        events = Util.normalizeEventArgs( 'Mouse.on', events );
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
     * Remove a listener for a set of input and events.
     *
     * @param {Array|String} input - The input identification string.
     * @param {Function} callback - The callback function.
     * @param {Array|String} events - The button events to remove the callbacks from. Optional.
     */
    Mouse.prototype.off = function( input, callback, events ) {
        var button,
            mouse,
            event,
            entry,
            i,
            j;
        if ( Util.checkFunctionArg( 'Mouse.off', callback ) ) {
            return this;
        }
        input = Util.normalizeInputArgs( 'Mouse.off',
            input, [ 'left','middle','right','move' ] );
        events = Util.normalizeEventArgs( 'Mouse.off', events );
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
     * @param {Array|String} buttons - The button identification strings.
     *
     * @returns {Array} The state of the provided buttons.
     */
    Mouse.prototype.poll = function( buttons ) {
        var states = [],
            button,
            i;
        buttons = Util.normalizeInputArgs( 'Mouse.poll',
            buttons, [ 'left','middle','right','move' ] );
        for ( i=0; i<buttons.length; i++ ) {
            button = this.buttons[ buttons[i] ];
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

        /**
         * Given a string, converts it to lowercase and replaces all
         * sequential whitespace into a single space.
         *
         * @param {String} str - The string to normalize.
         *
         * @returns {String} The normalized string.
         */
        normalizeString: function( str ) {
            // convert to lowercase
            str = str.toLowerCase();
            // set all whitespace to a single space character
            return str.replace(/[\s]/g, " ");
        },

        /**
         * Checks that a function argument is indeed a function. If it is
         * not, log to the console and return true. Otherwise return false.
         *
         * @param {String} functionName - The name of the calling function.
         * @param {Function} func - The function to check.
         *
         * @returns {boolean} True if the function is invalid.
         */
        checkFunctionArg: function( functionName, func ) {
            if ( typeof func !== 'function' ) {
                console.log( "Argument 'callback' to '"+functionName+"' is not of type 'function', command ignored.");
                return true;
            }
            return false;
        },

        /**
         * Checks and normalizes the 'input' argument.
         *
         * @param {String} functionName - The name of the calling function.
         * @param {String|Array} input - The input argument.
         * @param {Array} validInput - The recognized input. Optional.
         *
         * @returns {Array} The array of normalized input.
         */
        normalizeInputArgs: function( functionName, input, validInput ) {
            var normalizedInputs = [],
                i;
            if ( !( input instanceof Array ) ) {
                input = [ input ];
            }
            for ( i=0; i<input.length; i++ ) {
                if ( typeof input[i] !== 'string' ) {
                    // input is not a string
                    console.log( "Argument '"+input[i]+"' to '"+functionName+"' is not of type 'string', argument removed." );
                    continue;
                }
                if ( validInput ) {
                    if ( validInput.indexOf( input[i] ) === -1 ) {
                        // input is not recognized
                        console.log( "Argument '"+input[i]+"' to '"+functionName+"' is not a recognized input type, argument removed." );
                        continue;
                    }
                }
                normalizedInputs.push( this.normalizeString( input[i] ) );
            }
            return normalizedInputs;
        },

        /** Checks and normalizes the 'events' argument.
         *
         * @param {String} functionName - The name of the calling function.
         * @param {String|Array} events - The events argument.
         *
         * @returns {Array} The array of normalized input.
         */
        normalizeEventArgs: function( functionName, events ) {
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
                    // event is not recognized
                    console.log( "Argument '"+events[i]+"' to '"+functionName+"' is not a recognized event type, argument removed." );
                } else {
                    events[i] = this.normalizeString( events[i] );
                }
            }
            return events;
        },

        /**
         * Execute the functions in the callbacks object that match the
         * provided event type.
         *
         * @param {Object} callbacks - The callbacks object.
         * @param {String} eventType - The event type string.
         * @param {Event} event - The native event object.
         */
        executeCallbacks: function( callbacks, eventType, event ) {
            var i;
            if ( !callbacks || !callbacks[ eventType ] ) {
                return;
            }
            callbacks = callbacks[ eventType ];
            for ( i=0; i<callbacks.length; i++ ) {
                callbacks[i]( event );
            }
        },

        /**
         * Modulos function that supports negative numbers.
         *
         * @param {number} num - The number to modulo.
         * @param {number} n - The modulos.
         *
         * @returns {number} The resulting number.
         */
        mod: function( num, n ) {
            return ( ( num % n ) + n ) % n;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBpLmpzIiwic3JjL0NpcmN1bGFyQXJyYXkuanMiLCJzcmMvS2V5TWFwLmpzIiwic3JjL0tleWJvYXJkLmpzIiwic3JjL0tleXMuanMiLCJzcmMvTW91c2UuanMiLCJzcmMvU2hpZnRNYXAuanMiLCJzcmMvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIEtleWJvYXJkOiByZXF1aXJlKCcuL0tleWJvYXJkJyksXHJcbiAgICAgICAgTW91c2U6IHJlcXVpcmUoJy4vTW91c2UnKVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcblxyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNpbXBsZSBjaXJjdWxhciBhcnJheSB0aGF0IGlzIGFsbG9jYXRlZCB0byBhIGZpeGVkIHNpemUuXHJcbiAgICAgKiBXaGVuIGVsZW1lbnRzIGFyZSBwdXNoZWQgYmV5b25kIGl0cyBhbGxvY2F0ZWQgbGVuZ3RoLCB0aGV5XHJcbiAgICAgKiB3aWxsIGluc3RlYWQgb3ZlcndyaXRlIGV4c3RpbmcgaW5kaWNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIENpcmN1bGFyQXJyYXkoIGxlbmd0aCApIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheSggbGVuZ3RoICk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoIGFuIGVsZW1lbnQgdG8gdGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSAtIFRoZSBkYXRhIHRvIGluc2VydCBpbnRvIHRoZSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgQ2lyY3VsYXJBcnJheS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyWyB0aGlzLmluZGV4IF0gPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAodGhpcy5pbmRleCArIDEpICUgdGhpcy5sZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBtb3N0IHJlY2VudGx5IHB1c2hlZCBlbGVtZW50LiBBbiBpbmRleCBvZmZzZXQgbWF5XHJcbiAgICAgKiBiZSBwcm92aWRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gQW4gb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgaW5kZXguIE9wdGlvbmFsLlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24oIG9mZnNldCApIHtcclxuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgPyBvZmZzZXQgOiAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclsgVXRpbC5tb2QoIHRoaXMuaW5kZXgtMS1vZmZzZXQsIHRoaXMubGVuZ3RoICkgXTtcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDaXJjdWxhckFycmF5O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIga2V5cyA9IHJlcXVpcmUoJy4vS2V5cycpO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAnOCc6IGtleXMuQkFDS1NQQUNFLFxyXG4gICAgICAgICc5Jzoga2V5cy5UQUIsXHJcbiAgICAgICAgJzEzJzoga2V5cy5FTlRFUixcclxuICAgICAgICAnMTYnOiBrZXlzLlNISUZULFxyXG4gICAgICAgICcxNyc6IGtleXMuQ1RSTCxcclxuICAgICAgICAnMTgnOiBrZXlzLkFMVCxcclxuICAgICAgICAnMTknOiBrZXlzLlBBVVNFX0JSRUFLLFxyXG4gICAgICAgICcyMCc6IGtleXMuQ0FQU19MT0NLLFxyXG4gICAgICAgICcyNyc6IGtleXMuRVNDLFxyXG4gICAgICAgICczMic6IGtleXMuU1BBQ0VfQkFSLFxyXG4gICAgICAgICczMyc6IGtleXMuUEFHRV9VUCxcclxuICAgICAgICAnMzQnOiBrZXlzLlBBR0VfRE9XTixcclxuICAgICAgICAnMzUnOiBrZXlzLkVORCxcclxuICAgICAgICAnMzYnOiBrZXlzLkhPTUUsXHJcbiAgICAgICAgJzM3Jzoga2V5cy5MRUZUX0FSUk9XLFxyXG4gICAgICAgICczOCc6IGtleXMuVVBfQVJST1csXHJcbiAgICAgICAgJzM5Jzoga2V5cy5SSUdIVF9BUlJPVyxcclxuICAgICAgICAnNDAnOiBrZXlzLkRPV05fQVJST1csXHJcbiAgICAgICAgJzQ0Jzoga2V5cy5QUklOVF9TQ1JFRU4sXHJcbiAgICAgICAgJzQ1Jzoga2V5cy5JTlNFUlQsXHJcbiAgICAgICAgJzQ2Jzoga2V5cy5ERUxFVEUsXHJcbiAgICAgICAgJzQ4JzogJzAnLFxyXG4gICAgICAgICc0OSc6ICcxJyxcclxuICAgICAgICAnNTAnOiAnMicsXHJcbiAgICAgICAgJzUxJzogJzMnLFxyXG4gICAgICAgICc1Mic6ICc0JyxcclxuICAgICAgICAnNTMnOiAnNScsXHJcbiAgICAgICAgJzU0JzogJzYnLFxyXG4gICAgICAgICc1NSc6ICc3JyxcclxuICAgICAgICAnNTYnOiAnOCcsXHJcbiAgICAgICAgJzU3JzogJzknLFxyXG4gICAgICAgICc2NSc6ICdhJyxcclxuICAgICAgICAnNjYnOiAnYicsXHJcbiAgICAgICAgJzY3JzogJ2MnLFxyXG4gICAgICAgICc2OCc6ICdkJyxcclxuICAgICAgICAnNjknOiAnZScsXHJcbiAgICAgICAgJzcwJzogJ2YnLFxyXG4gICAgICAgICc3MSc6ICdnJyxcclxuICAgICAgICAnNzInOiAnaCcsXHJcbiAgICAgICAgJzczJzogJ2knLFxyXG4gICAgICAgICc3NCc6ICdqJyxcclxuICAgICAgICAnNzUnOiAnaycsXHJcbiAgICAgICAgJzc2JzogJ2wnLFxyXG4gICAgICAgICc3Nyc6ICdtJyxcclxuICAgICAgICAnNzgnOiAnbicsXHJcbiAgICAgICAgJzc5JzogJ28nLFxyXG4gICAgICAgICc4MCc6ICdwJyxcclxuICAgICAgICAnODEnOiAncScsXHJcbiAgICAgICAgJzgyJzogJ3InLFxyXG4gICAgICAgICc4Myc6ICdzJyxcclxuICAgICAgICAnODQnOiAndCcsXHJcbiAgICAgICAgJzg1JzogJ3UnLFxyXG4gICAgICAgICc4Nic6ICd2JyxcclxuICAgICAgICAnODcnOiAndycsXHJcbiAgICAgICAgJzg4JzogJ3gnLFxyXG4gICAgICAgICc4OSc6ICd5JyxcclxuICAgICAgICAnOTAnOiAneicsXHJcbiAgICAgICAgJzkxJzoga2V5cy5XSU5ET1dTLFxyXG4gICAgICAgICc5Mic6IGtleXMuV0lORE9XUyxcclxuICAgICAgICAnOTMnOiBrZXlzLlNFTEVDVCxcclxuICAgICAgICAnOTYnOiAnMCcsXHJcbiAgICAgICAgJzk3JzogJzEnLFxyXG4gICAgICAgICc5OCc6ICcyJyxcclxuICAgICAgICAnOTknOiAnMycsXHJcbiAgICAgICAgJzEwMCc6ICc0JyxcclxuICAgICAgICAnMTAxJzogJzUnLFxyXG4gICAgICAgICcxMDInOiAnNicsXHJcbiAgICAgICAgJzEwMyc6ICc3JyxcclxuICAgICAgICAnMTA0JzogJzgnLFxyXG4gICAgICAgICcxMDUnOiAnOScsXHJcbiAgICAgICAgJzEwNic6ICcqJyxcclxuICAgICAgICAnMTA3JzogJysnLFxyXG4gICAgICAgICcxMDknOiAnLScsXHJcbiAgICAgICAgJzExMCc6ICcuJyxcclxuICAgICAgICAnMTExJzogJy8nLFxyXG4gICAgICAgICcxMTInOiAnZjEnLFxyXG4gICAgICAgICcxMTMnOiAnZjInLFxyXG4gICAgICAgICcxMTQnOiAnZjMnLFxyXG4gICAgICAgICcxMTUnOiAnZjQnLFxyXG4gICAgICAgICcxMTYnOiAnZjUnLFxyXG4gICAgICAgICcxMTcnOiAnZjYnLFxyXG4gICAgICAgICcxMTgnOiAnZjcnLFxyXG4gICAgICAgICcxMTknOiAnZjgnLFxyXG4gICAgICAgICcxMjAnOiAnZjknLFxyXG4gICAgICAgICcxMjEnOiAnZjEwJyxcclxuICAgICAgICAnMTIyJzogJ2YxMScsXHJcbiAgICAgICAgJzEyMyc6ICdmMTInLFxyXG4gICAgICAgICcxNDQnOiBrZXlzLk5VTV9MT0NLLFxyXG4gICAgICAgICcxNDUnOiBrZXlzLlNDUk9MTF9MT0NLLFxyXG4gICAgICAgICcxODYnOiAnOicsXHJcbiAgICAgICAgJzE4Nyc6ICc9JyxcclxuICAgICAgICAnMTg4JzogJywnLFxyXG4gICAgICAgICcxODknOiAnLScsXHJcbiAgICAgICAgJzE5MCc6ICcuJyxcclxuICAgICAgICAnMTkxJzogJy8nLFxyXG4gICAgICAgICcxOTInOiAnYCcsXHJcbiAgICAgICAgJzIxOSc6ICdbJyxcclxuICAgICAgICAnMjIwJzogJ1xcXFwnLFxyXG4gICAgICAgICcyMjEnOiAnXScsXHJcbiAgICAgICAgJzIyMic6ICdcXCcnXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpLFxyXG4gICAgICAgIEtleXMgPSByZXF1aXJlKCcuL0tleXMnKSxcclxuICAgICAgICBLZXlNYXAgPSByZXF1aXJlKCcuL0tleU1hcCcpLFxyXG4gICAgICAgIFNoaWZ0TWFwID0gcmVxdWlyZSgnLi9TaGlmdE1hcCcpLFxyXG4gICAgICAgIENpcmN1bGFyQXJyYXkgPSByZXF1aXJlKCcuL0NpcmN1bGFyQXJyYXknKSxcclxuICAgICAgICBTRVFVRU5DRV9USU1FT1VUID0gODAwLFxyXG4gICAgICAgIEtFWV9ISVNUT1JZX0JVRkZFUl9MRU5HVEggPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIHNlcXVlbmNlIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApIHtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VLZXkubGVuZ3RoID4gMSA/IHNlcXVlbmNlS2V5LnNwbGl0KCcgJykgOiBbIHNlcXVlbmNlS2V5IF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBjb21iaW5hdGlvbiBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJvS2V5Lmxlbmd0aCA+IDEgPyBjb21ib0tleS5zcGxpdCgnKycpIDogWyBjb21ib0tleSBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBzZXF1ZW5jZSBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgYmluZHMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRTZXF1ZW5jZSgga2V5Ym9hcmQsIHNlcXVlbmNlS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXF1ZW5jZSBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBsYXN0S2V5OiBrZXlJZHNbIGtleUlkcy5sZW5ndGggLSAxXSwgLy8gc3RvcmUgdGhlIGxhc3Qga2V5IG9mIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXTtcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdID0gc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBzZXF1ZW5jZS5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzZXF1ZW5jZSBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXMgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1tldmVudF0gPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1tldmVudF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzW2V2ZW50XS5pbmRleE9mKCBzZXF1ZW5jZUtleSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzW2V2ZW50XS5wdXNoKCBzZXF1ZW5jZUtleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc2VxdWVuY2Uga2V5IGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmcm9tLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlcXVlbmNlKCBrZXlib2FyZCwgc2VxdWVuY2VLZXksIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdLFxyXG4gICAgICAgICAgICBjYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBzZXF1ZW5jZVxyXG4gICAgICAgIGlmICggIXNlcXVlbmNlICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBzZXF1ZW5jZS5jYWxsYmFja3M7XHJcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2tzICYmIGNhbGxiYWNrc1sgZXZlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnQgXS5zcGxpY2UoIGNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2tzWyBldmVudCBdLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciB0aGUgc2VxdWVuY2UsIGRlbGV0ZSB0aGUgc2VxdWVuY2VcclxuICAgICAgICAvLyBhbmQgcmVtb3ZlIHNlcXVlbmNlIGZyb20gYWxsIGtleXNcclxuICAgICAgICBpZiAoIFV0aWwuaXNFbXB0eSggc2VxdWVuY2UuY2FsbGJhY2tzICkgKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF07XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGluc3RhbmNlcyBvZiB0aGUgc2VxdWVuY2UsIHJlbW92ZSBmcm9tIGtleXNcclxuICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF07IC8vIHJlLWFzc2lnbmluZyBzZXF1ZW5jZXNcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMuc3BsaWNlKCBzZXF1ZW5jZXMuaW5kZXhPZiggc2VxdWVuY2VLZXkgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjb21iaW5hdGlvbiBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgYmluZHNcclxuICAgICAqIHRoZSBjYWxsYmFjayBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjb21iaW5hdGlvbiBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgY29tYm9zWyBjb21ib0tleSBdID0gY29tYm9zWyBjb21ib0tleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb21ibyA9IGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY29tYm8uY2FsbGJhY2tzWyBldmVudCBdID0gY29tYm8uY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjb21iby5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBjb21iaW5hdGlvbiBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gPSBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbZXZlbnRdIC5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXlzWyBrZXlJZCBdLmNvbWJvc1tldmVudF0gLmluZGV4T2YoIGNvbWJvS2V5ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbZXZlbnRdIC5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGNvbWJpbmF0aW9uIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sgY29tYm9LZXkgXSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3IgY29tYm9cclxuICAgICAgICBpZiAoICFjb21ibyApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gY29tYm8uY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrcyAmJiBjYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBjYWxsYmFja3NbIGV2ZW50IF0uaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrc1sgZXZlbnQgXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnQgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgdGhlIGNvbWJvLCBkZWxldGUgdGhlIGNvbWJvXHJcbiAgICAgICAgLy8gYW5kIHJlbW92ZSBjb21ibyBmcm9tIGFsbCBrZXlzXHJcbiAgICAgICAgaWYgKCBVdGlsLmlzRW1wdHkoIGNvbWJvLmNhbGxiYWNrcyApICkge1xyXG4gICAgICAgICAgICBkZWxldGUgY29tYm9zWyBjb21ib0tleSBdO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBpbnN0YW5jZXMgb2YgdGhlIGNvbWJvLCByZW1vdmUgZnJvbSBrZXlzXHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF07IC8vIHJlLWFzc2lnbmluZyBjb21ib3NcclxuICAgICAgICAgICAgICAgICAgICBjb21ib3Muc3BsaWNlKCBjb21ib3MuaW5kZXhPZiggY29tYm9LZXkgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNhbGxiYWNrIHRvIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkS2V5KCBrZXlib2FyZCwga2V5SWQsIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGtleS5jYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICBrZXkuY2FsbGJhY2tzWyBldmVudCBdID0ga2V5LmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAga2V5LmNhbGxiYWNrc1sgZXZlbnQgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBjYWxsYmFjayBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmcm9tLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUtleSgga2V5Ym9hcmQsIGtleUlkLCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBrZXlcclxuICAgICAgICBpZiAoICFrZXkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGtleS5jYWxsYmFja3M7XHJcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2tzICYmIGNhbGxiYWNrc1sgZXZlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnQgXS5zcGxpY2UoIGNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2tzWyBldmVudCBdLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbGwgdGhlIGtleXMgaW4gdGhlIGNvbWJpbmF0aW9uIGFyZVxyXG4gICAgICogb2YgdGhlIHJlcXVpcmVkIHN0YXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tYm8gLSBUaGUgY29tYmluYXRpb24gZW50cnkuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gY2hlY2sgZm9yLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgY29tYmluYXRpb24gaXMgc2F0aXNmaWVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIGV2ZW50VHlwZSApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleUlkcyA9IGNvbWJvLmtleXMsXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBrZXkgaW4gdGhlIGNvbWJvXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWRzW2ldIF07XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBrZXkgZG9lcyBub3QgaGF2ZSBhIHN0YXRlLCB0aGUgY29tYm8gZmFpbHNcclxuICAgICAgICAgICAgaWYgKCAha2V5ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGEgXCJyZWxlYXNlXCIgY29tYm8gY2FuIG9ubHkgYmUgdHJpZ2dlcmVkIGlmIHRoZSBrZXlzIGhhZCBhbGxcclxuICAgICAgICAgICAgLy8gYmVlbiBkb3duIHRvZ2V0aGVyIGF0IG9uZSBwb2ludFxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJyZWxlYXNlXCIgJiZcclxuICAgICAgICAgICAgICAgICAoICFjb21iby5wcmVzc2VkIHx8IGtleS5zdGF0ZSAhPT0gXCJ1cFwiICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYSBcInByZXNzXCIgY29tYm8gb25seSBuZWVkcyBhbGwga2V5cyB0byBiZSBkb3duIHRvZ2V0aGVyXHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgJiYga2V5LnN0YXRlICE9PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICkge1xyXG4gICAgICAgICAgICAvLyBmbGFnIHRoYXQgYWxsIGtleXMgaGF2ZSBiZWVuIGRvd25cclxuICAgICAgICAgICAgY29tYm8ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICggZXZlbnRUeXBlID09PSBcInJlbGVhc2VcIiApIHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGZsYWdcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvLnByZXNzZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIGNvbWJpbmF0aW9ucyB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUga2V5LiBJZiBhbnkgYXJlXHJcbiAgICAgKiBzYXRpc2ZpZWQsIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmRFdmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBjb21ib3MgPSBrZXlib2FyZC5jb21ib3MsXHJcbiAgICAgICAgICAgIGNvbWJvLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICgga2V5LmNvbWJvcyAmJiBrZXkuY29tYm9zW2V2ZW50VHlwZV0gKSB7XHJcbiAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuY29tYm9zW2V2ZW50VHlwZV0ubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sga2V5LmNvbWJvc1tldmVudFR5cGVdW2ldIF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbWJvICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBldmVudFR5cGUgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBjb21ibyBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBjb21iby5jYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIHR3byB0aW1lc3RhbXBzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZXkgb2NjdXJcclxuICAgICAqIHdpdGhpbiB0aGUgdGltZW91dCBpbnRlcnZhbCBmcm9tIGVhY2hvdGhlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJldmlvdXNUaW1lc3RhbXAgLSBUaGUgcHJldmlvdXMgdGltZXN0bWFwLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcCAtIFRoZSB0aW1lc3RtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIHdpdGhpbiB0aGUgdGltZW91dCBpbnRlcnZhbC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNXaXRoaW5UaW1lb3V0KCBwcmV2aW91c1RpbWVzdGFtcCwgdGltZXN0YW1wICkge1xyXG4gICAgICAgIHZhciBkZWx0YTtcclxuICAgICAgICBpZiAoICFwcmV2aW91c1RpbWVzdGFtcCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbHRhID0gcHJldmlvdXNUaW1lc3RhbXAgLSB0aW1lc3RhbXA7XHJcbiAgICAgICAgcmV0dXJuIGRlbHRhIDwgU0VRVUVOQ0VfVElNRU9VVDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxsIHRoZSBrZXlzIGluIHRoZSBzZXF1ZW5jZSBoYXZlIGJlZW5cclxuICAgICAqIHByZXNzZWQgb3IgcmVsZWFzZWQgKGRlcGVuZGluZyBvbiB0aGUgZXZlbnQgdHlwZSkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gaGlzdG9yeSAtIFRoZSBrZXkgZXZlbnQgaGlzdG9yeSBhcnJheS5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUlkcyAtIFRoZSBzZXF1ZW5jZSBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc2VxdWVuY2UgaXMgc2F0aXNmaWVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1NlcXVlbmNlU2F0aXNmaWVkKCBoaXN0b3J5LCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzVGltZXN0YW1wLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZUtleSxcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpLCBqO1xyXG4gICAgICAgIC8vIGRlYnVnQ2lyY3VsYXIoIGhpc3RvcnksIGtleUlkcy5sZW5ndGgrNSApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGtleSBpbiB0aGUgY29tYm9cclxuICAgICAgICBmb3IgKCBpPTAsIGo9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKyssIGorKyApIHtcclxuICAgICAgICAgICAgc2VxdWVuY2VLZXkgPSBrZXlJZHNbIGtleUlkcy5sZW5ndGgtMS1pIF07XHJcbiAgICAgICAgICAgIGtleSA9IGhpc3RvcnkuYmFjayggaiApO1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgc2hpZnQga2V5c1xyXG4gICAgICAgICAgICB3aGlsZSAoIHNlcXVlbmNlS2V5ICE9PSBcInNoaWZ0XCIgJiZcclxuICAgICAgICAgICAgICAgIGtleSAmJlxyXG4gICAgICAgICAgICAgICAga2V5LmtleUlkID09PSBcInNoaWZ0XCIgKSB7XHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZWUgaWYgaXQgaXMgdGhlIGNvcnJlY3Qgc3RhdGVcclxuICAgICAgICAgICAgaWYgKCAha2V5IHx8IC8vIG5vIGtleVxyXG4gICAgICAgICAgICAgICAgIGtleS5rZXlJZCAhPT0gc2VxdWVuY2VLZXkgfHwgLy8gaGFzIG5vdCBiZWVuIHByZXNzZWRcclxuICAgICAgICAgICAgICAgICAhaXNXaXRoaW5UaW1lb3V0KCBwcmV2aW91c1RpbWVzdGFtcCwga2V5LnRpbWVzdGFtcCApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzVGltZXN0YW1wID0ga2V5LnRpbWVzdGFtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbGwgc2VxdWVuY2VzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIHRoZSBrZXkuIElmIGFueSBhcmVcclxuICAgICAqIHNhdGlzZmllZCwgZXhlY3V0ZSB0aGUgYm91bmQgY2FsbGJhY2sgZnVuY3Rpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5SWQgLSBUaGUga2V5IGlkIGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UsXHJcbiAgICAgICAgICAgIGhpc3RvcnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBrZXkuc2VxdWVuY2VzICYmIGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXSApIHtcclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBrZXlib2FyZC5wcmVzc0hpc3Rvcnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucmVsZWFzZUhpc3Rvcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IHNlcXVlbmNlIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV1baV0gXTtcclxuICAgICAgICAgICAgICAgIC8vIG9ubHkgY2hlY2sgc2VxdWVuY2UgaWYgdGhpcyBrZXkgaXMgdGhlIExBU1QgS0VZXHJcbiAgICAgICAgICAgICAgICBpZiAoIHNlcXVlbmNlLmxhc3RLZXkgPT09IGtleUlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIGlzU2VxdWVuY2VTYXRpc2ZpZWQoIGhpc3RvcnksIHNlcXVlbmNlLmtleXMgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBzZXF1ZW5jZSBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBzZXF1ZW5jZS5jYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBhIERPTSBrZXlib2FyZCBldmVudCBpbnRvIHRoZSByZWxldmFudFxyXG4gICAgICoga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIGtleWJvYXJkIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBrZXkgZW51bWVyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBjaGFyQ29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgcmV0dXJuIEtleU1hcFsgY2hhckNvZGUgXSB8fCBjaGFyQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSBrZXkgaWQgaGFzIGEgc2hpZnQgY29tcG9uZW50LCBpZiB0aGUgc2hpZnQgYnV0dG9uXHJcbiAgICAgKiBpcyBkb3duLCByZXR1cm4gdGhlIHNoaWZ0IGtleSBpZC4gT3RoZXJ3aXNlIHJldHVybiB0aGUgb3JpZ2luYWxcclxuICAgICAqIGtleSBpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBtYXAgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleUlkIC0gVGhlIGtleSBpZCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHNoaWZ0ZWQgb3Igb3JpZ2luYWwga2V5IGlkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzaGlmdEtleUlkKCBrZXlzLCBrZXlJZCApIHtcclxuICAgICAgICB2YXIgc2hpZnQgPSBrZXlzWyBLZXlzLlNISUZUIF07XHJcbiAgICAgICAgaWYgKCBzaGlmdCAmJiBzaGlmdC5zdGF0ZSA9PT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTaGlmdE1hcFsga2V5SWQgXSB8fCBrZXlJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSBwcmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcygga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICBrZXlJZCA9IHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICk7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICBrZXkuc3RhdGUgPSBcImRvd25cIjtcclxuICAgICAgICAgICAga2V5Ym9hcmQucHJlc3NIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSByZWxlYXNlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIGtleWJvYXJkICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJZCA9IGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgICAgIGtleTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3Mga2V5LCBwcmludHNjcmVlbiBrZXksIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXTtcclxuICAgICAgICAgICAgaWYgKCBrZXkgJiYga2V5LnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIGtleS5zdGF0ZSA9IFwidXBcIjtcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkOiBrZXlJZCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBrZXkuY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEtleWJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29tYm9zID0ge307XHJcbiAgICAgICAgdGhpcy5zZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnByZXNzSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUga2V5IGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZEtleVByZXNzKCB0aGlzICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIHRoaXMgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUga2V5IGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgZW50cnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdLZXlib2FyZC5vbicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQub24nLCBpbnB1dCApO1xyXG4gICAgICAgIGV2ZW50cyA9IFV0aWwubm9ybWFsaXplRXZlbnRBcmdzKCAnS2V5Ym9hcmQub24nLCBldmVudHMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIHBhcnNlU2VxdWVuY2UoIGVudHJ5ICkubGVuZ3RoID4gMSApIHtcclxuICAgICAgICAgICAgICAgIGFkZFNlcXVlbmNlKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJzZUNvbWJpbmF0aW9uKCBlbnRyeSApLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRDb21iaW5hdGlvbiggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZEtleSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBrZXkgZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnS2V5Ym9hcmQub2ZmJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdLZXlib2FyZC5vZmYnLCBpbnB1dCApO1xyXG4gICAgICAgIGV2ZW50cyA9IFV0aWwubm9ybWFsaXplRXZlbnRBcmdzKCAnS2V5Ym9hcmQub2ZmJywgZXZlbnRzICk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2ggaW5wdXQsIGRldGVybWluZSB0eXBlIGFuZCBzdG9yZSBhY2NvcmRpbmdseVxyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBwYXJzZVNlcXVlbmNlKCBlbnRyeSApLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVTZXF1ZW5jZSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggcGFyc2VDb21iaW5hdGlvbiggZW50cnkgKS5sZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ29tYmluYXRpb24oIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVLZXkoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30ga2V5cyAtIFRoZSBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBzdGF0ZSBvZiB0aGUgcHJvdmlkZWQga2V5cy5cclxuICAgICAqL1xyXG4gICAgS2V5Ym9hcmQucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbigga2V5cyApIHtcclxuICAgICAgICB2YXIgc3RhdGVzID0gW10sXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAgICAga2V5cyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQucG9sbCcsIGtleXMgKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAga2V5ID0gdGhpcy5rZXlzWyBrZXlzW2ldIF07XHJcbiAgICAgICAgICAgIHN0YXRlcy5wdXNoKCBrZXkgPyBrZXkuc3RhdGUgOiAndXAnICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggc3RhdGVzLmxlbmd0aCA9PT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIEJBQ0tTUEFDRTogJ2JhY2tzcGFjZScsXHJcbiAgICAgICAgVEFCOiAndGFiJyxcclxuICAgICAgICBFTlRFUjogJ2VudGVyJyxcclxuICAgICAgICBTSElGVDogJ3NoaWZ0JyxcclxuICAgICAgICBDVFJMOiAnY3RybCcsXHJcbiAgICAgICAgQUxUOiAnYWx0JyxcclxuICAgICAgICBQQVVTRV9CUkVBSzogJ3BhdXNlYnJlYWsnLFxyXG4gICAgICAgIENBUFNfTE9DSzogJ2NhcHNsb2NrJyxcclxuICAgICAgICBFU0M6ICdlc2MnLFxyXG4gICAgICAgIFBBR0VfVVA6ICdwYWdldXAnLFxyXG4gICAgICAgIFBBR0VfRE9XTjogJ3BhZ2Vkb3duJyxcclxuICAgICAgICBFTkQ6ICdlbmQnLFxyXG4gICAgICAgIEhPTUU6ICdob21lJyxcclxuICAgICAgICBMRUZUX0FSUk9XOiAnbGVmdCcsXHJcbiAgICAgICAgVVBfQVJST1c6ICd1cCcsXHJcbiAgICAgICAgUklHSFRfQVJST1c6ICdyaWdodCcsXHJcbiAgICAgICAgRE9XTl9BUlJPVzogJ2Rvd24nLFxyXG4gICAgICAgIFBSSU5UX1NDUkVFTjogJ3ByaW50c2NyZWVuJyxcclxuICAgICAgICBJTlNFUlQ6ICdpbnNlcnQnLFxyXG4gICAgICAgIERFTEVURTogJ2RlbGV0ZScsXHJcbiAgICAgICAgV0lORE9XUzogJ3dpbmRvd3MnLFxyXG4gICAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXHJcbiAgICAgICAgU1BBQ0VfQkFSOiAnc3BhY2UnLFxyXG4gICAgICAgIE5VTV9MT0NLOiAnbnVtbG9jaycsXHJcbiAgICAgICAgU0NST0xMX0xPQ0s6ICdzY3JvbGxsb2NrJyxcclxuXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgRE9NIG1vdXNlIGV2ZW50IGludG8gdGhlIHJlbGV2YW50XHJcbiAgICAgKiBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBUaGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIGV2ZW50IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApIHtcclxuICAgICAgICBzd2l0Y2ggKCBldmVudC5idXR0b24gKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBcIm1pZGRsZVwiO1xyXG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGJ1dHRvbiBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGJ1dHRvbiBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b247XHJcbiAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGJ1dHRvbiBpbmZvIG9iamVjdCBleGlzdHNcclxuICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gfHwge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYnV0dG9uLnN0YXRlID0gXCJkb3duXCI7XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgYnV0dG9uIHJlbGVhc2UgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBpbnB1dCBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblJlbGVhc2UoIGJ1dHRvbnMgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbklkID0gZ2V0TW91c2VCdXR0b25JZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IGJ1dHRvbnNbIGJ1dHRvbklkIF07XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIHByb2Nlc3NlZCB0aGUga2V5ZG93biBldmVudCwgc29tZXRpbWVzIGR1ZVxyXG4gICAgICAgICAgICAvLyB0byBmb2N1cyBpc3N1ZXMgKCB3aW5kb3dzIGJ1dHRvbiwgcHJpbnRzY3JlZW4gYnV0dG9uLCBldGMgKVxyXG4gICAgICAgICAgICAvLyB3ZSBtaXNzIHRoZSAna2V5ZG93bicgZXZlbnQgYW5kIG9ubHkgcmVjZWl2ZVxyXG4gICAgICAgICAgICAvLyB0aGUgJ2tleXVwJ1xyXG4gICAgICAgICAgICBpZiAoIGJ1dHRvbiAmJiBidXR0b24uc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBidXR0b24uY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdGF0ZSA9IFwidXBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIG1vdXNlIG1vdmVtZW50IGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbW91c2UgLSBUaGUgbW91c2UgaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoIG1vdXNlICkge1xyXG4gICAgICAgIHZhciBsYXN0UG9zaXRpb24gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIC8vIG1vdXNlbW92ZSBldmVudHMgc29tZXRpbWVzIGZpcmUgd2hlbiBhIG1vdXNlIGJ1dHRvbiBpcyBwcmVzc2VkLCBhIG1vdXNlbW92ZVxyXG4gICAgICAgICAgICAvLyBzaG91bGQgb25seSBxdWV1ZSBhbiBldmVudCBpZiB0aGUgcG9zaXRpb24gaGFzIGFjdHVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgaWYgKCBsYXN0UG9zaXRpb24gJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFggPT09IGxhc3RQb3NpdGlvbi54ICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRZID09PSBsYXN0UG9zaXRpb24ueSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIGxhc3RQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZpb3VzQ2xpZW50WCA9IGxhc3RQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmlvdXNDbGllbnRZID0gbGFzdFBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBtb3VzZS5jYWxsYmFja3MsIFwibW92ZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICBsYXN0UG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gTW91c2UoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0ge307XHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IHt9O1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGJ1dHRvbiBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCB0aGlzLmJ1dHRvbnMgKSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCB0aGlzLmJ1dHRvbnMgKSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUoIHRoaXMubW91c2UgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBidXR0b24gZXZlbnRzIHRvIGJpbmQgdGhlIGNhbGxiYWNrcyB0by4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgYnV0dG9uLFxyXG4gICAgICAgICAgICBtb3VzZSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGVudHJ5LFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBqO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnTW91c2Uub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ01vdXNlLm9uJyxcclxuICAgICAgICAgICAgaW5wdXQsIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnIF0gKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9uJywgZXZlbnRzICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIGVudHJ5ID09PSBcIm1vdmVcIiApIHtcclxuICAgICAgICAgICAgICAgIG1vdXNlID0gdGhpcy5tb3VzZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcyA9IG1vdXNlLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcy5tb3ZlID0gbW91c2UuY2FsbGJhY2tzLm1vdmUgfHwgW107XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBlbnRyeSBdID0gdGhpcy5idXR0b25zWyBlbnRyeSBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICggaj0wOyBqPGV2ZW50cy5sZW5ndGg7IGorKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzID0gYnV0dG9uLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdID0gYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBidXR0b24gZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uIE9wdGlvbmFsLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBidXR0b24sXHJcbiAgICAgICAgICAgIG1vdXNlLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGo7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdNb3VzZS5vZmYnLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ01vdXNlLm9mZicsXHJcbiAgICAgICAgICAgIGlucHV0LCBbICdsZWZ0JywnbWlkZGxlJywncmlnaHQnLCdtb3ZlJyBdICk7XHJcbiAgICAgICAgZXZlbnRzID0gVXRpbC5ub3JtYWxpemVFdmVudEFyZ3MoICdNb3VzZS5vZmYnLCBldmVudHMgKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggZW50cnkgPT09IFwibW92ZVwiICkge1xyXG4gICAgICAgICAgICAgICAgbW91c2UgPSB0aGlzLm1vdXNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBtb3VzZS5jYWxsYmFja3MgJiYgbW91c2UuY2FsbGJhY2tzLm1vdmUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzLm1vdmUuc3BsaWNlKCBtb3VzZS5jYWxsYmFja3MubW92ZS5pbmRleE9mKCBjYWxsYmFjayApICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqPTA7IGo8ZXZlbnRzLmxlbmd0aDsgaisrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggYnV0dG9uLmNhbGxiYWNrcyAmJiBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbGwgdGhlIHN0YXRlcyBvZiB0aGUgcHJvdmlkZWQgYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgc3RhdGUgb2YgdGhlIHByb3ZpZGVkIGJ1dHRvbnMuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oIGJ1dHRvbnMgKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IFtdLFxyXG4gICAgICAgICAgICBidXR0b24sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgYnV0dG9ucyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2UucG9sbCcsXHJcbiAgICAgICAgICAgIGJ1dHRvbnMsIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnIF0gKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8YnV0dG9ucy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBidXR0b25zW2ldIF07XHJcbiAgICAgICAgICAgIHN0YXRlcy5wdXNoKCBidXR0b24gPyBidXR0b24uc3RhdGUgOiAndXAnICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggc3RhdGVzLmxlbmd0aCA9PT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBNb3VzZTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgICd+JzogJ2AnLFxyXG4gICAgICAgICchJzogJzEnLFxyXG4gICAgICAgICdAJzogJzInLFxyXG4gICAgICAgICcjJzogJzMnLFxyXG4gICAgICAgICckJzogJzQnLFxyXG4gICAgICAgICclJzogJzUnLFxyXG4gICAgICAgICdeJzogJzYnLFxyXG4gICAgICAgICcmJzogJzcnLFxyXG4gICAgICAgICcqJzogJzgnLFxyXG4gICAgICAgICcoJzogJzknLFxyXG4gICAgICAgICcpJzogJzAnLFxyXG4gICAgICAgICdfJzogJy0nLFxyXG4gICAgICAgICcrJzogJz0nLFxyXG5cclxuICAgICAgICAneyc6ICdbJyxcclxuICAgICAgICAnfSc6ICddJyxcclxuICAgICAgICAnfCc6ICdcXFxcJyxcclxuICAgICAgICAnOic6ICc7JyxcclxuICAgICAgICAnXCInOiAnXFwnJyxcclxuICAgICAgICAnPCc6ICcsJyxcclxuICAgICAgICAnPic6ICcuJyxcclxuICAgICAgICAnPyc6ICcvJyxcclxuXHJcbiAgICAgICAgJ2AnOiAnficsXHJcbiAgICAgICAgJzEnOiAnIScsXHJcbiAgICAgICAgJzInOiAnQCcsXHJcbiAgICAgICAgJzMnOiAnIycsXHJcbiAgICAgICAgJzQnOiAnJCcsXHJcbiAgICAgICAgJzUnOiAnJScsXHJcbiAgICAgICAgJzYnOiAnXicsXHJcbiAgICAgICAgJzcnOiAnJicsXHJcbiAgICAgICAgJzgnOiAnKicsXHJcbiAgICAgICAgJzknOiAnKCcsXHJcbiAgICAgICAgJzAnOiAnKScsXHJcbiAgICAgICAgJy0nOiAnXycsXHJcbiAgICAgICAgJz0nOiAnKycsXHJcblxyXG4gICAgICAgICdbJzogJ3snLFxyXG4gICAgICAgICddJzogJ30nLFxyXG4gICAgICAgICdcXFxcJzogJ3wnLFxyXG4gICAgICAgICc7JzogJzonLFxyXG4gICAgICAgICcnOiAnXCInLFxyXG4gICAgICAgICcsJzogJzwnLFxyXG4gICAgICAgICcuJzogJz4nLFxyXG4gICAgICAgICcvJzogJz8nLFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHaXZlbiBhIHN0cmluZywgY29udmVydHMgaXQgdG8gbG93ZXJjYXNlIGFuZCByZXBsYWNlcyBhbGxcclxuICAgICAgICAgKiBzZXF1ZW50aWFsIHdoaXRlc3BhY2UgaW50byBhIHNpbmdsZSBzcGFjZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIG5vcm1hbGl6ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBub3JtYWxpemVkIHN0cmluZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVTdHJpbmc6IGZ1bmN0aW9uKCBzdHIgKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIHdoaXRlc3BhY2UgdG8gYSBzaW5nbGUgc3BhY2UgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcc10vZywgXCIgXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyB0aGF0IGEgZnVuY3Rpb24gYXJndW1lbnQgaXMgaW5kZWVkIGEgZnVuY3Rpb24uIElmIGl0IGlzXHJcbiAgICAgICAgICogbm90LCBsb2cgdG8gdGhlIGNvbnNvbGUgYW5kIHJldHVybiB0cnVlLiBPdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZnVuY3Rpb24gaXMgaW52YWxpZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja0Z1bmN0aW9uQXJnOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBmdW5jICkge1xyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ2NhbGxiYWNrJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3Qgb2YgdHlwZSAnZnVuY3Rpb24nLCBjb21tYW5kIGlnbm9yZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyBhbmQgbm9ybWFsaXplcyB0aGUgJ2lucHV0JyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gaW5wdXQgLSBUaGUgaW5wdXQgYXJndW1lbnQuXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gdmFsaWRJbnB1dCAtIFRoZSByZWNvZ25pemVkIGlucHV0LiBPcHRpb25hbC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIG5vcm1hbGl6ZWQgaW5wdXQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9ybWFsaXplSW5wdXRBcmdzOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBpbnB1dCwgdmFsaWRJbnB1dCApIHtcclxuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGk7XHJcbiAgICAgICAgICAgIGlmICggISggaW5wdXQgaW5zdGFuY2VvZiBBcnJheSApICkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBbIGlucHV0IF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaW5wdXRbaV0gIT09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlucHV0IGlzIG5vdCBhIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitpbnB1dFtpXStcIicgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IG9mIHR5cGUgJ3N0cmluZycsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICggdmFsaWRJbnB1dCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbGlkSW5wdXQuaW5kZXhPZiggaW5wdXRbaV0gKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlucHV0IGlzIG5vdCByZWNvZ25pemVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitpbnB1dFtpXStcIicgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IGEgcmVjb2duaXplZCBpbnB1dCB0eXBlLCBhcmd1bWVudCByZW1vdmVkLlwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dHMucHVzaCggdGhpcy5ub3JtYWxpemVTdHJpbmcoIGlucHV0W2ldICkgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0cztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQ2hlY2tzIGFuZCBub3JtYWxpemVzIHRoZSAnZXZlbnRzJyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50cyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIG5vcm1hbGl6ZWQgaW5wdXQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9ybWFsaXplRXZlbnRBcmdzOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBldmVudHMgKSB7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICBpZiAoICFldmVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBbICdwcmVzcycgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoICEoIGV2ZW50cyBpbnN0YW5jZW9mIEFycmF5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBbIGV2ZW50cyBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGV2ZW50c1tpXSAhPT0gJ3ByZXNzJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50c1tpXSAhPT0gJ3JlbGVhc2UnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50IGlzIG5vdCByZWNvZ25pemVkXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2V2ZW50c1tpXStcIicgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IGEgcmVjb2duaXplZCBldmVudCB0eXBlLCBhcmd1bWVudCByZW1vdmVkLlwiICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50c1tpXSA9IHRoaXMubm9ybWFsaXplU3RyaW5nKCBldmVudHNbaV0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4ZWN1dGUgdGhlIGZ1bmN0aW9ucyBpbiB0aGUgY2FsbGJhY2tzIG9iamVjdCB0aGF0IG1hdGNoIHRoZVxyXG4gICAgICAgICAqIHByb3ZpZGVkIGV2ZW50IHR5cGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tzIC0gVGhlIGNhbGxiYWNrcyBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHN0cmluZy5cclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGVDYWxsYmFja3M6IGZ1bmN0aW9uKCBjYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICBpZiAoICFjYWxsYmFja3MgfHwgIWNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzWyBldmVudFR5cGUgXTtcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGNhbGxiYWNrcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSggZXZlbnQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsb3MgZnVuY3Rpb24gdGhhdCBzdXBwb3J0cyBuZWdhdGl2ZSBudW1iZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIFRoZSBudW1iZXIgdG8gbW9kdWxvLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG1vZHVsb3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVzdWx0aW5nIG51bWJlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBtb2Q6IGZ1bmN0aW9uKCBudW0sIG4gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoICggbnVtICUgbiApICsgbiApICUgbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBvYmplY3QgaGFzIG5vIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byB0ZXN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBoYXMga2V5cywgZmFsc2UgaWYgbm90LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIGZvciggdmFyIHByb3AgaW4gb2JqICkge1xyXG4gICAgICAgICAgICAgICAgaWYoIG9iai5oYXNPd25Qcm9wZXJ0eSggcHJvcCApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iXX0=
