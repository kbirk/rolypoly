(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rolypoly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    'use strict';

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

},{"./Util":9}],2:[function(require,module,exports){
(function () {

    'use strict';

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

},{}],3:[function(require,module,exports){
(function () {

    'use strict';

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

},{"./KeyEnums":2}],4:[function(require,module,exports){
(function () {

    'use strict';

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
        var err = false;
        keyIds.forEach( function( keyId ) {
            if ( !Keys[ keyId ] ) {
                console.log( 'Argument `' + keyId + '` to `' + functionName +
                    '` is not a recognized event type, command ignored.' );
                err = true;
            }
        });
        return err;
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
            result = [];
        // my lack of regex knowledge is shameful
        if ( temp.length > 1 ) {
            temp.forEach( function( t, i ) {
                if ( t.length === 0 ) {
                    if ( i === 0 ) {
                        result.push( '+' );
                    }
                } else {
                    result = result.concat( t.split('+') );
                    if ( i !== temp.length-1 ) {
                        result.push( '+' );
                    }
                }
            });
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
     * @param {Array} eventTypes - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addSequence( keyboard, sequenceKey, eventTypes, callback ) {
        var keyIds = parseSequence( sequenceKey ),
            keys = keyboard.keys,
            sequences = keyboard.sequences,
            callbacks;
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
        callbacks = sequences[ sequenceKey ].callbacks;
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            callbacks[ eventType ] = callbacks[ eventType ] || [];
            callbacks[ eventType ].push( callback );
            // add the sequence key under each key for the event
            keyIds.forEach( function( keyId ) {
                var key = keys[ keyId ] = keys[ keyId ] || {};
                key.sequences = key.sequences || {};
                key.sequences[ eventType ] = key.sequences[ eventType ] || [];
                if ( key.sequences[ eventType ].indexOf( sequenceKey ) === -1 ) {
                    // don't add duplicates
                    key.sequences[ eventType ].push( sequenceKey );
                }
            });
        });
    }

    /**
     * Removes the sequence key from the Keyboard object and removes the callback
     * for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} sequenceKey - The sequence key to be removed.
     * @param {Array} eventTypes - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeSequence( keyboard, sequenceKey, eventTypes, callback ) {
        var keyIds = parseSequence( sequenceKey ),
            keys = keyboard.keys,
            sequences = keyboard.sequences,
            sequence = sequences[ sequenceKey ] || {},
            callbacks = sequence.callbacks;
        // exit early if callbacks don't exist for sequence
        if ( !callbacks ) {
            return;
        }
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            var eventCallbacks = callbacks[ eventType ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ eventType ];
                }
            }
        });
        // if no more callbacks for the sequence, delete the sequence
        // and remove sequence from all keys
        if ( Util.isEmpty( sequence.callbacks ) ) {
            delete sequences[ sequenceKey ];
            eventTypes.forEach( function( eventType ) {
                // if there are no more instances of the sequence, remove from keys
                keyIds.forEach( function( keyId ) {
                    sequences = keys[ keyId ].sequences[ eventType ]; // re-assigning sequences
                    sequences.splice( sequences.indexOf( sequenceKey ), 1 );
                });
            });
        }
    }

    /**
     * Adds a new combination key to the Keyboard object and binds
     * the callback for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} comboKey - The combination key to be added.
     * @param {Array} eventTypes - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addCombination( keyboard, comboKey, eventTypes, callback ) {
        var keyIds = parseCombination( comboKey ),
            keys = keyboard.keys,
            combos = keyboard.combos,
            callbacks;
        // check input
        if ( checkKeyIds( 'Keyboard.on', keyIds ) ) {
            return;
        }
        // create combination entry if it does not already exist
        combos[ comboKey ] = combos[ comboKey ] || {
            keys: keyIds,
            callbacks: {}
        };
        callbacks = combos[ comboKey ].callbacks;
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            callbacks[ eventType ] = callbacks[ eventType ] || [];
            callbacks[ eventType ].push( callback );
            // add the combination key under each key for the event
            keyIds.forEach( function( keyId ) {
                var key = keys[ keyId ] = keys[ keyId ] || {};
                key.combos = key.combos || {};
                key.combos[ eventType ] = key.combos[ eventType ]  || [];
                if ( key.combos[ eventType ] .indexOf( comboKey ) === -1 ) {
                    // don't add duplicates
                    key.combos[ eventType ].push( comboKey );
                }
            });
        });
    }

    /**
     * Removes the combination key from the Keyboard object and removes the callback
     * for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {String} comboKey - The combination key to be removed.
     * @param {Array} eventTypes - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeCombination( keyboard, comboKey, eventTypes, callback ) {
        var keyIds = parseCombination( comboKey ),
            keys = keyboard.keys,
            combos = keyboard.combos,
            combo = combos[ comboKey ] || {},
            callbacks = combo.callbacks;
        // exit early if entry doesnt even exist for combo
        if ( !callbacks ) {
            return;
        }
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            var eventCallbacks = callbacks[ eventType ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ eventType ];
                }
            }
        });
        // if no more callbacks for the combo, delete the combo
        // and remove combo from all keys
        if ( Util.isEmpty( combo.callbacks ) ) {
            delete combos[ comboKey ];
            // if there are no more instances of the combo, remove from keys
            eventTypes.forEach( function( eventType ) {
                keyIds.forEach( function( keyId ) {
                    combos = keys[ keyId ].combos[ eventType ]; // re-assigning combos
                    combos.splice( combos.indexOf( comboKey ), 1 );
                });
            });
        }
    }

    /**
     * Adds a callback to the Keyboard object for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} keyId - The key id.
     * @param {Array} eventTypes - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addKey( keyboard, keyId, eventTypes, callback ) {
        var keys = keyboard.keys,
            key = keys[ keyId ] = keys[ keyId ] || {};
        // check input
        if ( checkKeyIds( 'Keyboard.on', [ keyId ] ) ) {
            return;
        }
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            var callbacks = key.callbacks = key.callbacks || {};
            callbacks[ eventType ] = callbacks[ eventType ] || [];
            callbacks[ eventType ].push( callback );
        });
    }

    /**
     * Removes a callback from the Keyboard object for the appropriate event types.
     *
     * @param {Object} keyboard - The Keyboard object.
     * @param {Object} keyId - The key id.
     * @param {Array} eventTypes - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeKey( keyboard, keyId, eventTypes, callback ) {
        var keys = keyboard.keys,
            key = keys[ keyId ] || {},
            callbacks = key.callbacks;
        // exit early if entry doesnt even exist for key
        if ( !callbacks ) {
            return;
        }
        // bind callback under the provided events
        eventTypes.forEach( function( eventType ) {
            var eventCallbacks = callbacks[ eventType ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ eventType ];
                }
            }
        });
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
            // key is guarenteed to exist if the combo exists
            key = keys[ keyIds[i] ];
            // a 'release' combo can only be triggered if the keys had all
            // been down together at one point
            if ( eventType === 'release' && ( !combo.pressed || key.state !== 'up' ) ) {
                return false;
            }
            // a 'press' combo only needs all keys to be down together
            if ( eventType === 'press' && key.state !== 'down' ) {
                return false;
            }
        }
        // combo is successful, flag so it doesn't spam when held
        if ( eventType === 'press' ) {
            // flag that all keys have been down
            combo.pressed = true;
        } else {
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
        var combos = keyboard.combos;
        if ( !key.combos ) {
            return;
        }
        // release combination events require press combination events to
        // be tracked, therefore if a press event occurs that is part of a
        // combination it MUST be processed, regardless if there is a
        // callback.
        if ( eventType === 'press' ) {
            // process the press callbacks
            if ( key.combos.press ) {
                // for every combo in the key
                key.combos.press.forEach( function( press ) {
                    var combo = combos[ press ];
                    if ( isComboSatisfied( keyboard, combo, 'press' ) ) {
                        // all keys in combo satisfy conditions, execute callbacks
                        Util.executeCallbacks( combo.callbacks, 'press', event );
                    }
                });
            }
            // process the release callbacks, ignore callbacks as this isn't
            // a release event but is required for release events
            if ( key.combos.release ) {
                // process release events to flag they have been pressed prior
                // for every combo in the key
                key.combos.release.forEach( function( release ) {
                    var combo = combos[ release ];
                    // process combo but don't execute any callbacks
                    isComboSatisfied( keyboard, combo, 'press' );
                });
            }
        } else {
            // process the release callbacks
            if ( key.combos.release ) {
                // for every combo in the key
                key.combos.release.forEach( function( release ) {
                    var combo = combos[ release ];
                    if ( isComboSatisfied( keyboard, combo, 'release' ) ) {
                        // all keys in combo satisfy conditions, execute callbacks
                        Util.executeCallbacks( combo.callbacks, 'release', event );
                    }
                });
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
            while ( sequenceKey !== 'shift' &&
                key &&
                key.keyId === 'shift' ) {
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
            history;
        if ( key.sequences && key.sequences[eventType] ) {
            if ( eventType === 'press' ) {
                history = keyboard.pressHistory;
            } else {
                history = keyboard.releaseHistory;
            }
            // for every sequence in the key
            key.sequences[eventType].forEach( function( seqKey ) {
                var sequence = sequences[ seqKey ];
                // only check sequence if this key is the LAST KEY
                if ( sequence.lastKey === keyId &&
                     isSequenceSatisfied( history, sequence.keys ) ) {
                    // all keys in sequence satisfy conditions, execute callbacks
                    Util.executeCallbacks( sequence.callbacks, eventType, event );
                }
            });
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
        return KeyMap[ charCode ];
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
        if ( shift && shift.state === 'down' ) {
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
            if ( !keyId ) {
                // key is not recognized
                return;
            }
            keyId = shiftKeyId( keys, keyId );
            key = keys[ keyId ] = keys[ keyId ] || {};
            key.state = 'down';
            keyboard.pressHistory.push({
                keyId: keyId,
                timestamp: Date.now()
            });
            Util.executeCallbacks( key.callbacks, 'press', event );
            checkCombos( keyboard, key, 'press', event );
            checkSequences( keyboard, key, keyId, 'press', event );
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
            if ( key && key.state === 'down' ) {
                key.state = 'up';
                keyboard.releaseHistory.push({
                    keyId: keyId,
                    timestamp: Date.now()
                });
                Util.executeCallbacks( key.callbacks, 'release', event );
                checkCombos( keyboard, key, 'release', event );
                checkSequences( keyboard, key, keyId, 'release', event );
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
     * @param {Array|String} eventTypes - The key events to bind the callbacks to.
     */
    Keyboard.prototype.on = function( inputs, callback, eventTypes ) {
        if ( Util.checkFunctionArg( 'Keyboard.on', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs( 'Keyboard.on', inputs );
        eventTypes = Util.normalizeEventArgs( 'Keyboard.on', eventTypes );
        // for each input, determine type and store accordingly
        var that = this;
        inputs.forEach( function( input ) {
            if ( isSequenceInput( input ) ) {
                addSequence( that, input, eventTypes, callback );
            } else if ( isCombinationInput( input ) ) {
                addCombination( that, input, eventTypes, callback );
            } else {
                addKey( that, input, eventTypes, callback );
            }
        });
        return this;
    };

    /**
     * Remove a listener for a set of input and events.
     * @memberof Keyboard
     *
     * @param {Array|String} input - The input identification strings.
     * @param {Function} callback - The callback function.
     * @param {Array|String} eventTypes - The key events to remove the callbacks from.
     */
    Keyboard.prototype.off = function( inputs, callback, eventTypes ) {
        if ( Util.checkFunctionArg( 'Keyboard.off', callback ) ) {
            return this;
        }
        inputs = Util.normalizeInputArgs( 'Keyboard.off', inputs );
        eventTypes = Util.normalizeEventArgs( 'Keyboard.off', eventTypes );
        // for each input, determine type and store accordingly
        var that = this;
        inputs.forEach( function( input ) {
            if ( isSequenceInput( input ) ) {
                removeSequence( that, input, eventTypes, callback );
            } else if ( isCombinationInput( input ) ) {
                removeCombination( that, input, eventTypes, callback );
            } else {
                removeKey( that, input, eventTypes, callback );
            }
        });
        return this;
    };

    /**
     * Poll the states of the provided key identification strings.
     * @memberof Keyboard
     *
     * @param {Array|String} keyIds - The key identification strings.
     *
     * @returns {Object} The state of the provided keys.
     */
    Keyboard.prototype.poll = function( keyIds ) {
        var keys = this.keys,
            states = {};
        keyIds = Util.normalizeInputArgs( 'Keyboard.poll', keyIds );
        keyIds.forEach( function( keyId ) {
            var key = keys[ keyId ];
            states[ keyId ] = key ? key.state : 'up';
        });
        return keyIds.length === 1 ? states[ keyIds[0] ] : states;
    };

    module.exports = Keyboard;

}());

},{"./CircularArray":1,"./KeyEnums":2,"./KeyMap":3,"./Keys":5,"./ShiftMap":7,"./Util":9}],5:[function(require,module,exports){
(function () {

    'use strict';

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

},{"./KeyMap":3,"./ShiftMap":7}],6:[function(require,module,exports){
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

},{"./Util":9}],7:[function(require,module,exports){
(function () {

    'use strict';

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
        '\'': '"',
        ',': '<',
        '.': '>',
        '/': '?',

    };

}());

},{}],8:[function(require,module,exports){
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

},{"./Util":9}],9:[function(require,module,exports){
(function () {

    'use strict';

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
            return str.replace(/[\s]/g, ' ');
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
                console.log( 'Argument `callback` to `' + functionName + '` is not of type `function`, command ignored.');
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
        normalizeInputArgs: function( functionName, inputs, validInput ) {
            var that = this,
                normalizedInputs = [];
            if ( !( inputs instanceof Array ) ) {
                inputs = [ inputs ];
            }
            inputs.forEach( function( input ) {
                if ( typeof input !== 'string' ) {
                    // input is not a string
                    console.log( 'Argument `' + input + '` to `' + functionName + '` is not of type `string`, argument removed.' );
                    return;
                }
                if ( validInput ) {
                    if ( validInput.indexOf( input ) === -1 ) {
                        // input is not recognized
                        console.log( 'Argument `' + input + '` to `' + functionName + '` is not a recognized input type, argument removed.' );
                        return;
                    }
                }
                normalizedInputs.push( that.normalizeString( input ) );
            });
            return normalizedInputs;
        },

        /** Checks and normalizes the 'events' argument.
         *
         * @param {String} functionName - The name of the calling function.
         * @param {String|Array} events - The events argument.
         *
         * @returns {Array} The array of normalized input.
         */
        normalizeEventArgs: function( functionName, eventTypes ) {
            var that = this,
                normalizedEvents = [];
            if ( !eventTypes ) {
                eventTypes = [ 'press' ];
            }
            if ( !( eventTypes instanceof Array ) ) {
                eventTypes = [ eventTypes ];
            }
            eventTypes.forEach( function( eventType ) {
                if ( eventType !== 'press' &&
                    eventType !== 'release' ) {
                    // event is not recognized
                    console.log( 'Argument `' + eventType + '` to `' + functionName + '` is not a recognized event type, argument removed.' );
                } else {
                    normalizedEvents.push( that.normalizeString( eventType ) );
                }
            });
            return normalizedEvents;
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
            if ( !callbacks || !callbacks[ eventType ] ) {
                return;
            }
            callbacks[ eventType ].forEach( function( callback ) {
                callback( event );
            });
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
            return Object.keys( obj ).length === 0;
        }

    };

}());

},{}],10:[function(require,module,exports){
(function () {

    'use strict';

    module.exports = {

        Keyboard: require('./Keyboard'),
        Mouse: require('./Mouse'),
        Touch: require('./Touch')

    };

}());

},{"./Keyboard":4,"./Mouse":6,"./Touch":8}]},{},[10])(10)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2lyY3VsYXJBcnJheS5qcyIsInNyYy9LZXlFbnVtcy5qcyIsInNyYy9LZXlNYXAuanMiLCJzcmMvS2V5Ym9hcmQuanMiLCJzcmMvS2V5cy5qcyIsInNyYy9Nb3VzZS5qcyIsInNyYy9TaGlmdE1hcC5qcyIsInNyYy9Ub3VjaC5qcyIsInNyYy9VdGlsLmpzIiwic3JjL2V4cG9ydHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBjaXJjdWxhciBhcnJheSBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgQ2lyY3VsYXJBcnJheVxyXG4gICAgICogQGNsYXNzZGVzYyBBIHNpbXBsZSBjaXJjdWxhciBhcnJheSB0aGF0IGlzIGFsbG9jYXRlZCB0byBhIGZpeGVkIHNpemUuXHJcbiAgICAgKiAgICAgV2hlbiBlbGVtZW50cyBhcmUgcHVzaGVkIGJleW9uZCBpdHMgYWxsb2NhdGVkIGxlbmd0aCwgdGhleVxyXG4gICAgICogICAgIHdpbGwgaW5zdGVhZCBvdmVyd3JpdGUgZXhzdGluZyBpbmRpY2VzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJBcnJheSggbGVuZ3RoICkge1xyXG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCB8fCAyNTY7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVzaCBhbiBlbGVtZW50IHRvIHRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBhcnJheS5cclxuICAgICAqIEBtZW1iZXJvZiBDaXJjdWxhckFycmF5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIC0gVGhlIGRhdGEgdG8gaW5zZXJ0IGludG8gdGhlIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJbIHRoaXMuaW5kZXggXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgMSkgJSB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIG1vc3QgcmVjZW50bHkgcHVzaGVkIGVsZW1lbnQuIEFuIGluZGV4IG9mZnNldCBtYXlcclxuICAgICAqIGJlIHByb3ZpZGVkLlxyXG4gICAgICogQG1lbWJlcm9mIENpcmN1bGFyQXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gQW4gb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgaW5kZXguIE9wdGlvbmFsLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfSBUaGUgbW9zdCByZWNlbnRseSBwdXNoZWQgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgQ2lyY3VsYXJBcnJheS5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKCBvZmZzZXQgKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ID8gb2Zmc2V0IDogMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJbIFV0aWwubW9kKCB0aGlzLmluZGV4LTEtb2Zmc2V0LCB0aGlzLmxlbmd0aCApIF07XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gQ2lyY3VsYXJBcnJheTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBCQUNLU1BBQ0U6ICdiYWNrc3BhY2UnLFxyXG4gICAgICAgIFRBQjogJ3RhYicsXHJcbiAgICAgICAgRU5URVI6ICdlbnRlcicsXHJcbiAgICAgICAgU0hJRlQ6ICdzaGlmdCcsXHJcbiAgICAgICAgQ1RSTDogJ2N0cmwnLFxyXG4gICAgICAgIEFMVDogJ2FsdCcsXHJcbiAgICAgICAgUEFVU0VfQlJFQUs6ICdwYXVzZWJyZWFrJyxcclxuICAgICAgICBDQVBTX0xPQ0s6ICdjYXBzbG9jaycsXHJcbiAgICAgICAgRVNDOiAnZXNjJyxcclxuICAgICAgICBQQUdFX1VQOiAncGFnZXVwJyxcclxuICAgICAgICBQQUdFX0RPV046ICdwYWdlZG93bicsXHJcbiAgICAgICAgRU5EOiAnZW5kJyxcclxuICAgICAgICBIT01FOiAnaG9tZScsXHJcbiAgICAgICAgTEVGVF9BUlJPVzogJ2xlZnQnLFxyXG4gICAgICAgIFVQX0FSUk9XOiAndXAnLFxyXG4gICAgICAgIFJJR0hUX0FSUk9XOiAncmlnaHQnLFxyXG4gICAgICAgIERPV05fQVJST1c6ICdkb3duJyxcclxuICAgICAgICBQUklOVF9TQ1JFRU46ICdwcmludHNjcmVlbicsXHJcbiAgICAgICAgSU5TRVJUOiAnaW5zZXJ0JyxcclxuICAgICAgICBERUxFVEU6ICdkZWxldGUnLFxyXG4gICAgICAgIFdJTkRPV1M6ICd3aW5kb3dzJyxcclxuICAgICAgICBTRUxFQ1Q6ICdzZWxlY3QnLFxyXG4gICAgICAgIFNQQUNFX0JBUjogJ3NwYWNlJyxcclxuICAgICAgICBOVU1fTE9DSzogJ251bWxvY2snLFxyXG4gICAgICAgIFNDUk9MTF9MT0NLOiAnc2Nyb2xsbG9jaycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBLZXlFbnVtcyA9IHJlcXVpcmUoJy4vS2V5RW51bXMnKTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJzgnOiBLZXlFbnVtcy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgJzknOiBLZXlFbnVtcy5UQUIsXHJcbiAgICAgICAgJzEzJzogS2V5RW51bXMuRU5URVIsXHJcbiAgICAgICAgJzE2JzogS2V5RW51bXMuU0hJRlQsXHJcbiAgICAgICAgJzE3JzogS2V5RW51bXMuQ1RSTCxcclxuICAgICAgICAnMTgnOiBLZXlFbnVtcy5BTFQsXHJcbiAgICAgICAgJzE5JzogS2V5RW51bXMuUEFVU0VfQlJFQUssXHJcbiAgICAgICAgJzIwJzogS2V5RW51bXMuQ0FQU19MT0NLLFxyXG4gICAgICAgICcyNyc6IEtleUVudW1zLkVTQyxcclxuICAgICAgICAnMzInOiBLZXlFbnVtcy5TUEFDRV9CQVIsXHJcbiAgICAgICAgJzMzJzogS2V5RW51bXMuUEFHRV9VUCxcclxuICAgICAgICAnMzQnOiBLZXlFbnVtcy5QQUdFX0RPV04sXHJcbiAgICAgICAgJzM1JzogS2V5RW51bXMuRU5ELFxyXG4gICAgICAgICczNic6IEtleUVudW1zLkhPTUUsXHJcbiAgICAgICAgJzM3JzogS2V5RW51bXMuTEVGVF9BUlJPVyxcclxuICAgICAgICAnMzgnOiBLZXlFbnVtcy5VUF9BUlJPVyxcclxuICAgICAgICAnMzknOiBLZXlFbnVtcy5SSUdIVF9BUlJPVyxcclxuICAgICAgICAnNDAnOiBLZXlFbnVtcy5ET1dOX0FSUk9XLFxyXG4gICAgICAgICc0NCc6IEtleUVudW1zLlBSSU5UX1NDUkVFTixcclxuICAgICAgICAnNDUnOiBLZXlFbnVtcy5JTlNFUlQsXHJcbiAgICAgICAgJzQ2JzogS2V5RW51bXMuREVMRVRFLFxyXG4gICAgICAgICc0OCc6ICcwJyxcclxuICAgICAgICAnNDknOiAnMScsXHJcbiAgICAgICAgJzUwJzogJzInLFxyXG4gICAgICAgICc1MSc6ICczJyxcclxuICAgICAgICAnNTInOiAnNCcsXHJcbiAgICAgICAgJzUzJzogJzUnLFxyXG4gICAgICAgICc1NCc6ICc2JyxcclxuICAgICAgICAnNTUnOiAnNycsXHJcbiAgICAgICAgJzU2JzogJzgnLFxyXG4gICAgICAgICc1Nyc6ICc5JyxcclxuICAgICAgICAnNjUnOiAnYScsXHJcbiAgICAgICAgJzY2JzogJ2InLFxyXG4gICAgICAgICc2Nyc6ICdjJyxcclxuICAgICAgICAnNjgnOiAnZCcsXHJcbiAgICAgICAgJzY5JzogJ2UnLFxyXG4gICAgICAgICc3MCc6ICdmJyxcclxuICAgICAgICAnNzEnOiAnZycsXHJcbiAgICAgICAgJzcyJzogJ2gnLFxyXG4gICAgICAgICc3Myc6ICdpJyxcclxuICAgICAgICAnNzQnOiAnaicsXHJcbiAgICAgICAgJzc1JzogJ2snLFxyXG4gICAgICAgICc3Nic6ICdsJyxcclxuICAgICAgICAnNzcnOiAnbScsXHJcbiAgICAgICAgJzc4JzogJ24nLFxyXG4gICAgICAgICc3OSc6ICdvJyxcclxuICAgICAgICAnODAnOiAncCcsXHJcbiAgICAgICAgJzgxJzogJ3EnLFxyXG4gICAgICAgICc4Mic6ICdyJyxcclxuICAgICAgICAnODMnOiAncycsXHJcbiAgICAgICAgJzg0JzogJ3QnLFxyXG4gICAgICAgICc4NSc6ICd1JyxcclxuICAgICAgICAnODYnOiAndicsXHJcbiAgICAgICAgJzg3JzogJ3cnLFxyXG4gICAgICAgICc4OCc6ICd4JyxcclxuICAgICAgICAnODknOiAneScsXHJcbiAgICAgICAgJzkwJzogJ3onLFxyXG4gICAgICAgICc5MSc6IEtleUVudW1zLldJTkRPV1MsXHJcbiAgICAgICAgJzkyJzogS2V5RW51bXMuV0lORE9XUyxcclxuICAgICAgICAnOTMnOiBLZXlFbnVtcy5TRUxFQ1QsXHJcbiAgICAgICAgJzk2JzogJzAnLFxyXG4gICAgICAgICc5Nyc6ICcxJyxcclxuICAgICAgICAnOTgnOiAnMicsXHJcbiAgICAgICAgJzk5JzogJzMnLFxyXG4gICAgICAgICcxMDAnOiAnNCcsXHJcbiAgICAgICAgJzEwMSc6ICc1JyxcclxuICAgICAgICAnMTAyJzogJzYnLFxyXG4gICAgICAgICcxMDMnOiAnNycsXHJcbiAgICAgICAgJzEwNCc6ICc4JyxcclxuICAgICAgICAnMTA1JzogJzknLFxyXG4gICAgICAgICcxMDYnOiAnKicsXHJcbiAgICAgICAgJzEwNyc6ICcrJyxcclxuICAgICAgICAnMTA5JzogJy0nLFxyXG4gICAgICAgICcxMTAnOiAnLicsXHJcbiAgICAgICAgJzExMSc6ICcvJyxcclxuICAgICAgICAnMTEyJzogJ2YxJyxcclxuICAgICAgICAnMTEzJzogJ2YyJyxcclxuICAgICAgICAnMTE0JzogJ2YzJyxcclxuICAgICAgICAnMTE1JzogJ2Y0JyxcclxuICAgICAgICAnMTE2JzogJ2Y1JyxcclxuICAgICAgICAnMTE3JzogJ2Y2JyxcclxuICAgICAgICAnMTE4JzogJ2Y3JyxcclxuICAgICAgICAnMTE5JzogJ2Y4JyxcclxuICAgICAgICAnMTIwJzogJ2Y5JyxcclxuICAgICAgICAnMTIxJzogJ2YxMCcsXHJcbiAgICAgICAgJzEyMic6ICdmMTEnLFxyXG4gICAgICAgICcxMjMnOiAnZjEyJyxcclxuICAgICAgICAnMTQ0JzogS2V5RW51bXMuTlVNX0xPQ0ssXHJcbiAgICAgICAgJzE0NSc6IEtleUVudW1zLlNDUk9MTF9MT0NLLFxyXG4gICAgICAgICcxODYnOiAnOicsXHJcbiAgICAgICAgJzE4Nyc6ICc9JyxcclxuICAgICAgICAnMTg4JzogJywnLFxyXG4gICAgICAgICcxODknOiAnLScsXHJcbiAgICAgICAgJzE5MCc6ICcuJyxcclxuICAgICAgICAnMTkxJzogJy8nLFxyXG4gICAgICAgICcxOTInOiAnYCcsXHJcbiAgICAgICAgJzIxOSc6ICdbJyxcclxuICAgICAgICAnMjIwJzogJ1xcXFwnLFxyXG4gICAgICAgICcyMjEnOiAnXScsXHJcbiAgICAgICAgJzIyMic6ICdcXCcnXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyksXHJcbiAgICAgICAgS2V5cyA9IHJlcXVpcmUoJy4vS2V5cycpLFxyXG4gICAgICAgIEtleUVudW1zID0gcmVxdWlyZSgnLi9LZXlFbnVtcycpLFxyXG4gICAgICAgIEtleU1hcCA9IHJlcXVpcmUoJy4vS2V5TWFwJyksXHJcbiAgICAgICAgU2hpZnRNYXAgPSByZXF1aXJlKCcuL1NoaWZ0TWFwJyksXHJcbiAgICAgICAgQ2lyY3VsYXJBcnJheSA9IHJlcXVpcmUoJy4vQ2lyY3VsYXJBcnJheScpLFxyXG4gICAgICAgIFNFUVVFTkNFX1RJTUVPVVQgPSA4MDAsXHJcbiAgICAgICAgS0VZX0hJU1RPUllfQlVGRkVSX0xFTkdUSCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MgYXJlIHJlY29nbml6ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5SWRzIC0gVGhlIGtleSBpbnB1dCBhcmd1bWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBrZXkgaWRzIGFyZSB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hlY2tLZXlJZHMoIGZ1bmN0aW9uTmFtZSwga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBlcnIgPSBmYWxzZTtcclxuICAgICAgICBrZXlJZHMuZm9yRWFjaCggZnVuY3Rpb24oIGtleUlkICkge1xyXG4gICAgICAgICAgICBpZiAoICFLZXlzWyBrZXlJZCBdICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdBcmd1bWVudCBgJyArIGtleUlkICsgJ2AgdG8gYCcgKyBmdW5jdGlvbk5hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICdgIGlzIG5vdCBhIHJlY29nbml6ZWQgZXZlbnQgdHlwZSwgY29tbWFuZCBpZ25vcmVkLicgKTtcclxuICAgICAgICAgICAgICAgIGVyciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyByZWNvZ25pemVkIGFzIGEga2V5IHNlcXVlbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGlucHV0IGlzIGEga2V5IHNlcXVlbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1NlcXVlbmNlSW5wdXQoIGlucHV0ICkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dC5zcGxpdCgnICcpLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBzZXF1ZW5jZSBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlS2V5LnNwbGl0KCcgJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIHJlY29nbml6ZWQgYXMgYSBrZXkgY29tYmluYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgaW5wdXQgaXMgYSBrZXkgY29tYmluYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzQ29tYmluYXRpb25JbnB1dCggaW5wdXQgKSB7XHJcbiAgICAgICAgcmV0dXJuICggaW5wdXQubGVuZ3RoID4gMSApID8gaW5wdXQuc3BsaXQoJysnKS5sZW5ndGggPiAxIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBjb21iaW5hdGlvbiBrZXkgaW50byB0aGUgaW5kaXZpZHVhbCBrZXkgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgYXJyYXkgb2Yga2V5IGlkcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjb21ib0tleS5zcGxpdCgvXFwrXFwrXFwrfFxcK1xcKy8pLFxyXG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgICAgICAvLyBteSBsYWNrIG9mIHJlZ2V4IGtub3dsZWRnZSBpcyBzaGFtZWZ1bFxyXG4gICAgICAgIGlmICggdGVtcC5sZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICB0ZW1wLmZvckVhY2goIGZ1bmN0aW9uKCB0LCBpICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0Lmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGkgPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCAnKycgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoIHQuc3BsaXQoJysnKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaSAhPT0gdGVtcC5sZW5ndGgtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goICcrJyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY29tYm9LZXkuc3BsaXQoJysnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgc2VxdWVuY2Uga2V5IHRvIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIGJpbmRzIHRoZSBjYWxsYmFja1xyXG4gICAgICogZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleSB0byBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZFNlcXVlbmNlKCBrZXlib2FyZCwgc2VxdWVuY2VLZXksIGV2ZW50VHlwZXMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjcmVhdGUgc2VxdWVuY2UgZW50cnkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSA9IHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXSB8fCB7XHJcbiAgICAgICAgICAgIGtleXM6IGtleUlkcyxcclxuICAgICAgICAgICAgbGFzdEtleToga2V5SWRzWyBrZXlJZHMubGVuZ3RoIC0gMV0sIC8vIHN0b3JlIHRoZSBsYXN0IGtleSBvZiB0aGUgc2VxdWVuY2VcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2FsbGJhY2tzID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdLmNhbGxiYWNrcztcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50VHlwZSBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc2VxdWVuY2Uga2V5IHVuZGVyIGVhY2gga2V5IGZvciB0aGUgZXZlbnRcclxuICAgICAgICAgICAga2V5SWRzLmZvckVhY2goIGZ1bmN0aW9uKCBrZXlJZCApIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleS5zZXF1ZW5jZXMgPSBrZXkuc2VxdWVuY2VzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5LnNlcXVlbmNlc1sgZXZlbnRUeXBlIF0gPSBrZXkuc2VxdWVuY2VzWyBldmVudFR5cGUgXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGlmICgga2V5LnNlcXVlbmNlc1sgZXZlbnRUeXBlIF0uaW5kZXhPZiggc2VxdWVuY2VLZXkgKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGR1cGxpY2F0ZXNcclxuICAgICAgICAgICAgICAgICAgICBrZXkuc2VxdWVuY2VzWyBldmVudFR5cGUgXS5wdXNoKCBzZXF1ZW5jZUtleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcXVlbmNlIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5IHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudFR5cGVzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdIHx8IHt9LFxyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBzZXF1ZW5jZS5jYWxsYmFja3M7XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBjYWxsYmFja3MgZG9uJ3QgZXhpc3QgZm9yIHNlcXVlbmNlXHJcbiAgICAgICAgaWYgKCAhY2FsbGJhY2tzICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGV2ZW50VHlwZXMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50Q2FsbGJhY2tzID0gY2FsbGJhY2tzWyBldmVudFR5cGUgXTtcclxuICAgICAgICAgICAgaWYgKCBldmVudENhbGxiYWNrcyApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2tzLnNwbGljZSggZXZlbnRDYWxsYmFja3MuaW5kZXhPZiggY2FsbGJhY2sgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIGV2ZW50LCByZW1vdmUgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGV2ZW50Q2FsbGJhY2tzLmxlbmd0aCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tzWyBldmVudFR5cGUgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciB0aGUgc2VxdWVuY2UsIGRlbGV0ZSB0aGUgc2VxdWVuY2VcclxuICAgICAgICAvLyBhbmQgcmVtb3ZlIHNlcXVlbmNlIGZyb20gYWxsIGtleXNcclxuICAgICAgICBpZiAoIFV0aWwuaXNFbXB0eSggc2VxdWVuY2UuY2FsbGJhY2tzICkgKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF07XHJcbiAgICAgICAgICAgIGV2ZW50VHlwZXMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGluc3RhbmNlcyBvZiB0aGUgc2VxdWVuY2UsIHJlbW92ZSBmcm9tIGtleXNcclxuICAgICAgICAgICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VzID0ga2V5c1sga2V5SWQgXS5zZXF1ZW5jZXNbIGV2ZW50VHlwZSBdOyAvLyByZS1hc3NpZ25pbmcgc2VxdWVuY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VzLnNwbGljZSggc2VxdWVuY2VzLmluZGV4T2YoIHNlcXVlbmNlS2V5ICksIDEgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNvbWJpbmF0aW9uIGtleSB0byB0aGUgS2V5Ym9hcmQgb2JqZWN0IGFuZCBiaW5kc1xyXG4gICAgICogdGhlIGNhbGxiYWNrIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudFR5cGVzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB1bmRlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudFR5cGVzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY2FsbGJhY2tzO1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9uJywga2V5SWRzICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbWJpbmF0aW9uIGVudHJ5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3RcclxuICAgICAgICBjb21ib3NbIGNvbWJvS2V5IF0gPSBjb21ib3NbIGNvbWJvS2V5IF0gfHwge1xyXG4gICAgICAgICAgICBrZXlzOiBrZXlJZHMsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNhbGxiYWNrcyA9IGNvbWJvc1sgY29tYm9LZXkgXS5jYWxsYmFja3M7XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50VHlwZSBdID0gY2FsbGJhY2tzWyBldmVudFR5cGUgXSB8fCBbXTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudFR5cGUgXS5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGNvbWJpbmF0aW9uIGtleSB1bmRlciBlYWNoIGtleSBmb3IgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXkuY29tYm9zID0ga2V5LmNvbWJvcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleS5jb21ib3NbIGV2ZW50VHlwZSBdID0ga2V5LmNvbWJvc1sgZXZlbnRUeXBlIF0gIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXkuY29tYm9zWyBldmVudFR5cGUgXSAuaW5kZXhPZiggY29tYm9LZXkgKSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGR1cGxpY2F0ZXNcclxuICAgICAgICAgICAgICAgICAgICBrZXkuY29tYm9zWyBldmVudFR5cGUgXS5wdXNoKCBjb21ib0tleSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGNvbWJpbmF0aW9uIGtleSBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tYm9LZXkgLSBUaGUgY29tYmluYXRpb24ga2V5IHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudFR5cGVzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ29tYmluYXRpb24oIGtleWJvYXJkLCBjb21ib0tleSwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlQ29tYmluYXRpb24oIGNvbWJvS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBjb21ib3MgPSBrZXlib2FyZC5jb21ib3MsXHJcbiAgICAgICAgICAgIGNvbWJvID0gY29tYm9zWyBjb21ib0tleSBdIHx8IHt9LFxyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjb21iby5jYWxsYmFja3M7XHJcbiAgICAgICAgLy8gZXhpdCBlYXJseSBpZiBlbnRyeSBkb2VzbnQgZXZlbiBleGlzdCBmb3IgY29tYm9cclxuICAgICAgICBpZiAoICFjYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRDYWxsYmFja3MgPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50Q2FsbGJhY2tzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRDYWxsYmFja3Muc3BsaWNlKCBldmVudENhbGxiYWNrcy5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggZXZlbnRDYWxsYmFja3MubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBjb21ibywgZGVsZXRlIHRoZSBjb21ib1xyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgY29tYm8gZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBjb21iby5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvc1sgY29tYm9LZXkgXTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBjb21ibywgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlJZHMuZm9yRWFjaCggZnVuY3Rpb24oIGtleUlkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbWJvcyA9IGtleXNbIGtleUlkIF0uY29tYm9zWyBldmVudFR5cGUgXTsgLy8gcmUtYXNzaWduaW5nIGNvbWJvc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbWJvcy5zcGxpY2UoIGNvbWJvcy5pbmRleE9mKCBjb21ib0tleSApLCAxICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNhbGxiYWNrIHRvIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZEtleSgga2V5Ym9hcmQsIGtleUlkLCBldmVudFR5cGVzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgIC8vIGNoZWNrIGlucHV0XHJcbiAgICAgICAgaWYgKCBjaGVja0tleUlkcyggJ0tleWJvYXJkLm9uJywgWyBrZXlJZCBdICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcyA9IGtleS5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50VHlwZSBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgY2FsbGJhY2sgZnJvbSB0aGUgS2V5Ym9hcmQgb2JqZWN0IGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlJZCAtIFRoZSBrZXkgaWQuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudFR5cGVzIC0gVGhlIGV2ZW50IHR5cGVzIHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlS2V5KCBrZXlib2FyZCwga2V5SWQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSB8fCB7fSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcztcclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBrZXlcclxuICAgICAgICBpZiAoICFjYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRDYWxsYmFja3MgPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50Q2FsbGJhY2tzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRDYWxsYmFja3Muc3BsaWNlKCBldmVudENhbGxiYWNrcy5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggZXZlbnRDYWxsYmFja3MubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFsbCB0aGUga2V5cyBpbiB0aGUgY29tYmluYXRpb24gYXJlXHJcbiAgICAgKiBvZiB0aGUgcmVxdWlyZWQgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21ibyAtIFRoZSBjb21iaW5hdGlvbiBlbnRyeS5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBjb21iaW5hdGlvbiBpcyBzYXRpc2ZpZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgZXZlbnRUeXBlICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5SWRzID0gY29tYm8ua2V5cyxcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGtleSBpbiB0aGUgY29tYm9cclxuICAgICAgICBmb3IgKCBpPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAvLyBrZXkgaXMgZ3VhcmVudGVlZCB0byBleGlzdCBpZiB0aGUgY29tYm8gZXhpc3RzXHJcbiAgICAgICAgICAgIGtleSA9IGtleXNbIGtleUlkc1tpXSBdO1xyXG4gICAgICAgICAgICAvLyBhICdyZWxlYXNlJyBjb21ibyBjYW4gb25seSBiZSB0cmlnZ2VyZWQgaWYgdGhlIGtleXMgaGFkIGFsbFxyXG4gICAgICAgICAgICAvLyBiZWVuIGRvd24gdG9nZXRoZXIgYXQgb25lIHBvaW50XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSAncmVsZWFzZScgJiYgKCAhY29tYm8ucHJlc3NlZCB8fCBrZXkuc3RhdGUgIT09ICd1cCcgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhICdwcmVzcycgY29tYm8gb25seSBuZWVkcyBhbGwga2V5cyB0byBiZSBkb3duIHRvZ2V0aGVyXHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSAncHJlc3MnICYmIGtleS5zdGF0ZSAhPT0gJ2Rvd24nICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbWJvIGlzIHN1Y2Nlc3NmdWwsIGZsYWcgc28gaXQgZG9lc24ndCBzcGFtIHdoZW4gaGVsZFxyXG4gICAgICAgIGlmICggZXZlbnRUeXBlID09PSAncHJlc3MnICkge1xyXG4gICAgICAgICAgICAvLyBmbGFnIHRoYXQgYWxsIGtleXMgaGF2ZSBiZWVuIGRvd25cclxuICAgICAgICAgICAgY29tYm8ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGZsYWdcclxuICAgICAgICAgICAgZGVsZXRlIGNvbWJvLnByZXNzZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIGNvbWJpbmF0aW9ucyB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUga2V5LiBJZiBhbnkgYXJlXHJcbiAgICAgKiBzYXRpc2ZpZWQsIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmRFdmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCBldmVudFR5cGUsIGV2ZW50ICkge1xyXG4gICAgICAgIHZhciBjb21ib3MgPSBrZXlib2FyZC5jb21ib3M7XHJcbiAgICAgICAgaWYgKCAha2V5LmNvbWJvcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZWxlYXNlIGNvbWJpbmF0aW9uIGV2ZW50cyByZXF1aXJlIHByZXNzIGNvbWJpbmF0aW9uIGV2ZW50cyB0b1xyXG4gICAgICAgIC8vIGJlIHRyYWNrZWQsIHRoZXJlZm9yZSBpZiBhIHByZXNzIGV2ZW50IG9jY3VycyB0aGF0IGlzIHBhcnQgb2YgYVxyXG4gICAgICAgIC8vIGNvbWJpbmF0aW9uIGl0IE1VU1QgYmUgcHJvY2Vzc2VkLCByZWdhcmRsZXNzIGlmIHRoZXJlIGlzIGFcclxuICAgICAgICAvLyBjYWxsYmFjay5cclxuICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gJ3ByZXNzJyApIHtcclxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcHJlc3MgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5wcmVzcyApIHtcclxuICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICBrZXkuY29tYm9zLnByZXNzLmZvckVhY2goIGZ1bmN0aW9uKCBwcmVzcyApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tYm8gPSBjb21ib3NbIHByZXNzIF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sICdwcmVzcycgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gY29tYm8gc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGNvbWJvLmNhbGxiYWNrcywgJ3ByZXNzJywgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSByZWxlYXNlIGNhbGxiYWNrcywgaWdub3JlIGNhbGxiYWNrcyBhcyB0aGlzIGlzbid0XHJcbiAgICAgICAgICAgIC8vIGEgcmVsZWFzZSBldmVudCBidXQgaXMgcmVxdWlyZWQgZm9yIHJlbGVhc2UgZXZlbnRzXHJcbiAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5yZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyByZWxlYXNlIGV2ZW50cyB0byBmbGFnIHRoZXkgaGF2ZSBiZWVuIHByZXNzZWQgcHJpb3JcclxuICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICBrZXkuY29tYm9zLnJlbGVhc2UuZm9yRWFjaCggZnVuY3Rpb24oIHJlbGVhc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbWJvID0gY29tYm9zWyByZWxlYXNlIF07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBjb21ibyBidXQgZG9uJ3QgZXhlY3V0ZSBhbnkgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCAncHJlc3MnICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIHJlbGVhc2UgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5yZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IGNvbWJvIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgIGtleS5jb21ib3MucmVsZWFzZS5mb3JFYWNoKCBmdW5jdGlvbiggcmVsZWFzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tYm8gPSBjb21ib3NbIHJlbGVhc2UgXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgJ3JlbGVhc2UnICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBrZXlzIGluIGNvbWJvIHNhdGlzZnkgY29uZGl0aW9ucywgZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBjb21iby5jYWxsYmFja3MsICdyZWxlYXNlJywgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlcyB0d28gdGltZXN0YW1wcywgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGV5IG9jY3VyXHJcbiAgICAgKiB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwgZnJvbSBlYWNob3RoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZpb3VzVGltZXN0YW1wIC0gVGhlIHByZXZpb3VzIHRpbWVzdG1hcC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXAgLSBUaGUgdGltZXN0bWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGV5IGFyZSB3aXRoaW4gdGhlIHRpbWVvdXQgaW50ZXJ2YWwuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzV2l0aGluVGltZW91dCggcHJldmlvdXNUaW1lc3RhbXAsIHRpbWVzdGFtcCApIHtcclxuICAgICAgICB2YXIgZGVsdGE7XHJcbiAgICAgICAgaWYgKCAhcHJldmlvdXNUaW1lc3RhbXAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWx0YSA9IHByZXZpb3VzVGltZXN0YW1wIC0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJldHVybiBkZWx0YSA8IFNFUVVFTkNFX1RJTUVPVVQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFsbCB0aGUga2V5cyBpbiB0aGUgc2VxdWVuY2UgaGF2ZSBiZWVuXHJcbiAgICAgKiBwcmVzc2VkIG9yIHJlbGVhc2VkIChkZXBlbmRpbmcgb24gdGhlIGV2ZW50IHR5cGUpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGhpc3RvcnkgLSBUaGUga2V5IGV2ZW50IGhpc3RvcnkgYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlJZHMgLSBUaGUgc2VxdWVuY2Uga2V5IGlkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHNlcXVlbmNlIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNTZXF1ZW5jZVNhdGlzZmllZCggaGlzdG9yeSwga2V5SWRzICkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c1RpbWVzdGFtcCxcclxuICAgICAgICAgICAgc2VxdWVuY2VLZXksXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaSwgajtcclxuICAgICAgICAvLyBkZWJ1Z0NpcmN1bGFyKCBoaXN0b3J5LCBrZXlJZHMubGVuZ3RoKzUgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBrZXkgaW4gdGhlIGNvbWJvXHJcbiAgICAgICAgZm9yICggaT0wLCBqPTA7IGk8a2V5SWRzLmxlbmd0aDsgaSsrLCBqKysgKSB7XHJcbiAgICAgICAgICAgIHNlcXVlbmNlS2V5ID0ga2V5SWRzWyBrZXlJZHMubGVuZ3RoLTEtaSBdO1xyXG4gICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHNoaWZ0IGtleXNcclxuICAgICAgICAgICAgd2hpbGUgKCBzZXF1ZW5jZUtleSAhPT0gJ3NoaWZ0JyAmJlxyXG4gICAgICAgICAgICAgICAga2V5ICYmXHJcbiAgICAgICAgICAgICAgICBrZXkua2V5SWQgPT09ICdzaGlmdCcgKSB7XHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBoaXN0b3J5LmJhY2soIGogKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZWUgaWYgaXQgaXMgdGhlIGNvcnJlY3Qgc3RhdGVcclxuICAgICAgICAgICAgaWYgKCAha2V5IHx8IC8vIG5vIGtleVxyXG4gICAgICAgICAgICAgICAgIGtleS5rZXlJZCAhPT0gc2VxdWVuY2VLZXkgfHwgLy8gaGFzIG5vdCBiZWVuIHByZXNzZWRcclxuICAgICAgICAgICAgICAgICAhaXNXaXRoaW5UaW1lb3V0KCBwcmV2aW91c1RpbWVzdGFtcCwga2V5LnRpbWVzdGFtcCApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzVGltZXN0YW1wID0ga2V5LnRpbWVzdGFtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbGwgc2VxdWVuY2VzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIHRoZSBrZXkuIElmIGFueSBhcmVcclxuICAgICAqIHNhdGlzZmllZCwgZXhlY3V0ZSB0aGUgYm91bmQgY2FsbGJhY2sgZnVuY3Rpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGN1cnJlbnQgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5SWQgLSBUaGUga2V5IGlkIGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgaGlzdG9yeTtcclxuICAgICAgICBpZiAoIGtleS5zZXF1ZW5jZXMgJiYga2V5LnNlcXVlbmNlc1tldmVudFR5cGVdICkge1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gJ3ByZXNzJyApIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBrZXlib2FyZC5wcmVzc0hpc3Rvcnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucmVsZWFzZUhpc3Rvcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IHNlcXVlbmNlIGluIHRoZSBrZXlcclxuICAgICAgICAgICAga2V5LnNlcXVlbmNlc1tldmVudFR5cGVdLmZvckVhY2goIGZ1bmN0aW9uKCBzZXFLZXkgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcUtleSBdO1xyXG4gICAgICAgICAgICAgICAgLy8gb25seSBjaGVjayBzZXF1ZW5jZSBpZiB0aGlzIGtleSBpcyB0aGUgTEFTVCBLRVlcclxuICAgICAgICAgICAgICAgIGlmICggc2VxdWVuY2UubGFzdEtleSA9PT0ga2V5SWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgaXNTZXF1ZW5jZVNhdGlzZmllZCggaGlzdG9yeSwgc2VxdWVuY2Uua2V5cyApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbCBrZXlzIGluIHNlcXVlbmNlIHNhdGlzZnkgY29uZGl0aW9ucywgZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIHNlcXVlbmNlLmNhbGxiYWNrcywgZXZlbnRUeXBlLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYSBET00ga2V5Ym9hcmQgZXZlbnQgaW50byB0aGUgcmVsZXZhbnRcclxuICAgICAqIGtleSBpZGVudGlmaWNhdGlvbiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBrZXlib2FyZCBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUga2V5IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRLZXlib2FyZEtleUlkKCBldmVudCApIHtcclxuICAgICAgICB2YXIgY2hhckNvZGUgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIHJldHVybiBLZXlNYXBbIGNoYXJDb2RlIF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUga2V5IGlkIGhhcyBhIHNoaWZ0IGNvbXBvbmVudCwgaWYgdGhlIHNoaWZ0IGJ1dHRvblxyXG4gICAgICogaXMgZG93biwgcmV0dXJuIHRoZSBzaGlmdCBrZXkgaWQuIE90aGVyd2lzZSByZXR1cm4gdGhlIG9yaWdpbmFsXHJcbiAgICAgKiBrZXkgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSAtIFRoZSBrZXkgbWFwIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlJZCAtIFRoZSBrZXkgaWQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzaGlmdGVkIG9yIG9yaWdpbmFsIGtleSBpZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKSB7XHJcbiAgICAgICAgdmFyIHNoaWZ0ID0ga2V5c1sgS2V5RW51bXMuU0hJRlQgXTtcclxuICAgICAgICBpZiAoIHNoaWZ0ICYmIHNoaWZ0LnN0YXRlID09PSAnZG93bicgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTaGlmdE1hcFsga2V5SWQgXSB8fCBrZXlJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSBwcmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcygga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICBpZiAoICFrZXlJZCApIHtcclxuICAgICAgICAgICAgICAgIC8vIGtleSBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgIGtleS5zdGF0ZSA9ICdkb3duJztcclxuICAgICAgICAgICAga2V5Ym9hcmQucHJlc3NIaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsICdwcmVzcycsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCAncHJlc3MnLCBldmVudCApO1xyXG4gICAgICAgICAgICBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsICdwcmVzcycsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBrZXkgcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSByZWxlYXNlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIGtleWJvYXJkICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJZCA9IGdldEtleWJvYXJkS2V5SWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgICAgIGtleTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3Mga2V5LCBwcmludHNjcmVlbiBrZXksIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXTtcclxuICAgICAgICAgICAgaWYgKCBrZXkgJiYga2V5LnN0YXRlID09PSAnZG93bicgKSB7XHJcbiAgICAgICAgICAgICAgICBrZXkuc3RhdGUgPSAndXAnO1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQucmVsZWFzZUhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsICdyZWxlYXNlJywgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQ29tYm9zKCBrZXlib2FyZCwga2V5LCAncmVsZWFzZScsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsICdyZWxlYXNlJywgZXZlbnQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBrZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgS2V5Ym9hcmRcclxuICAgICAqIEBjbGFzc2Rlc2MgQSBrZXlib2FyZCBpbnB1dCBoYW5kbGluZyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEtleWJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29tYm9zID0ge307XHJcbiAgICAgICAgdGhpcy5zZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnByZXNzSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUga2V5IGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZEtleVByZXNzKCB0aGlzICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIHRoaXMgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgS2V5Ym9hcmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50VHlwZXMgLSBUaGUga2V5IGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dHMsIGNhbGxiYWNrLCBldmVudFR5cGVzICkge1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnS2V5Ym9hcmQub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdLZXlib2FyZC5vbicsIGlucHV0cyApO1xyXG4gICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9uJywgZXZlbnRUeXBlcyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaW5wdXRzLmZvckVhY2goIGZ1bmN0aW9uKCBpbnB1dCApIHtcclxuICAgICAgICAgICAgaWYgKCBpc1NlcXVlbmNlSW5wdXQoIGlucHV0ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRTZXF1ZW5jZSggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlzQ29tYmluYXRpb25JbnB1dCggaW5wdXQgKSApIHtcclxuICAgICAgICAgICAgICAgIGFkZENvbWJpbmF0aW9uKCB0aGF0LCBpbnB1dCwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZEtleSggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBLZXlib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRUeXBlcyAtIFRoZSBrZXkgZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjaywgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLm9mZicsIGlucHV0cyApO1xyXG4gICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9mZicsIGV2ZW50VHlwZXMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgICAgIGlmICggaXNTZXF1ZW5jZUlucHV0KCBpbnB1dCApICkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU2VxdWVuY2UoIHRoYXQsIGlucHV0LCBldmVudFR5cGVzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpc0NvbWJpbmF0aW9uSW5wdXQoIGlucHV0ICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDb21iaW5hdGlvbiggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVLZXkoIHRoYXQsIGlucHV0LCBldmVudFR5cGVzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBtZW1iZXJvZiBLZXlib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBrZXlJZHMgLSBUaGUga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIHN0YXRlIG9mIHRoZSBwcm92aWRlZCBrZXlzLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSB0aGlzLmtleXMsXHJcbiAgICAgICAgICAgIHN0YXRlcyA9IHt9O1xyXG4gICAgICAgIGtleUlkcyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQucG9sbCcsIGtleUlkcyApO1xyXG4gICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzWyBrZXlJZCBdO1xyXG4gICAgICAgICAgICBzdGF0ZXNbIGtleUlkIF0gPSBrZXkgPyBrZXkuc3RhdGUgOiAndXAnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBrZXlJZHMubGVuZ3RoID09PSAxID8gc3RhdGVzWyBrZXlJZHNbMF0gXSA6IHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBLZXlNYXAgPSByZXF1aXJlKCcuL0tleU1hcCcpLFxyXG4gICAgICAgIFNoaWZ0TWFwID0gcmVxdWlyZSgnLi9TaGlmdE1hcCcpLFxyXG4gICAgICAgIEtleXMgPSB7fSxcclxuICAgICAgICBrZXlDb2RlO1xyXG5cclxuICAgIGZvciAoIGtleUNvZGUgaW4gS2V5TWFwICkge1xyXG4gICAgICAgIEtleXNbIEtleU1hcFsga2V5Q29kZSBdIF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoIGtleUNvZGUgaW4gU2hpZnRNYXAgKSB7XHJcbiAgICAgICAgS2V5c1sgU2hpZnRNYXBbIGtleUNvZGUgXSBdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEtleXM7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vVXRpbCcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgRE9NIG1vdXNlIGV2ZW50IGludG8gdGhlIHJlbGV2YW50XHJcbiAgICAgKiBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBUaGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIGV2ZW50IGVudW1lcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApIHtcclxuICAgICAgICBzd2l0Y2ggKCBldmVudC5idXR0b24gKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuICdsZWZ0JztcclxuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gJ21pZGRsZSc7XHJcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuICdyaWdodCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGJ1dHRvbiBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGJ1dHRvbiBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnV0dG9ucyAtIFRoZSBidXR0b24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZUJ1dHRvblByZXNzKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b247XHJcbiAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGJ1dHRvbiBpbmZvIG9iamVjdCBleGlzdHNcclxuICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gfHwge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYnV0dG9uLnN0YXRlID0gJ2Rvd24nO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGJ1dHRvbi5jYWxsYmFja3MsICdwcmVzcycsIGV2ZW50ICk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBidXR0b24gcmVsZWFzZSBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGlucHV0IHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBidXR0b25zIC0gVGhlIGJ1dHRvbiBpbmZvcm1hdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlQnV0dG9uUmVsZWFzZSggYnV0dG9ucyApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uSWQgPSBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgcHJvY2Vzc2VkIHRoZSBrZXlkb3duIGV2ZW50LCBzb21ldGltZXMgZHVlXHJcbiAgICAgICAgICAgIC8vIHRvIGZvY3VzIGlzc3VlcyAoIHdpbmRvd3MgYnV0dG9uLCBwcmludHNjcmVlbiBidXR0b24sIGV0YyApXHJcbiAgICAgICAgICAgIC8vIHdlIG1pc3MgdGhlICdrZXlkb3duJyBldmVudCBhbmQgb25seSByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHRoZSAna2V5dXAnXHJcbiAgICAgICAgICAgIGlmICggYnV0dG9uICYmIGJ1dHRvbi5zdGF0ZSA9PT0gJ2Rvd24nICkge1xyXG4gICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBidXR0b24uY2FsbGJhY2tzLCAncmVsZWFzZScsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uc3RhdGUgPSAndXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgbW91c2UgbW92ZW1lbnQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtb3VzZSAtIFRoZSBtb3VzZSBpbmZvcm1hdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZSggbW91c2UgKSB7XHJcbiAgICAgICAgdmFyIGxhc3RQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgLy8gbW91c2Vtb3ZlIGV2ZW50cyBzb21ldGltZXMgZmlyZSB3aGVuIGEgbW91c2UgYnV0dG9uIGlzIHByZXNzZWQsIGEgbW91c2Vtb3ZlXHJcbiAgICAgICAgICAgIC8vIHNob3VsZCBvbmx5IHF1ZXVlIGFuIGV2ZW50IGlmIHRoZSBwb3NpdGlvbiBoYXMgYWN0dWFsbHkgY2hhbmdlZFxyXG4gICAgICAgICAgICBpZiAoIGxhc3RQb3NpdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA9PT0gbGFzdFBvc2l0aW9uLnggJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFkgPT09IGxhc3RQb3NpdGlvbi55ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggbGFzdFBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmlvdXNDbGllbnRYID0gbGFzdFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2aW91c0NsaWVudFkgPSBsYXN0UG9zaXRpb24ueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIG1vdXNlLmNhbGxiYWNrcywgJ21vdmUnLCBldmVudCApO1xyXG4gICAgICAgICAgICBsYXN0UG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIG1vdXNlIHdoZWVsIHdoZWVsIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbW91c2UgLSBUaGUgbW91c2UgaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZVdoZWVsKCBtb3VzZSApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIG1vdXNlLmNhbGxiYWNrcywgJ3doZWVsJywgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEgbW91c2Ugb2JqZWN0LlxyXG4gICAgICogQGNsYXNzIE1vdXNlXHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgbW91c2UgaW5wdXQgaGFuZGxpbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBhcmcgLSBUaGUgZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVycyB0by5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gTW91c2UoIGFyZyApIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuICAgICAgICB0aGlzLm1vdXNlID0ge307XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggYXJnICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gYXJnIHx8IGRvY3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZW5lcmF0ZSBhbmQgYXR0YWNoIHRoZSBidXR0b24gZXZlbnQgaGFuZGxlcnNcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlQnV0dG9uUHJlc3MoIHRoaXMuYnV0dG9ucyApICk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCB0aGlzLmJ1dHRvbnMgKSApO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKCB0aGlzLm1vdXNlICkgKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3doZWVsJywgaGFuZGxlTW91c2VXaGVlbCggdGhpcy5tb3VzZSApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBNb3VzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dHMgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50VHlwZXMgLSBUaGUgYnV0dG9uIGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uIE9wdGlvbmFsLlxyXG4gICAgICovXHJcbiAgICBNb3VzZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjaywgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9uJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0cyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKFxyXG4gICAgICAgICAgICAnTW91c2Uub24nLFxyXG4gICAgICAgICAgICBpbnB1dHMsXHJcbiAgICAgICAgICAgIFsgJ2xlZnQnLCdtaWRkbGUnLCdyaWdodCcsJ21vdmUnLCd3aGVlbCcgXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFyIG1vdXNlID0gdGhpcy5tb3VzZSxcclxuICAgICAgICAgICAgYnV0dG9ucyA9IHRoaXMuYnV0dG9ucztcclxuICAgICAgICBpbnB1dHMuZm9yRWFjaCggZnVuY3Rpb24oIGlucHV0ICkge1xyXG4gICAgICAgICAgICBpZiAoIGlucHV0ID09PSAnbW92ZScgfHwgaW5wdXQgPT09ICd3aGVlbCcgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MgPSBtb3VzZS5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0gPSBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBidXR0b25zWyBpbnB1dCBdID0gYnV0dG9uc1sgaW5wdXQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9uJywgZXZlbnRUeXBlcyApO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3MgPSBidXR0b24uY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50VHlwZSBdID0gYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTW91c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXRzIC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudFR5cGVzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja3MgZnJvbS4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjaywgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyhcclxuICAgICAgICAgICAgJ01vdXNlLm9mZicsXHJcbiAgICAgICAgICAgIGlucHV0cywgWyAnbGVmdCcsJ21pZGRsZScsJ3JpZ2h0JywnbW92ZScsJ3doZWVsJyBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICB2YXIgbW91c2UgPSB0aGlzLm1vdXNlLFxyXG4gICAgICAgICAgICBidXR0b25zID0gdGhpcy5idXR0b25zO1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5wdXQgPT09ICdtb3ZlJyB8fCBpbnB1dCA9PT0gJ3doZWVsJyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggbW91c2UuY2FsbGJhY2tzICYmIG1vdXNlLmNhbGxiYWNrc1sgaW5wdXQgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0uc3BsaWNlKCBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0uaW5kZXhPZiggY2FsbGJhY2sgKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGJ1dHRvbnNbIGlucHV0IF0gPSBidXR0b25zWyBpbnB1dCBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcyA9IFV0aWwubm9ybWFsaXplRXZlbnRBcmdzKCAnTW91c2Uub2ZmJywgZXZlbnRUeXBlcyApO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggYnV0dG9uLmNhbGxiYWNrcyAmJiBidXR0b24uY2FsbGJhY2tzWyBldmVudFR5cGUgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0uc3BsaWNlKCBidXR0b24uY2FsbGJhY2tzWyBldmVudFR5cGUgXS5pbmRleE9mKCBjYWxsYmFjayApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2xsIHRoZSBzdGF0ZXMgb2YgdGhlIHByb3ZpZGVkIGJ1dHRvbiBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQG1lbWJlcm9mIE1vdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGJ1dHRvbklkcyAtIFRoZSBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBzdGF0ZSBvZiB0aGUgcHJvdmlkZWQgYnV0dG9ucy5cclxuICAgICAqL1xyXG4gICAgTW91c2UucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiggYnV0dG9uSWRzICkge1xyXG4gICAgICAgIHZhciBidXR0b25zID0gdGhpcy5idXR0b25zLFxyXG4gICAgICAgICAgICBzdGF0ZXMgPSB7fTtcclxuICAgICAgICBidXR0b25JZHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyhcclxuICAgICAgICAgICAgJ01vdXNlLnBvbGwnLFxyXG4gICAgICAgICAgICBidXR0b25JZHMsXHJcbiAgICAgICAgICAgIFsgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JyBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICBidXR0b25JZHMuZm9yRWFjaCggZnVuY3Rpb24oIGJ1dHRvbklkICkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gYnV0dG9uc1sgYnV0dG9uSWQgXTtcclxuICAgICAgICAgICAgc3RhdGVzWyBidXR0b25JZCBdID0gYnV0dG9uID8gYnV0dG9uLnN0YXRlIDogJ3VwJztcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnV0dG9uSWRzLmxlbmd0aCA9PT0gMSA/IHN0YXRlc1sgYnV0dG9uSWRzWzBdIF0gOiBzdGF0ZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2U7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJ34nOiAnYCcsXHJcbiAgICAgICAgJyEnOiAnMScsXHJcbiAgICAgICAgJ0AnOiAnMicsXHJcbiAgICAgICAgJyMnOiAnMycsXHJcbiAgICAgICAgJyQnOiAnNCcsXHJcbiAgICAgICAgJyUnOiAnNScsXHJcbiAgICAgICAgJ14nOiAnNicsXHJcbiAgICAgICAgJyYnOiAnNycsXHJcbiAgICAgICAgJyonOiAnOCcsXHJcbiAgICAgICAgJygnOiAnOScsXHJcbiAgICAgICAgJyknOiAnMCcsXHJcbiAgICAgICAgJ18nOiAnLScsXHJcbiAgICAgICAgJysnOiAnPScsXHJcblxyXG4gICAgICAgICd7JzogJ1snLFxyXG4gICAgICAgICd9JzogJ10nLFxyXG4gICAgICAgICd8JzogJ1xcXFwnLFxyXG4gICAgICAgICc6JzogJzsnLFxyXG4gICAgICAgICdcIic6ICdcXCcnLFxyXG4gICAgICAgICc8JzogJywnLFxyXG4gICAgICAgICc+JzogJy4nLFxyXG4gICAgICAgICc/JzogJy8nLFxyXG5cclxuICAgICAgICAnYCc6ICd+JyxcclxuICAgICAgICAnMSc6ICchJyxcclxuICAgICAgICAnMic6ICdAJyxcclxuICAgICAgICAnMyc6ICcjJyxcclxuICAgICAgICAnNCc6ICckJyxcclxuICAgICAgICAnNSc6ICclJyxcclxuICAgICAgICAnNic6ICdeJyxcclxuICAgICAgICAnNyc6ICcmJyxcclxuICAgICAgICAnOCc6ICcqJyxcclxuICAgICAgICAnOSc6ICcoJyxcclxuICAgICAgICAnMCc6ICcpJyxcclxuICAgICAgICAnLSc6ICdfJyxcclxuICAgICAgICAnPSc6ICcrJyxcclxuXHJcbiAgICAgICAgJ1snOiAneycsXHJcbiAgICAgICAgJ10nOiAnfScsXHJcbiAgICAgICAgJ1xcXFwnOiAnfCcsXHJcbiAgICAgICAgJzsnOiAnOicsXHJcbiAgICAgICAgJ1xcJyc6ICdcIicsXHJcbiAgICAgICAgJywnOiAnPCcsXHJcbiAgICAgICAgJy4nOiAnPicsXHJcbiAgICAgICAgJy8nOiAnPycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGEgdG91Y2ggZXZlbnQgYnkgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdG91Y2ggLSBUaGUgdG91Y2ggYWN0aW9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gLSBUaGUgYWN0aW9uIGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hBY3Rpb24oIHRvdWNoLCBhY3Rpb24gKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdG91Y2hbIGFjdGlvbiBdID0gdG91Y2hbIGFjdGlvbiBdIHx8IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbixcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdG91Y2hbIGFjdGlvbiBdLmNhbGxiYWNrcy5mb3JFYWNoKCBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayggZXZlbnQgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIHRvdWNoIG9iamVjdC5cclxuICAgICAqIEBjbGFzcyBUb3VjaFxyXG4gICAgICogQGNsYXNzZGVzYyBBIHRvdWNoIGlucHV0IGhhbmRsaW5nIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVG91Y2goKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IHt9O1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGJ1dHRvbiBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsICdzdGFydCcgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgJ2VuZCcgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hjYW5jZWwnLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgJ2NhbmNlbCcgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hsZWF2ZScsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCAnbGVhdmUnICksIGZhbHNlICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCAnbW92ZScgKSwgZmFsc2UgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIFRvdWNoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0cyAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIFRvdWNoLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciB0b3VjaCxcclxuICAgICAgICAgICAgaW5wdXQsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgaWYgKCBVdGlsLmNoZWNrRnVuY3Rpb25BcmcoICdUb3VjaC5vbicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ1RvdWNoLm9uJyxcclxuICAgICAgICAgICAgaW5wdXRzLCBbICdzdGFydCcsICdlbmQnLCAnY2FuY2VsJywgJ2xlYXZlJywgJ21vdmUnIF0gKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0c1tpXTtcclxuICAgICAgICAgICAgdG91Y2ggPSB0aGlzLnRvdWNoO1xyXG4gICAgICAgICAgICB0b3VjaFsgaW5wdXQgXSA9IHRvdWNoWyBpbnB1dCBdIHx8IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGlucHV0LFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0b3VjaFsgaW5wdXQgXS5jYWxsYmFja3MucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgVG91Y2hcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXRzIC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgVG91Y2gucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKCBpbnB1dHMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciB0b3VjaCxcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIGlucHV0LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnVG91Y2gub2ZmJywgY2FsbGJhY2sgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0cyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnVG91Y2gub2ZmJyxcclxuICAgICAgICAgICAgaW5wdXRzLCBbICdzdGFydCcsICdlbmQnLCAnY2FuY2VsJywgJ2xlYXZlJywgJ21vdmUnIF0gKTtcclxuICAgICAgICBmb3IgKCBpPTA7IGk8aW5wdXRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0c1tpXTtcclxuICAgICAgICAgICAgdG91Y2ggPSB0aGlzLnRvdWNoO1xyXG4gICAgICAgICAgICBpbmRleCA9IHRvdWNoWyBpbnB1dCBdLmNhbGxiYWNrcy5pbmRleE9mKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICBpZiAoIHRvdWNoWyBpbnB1dCBdICkge1xyXG4gICAgICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0uY2FsbGJhY2tzLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUb3VjaDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHaXZlbiBhIHN0cmluZywgY29udmVydHMgaXQgdG8gbG93ZXJjYXNlIGFuZCByZXBsYWNlcyBhbGxcclxuICAgICAgICAgKiBzZXF1ZW50aWFsIHdoaXRlc3BhY2UgaW50byBhIHNpbmdsZSBzcGFjZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIG5vcm1hbGl6ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBub3JtYWxpemVkIHN0cmluZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVTdHJpbmc6IGZ1bmN0aW9uKCBzdHIgKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIHdoaXRlc3BhY2UgdG8gYSBzaW5nbGUgc3BhY2UgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcc10vZywgJyAnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgdGhhdCBhIGZ1bmN0aW9uIGFyZ3VtZW50IGlzIGluZGVlZCBhIGZ1bmN0aW9uLiBJZiBpdCBpc1xyXG4gICAgICAgICAqIG5vdCwgbG9nIHRvIHRoZSBjb25zb2xlIGFuZCByZXR1cm4gdHJ1ZS4gT3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGZ1bmN0aW9uIGlzIGludmFsaWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tGdW5jdGlvbkFyZzogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgZnVuYyApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnQXJndW1lbnQgYGNhbGxiYWNrYCB0byBgJyArIGZ1bmN0aW9uTmFtZSArICdgIGlzIG5vdCBvZiB0eXBlIGBmdW5jdGlvbmAsIGNvbW1hbmQgaWdub3JlZC4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgYW5kIG5vcm1hbGl6ZXMgdGhlICdpbnB1dCcgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGlucHV0IC0gVGhlIGlucHV0IGFyZ3VtZW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbGlkSW5wdXQgLSBUaGUgcmVjb2duaXplZCBpbnB1dC4gT3B0aW9uYWwuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBub3JtYWxpemVkIGlucHV0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZUlucHV0QXJnczogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgaW5wdXRzLCB2YWxpZElucHV0ICkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRzID0gW107XHJcbiAgICAgICAgICAgIGlmICggISggaW5wdXRzIGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cyA9IFsgaW5wdXRzIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goIGZ1bmN0aW9uKCBpbnB1dCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dCBpcyBub3QgYSBzdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ0FyZ3VtZW50IGAnICsgaW5wdXQgKyAnYCB0byBgJyArIGZ1bmN0aW9uTmFtZSArICdgIGlzIG5vdCBvZiB0eXBlIGBzdHJpbmdgLCBhcmd1bWVudCByZW1vdmVkLicgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhbGlkSW5wdXQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWxpZElucHV0LmluZGV4T2YoIGlucHV0ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ0FyZ3VtZW50IGAnICsgaW5wdXQgKyAnYCB0byBgJyArIGZ1bmN0aW9uTmFtZSArICdgIGlzIG5vdCBhIHJlY29nbml6ZWQgaW5wdXQgdHlwZSwgYXJndW1lbnQgcmVtb3ZlZC4nICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRzLnB1c2goIHRoYXQubm9ybWFsaXplU3RyaW5nKCBpbnB1dCApICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0cztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQ2hlY2tzIGFuZCBub3JtYWxpemVzIHRoZSAnZXZlbnRzJyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRzIC0gVGhlIGV2ZW50cyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIG5vcm1hbGl6ZWQgaW5wdXQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9ybWFsaXplRXZlbnRBcmdzOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBldmVudFR5cGVzICkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkRXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIGlmICggIWV2ZW50VHlwZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudFR5cGVzID0gWyAncHJlc3MnIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAhKCBldmVudFR5cGVzIGluc3RhbmNlb2YgQXJyYXkgKSApIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMgPSBbIGV2ZW50VHlwZXMgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSAhPT0gJ3ByZXNzJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSAhPT0gJ3JlbGVhc2UnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50IGlzIG5vdCByZWNvZ25pemVkXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdBcmd1bWVudCBgJyArIGV2ZW50VHlwZSArICdgIHRvIGAnICsgZnVuY3Rpb25OYW1lICsgJ2AgaXMgbm90IGEgcmVjb2duaXplZCBldmVudCB0eXBlLCBhcmd1bWVudCByZW1vdmVkLicgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZEV2ZW50cy5wdXNoKCB0aGF0Lm5vcm1hbGl6ZVN0cmluZyggZXZlbnRUeXBlICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVkRXZlbnRzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4ZWN1dGUgdGhlIGZ1bmN0aW9ucyBpbiB0aGUgY2FsbGJhY2tzIG9iamVjdCB0aGF0IG1hdGNoIHRoZVxyXG4gICAgICAgICAqIHByb3ZpZGVkIGV2ZW50IHR5cGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tzIC0gVGhlIGNhbGxiYWNrcyBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHN0cmluZy5cclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGVDYWxsYmFja3M6IGZ1bmN0aW9uKCBjYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzWyBldmVudFR5cGUgXSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50VHlwZSBdLmZvckVhY2goIGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCBldmVudCApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bG9zIGZ1bmN0aW9uIHRoYXQgc3VwcG9ydHMgbmVnYXRpdmUgbnVtYmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBUaGUgbnVtYmVyIHRvIG1vZHVsby5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtIFRoZSBtb2R1bG9zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gVGhlIHJlc3VsdGluZyBudW1iZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbW9kOiBmdW5jdGlvbiggbnVtLCBuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCAoIG51bSAlIG4gKSArIG4gKSAlIG47XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgb2JqZWN0IGhhcyBubyBhdHRyaWJ1dGVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gdGVzdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgaGFzIGtleXMsIGZhbHNlIGlmIG5vdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoIG9iaiApLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICBLZXlib2FyZDogcmVxdWlyZSgnLi9LZXlib2FyZCcpLFxyXG4gICAgICAgIE1vdXNlOiByZXF1aXJlKCcuL01vdXNlJyksXHJcbiAgICAgICAgVG91Y2g6IHJlcXVpcmUoJy4vVG91Y2gnKVxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iXX0=
