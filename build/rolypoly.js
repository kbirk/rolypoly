(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rolypoly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        Keyboard: require('./Keyboard'),
        Mouse: require('./Mouse'),
        Touch: require('./Touch')

    };

}());

},{"./Keyboard":5,"./Mouse":7,"./Touch":9}],2:[function(require,module,exports){
(function () {

    "use strict";

    var Util = require('./Util');

    /**
     * Instantiates a circular array object.
     * @class CircularArray
     * @classdesc A simple circular array that is allocated to a fixed size.
     *     When elements are pushed beyond its allocated length, they
     *     will instead overwrite exsting indices.
     *
     * @param {number} length - The length of the array.
     */
    function CircularArray( length ) {
        length = length || 256;
        this.buffer = new Array( length );
        this.length = length;
        this.index = 0;
    }

    /**
     * Push an element to the current index of the array.
     * @memberof CircularArray
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
     * @memberof CircularArray
     *
     * @param {number} offset - An offset from the current index. Optional.
     *
     * @returns {*} The most recently pushed element.
     */
    CircularArray.prototype.back = function( offset ) {
        offset = offset ? offset : 0;
        return this.buffer[ Util.mod( this.index-1-offset, this.length ) ];
    };

    module.exports = CircularArray;

}());

},{"./Util":10}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function () {

    "use strict";

    var KeyEnums = require('./KeyEnums');

    module.exports = {

        '8': KeyEnums.BACKSPACE,
        '9': KeyEnums.TAB,
        '13': KeyEnums.ENTER,
        '16': KeyEnums.SHIFT,
        '17': KeyEnums.CTRL,
        '18': KeyEnums.ALT,
        '19': KeyEnums.PAUSE_BREAK,
        '20': KeyEnums.CAPS_LOCK,
        '27': KeyEnums.ESC,
        '32': KeyEnums.SPACE_BAR,
        '33': KeyEnums.PAGE_UP,
        '34': KeyEnums.PAGE_DOWN,
        '35': KeyEnums.END,
        '36': KeyEnums.HOME,
        '37': KeyEnums.LEFT_ARROW,
        '38': KeyEnums.UP_ARROW,
        '39': KeyEnums.RIGHT_ARROW,
        '40': KeyEnums.DOWN_ARROW,
        '44': KeyEnums.PRINT_SCREEN,
        '45': KeyEnums.INSERT,
        '46': KeyEnums.DELETE,
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
        '91': KeyEnums.WINDOWS,
        '92': KeyEnums.WINDOWS,
        '93': KeyEnums.SELECT,
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
        '144': KeyEnums.NUM_LOCK,
        '145': KeyEnums.SCROLL_LOCK,
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

},{"./KeyEnums":3}],5:[function(require,module,exports){
(function () {

    "use strict";

    var Util = require('./Util'),
        Keys = require('./Keys'),
        KeyEnums = require('./KeyEnums'),
        KeyMap = require('./KeyMap'),
        ShiftMap = require('./ShiftMap'),
        CircularArray = require('./CircularArray'),
        SEQUENCE_TIMEOUT = 800,
        KEY_HISTORY_BUFFER_LENGTH = 64;

    /**
     * Check if key identification strings are recognized.
     *
     * @param {String} functionName - The name of the calling function.
     * @param {Array} keyIds - The key input arguments.
     *
     * @returns {boolean} Whether or not the key ids are valid.
     */
    function checkKeyIds( functionName, keyIds ) {
        var i;
        for ( i=0; i<keyIds.length; i++ ) {
            if ( !Keys[ keyIds[i] ] ) {
                console.log( "Argument '"+keyIds[i]+"' to '"+functionName+"' is not a recognized event type, command ignored." );
                return true;
            }
        }
        return false;
    }

    /**
     * Returns true if the input is recognized as a key sequence.
     *
     * @param {String} input - The input string.
     *
     * @returns {boolean} True if the input is a key sequence.
     */
    function isSequenceInput( input ) {
        return input.split(' ').length > 1;
    }

    /**
     * Parses a sequence key into the individual key ids.
     *
     * @param {String} sequenceKey - The sequence key.
     *
     * @returns {Array} The array of key ids.
     */
    function parseSequence( sequenceKey ) {
        return sequenceKey.split(' ');
    }

    /**
     * Returns true if the input is recognized as a key combination.
     *
     * @param {String} input - The input string.
     *
     * @returns {boolean} True if the input is a key combination.
     */
    function isCombinationInput( input ) {
        return ( input.length > 1 ) ? input.split('+').length > 1 : false;
    }

    /**
     * Parses a combination key into the individual key ids.
     *
     * @param {String} comboKey - The combination key.
     *
     * @returns {Array} The array of key ids.
     */
    function parseCombination( comboKey ) {
        var temp = comboKey.split(/\+\+\+|\+\+/),
            result = [],
            i;
        // my lack of regex knowledge is shameful
        if ( temp.length > 1 ) {
            for ( i=0; i<temp.length; i++ ) {
                if ( temp[i].length === 0 ) {
                    if ( i === 0 ) {
                        result.push( '+' );
                    }
                } else {
                    result = result.concat( temp[i].split('+') );
                    if ( i !== temp.length-1 ) {
                        result.push( '+' );
                    }
                }
            }
        } else {
            result = comboKey.split('+');
        }
        return result;
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
        // check input
        if ( checkKeyIds( 'Keyboard.on', keyIds ) ) {
            return;
        }
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
                keys[ keyId ].sequences[ event ] = keys[ keyId ].sequences[ event ] || [];
                if ( keys[ keyId ].sequences[ event ].indexOf( sequenceKey ) === -1 ) {
                    // don't add duplicates
                    keys[ keyId ].sequences[ event ].push( sequenceKey );
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
        // check input
        if ( checkKeyIds( 'Keyboard.off', keyIds ) ) {
            return;
        }
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
        // check input
        if ( checkKeyIds( 'Keyboard.on', keyIds ) ) {
            return;
        }
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
                keys[ keyId ].combos[ event ] = keys[ keyId ].combos[ event ]  || [];
                if ( keys[ keyId ].combos[ event ] .indexOf( comboKey ) === -1 ) {
                    // don't add duplicates
                    keys[ keyId ].combos[ event ].push( comboKey );
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
        // check input
        if ( checkKeyIds( 'Keyboard.off', keyIds ) ) {
            return;
        }
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
        // check input
        if ( checkKeyIds( 'Keyboard.on', [ keyId ] ) ) {
            return;
        }
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
        // check input
        if ( checkKeyIds( 'Keyboard.off', [ keyId ] ) ) {
            return;
        }
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
        if ( key.combos ) {
            // release combination events require press combination events to
            // be tracked, therefore if a press event occurs that is part of a
            // combination it MUST be processed, regardless if there is a
            // callback.
            if ( eventType === "press" ) {
                // process the press callbacks
                if ( key.combos.press ) {
                    // for every combo in the key
                    for ( i=0; i<key.combos.press.length; i++ ) {
                        combo = combos[ key.combos.press[i] ];
                        if ( isComboSatisfied( keyboard, combo, "press" ) ) {
                            // all keys in combo satisfy conditions, execute callbacks
                            Util.executeCallbacks( combo.callbacks, "press", event );
                        }
                    }
                }
                // process the release callbacks, ignore callbacks as this isn't
                // a release event but is required for release events
                if ( key.combos.release ) {
                    // process release events to flag they have been pressed prior
                    // for every combo in the key
                    for ( i=0; i<key.combos.release.length; i++ ) {
                        combo = combos[ key.combos.release[i] ];
                        // process combo but don't execute any callbacks
                        isComboSatisfied( keyboard, combo, "press" );
                    }
                }
            } else {
                // process the release callbacks
                if ( key.combos.release ) {
                    // for every combo in the key
                    for ( i=0; i<key.combos.release.length; i++ ) {
                        combo = combos[ key.combos.release[i] ];
                        if ( isComboSatisfied( keyboard, combo, "release" ) ) {
                            // all keys in combo satisfy conditions, execute callbacks
                            Util.executeCallbacks( combo.callbacks, "release", event );
                        }
                    }
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
        var shift = keys[ KeyEnums.SHIFT ];
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

    /**
     * Instantiates a keyboard object.
     * @class Keyboard
     * @classdesc A keyboard input handling object.
     */
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
     * @memberof Keyboard
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
            if ( isSequenceInput( entry ) ) {
                addSequence( this, entry, events, callback );
            } else if ( isCombinationInput( entry ) ) {
                addCombination( this, entry, events, callback );
            } else {
                addKey( this, entry, events, callback );
            }
        }
        return this;
    };

    /**
     * Remove a listener for a set of input and events.
     * @memberof Keyboard
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
            if ( isSequenceInput( entry ) ) {
                removeSequence( this, entry, events, callback );
            } else if ( isCombinationInput( entry ) ) {
                removeCombination( this, entry, events, callback );
            } else {
                removeKey( this, entry, events, callback );
            }
        }
        return this;
    };

    /**
     * Poll the states of the provided key identification strings.
     * @memberof Keyboard
     *
     * @param {Array|String} keyIds - The key identification strings.
     *
     * @returns {Array} The state of the provided keys.
     */
    Keyboard.prototype.poll = function( keyIds ) {
        var states = {},
            keyId,
            key,
            i;
        keyIds = Util.normalizeInputArgs( 'Keyboard.poll', keyIds );
        if ( keyIds.length === 1 ) {
            key = this.keys[ keyIds[0] ];
            return key ? key.state : 'up';
        }
        for ( i=0; i<keyIds.length; i++ ) {
            keyId = keyIds[i];
            key = this.keys[ keyId ];
            states[ keyId ] = key ? key.state : 'up' ;
        }
        return states;
    };

    module.exports = Keyboard;

}());

},{"./CircularArray":2,"./KeyEnums":3,"./KeyMap":4,"./Keys":6,"./ShiftMap":8,"./Util":10}],6:[function(require,module,exports){
(function () {

    "use strict";

    var KeyMap = require('./KeyMap'),
        ShiftMap = require('./ShiftMap'),
        Keys = {},
        keyCode;

    for ( keyCode in KeyMap ) {
        Keys[ KeyMap[ keyCode ] ] = true;
    }

    for ( keyCode in ShiftMap ) {
        Keys[ ShiftMap[ keyCode ] ] = true;
    }

    module.exports = Keys;

}());

},{"./KeyMap":4,"./ShiftMap":8}],7:[function(require,module,exports){
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
        var element;
        if ( typeof arg === "string" ) {
            element = document.querySelector( arg );
        } else {
            element = arg || document;
        }
        // generate and attach the button event handlers
        element.addEventListener( 'mousedown', handleMouseButtonPress( this.buttons ) );
        element.addEventListener( 'mouseup', handleMouseButtonRelease( this.buttons ) );
        element.addEventListener( 'mousemove', handleMouseMove( this.mouse ) );
    }

    /**
     * Attach a listener for a set of input and events.
     * @memberof Mouse
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
     * @memberof Mouse
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
     * @memberof Mouse
     *
     * @param {Array|String} buttonIds - The button identification strings.
     *
     * @returns {Array} The state of the provided buttons.
     */
    Mouse.prototype.poll = function( buttonIds ) {
        var states = {},
            buttonId,
            button,
            i;
        buttonIds = Util.normalizeInputArgs( 'Mouse.poll', buttonIds, [ 'left', 'middle', 'right' ] );
        if ( buttonIds.length === 1 ) {
            button = this.buttons[ buttonIds[0] ];
            return button ? button.state : 'up';
        }
        for ( i=0; i<buttonIds.length; i++ ) {
            buttonId = buttonIds[i];
            button = this.buttons[ buttonId ];
            states[ buttonId ] = button ? button.state : 'up' ;
        }
        return states;
    };

    module.exports = Mouse;

}());

},{"./Util":10}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
(function () {

    "use strict";

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
        document.addEventListener( "touchstart", handleTouchAction( this.touch, "start" ), false );
        document.addEventListener( "touchend", handleTouchAction( this.touch, "end" ), false );
        document.addEventListener( "touchcancel", handleTouchAction( this.touch, "cancel" ), false );
        document.addEventListener( "touchleave", handleTouchAction( this.touch, "leave" ), false );
        document.addEventListener( "touchmove", handleTouchAction( this.touch, "move" ), false );
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

},{"./Util":10}],10:[function(require,module,exports){
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
            var key;
            for ( key in obj ) {
                if ( obj.hasOwnProperty( key ) ) {
                    return false;
                }
            }
            return true;
        }

    };

}());

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXhwb3J0cy5qcyIsInNyYy9DaXJjdWxhckFycmF5LmpzIiwic3JjL0tleUVudW1zLmpzIiwic3JjL0tleU1hcC5qcyIsInNyYy9LZXlib2FyZC5qcyIsInNyYy9LZXlzLmpzIiwic3JjL01vdXNlLmpzIiwic3JjL1NoaWZ0TWFwLmpzIiwic3JjL1RvdWNoLmpzIiwic3JjL1V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBLZXlib2FyZDogcmVxdWlyZSgnLi9LZXlib2FyZCcpLFxyXG4gICAgICAgIE1vdXNlOiByZXF1aXJlKCcuL01vdXNlJyksXHJcbiAgICAgICAgVG91Y2g6IHJlcXVpcmUoJy4vVG91Y2gnKVxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBjaXJjdWxhciBhcnJheSBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgQ2lyY3VsYXJBcnJheVxyXG4gICAgICogQGNsYXNzZGVzYyBBIHNpbXBsZSBjaXJjdWxhciBhcnJheSB0aGF0IGlzIGFsbG9jYXRlZCB0byBhIGZpeGVkIHNpemUuXHJcbiAgICAgKiAgICAgV2hlbiBlbGVtZW50cyBhcmUgcHVzaGVkIGJleW9uZCBpdHMgYWxsb2NhdGVkIGxlbmd0aCwgdGhleVxyXG4gICAgICogICAgIHdpbGwgaW5zdGVhZCBvdmVyd3JpdGUgZXhzdGluZyBpbmRpY2VzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJBcnJheSggbGVuZ3RoICkge1xyXG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCB8fCAyNTY7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVzaCBhbiBlbGVtZW50IHRvIHRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBhcnJheS5cclxuICAgICAqIEBtZW1iZXJvZiBDaXJjdWxhckFycmF5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIC0gVGhlIGRhdGEgdG8gaW5zZXJ0IGludG8gdGhlIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJbIHRoaXMuaW5kZXggXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIG1vc3QgcmVjZW50bHkgcHVzaGVkIGVsZW1lbnQuIEFuIGluZGV4IG9mZnNldCBtYXlcclxuICAgICAqIGJlIHByb3ZpZGVkLlxyXG4gICAgICogQG1lbWJlcm9mIENpcmN1bGFyQXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gQW4gb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgaW5kZXguIE9wdGlvbmFsLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfSBUaGUgbW9zdCByZWNlbnRseSBwdXNoZWQgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgQ2lyY3VsYXJBcnJheS5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKCBvZmZzZXQgKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ID8gb2Zmc2V0IDogMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJbIFV0aWwubW9kKCB0aGlzLmluZGV4LTEtb2Zmc2V0LCB0aGlzLmxlbmd0aCApIF07XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gQ2lyY3VsYXJBcnJheTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIEJBQ0tTUEFDRTogJ2JhY2tzcGFjZScsXHJcbiAgICAgICAgVEFCOiAndGFiJyxcclxuICAgICAgICBFTlRFUjogJ2VudGVyJyxcclxuICAgICAgICBTSElGVDogJ3NoaWZ0JyxcclxuICAgICAgICBDVFJMOiAnY3RybCcsXHJcbiAgICAgICAgQUxUOiAnYWx0JyxcclxuICAgICAgICBQQVVTRV9CUkVBSzogJ3BhdXNlYnJlYWsnLFxyXG4gICAgICAgIENBUFNfTE9DSzogJ2NhcHNsb2NrJyxcclxuICAgICAgICBFU0M6ICdlc2MnLFxyXG4gICAgICAgIFBBR0VfVVA6ICdwYWdldXAnLFxyXG4gICAgICAgIFBBR0VfRE9XTjogJ3BhZ2Vkb3duJyxcclxuICAgICAgICBFTkQ6ICdlbmQnLFxyXG4gICAgICAgIEhPTUU6ICdob21lJyxcclxuICAgICAgICBMRUZUX0FSUk9XOiAnbGVmdCcsXHJcbiAgICAgICAgVVBfQVJST1c6ICd1cCcsXHJcbiAgICAgICAgUklHSFRfQVJST1c6ICdyaWdodCcsXHJcbiAgICAgICAgRE9XTl9BUlJPVzogJ2Rvd24nLFxyXG4gICAgICAgIFBSSU5UX1NDUkVFTjogJ3ByaW50c2NyZWVuJyxcclxuICAgICAgICBJTlNFUlQ6ICdpbnNlcnQnLFxyXG4gICAgICAgIERFTEVURTogJ2RlbGV0ZScsXHJcbiAgICAgICAgV0lORE9XUzogJ3dpbmRvd3MnLFxyXG4gICAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXHJcbiAgICAgICAgU1BBQ0VfQkFSOiAnc3BhY2UnLFxyXG4gICAgICAgIE5VTV9MT0NLOiAnbnVtbG9jaycsXHJcbiAgICAgICAgU0NST0xMX0xPQ0s6ICdzY3JvbGxsb2NrJyxcclxuXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgS2V5RW51bXMgPSByZXF1aXJlKCcuL0tleUVudW1zJyk7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgICc4JzogS2V5RW51bXMuQkFDS1NQQUNFLFxyXG4gICAgICAgICc5JzogS2V5RW51bXMuVEFCLFxyXG4gICAgICAgICcxMyc6IEtleUVudW1zLkVOVEVSLFxyXG4gICAgICAgICcxNic6IEtleUVudW1zLlNISUZULFxyXG4gICAgICAgICcxNyc6IEtleUVudW1zLkNUUkwsXHJcbiAgICAgICAgJzE4JzogS2V5RW51bXMuQUxULFxyXG4gICAgICAgICcxOSc6IEtleUVudW1zLlBBVVNFX0JSRUFLLFxyXG4gICAgICAgICcyMCc6IEtleUVudW1zLkNBUFNfTE9DSyxcclxuICAgICAgICAnMjcnOiBLZXlFbnVtcy5FU0MsXHJcbiAgICAgICAgJzMyJzogS2V5RW51bXMuU1BBQ0VfQkFSLFxyXG4gICAgICAgICczMyc6IEtleUVudW1zLlBBR0VfVVAsXHJcbiAgICAgICAgJzM0JzogS2V5RW51bXMuUEFHRV9ET1dOLFxyXG4gICAgICAgICczNSc6IEtleUVudW1zLkVORCxcclxuICAgICAgICAnMzYnOiBLZXlFbnVtcy5IT01FLFxyXG4gICAgICAgICczNyc6IEtleUVudW1zLkxFRlRfQVJST1csXHJcbiAgICAgICAgJzM4JzogS2V5RW51bXMuVVBfQVJST1csXHJcbiAgICAgICAgJzM5JzogS2V5RW51bXMuUklHSFRfQVJST1csXHJcbiAgICAgICAgJzQwJzogS2V5RW51bXMuRE9XTl9BUlJPVyxcclxuICAgICAgICAnNDQnOiBLZXlFbnVtcy5QUklOVF9TQ1JFRU4sXHJcbiAgICAgICAgJzQ1JzogS2V5RW51bXMuSU5TRVJULFxyXG4gICAgICAgICc0Nic6IEtleUVudW1zLkRFTEVURSxcclxuICAgICAgICAnNDgnOiAnMCcsXHJcbiAgICAgICAgJzQ5JzogJzEnLFxyXG4gICAgICAgICc1MCc6ICcyJyxcclxuICAgICAgICAnNTEnOiAnMycsXHJcbiAgICAgICAgJzUyJzogJzQnLFxyXG4gICAgICAgICc1Myc6ICc1JyxcclxuICAgICAgICAnNTQnOiAnNicsXHJcbiAgICAgICAgJzU1JzogJzcnLFxyXG4gICAgICAgICc1Nic6ICc4JyxcclxuICAgICAgICAnNTcnOiAnOScsXHJcbiAgICAgICAgJzY1JzogJ2EnLFxyXG4gICAgICAgICc2Nic6ICdiJyxcclxuICAgICAgICAnNjcnOiAnYycsXHJcbiAgICAgICAgJzY4JzogJ2QnLFxyXG4gICAgICAgICc2OSc6ICdlJyxcclxuICAgICAgICAnNzAnOiAnZicsXHJcbiAgICAgICAgJzcxJzogJ2cnLFxyXG4gICAgICAgICc3Mic6ICdoJyxcclxuICAgICAgICAnNzMnOiAnaScsXHJcbiAgICAgICAgJzc0JzogJ2onLFxyXG4gICAgICAgICc3NSc6ICdrJyxcclxuICAgICAgICAnNzYnOiAnbCcsXHJcbiAgICAgICAgJzc3JzogJ20nLFxyXG4gICAgICAgICc3OCc6ICduJyxcclxuICAgICAgICAnNzknOiAnbycsXHJcbiAgICAgICAgJzgwJzogJ3AnLFxyXG4gICAgICAgICc4MSc6ICdxJyxcclxuICAgICAgICAnODInOiAncicsXHJcbiAgICAgICAgJzgzJzogJ3MnLFxyXG4gICAgICAgICc4NCc6ICd0JyxcclxuICAgICAgICAnODUnOiAndScsXHJcbiAgICAgICAgJzg2JzogJ3YnLFxyXG4gICAgICAgICc4Nyc6ICd3JyxcclxuICAgICAgICAnODgnOiAneCcsXHJcbiAgICAgICAgJzg5JzogJ3knLFxyXG4gICAgICAgICc5MCc6ICd6JyxcclxuICAgICAgICAnOTEnOiBLZXlFbnVtcy5XSU5ET1dTLFxyXG4gICAgICAgICc5Mic6IEtleUVudW1zLldJTkRPV1MsXHJcbiAgICAgICAgJzkzJzogS2V5RW51bXMuU0VMRUNULFxyXG4gICAgICAgICc5Nic6ICcwJyxcclxuICAgICAgICAnOTcnOiAnMScsXHJcbiAgICAgICAgJzk4JzogJzInLFxyXG4gICAgICAgICc5OSc6ICczJyxcclxuICAgICAgICAnMTAwJzogJzQnLFxyXG4gICAgICAgICcxMDEnOiAnNScsXHJcbiAgICAgICAgJzEwMic6ICc2JyxcclxuICAgICAgICAnMTAzJzogJzcnLFxyXG4gICAgICAgICcxMDQnOiAnOCcsXHJcbiAgICAgICAgJzEwNSc6ICc5JyxcclxuICAgICAgICAnMTA2JzogJyonLFxyXG4gICAgICAgICcxMDcnOiAnKycsXHJcbiAgICAgICAgJzEwOSc6ICctJyxcclxuICAgICAgICAnMTEwJzogJy4nLFxyXG4gICAgICAgICcxMTEnOiAnLycsXHJcbiAgICAgICAgJzExMic6ICdmMScsXHJcbiAgICAgICAgJzExMyc6ICdmMicsXHJcbiAgICAgICAgJzExNCc6ICdmMycsXHJcbiAgICAgICAgJzExNSc6ICdmNCcsXHJcbiAgICAgICAgJzExNic6ICdmNScsXHJcbiAgICAgICAgJzExNyc6ICdmNicsXHJcbiAgICAgICAgJzExOCc6ICdmNycsXHJcbiAgICAgICAgJzExOSc6ICdmOCcsXHJcbiAgICAgICAgJzEyMCc6ICdmOScsXHJcbiAgICAgICAgJzEyMSc6ICdmMTAnLFxyXG4gICAgICAgICcxMjInOiAnZjExJyxcclxuICAgICAgICAnMTIzJzogJ2YxMicsXHJcbiAgICAgICAgJzE0NCc6IEtleUVudW1zLk5VTV9MT0NLLFxyXG4gICAgICAgICcxNDUnOiBLZXlFbnVtcy5TQ1JPTExfTE9DSyxcclxuICAgICAgICAnMTg2JzogJzonLFxyXG4gICAgICAgICcxODcnOiAnPScsXHJcbiAgICAgICAgJzE4OCc6ICcsJyxcclxuICAgICAgICAnMTg5JzogJy0nLFxyXG4gICAgICAgICcxOTAnOiAnLicsXHJcbiAgICAgICAgJzE5MSc6ICcvJyxcclxuICAgICAgICAnMTkyJzogJ2AnLFxyXG4gICAgICAgICcyMTknOiAnWycsXHJcbiAgICAgICAgJzIyMCc6ICdcXFxcJyxcclxuICAgICAgICAnMjIxJzogJ10nLFxyXG4gICAgICAgICcyMjInOiAnXFwnJ1xyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyksXHJcbiAgICAgICAgS2V5cyA9IHJlcXVpcmUoJy4vS2V5cycpLFxyXG4gICAgICAgIEtleUVudW1zID0gcmVxdWlyZSgnLi9LZXlFbnVtcycpLFxyXG4gICAgICAgIEtleU1hcCA9IHJlcXVpcmUoJy4vS2V5TWFwJyksXHJcbiAgICAgICAgU2hpZnRNYXAgPSByZXF1aXJlKCcuL1NoaWZ0TWFwJyksXHJcbiAgICAgICAgQ2lyY3VsYXJBcnJheSA9IHJlcXVpcmUoJy4vQ2lyY3VsYXJBcnJheScpLFxyXG4gICAgICAgIFNFUVVFTkNFX1RJTUVPVVQgPSA4MDAsXHJcbiAgICAgICAgS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MgYXJlIHJlY29nbml6ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5SWRzIC0gVGhlIGtleSBpbnB1dCBhcmd1bWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBrZXkgaWRzIGFyZSB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hlY2tLZXlJZHMoIGZ1bmN0aW9uTmFtZSwga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmICggIUtleXNbIGtleUlkc1tpXSBdICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2tleUlkc1tpXStcIicgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IGEgcmVjb2duaXplZCBldmVudCB0eXBlLCBjb21tYW5kIGlnbm9yZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgaXMgcmVjb2duaXplZCBhcyBhIGtleSBzZXF1ZW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBpbnB1dCBpcyBhIGtleSBzZXF1ZW5jZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNTZXF1ZW5jZUlucHV0KCBpbnB1dCApIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQuc3BsaXQoJyAnKS5sZW5ndGggPiAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGEgc2VxdWVuY2Uga2V5IGludG8gdGhlIGluZGl2aWR1YWwga2V5IGlkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIGtleSBpZHMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICkge1xyXG4gICAgICAgIHJldHVybiBzZXF1ZW5jZUtleS5zcGxpdCgnICcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyByZWNvZ25pemVkIGFzIGEga2V5IGNvbWJpbmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGlucHV0IGlzIGEga2V5IGNvbWJpbmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc0NvbWJpbmF0aW9uSW5wdXQoIGlucHV0ICkge1xyXG4gICAgICAgIHJldHVybiAoIGlucHV0Lmxlbmd0aCA+IDEgKSA/IGlucHV0LnNwbGl0KCcrJykubGVuZ3RoID4gMSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGEgY29tYmluYXRpb24ga2V5IGludG8gdGhlIGluZGl2aWR1YWwga2V5IGlkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIGtleSBpZHMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHBhcnNlQ29tYmluYXRpb24oIGNvbWJvS2V5ICkge1xyXG4gICAgICAgIHZhciB0ZW1wID0gY29tYm9LZXkuc3BsaXQoL1xcK1xcK1xcK3xcXCtcXCsvKSxcclxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gbXkgbGFjayBvZiByZWdleCBrbm93bGVkZ2UgaXMgc2hhbWVmdWxcclxuICAgICAgICBpZiAoIHRlbXAubGVuZ3RoID4gMSApIHtcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPHRlbXAubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRlbXBbaV0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaSA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goICcrJyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCggdGVtcFtpXS5zcGxpdCgnKycpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpICE9PSB0ZW1wLmxlbmd0aC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCggJysnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY29tYm9LZXkuc3BsaXQoJysnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgc2VxdWVuY2Uga2V5IHRvIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIGJpbmRzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleSB0byBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vbicsIGtleUlkcyApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXF1ZW5jZSBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBsYXN0S2V5OiBrZXlJZHNbIGtleUlkcy5sZW5ndGggLSAxXSwgLy8gc3RvcmUgdGhlIGxhc3Qga2V5IG9mIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXTtcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdID0gc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBzZXF1ZW5jZS5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzZXF1ZW5jZSBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXMgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXSA9IGtleXNbIGtleUlkIF0uc2VxdWVuY2VzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXS5pbmRleE9mKCBzZXF1ZW5jZUtleSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzWyBldmVudCBdLnB1c2goIHNlcXVlbmNlS2V5ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzZXF1ZW5jZSBrZXkgZnJvbSB0aGUgS2V5Ym9hcmQgb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleSB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9mZicsIGtleUlkcyApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIHNlcXVlbmNlXHJcbiAgICAgICAgaWYgKCAhc2VxdWVuY2UgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IHNlcXVlbmNlLmNhbGxiYWNrcztcclxuICAgICAgICAgICAgaWYgKCBjYWxsYmFja3MgJiYgY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja3NbIGV2ZW50IF0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50IF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBzZXF1ZW5jZSwgZGVsZXRlIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgc2VxdWVuY2UgZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBzZXF1ZW5jZS5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXTtcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBzZXF1ZW5jZSwgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXTsgLy8gcmUtYXNzaWduaW5nIHNlcXVlbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlcy5zcGxpY2UoIHNlcXVlbmNlcy5pbmRleE9mKCBzZXF1ZW5jZUtleSApLCAxICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNvbWJpbmF0aW9uIGtleSB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0IGFuZCBiaW5kc1xyXG4gICAgICogdGhlIGNhbGxiYWNrIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZENvbWJpbmF0aW9uKCBrZXlib2FyZCwgY29tYm9LZXksIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlQ29tYmluYXRpb24oIGNvbWJvS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBjb21ib3MgPSBrZXlib2FyZC5jb21ib3MsXHJcbiAgICAgICAgICAgIGNvbWJvLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjcmVhdGUgY29tYmluYXRpb24gZW50cnkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgIGNvbWJvc1sgY29tYm9LZXkgXSA9IGNvbWJvc1sgY29tYm9LZXkgXSB8fCB7XHJcbiAgICAgICAgICAgIGtleXM6IGtleUlkcyxcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29tYm8gPSBjb21ib3NbIGNvbWJvS2V5IF07XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNvbWJvLmNhbGxiYWNrc1sgZXZlbnQgXSA9IGNvbWJvLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgY29tYm8uY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgY29tYmluYXRpb24ga2V5IHVuZGVyIGVhY2gga2V5IGZvciB0aGUgZXZlbnRcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLmNvbWJvcyA9IGtleXNbIGtleUlkIF0uY29tYm9zIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF0gPSBrZXlzWyBrZXlJZCBdLmNvbWJvc1sgZXZlbnQgXSAgfHwgW107XHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdIC5pbmRleE9mKCBjb21ib0tleSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdLnB1c2goIGNvbWJvS2V5ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgY29tYmluYXRpb24ga2V5IGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmcm9tLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNvbWJpbmF0aW9uKCBrZXlib2FyZCwgY29tYm9LZXksIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlQ29tYmluYXRpb24oIGNvbWJvS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBjb21ib3MgPSBrZXlib2FyZC5jb21ib3MsXHJcbiAgICAgICAgICAgIGNvbWJvID0gY29tYm9zWyBjb21ib0tleSBdLFxyXG4gICAgICAgICAgICBjYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vZmYnLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBjb21ib1xyXG4gICAgICAgIGlmICggIWNvbWJvICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjb21iby5jYWxsYmFja3M7XHJcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2tzICYmIGNhbGxiYWNrc1sgZXZlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnQgXS5zcGxpY2UoIGNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2tzWyBldmVudCBdLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciB0aGUgY29tYm8sIGRlbGV0ZSB0aGUgY29tYm9cclxuICAgICAgICAvLyBhbmQgcmVtb3ZlIGNvbWJvIGZyb20gYWxsIGtleXNcclxuICAgICAgICBpZiAoIFV0aWwuaXNFbXB0eSggY29tYm8uY2FsbGJhY2tzICkgKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb21ib3NbIGNvbWJvS2V5IF07XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGluc3RhbmNlcyBvZiB0aGUgY29tYm8sIHJlbW92ZSBmcm9tIGtleXNcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb21ib3MgPSBrZXlzWyBrZXlJZCBdLmNvbWJvc1sgZXZlbnQgXTsgLy8gcmUtYXNzaWduaW5nIGNvbWJvc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbWJvcy5zcGxpY2UoIGNvbWJvcy5pbmRleE9mKCBjb21ib0tleSApLCAxICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2FsbGJhY2sgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5SWQgLSBUaGUga2V5IGlkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRLZXkoIGtleWJvYXJkLCBrZXlJZCwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9LFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vbicsIFsga2V5SWQgXSApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBrZXkuY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAga2V5LmNhbGxiYWNrc1sgZXZlbnQgXSA9IGtleS5jYWxsYmFja3NbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgIGtleS5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgY2FsbGJhY2sgZnJvbSB0aGUgS2V5Ym9hcmQgb2JqZWN0IGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlJZCAtIFRoZSBrZXkgaWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVLZXkoIGtleWJvYXJkLCBrZXlJZCwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub2ZmJywgWyBrZXlJZCBdICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3Iga2V5XHJcbiAgICAgICAgaWYgKCAha2V5ICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrcyAmJiBjYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBjYWxsYmFja3NbIGV2ZW50IF0uaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrc1sgZXZlbnQgXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnQgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxsIHRoZSBrZXlzIGluIHRoZSBjb21iaW5hdGlvbiBhcmVcclxuICAgICAqIG9mIHRoZSByZXF1aXJlZCBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbWJvIC0gVGhlIGNvbWJpbmF0aW9uIGVudHJ5LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGNvbWJpbmF0aW9uIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXlJZHMgPSBjb21iby5rZXlzLFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2gga2V5IGluIHRoZSBjb21ib1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkc1tpXSBdO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUga2V5IGRvZXMgbm90IGhhdmUgYSBzdGF0ZSwgdGhlIGNvbWJvIGZhaWxzXHJcbiAgICAgICAgICAgIGlmICggIWtleSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhIFwicmVsZWFzZVwiIGNvbWJvIGNhbiBvbmx5IGJlIHRyaWdnZXJlZCBpZiB0aGUga2V5cyBoYWQgYWxsXHJcbiAgICAgICAgICAgIC8vIGJlZW4gZG93biB0b2dldGhlciBhdCBvbmUgcG9pbnRcclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicmVsZWFzZVwiICYmXHJcbiAgICAgICAgICAgICAgICAgKCAhY29tYm8ucHJlc3NlZCB8fCBrZXkuc3RhdGUgIT09IFwidXBcIiApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGEgXCJwcmVzc1wiIGNvbWJvIG9ubHkgbmVlZHMgYWxsIGtleXMgdG8gYmUgZG93biB0b2dldGhlclxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICYmIGtleS5zdGF0ZSAhPT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgLy8gZmxhZyB0aGF0IGFsbCBrZXlzIGhhdmUgYmVlbiBkb3duXHJcbiAgICAgICAgICAgIGNvbWJvLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIGV2ZW50VHlwZSA9PT0gXCJyZWxlYXNlXCIgKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBmbGFnXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb21iby5wcmVzc2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFsbCBjb21iaW5hdGlvbnMgdGhhdCBhcmUgYXR0YWNoZWQgdG8gdGhlIGtleS4gSWYgYW55IGFyZVxyXG4gICAgICogc2F0aXNmaWVkLCBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICB2YXIgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIGtleS5jb21ib3MgKSB7XHJcbiAgICAgICAgICAgIC8vIHJlbGVhc2UgY29tYmluYXRpb24gZXZlbnRzIHJlcXVpcmUgcHJlc3MgY29tYmluYXRpb24gZXZlbnRzIHRvXHJcbiAgICAgICAgICAgIC8vIGJlIHRyYWNrZWQsIHRoZXJlZm9yZSBpZiBhIHByZXNzIGV2ZW50IG9jY3VycyB0aGF0IGlzIHBhcnQgb2YgYVxyXG4gICAgICAgICAgICAvLyBjb21iaW5hdGlvbiBpdCBNVVNUIGJlIHByb2Nlc3NlZCwgcmVnYXJkbGVzcyBpZiB0aGVyZSBpcyBhXHJcbiAgICAgICAgICAgIC8vIGNhbGxiYWNrLlxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICkge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcHJlc3MgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleS5jb21ib3MucHJlc3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IGNvbWJvIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5LmNvbWJvcy5wcmVzcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGtleS5jb21ib3MucHJlc3NbaV0gXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIFwicHJlc3NcIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gY29tYm8gc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBjb21iby5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIHJlbGVhc2UgY2FsbGJhY2tzLCBpZ25vcmUgY2FsbGJhY2tzIGFzIHRoaXMgaXNuJ3RcclxuICAgICAgICAgICAgICAgIC8vIGEgcmVsZWFzZSBldmVudCBidXQgaXMgcmVxdWlyZWQgZm9yIHJlbGVhc2UgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleS5jb21ib3MucmVsZWFzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHJlbGVhc2UgZXZlbnRzIHRvIGZsYWcgdGhleSBoYXZlIGJlZW4gcHJlc3NlZCBwcmlvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleS5jb21ib3MucmVsZWFzZS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGtleS5jb21ib3MucmVsZWFzZVtpXSBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIGNvbWJvIGJ1dCBkb24ndCBleGVjdXRlIGFueSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBcInByZXNzXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSByZWxlYXNlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXkuY29tYm9zLnJlbGVhc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IGNvbWJvIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5LmNvbWJvcy5yZWxlYXNlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sga2V5LmNvbWJvcy5yZWxlYXNlW2ldIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBcInJlbGVhc2VcIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gY29tYm8gc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBjb21iby5jYWxsYmFja3MsIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdHdvIHRpbWVzdGFtcHMsIGFuZCByZXR1cm5zIHRydWUgaWYgdGhleSBvY2N1clxyXG4gICAgICogd2l0aGluIHRoZSB0aW1lb3V0IGludGVydmFsIGZyb20gZWFjaG90aGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmV2aW91c1RpbWVzdGFtcCAtIFRoZSBwcmV2aW91cyB0aW1lc3RtYXAuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wIC0gVGhlIHRpbWVzdG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhleSBhcmUgd2l0aGluIHRoZSB0aW1lb3V0IGludGVydmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1dpdGhpblRpbWVvdXQoIHByZXZpb3VzVGltZXN0YW1wLCB0aW1lc3RhbXAgKSB7XHJcbiAgICAgICAgdmFyIGRlbHRhO1xyXG4gICAgICAgIGlmICggIXByZXZpb3VzVGltZXN0YW1wICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsdGEgPSBwcmV2aW91c1RpbWVzdGFtcCAtIHRpbWVzdGFtcDtcclxuICAgICAgICByZXR1cm4gZGVsdGEgPCBTRVFVRU5DRV9USU1FT1VUO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbGwgdGhlIGtleXMgaW4gdGhlIHNlcXVlbmNlIGhhdmUgYmVlblxyXG4gICAgICogcHJlc3NlZCBvciByZWxlYXNlZCAoZGVwZW5kaW5nIG9uIHRoZSBldmVudCB0eXBlKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBoaXN0b3J5IC0gVGhlIGtleSBldmVudCBoaXN0b3J5IGFycmF5LlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5SWRzIC0gVGhlIHNlcXVlbmNlIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzZXF1ZW5jZSBpcyBzYXRpc2ZpZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzU2VxdWVuY2VTYXRpc2ZpZWQoIGhpc3RvcnksIGtleUlkcyApIHtcclxuICAgICAgICB2YXIgcHJldmlvdXNUaW1lc3RhbXAsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlS2V5LFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGksIGo7XHJcbiAgICAgICAgLy8gZGVidWdDaXJjdWxhciggaGlzdG9yeSwga2V5SWRzLmxlbmd0aCs1ICk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2gga2V5IGluIHRoZSBjb21ib1xyXG4gICAgICAgIGZvciAoIGk9MCwgaj0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKywgaisrICkge1xyXG4gICAgICAgICAgICBzZXF1ZW5jZUtleSA9IGtleUlkc1sga2V5SWRzLmxlbmd0aC0xLWkgXTtcclxuICAgICAgICAgICAga2V5ID0gaGlzdG9yeS5iYWNrKCBqICk7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBzaGlmdCBrZXlzXHJcbiAgICAgICAgICAgIHdoaWxlICggc2VxdWVuY2VLZXkgIT09IFwic2hpZnRcIiAmJlxyXG4gICAgICAgICAgICAgICAga2V5ICYmXHJcbiAgICAgICAgICAgICAgICBrZXkua2V5SWQgPT09IFwic2hpZnRcIiApIHtcclxuICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgIGtleSA9IGhpc3RvcnkuYmFjayggaiApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNlZSBpZiBpdCBpcyB0aGUgY29ycmVjdCBzdGF0ZVxyXG4gICAgICAgICAgICBpZiAoICFrZXkgfHwgLy8gbm8ga2V5XHJcbiAgICAgICAgICAgICAgICAga2V5LmtleUlkICE9PSBzZXF1ZW5jZUtleSB8fCAvLyBoYXMgbm90IGJlZW4gcHJlc3NlZFxyXG4gICAgICAgICAgICAgICAgICFpc1dpdGhpblRpbWVvdXQoIHByZXZpb3VzVGltZXN0YW1wLCBrZXkudGltZXN0YW1wICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXNUaW1lc3RhbXAgPSBrZXkudGltZXN0YW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFsbCBzZXF1ZW5jZXMgdGhhdCBhcmUgYXR0YWNoZWQgdG8gdGhlIGtleS4gSWYgYW55IGFyZVxyXG4gICAgICogc2F0aXNmaWVkLCBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlJZCAtIFRoZSBrZXkgaWQgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmRFdmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICB2YXIgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZSxcclxuICAgICAgICAgICAgaGlzdG9yeSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIGtleS5zZXF1ZW5jZXMgJiYga2V5LnNlcXVlbmNlc1tldmVudFR5cGVdICkge1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICkge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IGtleWJvYXJkLnByZXNzSGlzdG9yeTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBrZXlib2FyZC5yZWxlYXNlSGlzdG9yeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmb3IgZXZlcnkgc2VxdWVuY2UgaW4gdGhlIGtleVxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5LnNlcXVlbmNlc1tldmVudFR5cGVdLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXVtpXSBdO1xyXG4gICAgICAgICAgICAgICAgLy8gb25seSBjaGVjayBzZXF1ZW5jZSBpZiB0aGlzIGtleSBpcyB0aGUgTEFTVCBLRVlcclxuICAgICAgICAgICAgICAgIGlmICggc2VxdWVuY2UubGFzdEtleSA9PT0ga2V5SWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgaXNTZXF1ZW5jZVNhdGlzZmllZCggaGlzdG9yeSwgc2VxdWVuY2Uua2V5cyApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbCBrZXlzIGluIHNlcXVlbmNlIHNhdGlzZnkgY29uZGl0aW9ucywgZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIHNlcXVlbmNlLmNhbGxiYWNrcywgZXZlbnRUeXBlLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgRE9NIGtleWJvYXJkIGV2ZW50IGludG8gdGhlIHJlbGV2YW50XHJcbiAgICAgKiBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUga2V5Ym9hcmQgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIGtleSBlbnVtZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIGNoYXJDb2RlID0gZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZTtcclxuICAgICAgICByZXR1cm4gS2V5TWFwWyBjaGFyQ29kZSBdIHx8IGNoYXJDb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIGtleSBpZCBoYXMgYSBzaGlmdCBjb21wb25lbnQsIGlmIHRoZSBzaGlmdCBidXR0b25cclxuICAgICAqIGlzIGRvd24sIHJldHVybiB0aGUgc2hpZnQga2V5IGlkLiBPdGhlcndpc2UgcmV0dXJuIHRoZSBvcmlnaW5hbFxyXG4gICAgICoga2V5IGlkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IG1hcCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5SWQgLSBUaGUga2V5IGlkIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc2hpZnRlZCBvciBvcmlnaW5hbCBrZXkgaWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICkge1xyXG4gICAgICAgIHZhciBzaGlmdCA9IGtleXNbIEtleUVudW1zLlNISUZUIF07XHJcbiAgICAgICAgaWYgKCBzaGlmdCAmJiBzaGlmdC5zdGF0ZSA9PT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTaGlmdE1hcFsga2V5SWQgXSB8fCBrZXlJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSBwcmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcygga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICBrZXlJZCA9IHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICk7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICBrZXkuc3RhdGUgPSBcImRvd25cIjtcclxuICAgICAgICAgICAga2V5Ym9hcmQucHJlc3NIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSByZWxlYXNlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIGtleWJvYXJkICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJZCA9IGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgICAgIGtleTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3Mga2V5LCBwcmludHNjcmVlbiBrZXksIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXTtcclxuICAgICAgICAgICAgaWYgKCBrZXkgJiYga2V5LnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIGtleS5zdGF0ZSA9IFwidXBcIjtcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkOiBrZXlJZCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBrZXkuY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEga2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQGNsYXNzIEtleWJvYXJkXHJcbiAgICAgKiBAY2xhc3NkZXNjIEEga2V5Ym9hcmQgaW5wdXQgaGFuZGxpbmcgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBLZXlib2FyZCgpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbWJvcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2VxdWVuY2VzID0ge307XHJcbiAgICAgICAgdGhpcy5wcmVzc0hpc3RvcnkgPSBuZXcgQ2lyY3VsYXJBcnJheSggS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCApO1xyXG4gICAgICAgIHRoaXMucmVsZWFzZUhpc3RvcnkgPSBuZXcgQ2lyY3VsYXJBcnJheSggS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCApO1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGtleSBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcyggdGhpcyApICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgaGFuZGxlS2V5Ym9hcmRLZXlSZWxlYXNlKCB0aGlzICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIEtleWJvYXJkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUga2V5IGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgZW50cnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdLZXlib2FyZC5vbicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQub24nLCBpbnB1dCApO1xyXG4gICAgICAgIGV2ZW50cyA9IFV0aWwubm9ybWFsaXplRXZlbnRBcmdzKCAnS2V5Ym9hcmQub24nLCBldmVudHMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIGlzU2VxdWVuY2VJbnB1dCggZW50cnkgKSApIHtcclxuICAgICAgICAgICAgICAgIGFkZFNlcXVlbmNlKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpc0NvbWJpbmF0aW9uSW5wdXQoIGVudHJ5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRDb21iaW5hdGlvbiggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZEtleSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBLZXlib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGtleSBldmVudHMgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja3MgZnJvbS5cclxuICAgICAqL1xyXG4gICAgS2V5Ym9hcmQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgZW50cnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdLZXlib2FyZC5vZmYnLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLm9mZicsIGlucHV0ICk7XHJcbiAgICAgICAgZXZlbnRzID0gVXRpbC5ub3JtYWxpemVFdmVudEFyZ3MoICdLZXlib2FyZC5vZmYnLCBldmVudHMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIGlzU2VxdWVuY2VJbnB1dCggZW50cnkgKSApIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVNlcXVlbmNlKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpc0NvbWJpbmF0aW9uSW5wdXQoIGVudHJ5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDb21iaW5hdGlvbiggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUtleSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2xsIHRoZSBzdGF0ZXMgb2YgdGhlIHByb3ZpZGVkIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQG1lbWJlcm9mIEtleWJvYXJkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGtleUlkcyAtIFRoZSBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBzdGF0ZSBvZiB0aGUgcHJvdmlkZWQga2V5cy5cclxuICAgICAqL1xyXG4gICAgS2V5Ym9hcmQucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbigga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBzdGF0ZXMgPSB7fSxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBrZXlJZHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLnBvbGwnLCBrZXlJZHMgKTtcclxuICAgICAgICBpZiAoIGtleUlkcy5sZW5ndGggPT09IDEgKSB7XHJcbiAgICAgICAgICAgIGtleSA9IHRoaXMua2V5c1sga2V5SWRzWzBdIF07XHJcbiAgICAgICAgICAgIHJldHVybiBrZXkgPyBrZXkuc3RhdGUgOiAndXAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAga2V5ID0gdGhpcy5rZXlzWyBrZXlJZCBdO1xyXG4gICAgICAgICAgICBzdGF0ZXNbIGtleUlkIF0gPSBrZXkgPyBrZXkuc3RhdGUgOiAndXAnIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIEtleU1hcCA9IHJlcXVpcmUoJy4vS2V5TWFwJyksXHJcbiAgICAgICAgU2hpZnRNYXAgPSByZXF1aXJlKCcuL1NoaWZ0TWFwJyksXHJcbiAgICAgICAgS2V5cyA9IHt9LFxyXG4gICAgICAgIGtleUNvZGU7XHJcblxyXG4gICAgZm9yICgga2V5Q29kZSBpbiBLZXlNYXAgKSB7XHJcbiAgICAgICAgS2V5c1sgS2V5TWFwWyBrZXlDb2RlIF0gXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICgga2V5Q29kZSBpbiBTaGlmdE1hcCApIHtcclxuICAgICAgICBLZXlzWyBTaGlmdE1hcFsga2V5Q29kZSBdIF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5cztcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBhIERPTSBtb3VzZSBldmVudCBpbnRvIHRoZSByZWxldmFudFxyXG4gICAgICogYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gVGhlIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBldmVudCBlbnVtZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0TW91c2VCdXR0b25JZCggZXZlbnQgKSB7XHJcbiAgICAgICAgc3dpdGNoICggZXZlbnQuYnV0dG9uICkge1xyXG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBcImxlZnRcIjtcclxuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gXCJtaWRkbGVcIjtcclxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBidXR0b24gcHJlc3MgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBidXR0b24gc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VCdXR0b25QcmVzcyggYnV0dG9ucyApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uSWQgPSBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uO1xyXG4gICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBidXR0b24gaW5mbyBvYmplY3QgZXhpc3RzXHJcbiAgICAgICAgICAgIGJ1dHRvbiA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gPSBidXR0b25zWyBidXR0b25JZCBdIHx8IHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zdGF0ZSA9IFwiZG93blwiO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGJ1dHRvbi5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGJ1dHRvbiByZWxlYXNlIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUgaW5wdXQgc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSBidXR0b25zWyBidXR0b25JZCBdO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBwcm9jZXNzZWQgdGhlIGtleWRvd24gZXZlbnQsIHNvbWV0aW1lcyBkdWVcclxuICAgICAgICAgICAgLy8gdG8gZm9jdXMgaXNzdWVzICggd2luZG93cyBidXR0b24sIHByaW50c2NyZWVuIGJ1dHRvbiwgZXRjIClcclxuICAgICAgICAgICAgLy8gd2UgbWlzcyB0aGUgJ2tleWRvd24nIGV2ZW50IGFuZCBvbmx5IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gdGhlICdrZXl1cCdcclxuICAgICAgICAgICAgaWYgKCBidXR0b24gJiYgYnV0dG9uLnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uc3RhdGUgPSBcInVwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBtb3VzZSBtb3ZlbWVudCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vdXNlIC0gVGhlIG1vdXNlIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKCBtb3VzZSApIHtcclxuICAgICAgICB2YXIgbGFzdFBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnRzIHNvbWV0aW1lcyBmaXJlIHdoZW4gYSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZCwgYSBtb3VzZW1vdmVcclxuICAgICAgICAgICAgLy8gc2hvdWxkIG9ubHkgcXVldWUgYW4gZXZlbnQgaWYgdGhlIHBvc2l0aW9uIGhhcyBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIGlmICggbGFzdFBvc2l0aW9uICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID09PSBsYXN0UG9zaXRpb24ueCAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA9PT0gbGFzdFBvc2l0aW9uLnkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBsYXN0UG9zaXRpb24gKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2aW91c0NsaWVudFggPSBsYXN0UG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZpb3VzQ2xpZW50WSA9IGxhc3RQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggbW91c2UuY2FsbGJhY2tzLCBcIm1vdmVcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEgbW91c2Ugb2JqZWN0LlxyXG4gICAgICogQGNsYXNzIE1vdXNlXHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgbW91c2UgaW5wdXQgaGFuZGxpbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBhcmcgLSBUaGUgZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVycyB0by5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gTW91c2UoIGFyZyApIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuICAgICAgICB0aGlzLm1vdXNlID0ge307XHJcbiAgICAgICAgdmFyIGVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggYXJnICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGFyZyB8fCBkb2N1bWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUgYnV0dG9uIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgaGFuZGxlTW91c2VCdXR0b25QcmVzcyggdGhpcy5idXR0b25zICkgKTtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCB0aGlzLmJ1dHRvbnMgKSApO1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSggdGhpcy5tb3VzZSApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBNb3VzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUgYnV0dG9uIGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uIE9wdGlvbmFsLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbixcclxuICAgICAgICAgICAgbW91c2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBlbnRyeSxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgajtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdNb3VzZS5vbicsXHJcbiAgICAgICAgICAgIGlucHV0LCBbICdsZWZ0JywnbWlkZGxlJywncmlnaHQnLCdtb3ZlJyBdICk7XHJcbiAgICAgICAgZXZlbnRzID0gVXRpbC5ub3JtYWxpemVFdmVudEFyZ3MoICdNb3VzZS5vbicsIGV2ZW50cyApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBlbnRyeSA9PT0gXCJtb3ZlXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IHRoaXMubW91c2U7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MgPSBtb3VzZS5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZSA9IG1vdXNlLmNhbGxiYWNrcy5tb3ZlIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzLm1vdmUucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGo9MDsgajxldmVudHMubGVuZ3RoOyBqKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrcyA9IGJ1dHRvbi5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXSA9IGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIE1vdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBidXR0b24gZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uIE9wdGlvbmFsLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBidXR0b24sXHJcbiAgICAgICAgICAgIG1vdXNlLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGo7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdNb3VzZS5vZmYnLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ01vdXNlLm9mZicsXHJcbiAgICAgICAgICAgIGlucHV0LCBbICdsZWZ0JywnbWlkZGxlJywncmlnaHQnLCdtb3ZlJyBdICk7XHJcbiAgICAgICAgZXZlbnRzID0gVXRpbC5ub3JtYWxpemVFdmVudEFyZ3MoICdNb3VzZS5vZmYnLCBldmVudHMgKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggZW50cnkgPT09IFwibW92ZVwiICkge1xyXG4gICAgICAgICAgICAgICAgbW91c2UgPSB0aGlzLm1vdXNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBtb3VzZS5jYWxsYmFja3MgJiYgbW91c2UuY2FsbGJhY2tzLm1vdmUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzLm1vdmUuc3BsaWNlKCBtb3VzZS5jYWxsYmFja3MubW92ZS5pbmRleE9mKCBjYWxsYmFjayApICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqPTA7IGo8ZXZlbnRzLmxlbmd0aDsgaisrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggYnV0dG9uLmNhbGxiYWNrcyAmJiBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbGwgdGhlIHN0YXRlcyBvZiB0aGUgcHJvdmlkZWQgYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAbWVtYmVyb2YgTW91c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gYnV0dG9uSWRzIC0gVGhlIGJ1dHRvbiBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHN0YXRlIG9mIHRoZSBwcm92aWRlZCBidXR0b25zLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCBidXR0b25JZHMgKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IHt9LFxyXG4gICAgICAgICAgICBidXR0b25JZCxcclxuICAgICAgICAgICAgYnV0dG9uLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGJ1dHRvbklkcyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2UucG9sbCcsIGJ1dHRvbklkcywgWyAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnIF0gKTtcclxuICAgICAgICBpZiAoIGJ1dHRvbklkcy5sZW5ndGggPT09IDEgKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgYnV0dG9uSWRzWzBdIF07XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b24gPyBidXR0b24uc3RhdGUgOiAndXAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpPTA7IGk8YnV0dG9uSWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBidXR0b25JZCA9IGJ1dHRvbklkc1tpXTtcclxuICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBidXR0b25JZCBdO1xyXG4gICAgICAgICAgICBzdGF0ZXNbIGJ1dHRvbklkIF0gPSBidXR0b24gPyBidXR0b24uc3RhdGUgOiAndXAnIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBNb3VzZTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgICd+JzogJ2AnLFxyXG4gICAgICAgICchJzogJzEnLFxyXG4gICAgICAgICdAJzogJzInLFxyXG4gICAgICAgICcjJzogJzMnLFxyXG4gICAgICAgICckJzogJzQnLFxyXG4gICAgICAgICclJzogJzUnLFxyXG4gICAgICAgICdeJzogJzYnLFxyXG4gICAgICAgICcmJzogJzcnLFxyXG4gICAgICAgICcqJzogJzgnLFxyXG4gICAgICAgICcoJzogJzknLFxyXG4gICAgICAgICcpJzogJzAnLFxyXG4gICAgICAgICdfJzogJy0nLFxyXG4gICAgICAgICcrJzogJz0nLFxyXG5cclxuICAgICAgICAneyc6ICdbJyxcclxuICAgICAgICAnfSc6ICddJyxcclxuICAgICAgICAnfCc6ICdcXFxcJyxcclxuICAgICAgICAnOic6ICc7JyxcclxuICAgICAgICAnXCInOiAnXFwnJyxcclxuICAgICAgICAnPCc6ICcsJyxcclxuICAgICAgICAnPic6ICcuJyxcclxuICAgICAgICAnPyc6ICcvJyxcclxuXHJcbiAgICAgICAgJ2AnOiAnficsXHJcbiAgICAgICAgJzEnOiAnIScsXHJcbiAgICAgICAgJzInOiAnQCcsXHJcbiAgICAgICAgJzMnOiAnIycsXHJcbiAgICAgICAgJzQnOiAnJCcsXHJcbiAgICAgICAgJzUnOiAnJScsXHJcbiAgICAgICAgJzYnOiAnXicsXHJcbiAgICAgICAgJzcnOiAnJicsXHJcbiAgICAgICAgJzgnOiAnKicsXHJcbiAgICAgICAgJzknOiAnKCcsXHJcbiAgICAgICAgJzAnOiAnKScsXHJcbiAgICAgICAgJy0nOiAnXycsXHJcbiAgICAgICAgJz0nOiAnKycsXHJcblxyXG4gICAgICAgICdbJzogJ3snLFxyXG4gICAgICAgICddJzogJ30nLFxyXG4gICAgICAgICdcXFxcJzogJ3wnLFxyXG4gICAgICAgICc7JzogJzonLFxyXG4gICAgICAgICcnOiAnXCInLFxyXG4gICAgICAgICcsJzogJzwnLFxyXG4gICAgICAgICcuJzogJz4nLFxyXG4gICAgICAgICcvJzogJz8nLFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgdG91Y2ggZXZlbnQgYnkgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdG91Y2ggLSBUaGUgdG91Y2ggYWN0aW9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gLSBUaGUgYWN0aW9uIGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hBY3Rpb24oIHRvdWNoLCBhY3Rpb24gKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdG91Y2hbIGFjdGlvbiBdID0gdG91Y2hbIGFjdGlvbiBdIHx8IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbixcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdG91Y2hbIGFjdGlvbiBdLmNhbGxiYWNrcy5mb3JFYWNoKCBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayggZXZlbnQgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIHRvdWNoIG9iamVjdC5cclxuICAgICAqIEBjbGFzcyBUb3VjaFxyXG4gICAgICogQGNsYXNzZGVzYyBBIHRvdWNoIGlucHV0IGhhbmRsaW5nIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVG91Y2goKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IHt9O1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGJ1dHRvbiBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJzdGFydFwiICksIGZhbHNlICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGVuZFwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJlbmRcIiApLCBmYWxzZSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hjYW5jZWxcIiwgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsIFwiY2FuY2VsXCIgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNobGVhdmVcIiwgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsIFwibGVhdmVcIiApLCBmYWxzZSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2htb3ZlXCIsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCBcIm1vdmVcIiApLCBmYWxzZSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgVG91Y2hcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXRzIC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgVG91Y2gucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oIGlucHV0cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoLFxyXG4gICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ1RvdWNoLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0cyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnVG91Y2gub24nLFxyXG4gICAgICAgICAgICBpbnB1dHMsIFsgJ3N0YXJ0JywgJ2VuZCcsICdjYW5jZWwnLCAnbGVhdmUnLCAnbW92ZScgXSApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXRzW2ldO1xyXG4gICAgICAgICAgICB0b3VjaCA9IHRoaXMudG91Y2g7XHJcbiAgICAgICAgICAgIHRvdWNoWyBpbnB1dCBdID0gdG91Y2hbIGlucHV0IF0gfHwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogaW5wdXQsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3M6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRvdWNoWyBpbnB1dCBdLmNhbGxiYWNrcy5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBUb3VjaFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dHMgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBUb3VjaC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoLFxyXG4gICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgaW5wdXQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdUb3VjaC5vZmYnLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdUb3VjaC5vZmYnLFxyXG4gICAgICAgICAgICBpbnB1dHMsIFsgJ3N0YXJ0JywgJ2VuZCcsICdjYW5jZWwnLCAnbGVhdmUnLCAnbW92ZScgXSApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXRzW2ldO1xyXG4gICAgICAgICAgICB0b3VjaCA9IHRoaXMudG91Y2g7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdG91Y2hbIGlucHV0IF0uY2FsbGJhY2tzLmluZGV4T2YoIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIGlmICggdG91Y2hbIGlucHV0IF0gKSB7XHJcbiAgICAgICAgICAgICAgICB0b3VjaFsgaW5wdXQgXS5jYWxsYmFja3Muc3BsaWNlKCBpbmRleCwgMSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFRvdWNoO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2l2ZW4gYSBzdHJpbmcsIGNvbnZlcnRzIGl0IHRvIGxvd2VyY2FzZSBhbmQgcmVwbGFjZXMgYWxsXHJcbiAgICAgICAgICogc2VxdWVudGlhbCB3aGl0ZXNwYWNlIGludG8gYSBzaW5nbGUgc3BhY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBub3JtYWxpemUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbm9ybWFsaXplZCBzdHJpbmcuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9ybWFsaXplU3RyaW5nOiBmdW5jdGlvbiggc3RyICkge1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgLy8gc2V0IGFsbCB3aGl0ZXNwYWNlIHRvIGEgc2luZ2xlIHNwYWNlIGNoYXJhY3RlclxyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHNdL2csIFwiIFwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgdGhhdCBhIGZ1bmN0aW9uIGFyZ3VtZW50IGlzIGluZGVlZCBhIGZ1bmN0aW9uLiBJZiBpdCBpc1xyXG4gICAgICAgICAqIG5vdCwgbG9nIHRvIHRoZSBjb25zb2xlIGFuZCByZXR1cm4gdHJ1ZS4gT3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGZ1bmN0aW9uIGlzIGludmFsaWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tGdW5jdGlvbkFyZzogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgZnVuYyApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdjYWxsYmFjaycgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IG9mIHR5cGUgJ2Z1bmN0aW9uJywgY29tbWFuZCBpZ25vcmVkLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgYW5kIG5vcm1hbGl6ZXMgdGhlICdpbnB1dCcgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGlucHV0IC0gVGhlIGlucHV0IGFyZ3VtZW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbGlkSW5wdXQgLSBUaGUgcmVjb2duaXplZCBpbnB1dC4gT3B0aW9uYWwuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBub3JtYWxpemVkIGlucHV0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZUlucHV0QXJnczogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgaW5wdXQsIHZhbGlkSW5wdXQgKSB7XHJcbiAgICAgICAgICAgIHZhciBub3JtYWxpemVkSW5wdXRzID0gW10sXHJcbiAgICAgICAgICAgICAgICBpO1xyXG4gICAgICAgICAgICBpZiAoICEoIGlucHV0IGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gWyBpbnB1dCBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGlucHV0W2ldICE9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dCBpcyBub3QgYSBzdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIraW5wdXRbaV0rXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBvZiB0eXBlICdzdHJpbmcnLCBhcmd1bWVudCByZW1vdmVkLlwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhbGlkSW5wdXQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWxpZElucHV0LmluZGV4T2YoIGlucHV0W2ldICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIraW5wdXRbaV0rXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBhIHJlY29nbml6ZWQgaW5wdXQgdHlwZSwgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRzLnB1c2goIHRoaXMubm9ybWFsaXplU3RyaW5nKCBpbnB1dFtpXSApICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIENoZWNrcyBhbmQgbm9ybWFsaXplcyB0aGUgJ2V2ZW50cycgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudHMgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBub3JtYWxpemVkIGlucHV0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZUV2ZW50QXJnczogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgZXZlbnRzICkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgaWYgKCAhZXZlbnRzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gWyAncHJlc3MnIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAhKCBldmVudHMgaW5zdGFuY2VvZiBBcnJheSApICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gWyBldmVudHMgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBldmVudHNbaV0gIT09ICdwcmVzcycgJiZcclxuICAgICAgICAgICAgICAgICAgICBldmVudHNbaV0gIT09ICdyZWxlYXNlJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBldmVudCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitldmVudHNbaV0rXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBhIHJlY29nbml6ZWQgZXZlbnQgdHlwZSwgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudHNbaV0gPSB0aGlzLm5vcm1hbGl6ZVN0cmluZyggZXZlbnRzW2ldICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeGVjdXRlIHRoZSBmdW5jdGlvbnMgaW4gdGhlIGNhbGxiYWNrcyBvYmplY3QgdGhhdCBtYXRjaCB0aGVcclxuICAgICAgICAgKiBwcm92aWRlZCBldmVudCB0eXBlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrcyAtIFRoZSBjYWxsYmFja3Mgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSBzdHJpbmcuXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgbmF0aXZlIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlQ2FsbGJhY2tzOiBmdW5jdGlvbiggY2FsbGJhY2tzLCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgaWYgKCAhY2FsbGJhY2tzIHx8ICFjYWxsYmFja3NbIGV2ZW50VHlwZSBdICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrc1sgZXZlbnRUeXBlIF07XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxjYWxsYmFja3MubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0oIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bG9zIGZ1bmN0aW9uIHRoYXQgc3VwcG9ydHMgbmVnYXRpdmUgbnVtYmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBUaGUgbnVtYmVyIHRvIG1vZHVsby5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtIFRoZSBtb2R1bG9zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gVGhlIHJlc3VsdGluZyBudW1iZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbW9kOiBmdW5jdGlvbiggbnVtLCBuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCAoIG51bSAlIG4gKSArIG4gKSAlIG47XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgb2JqZWN0IGhhcyBubyBhdHRyaWJ1dGVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gdGVzdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgaGFzIGtleXMsIGZhbHNlIGlmIG5vdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICB2YXIga2V5O1xyXG4gICAgICAgICAgICBmb3IgKCBrZXkgaW4gb2JqICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBvYmouaGFzT3duUHJvcGVydHkoIGtleSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiJdfQ==
