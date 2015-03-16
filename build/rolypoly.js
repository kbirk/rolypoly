!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.rolypoly=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    "use strict";

    module.exports = {

        Keyboard: require('./Keyboard'),
        Mouse: require('./Mouse')
        
    };

}());


},{"./Keyboard":5,"./Mouse":7}],2:[function(require,module,exports){
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

},{"./Util":9}],3:[function(require,module,exports){
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

},{"./CircularArray":2,"./KeyEnums":3,"./KeyMap":4,"./Keys":6,"./ShiftMap":8,"./Util":9}],6:[function(require,module,exports){
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

},{"./Util":9}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwic3JjXFxhcGkuanMiLCJzcmNcXENpcmN1bGFyQXJyYXkuanMiLCJzcmNcXEtleUVudW1zLmpzIiwic3JjXFxLZXlNYXAuanMiLCJzcmNcXEtleWJvYXJkLmpzIiwic3JjXFxLZXlzLmpzIiwic3JjXFxNb3VzZS5qcyIsInNyY1xcU2hpZnRNYXAuanMiLCJzcmNcXFV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNXRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgS2V5Ym9hcmQ6IHJlcXVpcmUoJy4vS2V5Ym9hcmQnKSxcclxuICAgICAgICBNb3VzZTogcmVxdWlyZSgnLi9Nb3VzZScpXHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuXHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgc2ltcGxlIGNpcmN1bGFyIGFycmF5IHRoYXQgaXMgYWxsb2NhdGVkIHRvIGEgZml4ZWQgc2l6ZS5cclxuICAgICAqIFdoZW4gZWxlbWVudHMgYXJlIHB1c2hlZCBiZXlvbmQgaXRzIGFsbG9jYXRlZCBsZW5ndGgsIHRoZXlcclxuICAgICAqIHdpbGwgaW5zdGVhZCBvdmVyd3JpdGUgZXhzdGluZyBpbmRpY2VzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJBcnJheSggbGVuZ3RoICkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IEFycmF5KCBsZW5ndGggKTtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1c2ggYW4gZWxlbWVudCB0byB0aGUgY3VycmVudCBpbmRleCBvZiB0aGUgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIC0gVGhlIGRhdGEgdG8gaW5zZXJ0IGludG8gdGhlIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJbIHRoaXMuaW5kZXggXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIG1vc3QgcmVjZW50bHkgcHVzaGVkIGVsZW1lbnQuIEFuIGluZGV4IG9mZnNldCBtYXlcclxuICAgICAqIGJlIHByb3ZpZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgLSBBbiBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCBpbmRleC4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIENpcmN1bGFyQXJyYXkucHJvdG90eXBlLmJhY2sgPSBmdW5jdGlvbiggb2Zmc2V0ICkge1xyXG4gICAgICAgIG9mZnNldCA9IG9mZnNldCA/IG9mZnNldCA6IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyWyBVdGlsLm1vZCggdGhpcy5pbmRleC0xLW9mZnNldCwgdGhpcy5sZW5ndGggKSBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IENpcmN1bGFyQXJyYXk7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBCQUNLU1BBQ0U6ICdiYWNrc3BhY2UnLFxyXG4gICAgICAgIFRBQjogJ3RhYicsXHJcbiAgICAgICAgRU5URVI6ICdlbnRlcicsXHJcbiAgICAgICAgU0hJRlQ6ICdzaGlmdCcsXHJcbiAgICAgICAgQ1RSTDogJ2N0cmwnLFxyXG4gICAgICAgIEFMVDogJ2FsdCcsXHJcbiAgICAgICAgUEFVU0VfQlJFQUs6ICdwYXVzZWJyZWFrJyxcclxuICAgICAgICBDQVBTX0xPQ0s6ICdjYXBzbG9jaycsXHJcbiAgICAgICAgRVNDOiAnZXNjJyxcclxuICAgICAgICBQQUdFX1VQOiAncGFnZXVwJyxcclxuICAgICAgICBQQUdFX0RPV046ICdwYWdlZG93bicsXHJcbiAgICAgICAgRU5EOiAnZW5kJyxcclxuICAgICAgICBIT01FOiAnaG9tZScsXHJcbiAgICAgICAgTEVGVF9BUlJPVzogJ2xlZnQnLFxyXG4gICAgICAgIFVQX0FSUk9XOiAndXAnLFxyXG4gICAgICAgIFJJR0hUX0FSUk9XOiAncmlnaHQnLFxyXG4gICAgICAgIERPV05fQVJST1c6ICdkb3duJyxcclxuICAgICAgICBQUklOVF9TQ1JFRU46ICdwcmludHNjcmVlbicsXHJcbiAgICAgICAgSU5TRVJUOiAnaW5zZXJ0JyxcclxuICAgICAgICBERUxFVEU6ICdkZWxldGUnLFxyXG4gICAgICAgIFdJTkRPV1M6ICd3aW5kb3dzJyxcclxuICAgICAgICBTRUxFQ1Q6ICdzZWxlY3QnLFxyXG4gICAgICAgIFNQQUNFX0JBUjogJ3NwYWNlJyxcclxuICAgICAgICBOVU1fTE9DSzogJ251bWxvY2snLFxyXG4gICAgICAgIFNDUk9MTF9MT0NLOiAnc2Nyb2xsbG9jaycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIEtleUVudW1zID0gcmVxdWlyZSgnLi9LZXlFbnVtcycpO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAnOCc6IEtleUVudW1zLkJBQ0tTUEFDRSxcclxuICAgICAgICAnOSc6IEtleUVudW1zLlRBQixcclxuICAgICAgICAnMTMnOiBLZXlFbnVtcy5FTlRFUixcclxuICAgICAgICAnMTYnOiBLZXlFbnVtcy5TSElGVCxcclxuICAgICAgICAnMTcnOiBLZXlFbnVtcy5DVFJMLFxyXG4gICAgICAgICcxOCc6IEtleUVudW1zLkFMVCxcclxuICAgICAgICAnMTknOiBLZXlFbnVtcy5QQVVTRV9CUkVBSyxcclxuICAgICAgICAnMjAnOiBLZXlFbnVtcy5DQVBTX0xPQ0ssXHJcbiAgICAgICAgJzI3JzogS2V5RW51bXMuRVNDLFxyXG4gICAgICAgICczMic6IEtleUVudW1zLlNQQUNFX0JBUixcclxuICAgICAgICAnMzMnOiBLZXlFbnVtcy5QQUdFX1VQLFxyXG4gICAgICAgICczNCc6IEtleUVudW1zLlBBR0VfRE9XTixcclxuICAgICAgICAnMzUnOiBLZXlFbnVtcy5FTkQsXHJcbiAgICAgICAgJzM2JzogS2V5RW51bXMuSE9NRSxcclxuICAgICAgICAnMzcnOiBLZXlFbnVtcy5MRUZUX0FSUk9XLFxyXG4gICAgICAgICczOCc6IEtleUVudW1zLlVQX0FSUk9XLFxyXG4gICAgICAgICczOSc6IEtleUVudW1zLlJJR0hUX0FSUk9XLFxyXG4gICAgICAgICc0MCc6IEtleUVudW1zLkRPV05fQVJST1csXHJcbiAgICAgICAgJzQ0JzogS2V5RW51bXMuUFJJTlRfU0NSRUVOLFxyXG4gICAgICAgICc0NSc6IEtleUVudW1zLklOU0VSVCxcclxuICAgICAgICAnNDYnOiBLZXlFbnVtcy5ERUxFVEUsXHJcbiAgICAgICAgJzQ4JzogJzAnLFxyXG4gICAgICAgICc0OSc6ICcxJyxcclxuICAgICAgICAnNTAnOiAnMicsXHJcbiAgICAgICAgJzUxJzogJzMnLFxyXG4gICAgICAgICc1Mic6ICc0JyxcclxuICAgICAgICAnNTMnOiAnNScsXHJcbiAgICAgICAgJzU0JzogJzYnLFxyXG4gICAgICAgICc1NSc6ICc3JyxcclxuICAgICAgICAnNTYnOiAnOCcsXHJcbiAgICAgICAgJzU3JzogJzknLFxyXG4gICAgICAgICc2NSc6ICdhJyxcclxuICAgICAgICAnNjYnOiAnYicsXHJcbiAgICAgICAgJzY3JzogJ2MnLFxyXG4gICAgICAgICc2OCc6ICdkJyxcclxuICAgICAgICAnNjknOiAnZScsXHJcbiAgICAgICAgJzcwJzogJ2YnLFxyXG4gICAgICAgICc3MSc6ICdnJyxcclxuICAgICAgICAnNzInOiAnaCcsXHJcbiAgICAgICAgJzczJzogJ2knLFxyXG4gICAgICAgICc3NCc6ICdqJyxcclxuICAgICAgICAnNzUnOiAnaycsXHJcbiAgICAgICAgJzc2JzogJ2wnLFxyXG4gICAgICAgICc3Nyc6ICdtJyxcclxuICAgICAgICAnNzgnOiAnbicsXHJcbiAgICAgICAgJzc5JzogJ28nLFxyXG4gICAgICAgICc4MCc6ICdwJyxcclxuICAgICAgICAnODEnOiAncScsXHJcbiAgICAgICAgJzgyJzogJ3InLFxyXG4gICAgICAgICc4Myc6ICdzJyxcclxuICAgICAgICAnODQnOiAndCcsXHJcbiAgICAgICAgJzg1JzogJ3UnLFxyXG4gICAgICAgICc4Nic6ICd2JyxcclxuICAgICAgICAnODcnOiAndycsXHJcbiAgICAgICAgJzg4JzogJ3gnLFxyXG4gICAgICAgICc4OSc6ICd5JyxcclxuICAgICAgICAnOTAnOiAneicsXHJcbiAgICAgICAgJzkxJzogS2V5RW51bXMuV0lORE9XUyxcclxuICAgICAgICAnOTInOiBLZXlFbnVtcy5XSU5ET1dTLFxyXG4gICAgICAgICc5Myc6IEtleUVudW1zLlNFTEVDVCxcclxuICAgICAgICAnOTYnOiAnMCcsXHJcbiAgICAgICAgJzk3JzogJzEnLFxyXG4gICAgICAgICc5OCc6ICcyJyxcclxuICAgICAgICAnOTknOiAnMycsXHJcbiAgICAgICAgJzEwMCc6ICc0JyxcclxuICAgICAgICAnMTAxJzogJzUnLFxyXG4gICAgICAgICcxMDInOiAnNicsXHJcbiAgICAgICAgJzEwMyc6ICc3JyxcclxuICAgICAgICAnMTA0JzogJzgnLFxyXG4gICAgICAgICcxMDUnOiAnOScsXHJcbiAgICAgICAgJzEwNic6ICcqJyxcclxuICAgICAgICAnMTA3JzogJysnLFxyXG4gICAgICAgICcxMDknOiAnLScsXHJcbiAgICAgICAgJzExMCc6ICcuJyxcclxuICAgICAgICAnMTExJzogJy8nLFxyXG4gICAgICAgICcxMTInOiAnZjEnLFxyXG4gICAgICAgICcxMTMnOiAnZjInLFxyXG4gICAgICAgICcxMTQnOiAnZjMnLFxyXG4gICAgICAgICcxMTUnOiAnZjQnLFxyXG4gICAgICAgICcxMTYnOiAnZjUnLFxyXG4gICAgICAgICcxMTcnOiAnZjYnLFxyXG4gICAgICAgICcxMTgnOiAnZjcnLFxyXG4gICAgICAgICcxMTknOiAnZjgnLFxyXG4gICAgICAgICcxMjAnOiAnZjknLFxyXG4gICAgICAgICcxMjEnOiAnZjEwJyxcclxuICAgICAgICAnMTIyJzogJ2YxMScsXHJcbiAgICAgICAgJzEyMyc6ICdmMTInLFxyXG4gICAgICAgICcxNDQnOiBLZXlFbnVtcy5OVU1fTE9DSyxcclxuICAgICAgICAnMTQ1JzogS2V5RW51bXMuU0NST0xMX0xPQ0ssXHJcbiAgICAgICAgJzE4Nic6ICc6JyxcclxuICAgICAgICAnMTg3JzogJz0nLFxyXG4gICAgICAgICcxODgnOiAnLCcsXHJcbiAgICAgICAgJzE4OSc6ICctJyxcclxuICAgICAgICAnMTkwJzogJy4nLFxyXG4gICAgICAgICcxOTEnOiAnLycsXHJcbiAgICAgICAgJzE5Mic6ICdgJyxcclxuICAgICAgICAnMjE5JzogJ1snLFxyXG4gICAgICAgICcyMjAnOiAnXFxcXCcsXHJcbiAgICAgICAgJzIyMSc6ICddJyxcclxuICAgICAgICAnMjIyJzogJ1xcJydcclxuXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpLFxyXG4gICAgICAgIEtleXMgPSByZXF1aXJlKCcuL0tleXMnKSxcclxuICAgICAgICBLZXlFbnVtcyA9IHJlcXVpcmUoJy4vS2V5RW51bXMnKSxcclxuICAgICAgICBLZXlNYXAgPSByZXF1aXJlKCcuL0tleU1hcCcpLFxyXG4gICAgICAgIFNoaWZ0TWFwID0gcmVxdWlyZSgnLi9TaGlmdE1hcCcpLFxyXG4gICAgICAgIENpcmN1bGFyQXJyYXkgPSByZXF1aXJlKCcuL0NpcmN1bGFyQXJyYXknKSxcclxuICAgICAgICBTRVFVRU5DRV9USU1FT1VUID0gODAwLFxyXG4gICAgICAgIEtFWV9ISVNUT1JZX0JVRkZFUl9MRU5HVEggPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmdzIGFyZSByZWNvZ25pemVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUlkcyAtIFRoZSBrZXkgaW5wdXQgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUga2V5IGlkcyBhcmUgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrS2V5SWRzKCBmdW5jdGlvbk5hbWUsIGtleUlkcyApIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpZiAoICFLZXlzWyBrZXlJZHNbaV0gXSApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitrZXlJZHNbaV0rXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBhIHJlY29nbml6ZWQgZXZlbnQgdHlwZSwgY29tbWFuZCBpZ25vcmVkLlwiICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIHJlY29nbml6ZWQgYXMgYSBrZXkgc2VxdWVuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgaW5wdXQgaXMgYSBrZXkgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzU2VxdWVuY2VJbnB1dCggaW5wdXQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnNwbGl0KCcgJykubGVuZ3RoID4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIHNlcXVlbmNlIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApIHtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VLZXkuc3BsaXQoJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgaXMgcmVjb2duaXplZCBhcyBhIGtleSBjb21iaW5hdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBpbnB1dCBpcyBhIGtleSBjb21iaW5hdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNDb21iaW5hdGlvbklucHV0KCBpbnB1dCApIHtcclxuICAgICAgICByZXR1cm4gKCBpbnB1dC5sZW5ndGggPiAxICkgPyBpbnB1dC5zcGxpdCgnKycpLmxlbmd0aCA+IDEgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIGNvbWJpbmF0aW9uIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNvbWJvS2V5LnNwbGl0KC9cXCtcXCtcXCt8XFwrXFwrLyksXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIG15IGxhY2sgb2YgcmVnZXgga25vd2xlZGdlIGlzIHNoYW1lZnVsXHJcbiAgICAgICAgaWYgKCB0ZW1wLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTx0ZW1wLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wW2ldLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGkgPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCAnKycgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoIHRlbXBbaV0uc3BsaXQoJysnKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaSAhPT0gdGVtcC5sZW5ndGgtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goICcrJyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbWJvS2V5LnNwbGl0KCcrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHNlcXVlbmNlIGtleSB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0IGFuZCBiaW5kcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZFNlcXVlbmNlKCBrZXlib2FyZCwgc2VxdWVuY2VLZXksIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjcmVhdGUgc2VxdWVuY2UgZW50cnkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSB8fCB7XHJcbiAgICAgICAgICAgIGtleXM6IGtleUlkcyxcclxuICAgICAgICAgICAgbGFzdEtleToga2V5SWRzWyBrZXlJZHMubGVuZ3RoIC0gMV0sIC8vIHN0b3JlIHRoZSBsYXN0IGtleSBvZiB0aGUgc2VxdWVuY2VcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF07XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIHNlcXVlbmNlLmNhbGxiYWNrc1sgZXZlbnQgXSA9IHNlcXVlbmNlLmNhbGxiYWNrc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgc2VxdWVuY2UuY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc2VxdWVuY2Uga2V5IHVuZGVyIGVhY2gga2V5IGZvciB0aGUgZXZlbnRcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGtleUlkID0ga2V5SWRzW2ldO1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlcyA9IGtleXNbIGtleUlkIF0uc2VxdWVuY2VzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF0gPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGlmICgga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF0uaW5kZXhPZiggc2VxdWVuY2VLZXkgKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGR1cGxpY2F0ZXNcclxuICAgICAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnQgXS5wdXNoKCBzZXF1ZW5jZUtleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc2VxdWVuY2Uga2V5IGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmcm9tLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlcXVlbmNlKCBrZXlib2FyZCwgc2VxdWVuY2VLZXksIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdLFxyXG4gICAgICAgICAgICBjYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBrZXlJZCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vZmYnLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBzZXF1ZW5jZVxyXG4gICAgICAgIGlmICggIXNlcXVlbmNlICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBzZXF1ZW5jZS5jYWxsYmFja3M7XHJcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2tzICYmIGNhbGxiYWNrc1sgZXZlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnQgXS5zcGxpY2UoIGNhbGxiYWNrc1sgZXZlbnQgXS5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2tzWyBldmVudCBdLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciB0aGUgc2VxdWVuY2UsIGRlbGV0ZSB0aGUgc2VxdWVuY2VcclxuICAgICAgICAvLyBhbmQgcmVtb3ZlIHNlcXVlbmNlIGZyb20gYWxsIGtleXNcclxuICAgICAgICBpZiAoIFV0aWwuaXNFbXB0eSggc2VxdWVuY2UuY2FsbGJhY2tzICkgKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF07XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGluc3RhbmNlcyBvZiB0aGUgc2VxdWVuY2UsIHJlbW92ZSBmcm9tIGtleXNcclxuICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50IF07IC8vIHJlLWFzc2lnbmluZyBzZXF1ZW5jZXNcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMuc3BsaWNlKCBzZXF1ZW5jZXMuaW5kZXhPZiggc2VxdWVuY2VLZXkgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjb21iaW5hdGlvbiBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgYmluZHNcclxuICAgICAqIHRoZSBjYWxsYmFjayBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGtleUlkLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9uJywga2V5SWRzICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbWJpbmF0aW9uIGVudHJ5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3RcclxuICAgICAgICBjb21ib3NbIGNvbWJvS2V5IF0gPSBjb21ib3NbIGNvbWJvS2V5IF0gfHwge1xyXG4gICAgICAgICAgICBrZXlzOiBrZXlJZHMsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbWJvID0gY29tYm9zWyBjb21ib0tleSBdO1xyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBjb21iby5jYWxsYmFja3NbIGV2ZW50IF0gPSBjb21iby5jYWxsYmFja3NbIGV2ZW50IF0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbWJvLmNhbGxiYWNrc1sgZXZlbnQgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGNvbWJpbmF0aW9uIGtleSB1bmRlciBlYWNoIGtleSBmb3IgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IGtleUlkc1tpXTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5c1sga2V5SWQgXS5jb21ib3MgPSBrZXlzWyBrZXlJZCBdLmNvbWJvcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudCBdID0ga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF0gIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXlzWyBrZXlJZCBdLmNvbWJvc1sgZXZlbnQgXSAuaW5kZXhPZiggY29tYm9LZXkgKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGR1cGxpY2F0ZXNcclxuICAgICAgICAgICAgICAgICAgICBrZXlzWyBrZXlJZCBdLmNvbWJvc1sgZXZlbnQgXS5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGNvbWJpbmF0aW9uIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudHMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjb21ibyA9IGNvbWJvc1sgY29tYm9LZXkgXSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAga2V5SWQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub2ZmJywga2V5SWRzICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3IgY29tYm9cclxuICAgICAgICBpZiAoICFjb21ibyApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gY29tYm8uY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrcyAmJiBjYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBjYWxsYmFja3NbIGV2ZW50IF0uaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrc1sgZXZlbnQgXS5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnQgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgdGhlIGNvbWJvLCBkZWxldGUgdGhlIGNvbWJvXHJcbiAgICAgICAgLy8gYW5kIHJlbW92ZSBjb21ibyBmcm9tIGFsbCBrZXlzXHJcbiAgICAgICAgaWYgKCBVdGlsLmlzRW1wdHkoIGNvbWJvLmNhbGxiYWNrcyApICkge1xyXG4gICAgICAgICAgICBkZWxldGUgY29tYm9zWyBjb21ib0tleSBdO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBpbnN0YW5jZXMgb2YgdGhlIGNvbWJvLCByZW1vdmUgZnJvbSBrZXlzXHJcbiAgICAgICAgICAgIGZvciAoIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQgPSBrZXlJZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50IF07IC8vIHJlLWFzc2lnbmluZyBjb21ib3NcclxuICAgICAgICAgICAgICAgICAgICBjb21ib3Muc3BsaWNlKCBjb21ib3MuaW5kZXhPZiggY29tYm9LZXkgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNhbGxiYWNrIHRvIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkS2V5KCBrZXlib2FyZCwga2V5SWQsIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fSxcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBbIGtleUlkIF0gKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAga2V5LmNhbGxiYWNrcyA9IGtleS5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgIGtleS5jYWxsYmFja3NbIGV2ZW50IF0gPSBrZXkuY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICBrZXkuY2FsbGJhY2tzWyBldmVudCBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIGNhbGxiYWNrIGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5SWQgLSBUaGUga2V5IGlkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlS2V5KCBrZXlib2FyZCwga2V5SWQsIGV2ZW50cywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdLFxyXG4gICAgICAgICAgICBjYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9mZicsIFsga2V5SWQgXSApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIGtleVxyXG4gICAgICAgIGlmICggIWtleSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBmb3IgKCBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcztcclxuICAgICAgICAgICAgaWYgKCBjYWxsYmFja3MgJiYgY2FsbGJhY2tzWyBldmVudCBdICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudCBdLnNwbGljZSggY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja3NbIGV2ZW50IF0ubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50IF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFsbCB0aGUga2V5cyBpbiB0aGUgY29tYmluYXRpb24gYXJlXHJcbiAgICAgKiBvZiB0aGUgcmVxdWlyZWQgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21ibyAtIFRoZSBjb21iaW5hdGlvbiBlbnRyeS5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBjb21iaW5hdGlvbiBpcyBzYXRpc2ZpZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgZXZlbnRUeXBlICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5SWRzID0gY29tYm8ua2V5cyxcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGtleSBpbiB0aGUgY29tYm9cclxuICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZHNbaV0gXTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlIGtleSBkb2VzIG5vdCBoYXZlIGEgc3RhdGUsIHRoZSBjb21ibyBmYWlsc1xyXG4gICAgICAgICAgICBpZiAoICFrZXkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYSBcInJlbGVhc2VcIiBjb21ibyBjYW4gb25seSBiZSB0cmlnZ2VyZWQgaWYgdGhlIGtleXMgaGFkIGFsbFxyXG4gICAgICAgICAgICAvLyBiZWVuIGRvd24gdG9nZXRoZXIgYXQgb25lIHBvaW50XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInJlbGVhc2VcIiAmJlxyXG4gICAgICAgICAgICAgICAgICggIWNvbWJvLnByZXNzZWQgfHwga2V5LnN0YXRlICE9PSBcInVwXCIgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhIFwicHJlc3NcIiBjb21ibyBvbmx5IG5lZWRzIGFsbCBrZXlzIHRvIGJlIGRvd24gdG9nZXRoZXJcclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiAmJiBrZXkuc3RhdGUgIT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgKSB7XHJcbiAgICAgICAgICAgIC8vIGZsYWcgdGhhdCBhbGwga2V5cyBoYXZlIGJlZW4gZG93blxyXG4gICAgICAgICAgICBjb21iby5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBldmVudFR5cGUgPT09IFwicmVsZWFzZVwiICkge1xyXG4gICAgICAgICAgICAvLyBjbGVhciB0aGUgZmxhZ1xyXG4gICAgICAgICAgICBkZWxldGUgY29tYm8ucHJlc3NlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbGwgY29tYmluYXRpb25zIHRoYXQgYXJlIGF0dGFjaGVkIHRvIHRoZSBrZXkuIElmIGFueSBhcmVcclxuICAgICAqIHNhdGlzZmllZCwgZXhlY3V0ZSB0aGUgYm91bmQgY2FsbGJhY2sgZnVuY3Rpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gY2hlY2sgZm9yLlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBLZXlib2FyZEV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY29tYm8sXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBrZXkuY29tYm9zICkge1xyXG4gICAgICAgICAgICAvLyByZWxlYXNlIGNvbWJpbmF0aW9uIGV2ZW50cyByZXF1aXJlIHByZXNzIGNvbWJpbmF0aW9uIGV2ZW50cyB0b1xyXG4gICAgICAgICAgICAvLyBiZSB0cmFja2VkLCB0aGVyZWZvcmUgaWYgYSBwcmVzcyBldmVudCBvY2N1cnMgdGhhdCBpcyBwYXJ0IG9mIGFcclxuICAgICAgICAgICAgLy8gY29tYmluYXRpb24gaXQgTVVTVCBiZSBwcm9jZXNzZWQsIHJlZ2FyZGxlc3MgaWYgdGhlcmUgaXMgYVxyXG4gICAgICAgICAgICAvLyBjYWxsYmFjay5cclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIHByZXNzIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXkuY29tYm9zLnByZXNzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleS5jb21ib3MucHJlc3MubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJvID0gY29tYm9zWyBrZXkuY29tYm9zLnByZXNzW2ldIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBcInByZXNzXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBrZXlzIGluIGNvbWJvIHNhdGlzZnkgY29uZGl0aW9ucywgZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggY29tYm8uY2FsbGJhY2tzLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSByZWxlYXNlIGNhbGxiYWNrcywgaWdub3JlIGNhbGxiYWNrcyBhcyB0aGlzIGlzbid0XHJcbiAgICAgICAgICAgICAgICAvLyBhIHJlbGVhc2UgZXZlbnQgYnV0IGlzIHJlcXVpcmVkIGZvciByZWxlYXNlIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXkuY29tYm9zLnJlbGVhc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2VzcyByZWxlYXNlIGV2ZW50cyB0byBmbGFnIHRoZXkgaGF2ZSBiZWVuIHByZXNzZWQgcHJpb3JcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgY29tYm8gaW4gdGhlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGk9MDsgaTxrZXkuY29tYm9zLnJlbGVhc2UubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJvID0gY29tYm9zWyBrZXkuY29tYm9zLnJlbGVhc2VbaV0gXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBjb21ibyBidXQgZG9uJ3QgZXhlY3V0ZSBhbnkgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgXCJwcmVzc1wiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcmVsZWFzZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5yZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleS5jb21ib3MucmVsZWFzZS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGtleS5jb21ib3MucmVsZWFzZVtpXSBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgXCJyZWxlYXNlXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBrZXlzIGluIGNvbWJvIHNhdGlzZnkgY29uZGl0aW9ucywgZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggY29tYm8uY2FsbGJhY2tzLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIHR3byB0aW1lc3RhbXBzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZXkgb2NjdXJcclxuICAgICAqIHdpdGhpbiB0aGUgdGltZW91dCBpbnRlcnZhbCBmcm9tIGVhY2hvdGhlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJldmlvdXNUaW1lc3RhbXAgLSBUaGUgcHJldmlvdXMgdGltZXN0bWFwLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcCAtIFRoZSB0aW1lc3RtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIHdpdGhpbiB0aGUgdGltZW91dCBpbnRlcnZhbC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNXaXRoaW5UaW1lb3V0KCBwcmV2aW91c1RpbWVzdGFtcCwgdGltZXN0YW1wICkge1xyXG4gICAgICAgIHZhciBkZWx0YTtcclxuICAgICAgICBpZiAoICFwcmV2aW91c1RpbWVzdGFtcCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbHRhID0gcHJldmlvdXNUaW1lc3RhbXAgLSB0aW1lc3RhbXA7XHJcbiAgICAgICAgcmV0dXJuIGRlbHRhIDwgU0VRVUVOQ0VfVElNRU9VVDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxsIHRoZSBrZXlzIGluIHRoZSBzZXF1ZW5jZSBoYXZlIGJlZW5cclxuICAgICAqIHByZXNzZWQgb3IgcmVsZWFzZWQgKGRlcGVuZGluZyBvbiB0aGUgZXZlbnQgdHlwZSkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gaGlzdG9yeSAtIFRoZSBrZXkgZXZlbnQgaGlzdG9yeSBhcnJheS5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUlkcyAtIFRoZSBzZXF1ZW5jZSBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc2VxdWVuY2UgaXMgc2F0aXNmaWVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1NlcXVlbmNlU2F0aXNmaWVkKCBoaXN0b3J5LCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzVGltZXN0YW1wLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZUtleSxcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpLCBqO1xyXG4gICAgICAgIC8vIGRlYnVnQ2lyY3VsYXIoIGhpc3RvcnksIGtleUlkcy5sZW5ndGgrNSApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGtleSBpbiB0aGUgY29tYm9cclxuICAgICAgICBmb3IgKCBpPTAsIGo9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKyssIGorKyApIHtcclxuICAgICAgICAgICAgc2VxdWVuY2VLZXkgPSBrZXlJZHNbIGtleUlkcy5sZW5ndGgtMS1pIF07XHJcbiAgICAgICAgICAgIGtleSA9IGhpc3RvcnkuYmFjayggaiApO1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgc2hpZnQga2V5c1xyXG4gICAgICAgICAgICB3aGlsZSAoIHNlcXVlbmNlS2V5ICE9PSBcInNoaWZ0XCIgJiZcclxuICAgICAgICAgICAgICAgIGtleSAmJlxyXG4gICAgICAgICAgICAgICAga2V5LmtleUlkID09PSBcInNoaWZ0XCIgKSB7XHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZWUgaWYgaXQgaXMgdGhlIGNvcnJlY3Qgc3RhdGVcclxuICAgICAgICAgICAgaWYgKCAha2V5IHx8IC8vIG5vIGtleVxyXG4gICAgICAgICAgICAgICAgIGtleS5rZXlJZCAhPT0gc2VxdWVuY2VLZXkgfHwgLy8gaGFzIG5vdCBiZWVuIHByZXNzZWRcclxuICAgICAgICAgICAgICAgICAhaXNXaXRoaW5UaW1lb3V0KCBwcmV2aW91c1RpbWVzdGFtcCwga2V5LnRpbWVzdGFtcCApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzVGltZXN0YW1wID0ga2V5LnRpbWVzdGFtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbGwgc2VxdWVuY2VzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIHRoZSBrZXkuIElmIGFueSBhcmVcclxuICAgICAqIHNhdGlzZmllZCwgZXhlY3V0ZSB0aGUgYm91bmQgY2FsbGJhY2sgZnVuY3Rpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5SWQgLSBUaGUga2V5IGlkIGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UsXHJcbiAgICAgICAgICAgIGhpc3RvcnksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBrZXkuc2VxdWVuY2VzICYmIGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXSApIHtcclxuICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBrZXlib2FyZC5wcmVzc0hpc3Rvcnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucmVsZWFzZUhpc3Rvcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IHNlcXVlbmNlIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV1baV0gXTtcclxuICAgICAgICAgICAgICAgIC8vIG9ubHkgY2hlY2sgc2VxdWVuY2UgaWYgdGhpcyBrZXkgaXMgdGhlIExBU1QgS0VZXHJcbiAgICAgICAgICAgICAgICBpZiAoIHNlcXVlbmNlLmxhc3RLZXkgPT09IGtleUlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIGlzU2VxdWVuY2VTYXRpc2ZpZWQoIGhpc3RvcnksIHNlcXVlbmNlLmtleXMgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBzZXF1ZW5jZSBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBzZXF1ZW5jZS5jYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBhIERPTSBrZXlib2FyZCBldmVudCBpbnRvIHRoZSByZWxldmFudFxyXG4gICAgICoga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIGtleWJvYXJkIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBrZXkgZW51bWVyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBjaGFyQ29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgcmV0dXJuIEtleU1hcFsgY2hhckNvZGUgXSB8fCBjaGFyQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSBrZXkgaWQgaGFzIGEgc2hpZnQgY29tcG9uZW50LCBpZiB0aGUgc2hpZnQgYnV0dG9uXHJcbiAgICAgKiBpcyBkb3duLCByZXR1cm4gdGhlIHNoaWZ0IGtleSBpZC4gT3RoZXJ3aXNlIHJldHVybiB0aGUgb3JpZ2luYWxcclxuICAgICAqIGtleSBpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBtYXAgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleUlkIC0gVGhlIGtleSBpZCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHNoaWZ0ZWQgb3Igb3JpZ2luYWwga2V5IGlkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzaGlmdEtleUlkKCBrZXlzLCBrZXlJZCApIHtcclxuICAgICAgICB2YXIgc2hpZnQgPSBrZXlzWyBLZXlFbnVtcy5TSElGVCBdO1xyXG4gICAgICAgIGlmICggc2hpZnQgJiYgc2hpZnQuc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICByZXR1cm4gU2hpZnRNYXBbIGtleUlkIF0gfHwga2V5SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXlJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcHJlc3MgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBrZXkgc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBrZXkgcHJlc3MgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleWJvYXJkS2V5UHJlc3MoIGtleWJvYXJkICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJZCA9IGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgICAgIGtleTtcclxuICAgICAgICAgICAga2V5SWQgPSBzaGlmdEtleUlkKCBrZXlzLCBrZXlJZCApO1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAga2V5LnN0YXRlID0gXCJkb3duXCI7XHJcbiAgICAgICAgICAgIGtleWJvYXJkLnByZXNzSGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGtleUlkOiBrZXlJZCxcclxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBrZXkuY2FsbGJhY2tzLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEga2V5IHJlbGVhc2UgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBrZXkgc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBrZXkgcmVsZWFzZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlSZWxlYXNlKCBrZXlib2FyZCApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIga2V5SWQgPSBnZXRLZXlib2FyZEtleUlkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgICAgICBrZXk7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIHByb2Nlc3NlZCB0aGUga2V5ZG93biBldmVudCwgc29tZXRpbWVzIGR1ZVxyXG4gICAgICAgICAgICAvLyB0byBmb2N1cyBpc3N1ZXMgKCB3aW5kb3dzIGtleSwgcHJpbnRzY3JlZW4ga2V5LCBldGMgKVxyXG4gICAgICAgICAgICAvLyB3ZSBtaXNzIHRoZSAna2V5ZG93bicgZXZlbnQgYW5kIG9ubHkgcmVjZWl2ZVxyXG4gICAgICAgICAgICAvLyB0aGUgJ2tleXVwJ1xyXG4gICAgICAgICAgICBrZXlJZCA9IHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICk7XHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF07XHJcbiAgICAgICAgICAgIGlmICgga2V5ICYmIGtleS5zdGF0ZSA9PT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBrZXkuc3RhdGUgPSBcInVwXCI7XHJcbiAgICAgICAgICAgICAgICBrZXlib2FyZC5yZWxlYXNlSGlzdG9yeS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlJZDoga2V5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcygga2V5LmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBLZXlib2FyZCgpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbWJvcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2VxdWVuY2VzID0ge307XHJcbiAgICAgICAgdGhpcy5wcmVzc0hpc3RvcnkgPSBuZXcgQ2lyY3VsYXJBcnJheSggS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCApO1xyXG4gICAgICAgIHRoaXMucmVsZWFzZUhpc3RvcnkgPSBuZXcgQ2lyY3VsYXJBcnJheSggS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCApO1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGtleSBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcyggdGhpcyApICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgaGFuZGxlS2V5Ym9hcmRLZXlSZWxlYXNlKCB0aGlzICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGtleSBldmVudHMgdG8gYmluZCB0aGUgY2FsbGJhY2tzIHRvLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnS2V5Ym9hcmQub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLm9uJywgaW5wdXQgKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9uJywgZXZlbnRzICk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2ggaW5wdXQsIGRldGVybWluZSB0eXBlIGFuZCBzdG9yZSBhY2NvcmRpbmdseVxyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBpc1NlcXVlbmNlSW5wdXQoIGVudHJ5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRTZXF1ZW5jZSggdGhpcywgZW50cnksIGV2ZW50cywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggaXNDb21iaW5hdGlvbklucHV0KCBlbnRyeSApICkge1xyXG4gICAgICAgICAgICAgICAgYWRkQ29tYmluYXRpb24oIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhZGRLZXkoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudHMgLSBUaGUga2V5IGV2ZW50cyB0byByZW1vdmUgdGhlIGNhbGxiYWNrcyBmcm9tLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBlbnRyeSxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQub2ZmJywgaW5wdXQgKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9mZicsIGV2ZW50cyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggaXNTZXF1ZW5jZUlucHV0KCBlbnRyeSApICkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU2VxdWVuY2UoIHRoaXMsIGVudHJ5LCBldmVudHMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlzQ29tYmluYXRpb25JbnB1dCggZW50cnkgKSApIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNvbWJpbmF0aW9uKCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlS2V5KCB0aGlzLCBlbnRyeSwgZXZlbnRzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbGwgdGhlIHN0YXRlcyBvZiB0aGUgcHJvdmlkZWQga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGtleXMgLSBUaGUga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgc3RhdGUgb2YgdGhlIHByb3ZpZGVkIGtleXMuXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oIGtleXMgKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IFtdLFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgICAgIGtleXMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLnBvbGwnLCBrZXlzICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGtleXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGtleSA9IHRoaXMua2V5c1sga2V5c1tpXSBdO1xyXG4gICAgICAgICAgICBzdGF0ZXMucHVzaCgga2V5ID8ga2V5LnN0YXRlIDogJ3VwJyApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0YXRlcy5sZW5ndGggPT09IDEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGF0ZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmQ7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBLZXlNYXAgPSByZXF1aXJlKCcuL0tleU1hcCcpLFxyXG4gICAgICAgIFNoaWZ0TWFwID0gcmVxdWlyZSgnLi9TaGlmdE1hcCcpLFxyXG4gICAgICAgIEtleXMgPSB7fSxcclxuICAgICAgICBrZXlDb2RlO1xyXG5cclxuICAgIGZvciAoIGtleUNvZGUgaW4gS2V5TWFwICkge1xyXG4gICAgICAgIEtleXNbIEtleU1hcFsga2V5Q29kZSBdIF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGtleUNvZGUgaW4gU2hpZnRNYXAgKSB7XHJcbiAgICAgICAgS2V5c1sgU2hpZnRNYXBbIGtleUNvZGUgXSBdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEtleXM7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYSBET00gbW91c2UgZXZlbnQgaW50byB0aGUgcmVsZXZhbnRcclxuICAgICAqIGJ1dHRvbiBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIFRoZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXZlbnQgZW51bWVyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICkge1xyXG4gICAgICAgIHN3aXRjaCAoIGV2ZW50LmJ1dHRvbiApIHtcclxuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFwibWlkZGxlXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgYnV0dG9uIHByZXNzIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUgYnV0dG9uIHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zIC0gVGhlIGJ1dHRvbiBpbmZvcm1hdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlQnV0dG9uUHJlc3MoIGJ1dHRvbnMgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbklkID0gZ2V0TW91c2VCdXR0b25JZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbjtcclxuICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgYnV0dG9uIGluZm8gb2JqZWN0IGV4aXN0c1xyXG4gICAgICAgICAgICBidXR0b24gPSBidXR0b25zWyBidXR0b25JZCBdID0gYnV0dG9uc1sgYnV0dG9uSWQgXSB8fCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBidXR0b24uc3RhdGUgPSBcImRvd25cIjtcclxuICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBidXR0b24uY2FsbGJhY2tzLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBidXR0b24gcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGlucHV0IHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zIC0gVGhlIGJ1dHRvbiBpbmZvcm1hdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlQnV0dG9uUmVsZWFzZSggYnV0dG9ucyApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uSWQgPSBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3MgYnV0dG9uLCBwcmludHNjcmVlbiBidXR0b24sIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGlmICggYnV0dG9uICYmIGJ1dHRvbi5zdGF0ZSA9PT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGJ1dHRvbi5jYWxsYmFja3MsIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnN0YXRlID0gXCJ1cFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgbW91c2UgbW92ZW1lbnQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtb3VzZSAtIFRoZSBtb3VzZSBpbmZvcm1hdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZSggbW91c2UgKSB7XHJcbiAgICAgICAgdmFyIGxhc3RQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgLy8gbW91c2Vtb3ZlIGV2ZW50cyBzb21ldGltZXMgZmlyZSB3aGVuIGEgbW91c2UgYnV0dG9uIGlzIHByZXNzZWQsIGEgbW91c2Vtb3ZlXHJcbiAgICAgICAgICAgIC8vIHNob3VsZCBvbmx5IHF1ZXVlIGFuIGV2ZW50IGlmIHRoZSBwb3NpdGlvbiBoYXMgYWN0dWFsbHkgY2hhbmdlZFxyXG4gICAgICAgICAgICBpZiAoIGxhc3RQb3NpdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA9PT0gbGFzdFBvc2l0aW9uLnggJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFkgPT09IGxhc3RQb3NpdGlvbi55ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggbGFzdFBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmlvdXNDbGllbnRYID0gbGFzdFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2aW91c0NsaWVudFkgPSBsYXN0UG9zaXRpb24ueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIG1vdXNlLmNhbGxiYWNrcywgXCJtb3ZlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIGxhc3RQb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNb3VzZSgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuICAgICAgICB0aGlzLm1vdXNlID0ge307XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUgYnV0dG9uIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlQnV0dG9uUHJlc3MoIHRoaXMuYnV0dG9ucyApICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBoYW5kbGVNb3VzZUJ1dHRvblJlbGVhc2UoIHRoaXMuYnV0dG9ucyApICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSggdGhpcy5tb3VzZSApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gYmluZCB0aGUgY2FsbGJhY2tzIHRvLiBPcHRpb25hbC5cclxuICAgICAqL1xyXG4gICAgTW91c2UucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oIGlucHV0LCBjYWxsYmFjaywgZXZlbnRzICkge1xyXG4gICAgICAgIHZhciBidXR0b24sXHJcbiAgICAgICAgICAgIG1vdXNlLFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGo7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdNb3VzZS5vbicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2Uub24nLFxyXG4gICAgICAgICAgICBpbnB1dCwgWyAnbGVmdCcsJ21pZGRsZScsJ3JpZ2h0JywnbW92ZScgXSApO1xyXG4gICAgICAgIGV2ZW50cyA9IFV0aWwubm9ybWFsaXplRXZlbnRBcmdzKCAnTW91c2Uub24nLCBldmVudHMgKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmICggZW50cnkgPT09IFwibW92ZVwiICkge1xyXG4gICAgICAgICAgICAgICAgbW91c2UgPSB0aGlzLm1vdXNlO1xyXG4gICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzID0gbW91c2UuY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzLm1vdmUgPSBtb3VzZS5jYWxsYmFja3MubW92ZSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLmNhbGxiYWNrcy5tb3ZlLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gPSB0aGlzLmJ1dHRvbnNbIGVudHJ5IF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBqPTA7IGo8ZXZlbnRzLmxlbmd0aDsgaisrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3MgPSBidXR0b24uY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0gPSBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja3MgZnJvbS4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXQsIGNhbGxiYWNrLCBldmVudHMgKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbixcclxuICAgICAgICAgICAgbW91c2UsXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBlbnRyeSxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgajtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnTW91c2Uub2ZmJyxcclxuICAgICAgICAgICAgaW5wdXQsIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnIF0gKTtcclxuICAgICAgICBldmVudHMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9mZicsIGV2ZW50cyApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxpbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgZW50cnkgPSBpbnB1dFtpXTtcclxuICAgICAgICAgICAgaWYgKCBlbnRyeSA9PT0gXCJtb3ZlXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IHRoaXMubW91c2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG1vdXNlLmNhbGxiYWNrcyAmJiBtb3VzZS5jYWxsYmFja3MubW92ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MubW92ZS5zcGxpY2UoIG1vdXNlLmNhbGxiYWNrcy5tb3ZlLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSA9IHRoaXMuYnV0dG9uc1sgZW50cnkgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoIGo9MDsgajxldmVudHMubGVuZ3RoOyBqKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBidXR0b24uY2FsbGJhY2tzICYmIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50IF0uc3BsaWNlKCBidXR0b24uY2FsbGJhY2tzWyBldmVudCBdLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gYnV0dG9ucyAtIFRoZSBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBzdGF0ZSBvZiB0aGUgcHJvdmlkZWQgYnV0dG9ucy5cclxuICAgICAqL1xyXG4gICAgTW91c2UucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiggYnV0dG9ucyApIHtcclxuICAgICAgICB2YXIgc3RhdGVzID0gW10sXHJcbiAgICAgICAgICAgIGJ1dHRvbixcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBidXR0b25zID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdNb3VzZS5wb2xsJyxcclxuICAgICAgICAgICAgYnV0dG9ucywgWyAnbGVmdCcsJ21pZGRsZScsJ3JpZ2h0JywnbW92ZScgXSApO1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxidXR0b25zLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbIGJ1dHRvbnNbaV0gXTtcclxuICAgICAgICAgICAgc3RhdGVzLnB1c2goIGJ1dHRvbiA/IGJ1dHRvbi5zdGF0ZSA6ICd1cCcgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBzdGF0ZXMubGVuZ3RoID09PSAxICkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdGVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNlO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJ34nOiAnYCcsXHJcbiAgICAgICAgJyEnOiAnMScsXHJcbiAgICAgICAgJ0AnOiAnMicsXHJcbiAgICAgICAgJyMnOiAnMycsXHJcbiAgICAgICAgJyQnOiAnNCcsXHJcbiAgICAgICAgJyUnOiAnNScsXHJcbiAgICAgICAgJ14nOiAnNicsXHJcbiAgICAgICAgJyYnOiAnNycsXHJcbiAgICAgICAgJyonOiAnOCcsXHJcbiAgICAgICAgJygnOiAnOScsXHJcbiAgICAgICAgJyknOiAnMCcsXHJcbiAgICAgICAgJ18nOiAnLScsXHJcbiAgICAgICAgJysnOiAnPScsXHJcblxyXG4gICAgICAgICd7JzogJ1snLFxyXG4gICAgICAgICd9JzogJ10nLFxyXG4gICAgICAgICd8JzogJ1xcXFwnLFxyXG4gICAgICAgICc6JzogJzsnLFxyXG4gICAgICAgICdcIic6ICdcXCcnLFxyXG4gICAgICAgICc8JzogJywnLFxyXG4gICAgICAgICc+JzogJy4nLFxyXG4gICAgICAgICc/JzogJy8nLFxyXG5cclxuICAgICAgICAnYCc6ICd+JyxcclxuICAgICAgICAnMSc6ICchJyxcclxuICAgICAgICAnMic6ICdAJyxcclxuICAgICAgICAnMyc6ICcjJyxcclxuICAgICAgICAnNCc6ICckJyxcclxuICAgICAgICAnNSc6ICclJyxcclxuICAgICAgICAnNic6ICdeJyxcclxuICAgICAgICAnNyc6ICcmJyxcclxuICAgICAgICAnOCc6ICcqJyxcclxuICAgICAgICAnOSc6ICcoJyxcclxuICAgICAgICAnMCc6ICcpJyxcclxuICAgICAgICAnLSc6ICdfJyxcclxuICAgICAgICAnPSc6ICcrJyxcclxuXHJcbiAgICAgICAgJ1snOiAneycsXHJcbiAgICAgICAgJ10nOiAnfScsXHJcbiAgICAgICAgJ1xcXFwnOiAnfCcsXHJcbiAgICAgICAgJzsnOiAnOicsXHJcbiAgICAgICAgJyc6ICdcIicsXHJcbiAgICAgICAgJywnOiAnPCcsXHJcbiAgICAgICAgJy4nOiAnPicsXHJcbiAgICAgICAgJy8nOiAnPycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdpdmVuIGEgc3RyaW5nLCBjb252ZXJ0cyBpdCB0byBsb3dlcmNhc2UgYW5kIHJlcGxhY2VzIGFsbFxyXG4gICAgICAgICAqIHNlcXVlbnRpYWwgd2hpdGVzcGFjZSBpbnRvIGEgc2luZ2xlIHNwYWNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gbm9ybWFsaXplLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIG5vcm1hbGl6ZWQgc3RyaW5nLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZVN0cmluZzogZnVuY3Rpb24oIHN0ciApIHtcclxuICAgICAgICAgICAgLy8gY29udmVydCB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIC8vIHNldCBhbGwgd2hpdGVzcGFjZSB0byBhIHNpbmdsZSBzcGFjZSBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxzXS9nLCBcIiBcIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIHRoYXQgYSBmdW5jdGlvbiBhcmd1bWVudCBpcyBpbmRlZWQgYSBmdW5jdGlvbi4gSWYgaXQgaXNcclxuICAgICAgICAgKiBub3QsIGxvZyB0byB0aGUgY29uc29sZSBhbmQgcmV0dXJuIHRydWUuIE90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBmdW5jdGlvbiBpcyBpbnZhbGlkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNoZWNrRnVuY3Rpb25Bcmc6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGZ1bmMgKSB7XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnY2FsbGJhY2snIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBvZiB0eXBlICdmdW5jdGlvbicsIGNvbW1hbmQgaWdub3JlZC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIGFuZCBub3JtYWxpemVzIHRoZSAnaW5wdXQnIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBpbnB1dCAtIFRoZSBpbnB1dCBhcmd1bWVudC5cclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWxpZElucHV0IC0gVGhlIHJlY29nbml6ZWQgaW5wdXQuIE9wdGlvbmFsLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Ygbm9ybWFsaXplZCBpbnB1dC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVJbnB1dEFyZ3M6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGlucHV0LCB2YWxpZElucHV0ICkge1xyXG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaTtcclxuICAgICAgICAgICAgaWYgKCAhKCBpbnB1dCBpbnN0YW5jZW9mIEFycmF5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IFsgaW5wdXQgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBpbnB1dFtpXSAhPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5wdXQgaXMgbm90IGEgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2lucHV0W2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3Qgb2YgdHlwZSAnc3RyaW5nJywgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWxpZElucHV0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsaWRJbnB1dC5pbmRleE9mKCBpbnB1dFtpXSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5wdXQgaXMgbm90IHJlY29nbml6ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ1wiK2lucHV0W2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3QgYSByZWNvZ25pemVkIGlucHV0IHR5cGUsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0cy5wdXNoKCB0aGlzLm5vcm1hbGl6ZVN0cmluZyggaW5wdXRbaV0gKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXRzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBDaGVja3MgYW5kIG5vcm1hbGl6ZXMgdGhlICdldmVudHMnIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudHMgLSBUaGUgZXZlbnRzIGFyZ3VtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Ygbm9ybWFsaXplZCBpbnB1dC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVFdmVudEFyZ3M6IGZ1bmN0aW9uKCBmdW5jdGlvbk5hbWUsIGV2ZW50cyApIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGlmICggIWV2ZW50cyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IFsgJ3ByZXNzJyBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggISggZXZlbnRzIGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IFsgZXZlbnRzIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICggaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggZXZlbnRzW2ldICE9PSAncHJlc3MnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2ldICE9PSAncmVsZWFzZScgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQgaXMgbm90IHJlY29nbml6ZWRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIrZXZlbnRzW2ldK1wiJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3QgYSByZWNvZ25pemVkIGV2ZW50IHR5cGUsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2ldID0gdGhpcy5ub3JtYWxpemVTdHJpbmcoIGV2ZW50c1tpXSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhlY3V0ZSB0aGUgZnVuY3Rpb25zIGluIHRoZSBjYWxsYmFja3Mgb2JqZWN0IHRoYXQgbWF0Y2ggdGhlXHJcbiAgICAgICAgICogcHJvdmlkZWQgZXZlbnQgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja3MgLSBUaGUgY2FsbGJhY2tzIG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgc3RyaW5nLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIG5hdGl2ZSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZUNhbGxiYWNrczogZnVuY3Rpb24oIGNhbGxiYWNrcywgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGlmICggIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzWyBldmVudFR5cGUgXSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICBmb3IgKCBpPTA7IGk8Y2FsbGJhY2tzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKCBldmVudCApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxvcyBmdW5jdGlvbiB0aGF0IHN1cHBvcnRzIG5lZ2F0aXZlIG51bWJlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gVGhlIG51bWJlciB0byBtb2R1bG8uXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbW9kdWxvcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZXN1bHRpbmcgbnVtYmVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1vZDogZnVuY3Rpb24oIG51bSwgbiApIHtcclxuICAgICAgICAgICAgcmV0dXJuICggKCBudW0gJSBuICkgKyBuICkgJSBuO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG9iamVjdCBoYXMgbm8gYXR0cmlidXRlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHRlc3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgb2JqZWN0IGhhcyBrZXlzLCBmYWxzZSBpZiBub3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgdmFyIGtleTtcclxuICAgICAgICAgICAgZm9yICgga2V5IGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgIGlmICggb2JqLmhhc093blByb3BlcnR5KCBrZXkgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iXX0=
