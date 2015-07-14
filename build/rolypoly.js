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
            touch.start = touch[ action ] || {
                type: action,
                callbacks: []
            };
            Util.executeCallbacks( touch.callbacks, action, event );
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
        inputs, [ 'start','end','cancel','leave', 'move' ] );
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
        inputs, [ 'start','end','cancel','leave', 'move' ] );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXhwb3J0cy5qcyIsInNyYy9DaXJjdWxhckFycmF5LmpzIiwic3JjL0tleUVudW1zLmpzIiwic3JjL0tleU1hcC5qcyIsInNyYy9LZXlib2FyZC5qcyIsInNyYy9LZXlzLmpzIiwic3JjL01vdXNlLmpzIiwic3JjL1NoaWZ0TWFwLmpzIiwic3JjL1RvdWNoLmpzIiwic3JjL1V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIEtleWJvYXJkOiByZXF1aXJlKCcuL0tleWJvYXJkJyksXHJcbiAgICAgICAgTW91c2U6IHJlcXVpcmUoJy4vTW91c2UnKSxcclxuICAgICAgICBUb3VjaDogcmVxdWlyZSgnLi9Ub3VjaCcpXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIGNpcmN1bGFyIGFycmF5IG9iamVjdC5cclxuICAgICAqIEBjbGFzcyBDaXJjdWxhckFycmF5XHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgc2ltcGxlIGNpcmN1bGFyIGFycmF5IHRoYXQgaXMgYWxsb2NhdGVkIHRvIGEgZml4ZWQgc2l6ZS5cclxuICAgICAqICAgICBXaGVuIGVsZW1lbnRzIGFyZSBwdXNoZWQgYmV5b25kIGl0cyBhbGxvY2F0ZWQgbGVuZ3RoLCB0aGV5XHJcbiAgICAgKiAgICAgd2lsbCBpbnN0ZWFkIG92ZXJ3cml0ZSBleHN0aW5nIGluZGljZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBsZW5ndGggb2YgdGhlIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBDaXJjdWxhckFycmF5KCBsZW5ndGggKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIHx8IDI1NjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheSggbGVuZ3RoICk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoIGFuIGVsZW1lbnQgdG8gdGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGFycmF5LlxyXG4gICAgICogQG1lbWJlcm9mIENpcmN1bGFyQXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgLSBUaGUgZGF0YSB0byBpbnNlcnQgaW50byB0aGUgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIENpcmN1bGFyQXJyYXkucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlclsgdGhpcy5pbmRleCBdID0gZGF0YTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gKHRoaXMuaW5kZXggKyAxKSAlIHRoaXMubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbW9zdCByZWNlbnRseSBwdXNoZWQgZWxlbWVudC4gQW4gaW5kZXggb2Zmc2V0IG1heVxyXG4gICAgICogYmUgcHJvdmlkZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2lyY3VsYXJBcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgLSBBbiBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCBpbmRleC4gT3B0aW9uYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9IFRoZSBtb3N0IHJlY2VudGx5IHB1c2hlZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24oIG9mZnNldCApIHtcclxuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgPyBvZmZzZXQgOiAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclsgVXRpbC5tb2QoIHRoaXMuaW5kZXgtMS1vZmZzZXQsIHRoaXMubGVuZ3RoICkgXTtcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDaXJjdWxhckFycmF5O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgQkFDS1NQQUNFOiAnYmFja3NwYWNlJyxcclxuICAgICAgICBUQUI6ICd0YWInLFxyXG4gICAgICAgIEVOVEVSOiAnZW50ZXInLFxyXG4gICAgICAgIFNISUZUOiAnc2hpZnQnLFxyXG4gICAgICAgIENUUkw6ICdjdHJsJyxcclxuICAgICAgICBBTFQ6ICdhbHQnLFxyXG4gICAgICAgIFBBVVNFX0JSRUFLOiAncGF1c2VicmVhaycsXHJcbiAgICAgICAgQ0FQU19MT0NLOiAnY2Fwc2xvY2snLFxyXG4gICAgICAgIEVTQzogJ2VzYycsXHJcbiAgICAgICAgUEFHRV9VUDogJ3BhZ2V1cCcsXHJcbiAgICAgICAgUEFHRV9ET1dOOiAncGFnZWRvd24nLFxyXG4gICAgICAgIEVORDogJ2VuZCcsXHJcbiAgICAgICAgSE9NRTogJ2hvbWUnLFxyXG4gICAgICAgIExFRlRfQVJST1c6ICdsZWZ0JyxcclxuICAgICAgICBVUF9BUlJPVzogJ3VwJyxcclxuICAgICAgICBSSUdIVF9BUlJPVzogJ3JpZ2h0JyxcclxuICAgICAgICBET1dOX0FSUk9XOiAnZG93bicsXHJcbiAgICAgICAgUFJJTlRfU0NSRUVOOiAncHJpbnRzY3JlZW4nLFxyXG4gICAgICAgIElOU0VSVDogJ2luc2VydCcsXHJcbiAgICAgICAgREVMRVRFOiAnZGVsZXRlJyxcclxuICAgICAgICBXSU5ET1dTOiAnd2luZG93cycsXHJcbiAgICAgICAgU0VMRUNUOiAnc2VsZWN0JyxcclxuICAgICAgICBTUEFDRV9CQVI6ICdzcGFjZScsXHJcbiAgICAgICAgTlVNX0xPQ0s6ICdudW1sb2NrJyxcclxuICAgICAgICBTQ1JPTExfTE9DSzogJ3Njcm9sbGxvY2snLFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBLZXlFbnVtcyA9IHJlcXVpcmUoJy4vS2V5RW51bXMnKTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJzgnOiBLZXlFbnVtcy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgJzknOiBLZXlFbnVtcy5UQUIsXHJcbiAgICAgICAgJzEzJzogS2V5RW51bXMuRU5URVIsXHJcbiAgICAgICAgJzE2JzogS2V5RW51bXMuU0hJRlQsXHJcbiAgICAgICAgJzE3JzogS2V5RW51bXMuQ1RSTCxcclxuICAgICAgICAnMTgnOiBLZXlFbnVtcy5BTFQsXHJcbiAgICAgICAgJzE5JzogS2V5RW51bXMuUEFVU0VfQlJFQUssXHJcbiAgICAgICAgJzIwJzogS2V5RW51bXMuQ0FQU19MT0NLLFxyXG4gICAgICAgICcyNyc6IEtleUVudW1zLkVTQyxcclxuICAgICAgICAnMzInOiBLZXlFbnVtcy5TUEFDRV9CQVIsXHJcbiAgICAgICAgJzMzJzogS2V5RW51bXMuUEFHRV9VUCxcclxuICAgICAgICAnMzQnOiBLZXlFbnVtcy5QQUdFX0RPV04sXHJcbiAgICAgICAgJzM1JzogS2V5RW51bXMuRU5ELFxyXG4gICAgICAgICczNic6IEtleUVudW1zLkhPTUUsXHJcbiAgICAgICAgJzM3JzogS2V5RW51bXMuTEVGVF9BUlJPVyxcclxuICAgICAgICAnMzgnOiBLZXlFbnVtcy5VUF9BUlJPVyxcclxuICAgICAgICAnMzknOiBLZXlFbnVtcy5SSUdIVF9BUlJPVyxcclxuICAgICAgICAnNDAnOiBLZXlFbnVtcy5ET1dOX0FSUk9XLFxyXG4gICAgICAgICc0NCc6IEtleUVudW1zLlBSSU5UX1NDUkVFTixcclxuICAgICAgICAnNDUnOiBLZXlFbnVtcy5JTlNFUlQsXHJcbiAgICAgICAgJzQ2JzogS2V5RW51bXMuREVMRVRFLFxyXG4gICAgICAgICc0OCc6ICcwJyxcclxuICAgICAgICAnNDknOiAnMScsXHJcbiAgICAgICAgJzUwJzogJzInLFxyXG4gICAgICAgICc1MSc6ICczJyxcclxuICAgICAgICAnNTInOiAnNCcsXHJcbiAgICAgICAgJzUzJzogJzUnLFxyXG4gICAgICAgICc1NCc6ICc2JyxcclxuICAgICAgICAnNTUnOiAnNycsXHJcbiAgICAgICAgJzU2JzogJzgnLFxyXG4gICAgICAgICc1Nyc6ICc5JyxcclxuICAgICAgICAnNjUnOiAnYScsXHJcbiAgICAgICAgJzY2JzogJ2InLFxyXG4gICAgICAgICc2Nyc6ICdjJyxcclxuICAgICAgICAnNjgnOiAnZCcsXHJcbiAgICAgICAgJzY5JzogJ2UnLFxyXG4gICAgICAgICc3MCc6ICdmJyxcclxuICAgICAgICAnNzEnOiAnZycsXHJcbiAgICAgICAgJzcyJzogJ2gnLFxyXG4gICAgICAgICc3Myc6ICdpJyxcclxuICAgICAgICAnNzQnOiAnaicsXHJcbiAgICAgICAgJzc1JzogJ2snLFxyXG4gICAgICAgICc3Nic6ICdsJyxcclxuICAgICAgICAnNzcnOiAnbScsXHJcbiAgICAgICAgJzc4JzogJ24nLFxyXG4gICAgICAgICc3OSc6ICdvJyxcclxuICAgICAgICAnODAnOiAncCcsXHJcbiAgICAgICAgJzgxJzogJ3EnLFxyXG4gICAgICAgICc4Mic6ICdyJyxcclxuICAgICAgICAnODMnOiAncycsXHJcbiAgICAgICAgJzg0JzogJ3QnLFxyXG4gICAgICAgICc4NSc6ICd1JyxcclxuICAgICAgICAnODYnOiAndicsXHJcbiAgICAgICAgJzg3JzogJ3cnLFxyXG4gICAgICAgICc4OCc6ICd4JyxcclxuICAgICAgICAnODknOiAneScsXHJcbiAgICAgICAgJzkwJzogJ3onLFxyXG4gICAgICAgICc5MSc6IEtleUVudW1zLldJTkRPV1MsXHJcbiAgICAgICAgJzkyJzogS2V5RW51bXMuV0lORE9XUyxcclxuICAgICAgICAnOTMnOiBLZXlFbnVtcy5TRUxFQ1QsXHJcbiAgICAgICAgJzk2JzogJzAnLFxyXG4gICAgICAgICc5Nyc6ICcxJyxcclxuICAgICAgICAnOTgnOiAnMicsXHJcbiAgICAgICAgJzk5JzogJzMnLFxyXG4gICAgICAgICcxMDAnOiAnNCcsXHJcbiAgICAgICAgJzEwMSc6ICc1JyxcclxuICAgICAgICAnMTAyJzogJzYnLFxyXG4gICAgICAgICcxMDMnOiAnNycsXHJcbiAgICAgICAgJzEwNCc6ICc4JyxcclxuICAgICAgICAnMTA1JzogJzknLFxyXG4gICAgICAgICcxMDYnOiAnKicsXHJcbiAgICAgICAgJzEwNyc6ICcrJyxcclxuICAgICAgICAnMTA5JzogJy0nLFxyXG4gICAgICAgICcxMTAnOiAnLicsXHJcbiAgICAgICAgJzExMSc6ICcvJyxcclxuICAgICAgICAnMTEyJzogJ2YxJyxcclxuICAgICAgICAnMTEzJzogJ2YyJyxcclxuICAgICAgICAnMTE0JzogJ2YzJyxcclxuICAgICAgICAnMTE1JzogJ2Y0JyxcclxuICAgICAgICAnMTE2JzogJ2Y1JyxcclxuICAgICAgICAnMTE3JzogJ2Y2JyxcclxuICAgICAgICAnMTE4JzogJ2Y3JyxcclxuICAgICAgICAnMTE5JzogJ2Y4JyxcclxuICAgICAgICAnMTIwJzogJ2Y5JyxcclxuICAgICAgICAnMTIxJzogJ2YxMCcsXHJcbiAgICAgICAgJzEyMic6ICdmMTEnLFxyXG4gICAgICAgICcxMjMnOiAnZjEyJyxcclxuICAgICAgICAnMTQ0JzogS2V5RW51bXMuTlVNX0xPQ0ssXHJcbiAgICAgICAgJzE0NSc6IEtleUVudW1zLlNDUk9MTF9MT0NLLFxyXG4gICAgICAgICcxODYnOiAnOicsXHJcbiAgICAgICAgJzE4Nyc6ICc9JyxcclxuICAgICAgICAnMTg4JzogJywnLFxyXG4gICAgICAgICcxODknOiAnLScsXHJcbiAgICAgICAgJzE5MCc6ICcuJyxcclxuICAgICAgICAnMTkxJzogJy8nLFxyXG4gICAgICAgICcxOTInOiAnYCcsXHJcbiAgICAgICAgJzIxOSc6ICdbJyxcclxuICAgICAgICAnMjIwJzogJ1xcXFwnLFxyXG4gICAgICAgICcyMjEnOiAnXScsXHJcbiAgICAgICAgJzIyMic6ICdcXCcnXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKSxcclxuICAgICAgICBLZXlzID0gcmVxdWlyZSgnLi9LZXlzJyksXHJcbiAgICAgICAgS2V5RW51bXMgPSByZXF1aXJlKCcuL0tleUVudW1zJyksXHJcbiAgICAgICAgS2V5TWFwID0gcmVxdWlyZSgnLi9LZXlNYXAnKSxcclxuICAgICAgICBTaGlmdE1hcCA9IHJlcXVpcmUoJy4vU2hpZnRNYXAnKSxcclxuICAgICAgICBDaXJjdWxhckFycmF5ID0gcmVxdWlyZSgnLi9DaXJjdWxhckFycmF5JyksXHJcbiAgICAgICAgU0VRVUVOQ0VfVElNRU9VVCA9IDgwMCxcclxuICAgICAgICBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIID0gNjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncyBhcmUgcmVjb2duaXplZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlJZHMgLSBUaGUga2V5IGlucHV0IGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGtleSBpZHMgYXJlIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja0tleUlkcyggZnVuY3Rpb25OYW1lLCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaWYgKCAhS2V5c1sga2V5SWRzW2ldIF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIra2V5SWRzW2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3QgYSByZWNvZ25pemVkIGV2ZW50IHR5cGUsIGNvbW1hbmQgaWdub3JlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyByZWNvZ25pemVkIGFzIGEga2V5IHNlcXVlbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGlucHV0IGlzIGEga2V5IHNlcXVlbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1NlcXVlbmNlSW5wdXQoIGlucHV0ICkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dC5zcGxpdCgnICcpLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBzZXF1ZW5jZSBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlS2V5LnNwbGl0KCcgJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIHJlY29nbml6ZWQgYXMgYSBrZXkgY29tYmluYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgaW5wdXQgaXMgYSBrZXkgY29tYmluYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzQ29tYmluYXRpb25JbnB1dCggaW5wdXQgKSB7XHJcbiAgICAgICAgcmV0dXJuICggaW5wdXQubGVuZ3RoID4gMSApID8gaW5wdXQuc3BsaXQoJysnKS5sZW5ndGggPiAxIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBjb21iaW5hdGlvbiBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjb21ib0tleS5zcGxpdCgvXFwrXFwrXFwrfFxcK1xcKy8pLFxyXG4gICAgICAgICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBteSBsYWNrIG9mIHJlZ2V4IGtub3dsZWRnZSBpcyBzaGFtZWZ1bFxyXG4gICAgICAgIGlmICggdGVtcC5sZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8dGVtcC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggdGVtcFtpXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCggJysnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KCB0ZW1wW2ldLnNwbGl0KCcrJykgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGkgIT09IHRlbXAubGVuZ3RoLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCAnKycgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjb21ib0tleS5zcGxpdCgnKycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBzZXF1ZW5jZSBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgYmluZHMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRTZXF1ZW5jZSgga2V5Ym9hcmQsIHNlcXVlbmNlS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9uJywga2V5SWRzICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcXVlbmNlIGVudHJ5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3RcclxuICAgICAgICBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0gPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0gfHwge1xyXG4gICAgICAgICAgICBrZXlzOiBrZXlJZHMsXHJcbiAgICAgICAgICAgIGxhc3RLZXk6IGtleUlkc1sga2V5SWRzLmxlbmd0aCAtIDFdLCAvLyBzdG9yZSB0aGUgbGFzdCBrZXkgb2YgdGhlIHNlcXVlbmNlXHJcbiAgICAgICAgICAgIGNhbGxiYWNrczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdO1xyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBzZXF1ZW5jZS5jYWxsYmFja3NbIGV2ZW50IF0gPSBzZXF1ZW5jZS5jYWxsYmFja3NbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgIHNlcXVlbmNlLmNhbGxiYWNrc1sgZXZlbnQgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHNlcXVlbmNlIGtleSB1bmRlciBlYWNoIGtleSBmb3IgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXMgPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzWyBldmVudCBdID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleXNbIGtleUlkIF0uc2VxdWVuY2VzWyBldmVudCBdLmluZGV4T2YoIHNlcXVlbmNlS2V5ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF0ucHVzaCggc2VxdWVuY2VLZXkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcXVlbmNlIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5IHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZXF1ZW5jZSgga2V5Ym9hcmQsIHNlcXVlbmNlS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub2ZmJywga2V5SWRzICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3Igc2VxdWVuY2VcclxuICAgICAgICBpZiAoICFzZXF1ZW5jZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gc2VxdWVuY2UuY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrcyAmJiBjYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBjYWxsYmFja3NbIGV2ZW50IF0uaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrc1sgZXZlbnQgXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnQgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgdGhlIHNlcXVlbmNlLCBkZWxldGUgdGhlIHNlcXVlbmNlXHJcbiAgICAgICAgLy8gYW5kIHJlbW92ZSBzZXF1ZW5jZSBmcm9tIGFsbCBrZXlzXHJcbiAgICAgICAgaWYgKCBVdGlsLmlzRW1wdHkoIHNlcXVlbmNlLmNhbGxiYWNrcyApICkge1xyXG4gICAgICAgICAgICBkZWxldGUgc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdO1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBpbnN0YW5jZXMgb2YgdGhlIHNlcXVlbmNlLCByZW1vdmUgZnJvbSBrZXlzXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleXNbIGtleUlkIF0uc2VxdWVuY2VzWyBldmVudCBdOyAvLyByZS1hc3NpZ25pbmcgc2VxdWVuY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VzLnNwbGljZSggc2VxdWVuY2VzLmluZGV4T2YoIHNlcXVlbmNlS2V5ICksIDEgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgY29tYmluYXRpb24ga2V5IHRvIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIGJpbmRzXHJcbiAgICAgKiB0aGUgY2FsbGJhY2sgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleSB0byBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkQ29tYmluYXRpb24oIGtleWJvYXJkLCBjb21ib0tleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY29tYm8sXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vbicsIGtleUlkcyApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNyZWF0ZSBjb21iaW5hdGlvbiBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgY29tYm9zWyBjb21ib0tleSBdID0gY29tYm9zWyBjb21ib0tleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb21ibyA9IGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY29tYm8uY2FsbGJhY2tzWyBldmVudCBdID0gY29tYm8uY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjb21iby5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBjb21iaW5hdGlvbiBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLmNvbWJvc1sgZXZlbnQgXSA9IGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdICB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGlmICgga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF0gLmluZGV4T2YoIGNvbWJvS2V5ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF0ucHVzaCggY29tYm9LZXkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBjb21iaW5hdGlvbiBrZXkgZnJvbSB0aGUgS2V5Ym9hcmQgb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleSB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ29tYmluYXRpb24oIGtleWJvYXJkLCBjb21ib0tleSwgZXZlbnRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGNvbWJvS2V5IF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9mZicsIGtleUlkcyApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIGNvbWJvXHJcbiAgICAgICAgaWYgKCAhY29tYm8gKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNvbWJvLmNhbGxiYWNrcztcclxuICAgICAgICAgICAgaWYgKCBjYWxsYmFja3MgJiYgY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja3NbIGV2ZW50IF0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50IF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBjb21ibywgZGVsZXRlIHRoZSBjb21ib1xyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgY29tYm8gZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBjb21iby5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBjb21ibywgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbWJvcyA9IGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdOyAvLyByZS1hc3NpZ25pbmcgY29tYm9zXHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zLnNwbGljZSggY29tYm9zLmluZGV4T2YoIGNvbWJvS2V5ICksIDEgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjYWxsYmFjayB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0IGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlJZCAtIFRoZSBrZXkgaWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZEtleSgga2V5Ym9hcmQsIGtleUlkLCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge30sXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9uJywgWyBrZXlJZCBdICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGtleS5jYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICBrZXkuY2FsbGJhY2tzWyBldmVudCBdID0ga2V5LmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAga2V5LmNhbGxiYWNrc1sgZXZlbnQgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBjYWxsYmFjayBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmcm9tLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUtleSgga2V5Ym9hcmQsIGtleUlkLCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vZmYnLCBbIGtleUlkIF0gKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBrZXlcclxuICAgICAgICBpZiAoICFrZXkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGtleS5jYWxsYmFja3M7XHJcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2tzICYmIGNhbGxiYWNrc1sgZXZlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnQgXS5zcGxpY2UoIGNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2tzWyBldmVudCBdLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbGwgdGhlIGtleXMgaW4gdGhlIGNvbWJpbmF0aW9uIGFyZVxyXG4gICAgICogb2YgdGhlIHJlcXVpcmVkIHN0YXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tYm8gLSBUaGUgY29tYmluYXRpb24gZW50cnkuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gY2hlY2sgZm9yLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgY29tYmluYXRpb24gaXMgc2F0aXNmaWVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIGV2ZW50VHlwZSApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleUlkcyA9IGNvbWJvLmtleXMsXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBrZXkgaW4gdGhlIGNvbWJvXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWRzW2ldIF07XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBrZXkgZG9lcyBub3QgaGF2ZSBhIHN0YXRlLCB0aGUgY29tYm8gZmFpbHNcclxuICAgICAgICAgICAgaWYgKCAha2V5ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGEgXCJyZWxlYXNlXCIgY29tYm8gY2FuIG9ubHkgYmUgdHJpZ2dlcmVkIGlmIHRoZSBrZXlzIGhhZCBhbGxcclxuICAgICAgICAgICAgLy8gYmVlbiBkb3duIHRvZ2V0aGVyIGF0IG9uZSBwb2ludFxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJyZWxlYXNlXCIgJiZcclxuICAgICAgICAgICAgICAgICAoICFjb21iby5wcmVzc2VkIHx8IGtleS5zdGF0ZSAhPT0gXCJ1cFwiICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYSBcInByZXNzXCIgY29tYm8gb25seSBuZWVkcyBhbGwga2V5cyB0byBiZSBkb3duIHRvZ2V0aGVyXHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgJiYga2V5LnN0YXRlICE9PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICkge1xyXG4gICAgICAgICAgICAvLyBmbGFnIHRoYXQgYWxsIGtleXMgaGF2ZSBiZWVuIGRvd25cclxuICAgICAgICAgICAgY29tYm8ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICggZXZlbnRUeXBlID09PSBcInJlbGVhc2VcIiApIHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGZsYWdcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvLnByZXNzZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIGNvbWJpbmF0aW9ucyB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUga2V5LiBJZiBhbnkgYXJlXHJcbiAgICAgKiBzYXRpc2ZpZWQsIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmRFdmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBjb21ib3MgPSBrZXlib2FyZC5jb21ib3MsXHJcbiAgICAgICAgICAgIGNvbWJvLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICgga2V5LmNvbWJvcyApIHtcclxuICAgICAgICAgICAgLy8gcmVsZWFzZSBjb21iaW5hdGlvbiBldmVudHMgcmVxdWlyZSBwcmVzcyBjb21iaW5hdGlvbiBldmVudHMgdG9cclxuICAgICAgICAgICAgLy8gYmUgdHJhY2tlZCwgdGhlcmVmb3JlIGlmIGEgcHJlc3MgZXZlbnQgb2NjdXJzIHRoYXQgaXMgcGFydCBvZiBhXHJcbiAgICAgICAgICAgIC8vIGNvbWJpbmF0aW9uIGl0IE1VU1QgYmUgcHJvY2Vzc2VkLCByZWdhcmRsZXNzIGlmIHRoZXJlIGlzIGFcclxuICAgICAgICAgICAgLy8gY2FsbGJhY2suXHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSBwcmVzcyBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5wcmVzcyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgY29tYm8gaW4gdGhlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuY29tYm9zLnByZXNzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sga2V5LmNvbWJvcy5wcmVzc1tpXSBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgXCJwcmVzc1wiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBjb21ibyBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGNvbWJvLmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcmVsZWFzZSBjYWxsYmFja3MsIGlnbm9yZSBjYWxsYmFja3MgYXMgdGhpcyBpc24ndFxyXG4gICAgICAgICAgICAgICAgLy8gYSByZWxlYXNlIGV2ZW50IGJ1dCBpcyByZXF1aXJlZCBmb3IgcmVsZWFzZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5yZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgcmVsZWFzZSBldmVudHMgdG8gZmxhZyB0aGV5IGhhdmUgYmVlbiBwcmVzc2VkIHByaW9yXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IGNvbWJvIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpPTA7IGk8a2V5LmNvbWJvcy5yZWxlYXNlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sga2V5LmNvbWJvcy5yZWxlYXNlW2ldIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgY29tYm8gYnV0IGRvbid0IGV4ZWN1dGUgYW55IGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIFwicHJlc3NcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIHJlbGVhc2UgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleS5jb21ib3MucmVsZWFzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgY29tYm8gaW4gdGhlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuY29tYm9zLnJlbGVhc2UubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJvID0gY29tYm9zWyBrZXkuY29tYm9zLnJlbGVhc2VbaV0gXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIFwicmVsZWFzZVwiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBjb21ibyBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGNvbWJvLmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlcyB0d28gdGltZXN0YW1wcywgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGV5IG9jY3VyXHJcbiAgICAgKiB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwgZnJvbSBlYWNob3RoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZpb3VzVGltZXN0YW1wIC0gVGhlIHByZXZpb3VzIHRpbWVzdG1hcC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXAgLSBUaGUgdGltZXN0bWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGV5IGFyZSB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzV2l0aGluVGltZW91dCggcHJldmlvdXNUaW1lc3RhbXAsIHRpbWVzdGFtcCApIHtcclxuICAgICAgICB2YXIgZGVsdGE7XHJcbiAgICAgICAgaWYgKCAhcHJldmlvdXNUaW1lc3RhbXAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWx0YSA9IHByZXZpb3VzVGltZXN0YW1wIC0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJldHVybiBkZWx0YSA8IFNFUVVFTkNFX1RJTUVPVVQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFsbCB0aGUga2V5cyBpbiB0aGUgc2VxdWVuY2UgaGF2ZSBiZWVuXHJcbiAgICAgKiBwcmVzc2VkIG9yIHJlbGVhc2VkIChkZXBlbmRpbmcgb24gdGhlIGV2ZW50IHR5cGUpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGhpc3RvcnkgLSBUaGUga2V5IGV2ZW50IGhpc3RvcnkgYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlJZHMgLSBUaGUgc2VxdWVuY2Uga2V5IGlkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHNlcXVlbmNlIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNTZXF1ZW5jZVNhdGlzZmllZCggaGlzdG9yeSwga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c1RpbWVzdGFtcCxcclxuICAgICAgICAgICAgc2VxdWVuY2VLZXksXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaSwgajtcclxuICAgICAgICAvLyBkZWJ1Z0NpcmN1bGFyKCBoaXN0b3J5LCBrZXlJZHMubGVuZ3RoKzUgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBrZXkgaW4gdGhlIGNvbWJvXHJcbiAgICAgICAgZm9yICggaT0wLCBqPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrLCBqKysgKSB7XHJcbiAgICAgICAgICAgIHNlcXVlbmNlS2V5ID0ga2V5SWRzWyBrZXlJZHMubGVuZ3RoLTEtaSBdO1xyXG4gICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHNoaWZ0IGtleXNcclxuICAgICAgICAgICAgd2hpbGUgKCBzZXF1ZW5jZUtleSAhPT0gXCJzaGlmdFwiICYmXHJcbiAgICAgICAgICAgICAgICBrZXkgJiZcclxuICAgICAgICAgICAgICAgIGtleS5rZXlJZCA9PT0gXCJzaGlmdFwiICkge1xyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICAgICAga2V5ID0gaGlzdG9yeS5iYWNrKCBqICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2VlIGlmIGl0IGlzIHRoZSBjb3JyZWN0IHN0YXRlXHJcbiAgICAgICAgICAgIGlmICggIWtleSB8fCAvLyBubyBrZXlcclxuICAgICAgICAgICAgICAgICBrZXkua2V5SWQgIT09IHNlcXVlbmNlS2V5IHx8IC8vIGhhcyBub3QgYmVlbiBwcmVzc2VkXHJcbiAgICAgICAgICAgICAgICAgIWlzV2l0aGluVGltZW91dCggcHJldmlvdXNUaW1lc3RhbXAsIGtleS50aW1lc3RhbXAgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91c1RpbWVzdGFtcCA9IGtleS50aW1lc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIHNlcXVlbmNlcyB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUga2V5LiBJZiBhbnkgYXJlXHJcbiAgICAgKiBzYXRpc2ZpZWQsIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleUlkIC0gVGhlIGtleSBpZCBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gY2hlY2sgZm9yLlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBLZXlib2FyZEV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlLFxyXG4gICAgICAgICAgICBoaXN0b3J5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICgga2V5LnNlcXVlbmNlcyAmJiBrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV0gKSB7XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucHJlc3NIaXN0b3J5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZvciBldmVyeSBzZXF1ZW5jZSBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV0ubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlc1sga2V5LnNlcXVlbmNlc1tldmVudFR5cGVdW2ldIF07XHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNoZWNrIHNlcXVlbmNlIGlmIHRoaXMga2V5IGlzIHRoZSBMQVNUIEtFWVxyXG4gICAgICAgICAgICAgICAgaWYgKCBzZXF1ZW5jZS5sYXN0S2V5ID09PSBrZXlJZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICBpc1NlcXVlbmNlU2F0aXNmaWVkKCBoaXN0b3J5LCBzZXF1ZW5jZS5rZXlzICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gc2VxdWVuY2Ugc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggc2VxdWVuY2UuY2FsbGJhY2tzLCBldmVudFR5cGUsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYSBET00ga2V5Ym9hcmQgZXZlbnQgaW50byB0aGUgcmVsZXZhbnRcclxuICAgICAqIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBrZXlib2FyZCBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUga2V5IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRLZXlib2FyZEtleUlkKCBldmVudCApIHtcclxuICAgICAgICB2YXIgY2hhckNvZGUgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIHJldHVybiBLZXlNYXBbIGNoYXJDb2RlIF0gfHwgY2hhckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUga2V5IGlkIGhhcyBhIHNoaWZ0IGNvbXBvbmVudCwgaWYgdGhlIHNoaWZ0IGJ1dHRvblxyXG4gICAgICogaXMgZG93biwgcmV0dXJuIHRoZSBzaGlmdCBrZXkgaWQuIE90aGVyd2lzZSByZXR1cm4gdGhlIG9yaWdpbmFsXHJcbiAgICAgKiBrZXkgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgbWFwIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlJZCAtIFRoZSBrZXkgaWQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzaGlmdGVkIG9yIG9yaWdpbmFsIGtleSBpZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKSB7XHJcbiAgICAgICAgdmFyIHNoaWZ0ID0ga2V5c1sgS2V5RW51bXMuU0hJRlQgXTtcclxuICAgICAgICBpZiAoIHNoaWZ0ICYmIHNoaWZ0LnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNoaWZ0TWFwWyBrZXlJZCBdIHx8IGtleUlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ga2V5SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEga2V5IHByZXNzIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUga2V5IHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUga2V5IHByZXNzIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlib2FyZEtleVByZXNzKCBrZXlib2FyZCApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIga2V5SWQgPSBnZXRLZXlib2FyZEtleUlkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgICAgICBrZXk7XHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgIGtleS5zdGF0ZSA9IFwiZG93blwiO1xyXG4gICAgICAgICAgICBrZXlib2FyZC5wcmVzc0hpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBrZXlJZDoga2V5SWQsXHJcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcygga2V5LmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgICAgICBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgICAgICBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSByZWxlYXNlIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUga2V5IHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUga2V5IHJlbGVhc2UgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleWJvYXJkS2V5UmVsZWFzZSgga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBwcm9jZXNzZWQgdGhlIGtleWRvd24gZXZlbnQsIHNvbWV0aW1lcyBkdWVcclxuICAgICAgICAgICAgLy8gdG8gZm9jdXMgaXNzdWVzICggd2luZG93cyBrZXksIHByaW50c2NyZWVuIGtleSwgZXRjIClcclxuICAgICAgICAgICAgLy8gd2UgbWlzcyB0aGUgJ2tleWRvd24nIGV2ZW50IGFuZCBvbmx5IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gdGhlICdrZXl1cCdcclxuICAgICAgICAgICAga2V5SWQgPSBzaGlmdEtleUlkKCBrZXlzLCBrZXlJZCApO1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdO1xyXG4gICAgICAgICAgICBpZiAoIGtleSAmJiBrZXkuc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAga2V5LnN0YXRlID0gXCJ1cFwiO1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQucmVsZWFzZUhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBrZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgS2V5Ym9hcmRcclxuICAgICAqIEBjbGFzc2Rlc2MgQSBrZXlib2FyZCBpbnB1dCBoYW5kbGluZyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEtleWJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29tYm9zID0ge307XHJcbiAgICAgICAgdGhpcy5zZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnByZXNzSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUga2V5IGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZEtleVByZXNzKCB0aGlzICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIHRoaXMgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgS2V5Ym9hcmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBrZXkgZXZlbnRzIHRvIGJpbmQgdGhlIGNhbGxiYWNrcyB0by5cclxuICAgICAqL1xyXG4gICAgS2V5Ym9hcmQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBlbnRyeSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdLZXlib2FyZC5vbicsIGlucHV0ICk7XHJcbiAgICAgICAgZXZlbnRzID0gVXRpbC5ub3JtYWxpemVFdmVudEFyZ3MoICdLZXlib2FyZC5vbicsIGV2ZW50cyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggaXNTZXF1ZW5jZUlucHV0KCBlbnRyeSApICkge1xyXG4gICAgICAgICAgICAgICAgYWRkU2VxdWVuY2UoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlzQ29tYmluYXRpb25JbnB1dCggZW50cnkgKSApIHtcclxuICAgICAgICAgICAgICAgIGFkZENvbWJpbmF0aW9uKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkS2V5KCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIEtleWJvYXJkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUga2V5IGV2ZW50cyB0byByZW1vdmUgdGhlIGNhbGxiYWNrcyBmcm9tLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBlbnRyeSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQub2ZmJywgaW5wdXQgKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9mZicsIGV2ZW50cyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggaXNTZXF1ZW5jZUlucHV0KCBlbnRyeSApICkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU2VxdWVuY2UoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlzQ29tYmluYXRpb25JbnB1dCggZW50cnkgKSApIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNvbWJpbmF0aW9uKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlS2V5KCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbGwgdGhlIHN0YXRlcyBvZiB0aGUgcHJvdmlkZWQga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAbWVtYmVyb2YgS2V5Ym9hcmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30ga2V5SWRzIC0gVGhlIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHN0YXRlIG9mIHRoZSBwcm92aWRlZCBrZXlzLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IHt9LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGtleUlkcyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQucG9sbCcsIGtleUlkcyApO1xyXG4gICAgICAgIGlmICgga2V5SWRzLmxlbmd0aCA9PT0gMSApIHtcclxuICAgICAgICAgICAga2V5ID0gdGhpcy5rZXlzWyBrZXlJZHNbMF0gXTtcclxuICAgICAgICAgICAgcmV0dXJuIGtleSA/IGtleS5zdGF0ZSA6ICd1cCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICBrZXkgPSB0aGlzLmtleXNbIGtleUlkIF07XHJcbiAgICAgICAgICAgIHN0YXRlc1sga2V5SWQgXSA9IGtleSA/IGtleS5zdGF0ZSA6ICd1cCcgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdGVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgS2V5TWFwID0gcmVxdWlyZSgnLi9LZXlNYXAnKSxcclxuICAgICAgICBTaGlmdE1hcCA9IHJlcXVpcmUoJy4vU2hpZnRNYXAnKSxcclxuICAgICAgICBLZXlzID0ge30sXHJcbiAgICAgICAga2V5Q29kZTtcclxuXHJcbiAgICBmb3IgKCBrZXlDb2RlIGluIEtleU1hcCApIHtcclxuICAgICAgICBLZXlzWyBLZXlNYXBbIGtleUNvZGUgXSBdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKCBrZXlDb2RlIGluIFNoaWZ0TWFwICkge1xyXG4gICAgICAgIEtleXNbIFNoaWZ0TWFwWyBrZXlDb2RlIF0gXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlzO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgRE9NIG1vdXNlIGV2ZW50IGludG8gdGhlIHJlbGV2YW50XHJcbiAgICAgKiBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBUaGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIGV2ZW50IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApIHtcclxuICAgICAgICBzd2l0Y2ggKCBldmVudC5idXR0b24gKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBcIm1pZGRsZVwiO1xyXG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGJ1dHRvbiBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGJ1dHRvbiBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b247XHJcbiAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGJ1dHRvbiBpbmZvIG9iamVjdCBleGlzdHNcclxuICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gfHwge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYnV0dG9uLnN0YXRlID0gXCJkb3duXCI7XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgYnV0dG9uIHJlbGVhc2UgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBpbnB1dCBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblJlbGVhc2UoIGJ1dHRvbnMgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbklkID0gZ2V0TW91c2VCdXR0b25JZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IGJ1dHRvbnNbIGJ1dHRvbklkIF07XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIHByb2Nlc3NlZCB0aGUga2V5ZG93biBldmVudCwgc29tZXRpbWVzIGR1ZVxyXG4gICAgICAgICAgICAvLyB0byBmb2N1cyBpc3N1ZXMgKCB3aW5kb3dzIGJ1dHRvbiwgcHJpbnRzY3JlZW4gYnV0dG9uLCBldGMgKVxyXG4gICAgICAgICAgICAvLyB3ZSBtaXNzIHRoZSAna2V5ZG93bicgZXZlbnQgYW5kIG9ubHkgcmVjZWl2ZVxyXG4gICAgICAgICAgICAvLyB0aGUgJ2tleXVwJ1xyXG4gICAgICAgICAgICBpZiAoIGJ1dHRvbiAmJiBidXR0b24uc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBidXR0b24uY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdGF0ZSA9IFwidXBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIG1vdXNlIG1vdmVtZW50IGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbW91c2UgLSBUaGUgbW91c2UgaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoIG1vdXNlICkge1xyXG4gICAgICAgIHZhciBsYXN0UG9zaXRpb24gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIC8vIG1vdXNlbW92ZSBldmVudHMgc29tZXRpbWVzIGZpcmUgd2hlbiBhIG1vdXNlIGJ1dHRvbiBpcyBwcmVzc2VkLCBhIG1vdXNlbW92ZVxyXG4gICAgICAgICAgICAvLyBzaG91bGQgb25seSBxdWV1ZSBhbiBldmVudCBpZiB0aGUgcG9zaXRpb24gaGFzIGFjdHVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgaWYgKCBsYXN0UG9zaXRpb24gJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFggPT09IGxhc3RQb3NpdGlvbi54ICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRZID09PSBsYXN0UG9zaXRpb24ueSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIGxhc3RQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZpb3VzQ2xpZW50WCA9IGxhc3RQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmlvdXNDbGllbnRZID0gbGFzdFBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBtb3VzZS5jYWxsYmFja3MsIFwibW92ZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICBsYXN0UG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBtb3VzZSBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgTW91c2VcclxuICAgICAqIEBjbGFzc2Rlc2MgQSBtb3VzZSBpbnB1dCBoYW5kbGluZyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IGFyZyAtIFRoZSBlbGVtZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXJzIHRvLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBNb3VzZSggYXJnICkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHt9O1xyXG4gICAgICAgIHRoaXMubW91c2UgPSB7fTtcclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuICAgICAgICBpZiAoIHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBhcmcgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJnIHx8IGRvY3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZW5lcmF0ZSBhbmQgYXR0YWNoIHRoZSBidXR0b24gZXZlbnQgaGFuZGxlcnNcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCB0aGlzLmJ1dHRvbnMgKSApO1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBoYW5kbGVNb3VzZUJ1dHRvblJlbGVhc2UoIHRoaXMuYnV0dG9ucyApICk7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKCB0aGlzLm1vdXNlICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIE1vdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50cyAtIFRoZSBidXR0b24gZXZlbnRzIHRvIGJpbmQgdGhlIGNhbGxiYWNrcyB0by4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dCwgY2FsbGJhY2ssIGV2ZW50cyApIHtcclxuICAgICAgICB2YXIgYnV0dG9uLFxyXG4gICAgICAgICAgICBtb3VzZSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGVudHJ5LFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBqO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnTW91c2Uub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ01vdXNlLm9uJyxcclxuICAgICAgICAgICAgaW5wdXQsIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnIF0gKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9uJywgZXZlbnRzICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIGVudHJ5ID09PSBcIm1vdmVcIiApIHtcclxuICAgICAgICAgICAgICAgIG1vdXNlID0gdGhpcy5tb3VzZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcyA9IG1vdXNlLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcy5tb3ZlID0gbW91c2UuY2FsbGJhY2tzLm1vdmUgfHwgW107XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBlbnRyeSBdID0gdGhpcy5idXR0b25zWyBlbnRyeSBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICggaj0wOyBqPGV2ZW50cy5sZW5ndGg7IGorKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzID0gYnV0dG9uLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdID0gYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTW91c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja3MgZnJvbS4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbixcclxuICAgICAgICAgICAgbW91c2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBlbnRyeSxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgajtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2Uub2ZmJyxcclxuICAgICAgICAgICAgaW5wdXQsIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnIF0gKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9mZicsIGV2ZW50cyApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBlbnRyeSA9PT0gXCJtb3ZlXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IHRoaXMubW91c2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG1vdXNlLmNhbGxiYWNrcyAmJiBtb3VzZS5jYWxsYmFja3MubW92ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5zcGxpY2UoIG1vdXNlLmNhbGxiYWNrcy5tb3ZlLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGo9MDsgajxldmVudHMubGVuZ3RoOyBqKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBidXR0b24uY2FsbGJhY2tzICYmIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBtZW1iZXJvZiBNb3VzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBidXR0b25JZHMgLSBUaGUgYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgc3RhdGUgb2YgdGhlIHByb3ZpZGVkIGJ1dHRvbnMuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oIGJ1dHRvbklkcyApIHtcclxuICAgICAgICB2YXIgc3RhdGVzID0ge30sXHJcbiAgICAgICAgICAgIGJ1dHRvbklkLFxyXG4gICAgICAgICAgICBidXR0b24sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgYnV0dG9uSWRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdNb3VzZS5wb2xsJywgYnV0dG9uSWRzLCBbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXSApO1xyXG4gICAgICAgIGlmICggYnV0dG9uSWRzLmxlbmd0aCA9PT0gMSApIHtcclxuICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zWyBidXR0b25JZHNbMF0gXTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbiA/IGJ1dHRvbi5zdGF0ZSA6ICd1cCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIGk9MDsgaTxidXR0b25JZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbklkID0gYnV0dG9uSWRzW2ldO1xyXG4gICAgICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbIGJ1dHRvbklkIF07XHJcbiAgICAgICAgICAgIHN0YXRlc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbiA/IGJ1dHRvbi5zdGF0ZSA6ICd1cCcgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdGVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNlO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJ34nOiAnYCcsXHJcbiAgICAgICAgJyEnOiAnMScsXHJcbiAgICAgICAgJ0AnOiAnMicsXHJcbiAgICAgICAgJyMnOiAnMycsXHJcbiAgICAgICAgJyQnOiAnNCcsXHJcbiAgICAgICAgJyUnOiAnNScsXHJcbiAgICAgICAgJ14nOiAnNicsXHJcbiAgICAgICAgJyYnOiAnNycsXHJcbiAgICAgICAgJyonOiAnOCcsXHJcbiAgICAgICAgJygnOiAnOScsXHJcbiAgICAgICAgJyknOiAnMCcsXHJcbiAgICAgICAgJ18nOiAnLScsXHJcbiAgICAgICAgJysnOiAnPScsXHJcblxyXG4gICAgICAgICd7JzogJ1snLFxyXG4gICAgICAgICd9JzogJ10nLFxyXG4gICAgICAgICd8JzogJ1xcXFwnLFxyXG4gICAgICAgICc6JzogJzsnLFxyXG4gICAgICAgICdcIic6ICdcXCcnLFxyXG4gICAgICAgICc8JzogJywnLFxyXG4gICAgICAgICc+JzogJy4nLFxyXG4gICAgICAgICc/JzogJy8nLFxyXG5cclxuICAgICAgICAnYCc6ICd+JyxcclxuICAgICAgICAnMSc6ICchJyxcclxuICAgICAgICAnMic6ICdAJyxcclxuICAgICAgICAnMyc6ICcjJyxcclxuICAgICAgICAnNCc6ICckJyxcclxuICAgICAgICAnNSc6ICclJyxcclxuICAgICAgICAnNic6ICdeJyxcclxuICAgICAgICAnNyc6ICcmJyxcclxuICAgICAgICAnOCc6ICcqJyxcclxuICAgICAgICAnOSc6ICcoJyxcclxuICAgICAgICAnMCc6ICcpJyxcclxuICAgICAgICAnLSc6ICdfJyxcclxuICAgICAgICAnPSc6ICcrJyxcclxuXHJcbiAgICAgICAgJ1snOiAneycsXHJcbiAgICAgICAgJ10nOiAnfScsXHJcbiAgICAgICAgJ1xcXFwnOiAnfCcsXHJcbiAgICAgICAgJzsnOiAnOicsXHJcbiAgICAgICAgJyc6ICdcIicsXHJcbiAgICAgICAgJywnOiAnPCcsXHJcbiAgICAgICAgJy4nOiAnPicsXHJcbiAgICAgICAgJy8nOiAnPycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSB0b3VjaCBldmVudCBieSBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0b3VjaCAtIFRoZSB0b3VjaCBhY3Rpb24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiAtIFRoZSBhY3Rpb24gaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaEFjdGlvbiggdG91Y2gsIGFjdGlvbiApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB0b3VjaC5zdGFydCA9IHRvdWNoWyBhY3Rpb24gXSB8fCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3M6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggdG91Y2guY2FsbGJhY2tzLCBhY3Rpb24sIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIHRvdWNoIG9iamVjdC5cclxuICAgICAqIEBjbGFzcyBUb3VjaFxyXG4gICAgICogQGNsYXNzZGVzYyBBIHRvdWNoIGlucHV0IGhhbmRsaW5nIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVG91Y2goKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IHt9O1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGJ1dHRvbiBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJzdGFydFwiICksIGZhbHNlICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGVuZFwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJlbmRcIiApLCBmYWxzZSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hjYW5jZWxcIiwgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsIFwiY2FuY2VsXCIgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNobGVhdmVcIiwgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsIFwibGVhdmVcIiApLCBmYWxzZSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2htb3ZlXCIsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCBcIm1vdmVcIiApLCBmYWxzZSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgVG91Y2hcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXRzIC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgVG91Y2gucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oIGlucHV0cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoLFxyXG4gICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ1RvdWNoLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0cyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnVG91Y2gub24nLFxyXG4gICAgICAgIGlucHV0cywgWyAnc3RhcnQnLCdlbmQnLCdjYW5jZWwnLCdsZWF2ZScsICdtb3ZlJyBdICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dHNbaV07XHJcbiAgICAgICAgICAgIHRvdWNoID0gdGhpcy50b3VjaDtcclxuICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0gPSB0b3VjaFsgaW5wdXQgXSB8fCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBpbnB1dCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0uY2FsbGJhY2tzLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIFRvdWNoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0cyAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIFRvdWNoLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIgdG91Y2gsXHJcbiAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ1RvdWNoLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ1RvdWNoLm9mZicsXHJcbiAgICAgICAgaW5wdXRzLCBbICdzdGFydCcsJ2VuZCcsJ2NhbmNlbCcsJ2xlYXZlJywgJ21vdmUnIF0gKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0c1tpXTtcclxuICAgICAgICAgICAgdG91Y2ggPSB0aGlzLnRvdWNoO1xyXG4gICAgICAgICAgICBpbmRleCA9IHRvdWNoWyBpbnB1dCBdLmNhbGxiYWNrcy5pbmRleE9mKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICBpZiAoIHRvdWNoWyBpbnB1dCBdICkge1xyXG4gICAgICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0uY2FsbGJhY2tzLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUb3VjaDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdpdmVuIGEgc3RyaW5nLCBjb252ZXJ0cyBpdCB0byBsb3dlcmNhc2UgYW5kIHJlcGxhY2VzIGFsbFxyXG4gICAgICAgICAqIHNlcXVlbnRpYWwgd2hpdGVzcGFjZSBpbnRvIGEgc2luZ2xlIHNwYWNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gbm9ybWFsaXplLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIG5vcm1hbGl6ZWQgc3RyaW5nLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZVN0cmluZzogZnVuY3Rpb24oIHN0ciApIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIC8vIHNldCBhbGwgd2hpdGVzcGFjZSB0byBhIHNpbmdsZSBzcGFjZSBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxzXS9nLCBcIiBcIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIHRoYXQgYSBmdW5jdGlvbiBhcmd1bWVudCBpcyBpbmRlZWQgYSBmdW5jdGlvbi4gSWYgaXQgaXNcclxuICAgICAgICAgKiBub3QsIGxvZyB0byB0aGUgY29uc29sZSBhbmQgcmV0dXJuIHRydWUuIE90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBmdW5jdGlvbiBpcyBpbnZhbGlkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNoZWNrRnVuY3Rpb25Bcmc6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGZ1bmMgKSB7XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnY2FsbGJhY2snIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBvZiB0eXBlICdmdW5jdGlvbicsIGNvbW1hbmQgaWdub3JlZC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIGFuZCBub3JtYWxpemVzIHRoZSAnaW5wdXQnIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBpbnB1dCAtIFRoZSBpbnB1dCBhcmd1bWVudC5cclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWxpZElucHV0IC0gVGhlIHJlY29nbml6ZWQgaW5wdXQuIE9wdGlvbmFsLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Ygbm9ybWFsaXplZCBpbnB1dC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVJbnB1dEFyZ3M6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGlucHV0LCB2YWxpZElucHV0ICkge1xyXG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaTtcclxuICAgICAgICAgICAgaWYgKCAhKCBpbnB1dCBpbnN0YW5jZW9mIEFycmF5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IFsgaW5wdXQgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBpbnB1dFtpXSAhPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5wdXQgaXMgbm90IGEgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2lucHV0W2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3Qgb2YgdHlwZSAnc3RyaW5nJywgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWxpZElucHV0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsaWRJbnB1dC5pbmRleE9mKCBpbnB1dFtpXSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5wdXQgaXMgbm90IHJlY29nbml6ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2lucHV0W2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3QgYSByZWNvZ25pemVkIGlucHV0IHR5cGUsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0cy5wdXNoKCB0aGlzLm5vcm1hbGl6ZVN0cmluZyggaW5wdXRbaV0gKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXRzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBDaGVja3MgYW5kIG5vcm1hbGl6ZXMgdGhlICdldmVudHMnIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudHMgLSBUaGUgZXZlbnRzIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Ygbm9ybWFsaXplZCBpbnB1dC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVFdmVudEFyZ3M6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGV2ZW50cyApIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGlmICggIWV2ZW50cyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IFsgJ3ByZXNzJyBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggISggZXZlbnRzIGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IFsgZXZlbnRzIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggZXZlbnRzW2ldICE9PSAncHJlc3MnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2ldICE9PSAncmVsZWFzZScgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQgaXMgbm90IHJlY29nbml6ZWRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIrZXZlbnRzW2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3QgYSByZWNvZ25pemVkIGV2ZW50IHR5cGUsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2ldID0gdGhpcy5ub3JtYWxpemVTdHJpbmcoIGV2ZW50c1tpXSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhlY3V0ZSB0aGUgZnVuY3Rpb25zIGluIHRoZSBjYWxsYmFja3Mgb2JqZWN0IHRoYXQgbWF0Y2ggdGhlXHJcbiAgICAgICAgICogcHJvdmlkZWQgZXZlbnQgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja3MgLSBUaGUgY2FsbGJhY2tzIG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgc3RyaW5nLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIG5hdGl2ZSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZUNhbGxiYWNrczogZnVuY3Rpb24oIGNhbGxiYWNrcywgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGlmICggIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzWyBldmVudFR5cGUgXSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8Y2FsbGJhY2tzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKCBldmVudCApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxvcyBmdW5jdGlvbiB0aGF0IHN1cHBvcnRzIG5lZ2F0aXZlIG51bWJlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gVGhlIG51bWJlciB0byBtb2R1bG8uXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbW9kdWxvcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZXN1bHRpbmcgbnVtYmVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1vZDogZnVuY3Rpb24oIG51bSwgbiApIHtcclxuICAgICAgICAgICAgcmV0dXJuICggKCBudW0gJSBuICkgKyBuICkgJSBuO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG9iamVjdCBoYXMgbm8gYXR0cmlidXRlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHRlc3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgb2JqZWN0IGhhcyBrZXlzLCBmYWxzZSBpZiBub3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgdmFyIGtleTtcclxuICAgICAgICAgICAgZm9yICgga2V5IGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgIGlmICggb2JqLmhhc093blByb3BlcnR5KCBrZXkgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iXX0=
