(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rolypoly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Util":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./KeyEnums":2}],4:[function(require,module,exports){
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
        var err = false;
        keyIds.forEach( function( keyId ) {
            if ( !Keys[ keyId ] ) {
                console.log( "Argument '" + keyId + "' to '" + functionName +
                    "' is not a recognized event type, command ignored." );
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
            // a "release" combo can only be triggered if the keys had all
            // been down together at one point
            if ( eventType === "release" && ( !combo.pressed || key.state !== "up" ) ) {
                return false;
            }
            // a "press" combo only needs all keys to be down together
            if ( eventType === "press" && key.state !== "down" ) {
                return false;
            }
        }
        // combo is successful, flag so it doesn't spam when held
        if ( eventType === "press" ) {
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
        if ( eventType === "press" ) {
            // process the press callbacks
            if ( key.combos.press ) {
                // for every combo in the key
                key.combos.press.forEach( function( press ) {
                    var combo = combos[ press ];
                    if ( isComboSatisfied( keyboard, combo, "press" ) ) {
                        // all keys in combo satisfy conditions, execute callbacks
                        Util.executeCallbacks( combo.callbacks, "press", event );
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
                    isComboSatisfied( keyboard, combo, "press" );
                });
            }
        } else {
            // process the release callbacks
            if ( key.combos.release ) {
                // for every combo in the key
                key.combos.release.forEach( function( release ) {
                    var combo = combos[ release ];
                    if ( isComboSatisfied( keyboard, combo, "release" ) ) {
                        // all keys in combo satisfy conditions, execute callbacks
                        Util.executeCallbacks( combo.callbacks, "release", event );
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
            history;
        if ( key.sequences && key.sequences[eventType] ) {
            if ( eventType === "press" ) {
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
            if ( !keyId ) {
                // key is not recognized
                return;
            }
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

},{"./KeyMap":3,"./ShiftMap":7}],6:[function(require,module,exports){
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
     * Returns a function to handle mouse wheel wheel events.
     *
     * @param {Object} mouse - The mouse information object.
     */
    function handleMouseWheel( mouse ) {
        return function( event ) {
            Util.executeCallbacks( mouse.callbacks, "wheel", event );
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
        if ( typeof arg === "string" ) {
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
            if ( input === "move" || input === "wheel" ) {
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
            if ( input === "move" || input === "wheel" ) {
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

},{"./Util":9}],9:[function(require,module,exports){
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
        normalizeInputArgs: function( functionName, inputs, validInput ) {
            var that = this,
                normalizedInputs = [];
            if ( !( inputs instanceof Array ) ) {
                inputs = [ inputs ];
            }
            inputs.forEach( function( input ) {
                if ( typeof input !== 'string' ) {
                    // input is not a string
                    console.log( "Argument '"+input+"' to '"+functionName+"' is not of type 'string', argument removed." );
                    return;
                }
                if ( validInput ) {
                    if ( validInput.indexOf( input ) === -1 ) {
                        // input is not recognized
                        console.log( "Argument '"+input+"' to '"+functionName+"' is not a recognized input type, argument removed." );
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
                    console.log( "Argument '"+eventType+"' to '"+functionName+"' is not a recognized event type, argument removed." );
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

    "use strict";

    module.exports = {

        Keyboard: require('./Keyboard'),
        Mouse: require('./Mouse'),
        Touch: require('./Touch')

    };

}());

},{"./Keyboard":4,"./Mouse":6,"./Touch":8}]},{},[10])(10)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2lyY3VsYXJBcnJheS5qcyIsInNyYy9LZXlFbnVtcy5qcyIsInNyYy9LZXlNYXAuanMiLCJzcmMvS2V5Ym9hcmQuanMiLCJzcmMvS2V5cy5qcyIsInNyYy9Nb3VzZS5qcyIsInNyYy9TaGlmdE1hcC5qcyIsInNyYy9Ub3VjaC5qcyIsInNyYy9VdGlsLmpzIiwic3JjL2V4cG9ydHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIGNpcmN1bGFyIGFycmF5IG9iamVjdC5cclxuICAgICAqIEBjbGFzcyBDaXJjdWxhckFycmF5XHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgc2ltcGxlIGNpcmN1bGFyIGFycmF5IHRoYXQgaXMgYWxsb2NhdGVkIHRvIGEgZml4ZWQgc2l6ZS5cclxuICAgICAqICAgICBXaGVuIGVsZW1lbnRzIGFyZSBwdXNoZWQgYmV5b25kIGl0cyBhbGxvY2F0ZWQgbGVuZ3RoLCB0aGV5XHJcbiAgICAgKiAgICAgd2lsbCBpbnN0ZWFkIG92ZXJ3cml0ZSBleHN0aW5nIGluZGljZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBsZW5ndGggb2YgdGhlIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBDaXJjdWxhckFycmF5KCBsZW5ndGggKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIHx8IDI1NjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheSggbGVuZ3RoICk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoIGFuIGVsZW1lbnQgdG8gdGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGFycmF5LlxyXG4gICAgICogQG1lbWJlcm9mIENpcmN1bGFyQXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgLSBUaGUgZGF0YSB0byBpbnNlcnQgaW50byB0aGUgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIENpcmN1bGFyQXJyYXkucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlclsgdGhpcy5pbmRleCBdID0gZGF0YTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gKHRoaXMuaW5kZXggKyAxKSAlIHRoaXMubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbW9zdCByZWNlbnRseSBwdXNoZWQgZWxlbWVudC4gQW4gaW5kZXggb2Zmc2V0IG1heVxyXG4gICAgICogYmUgcHJvdmlkZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2lyY3VsYXJBcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgLSBBbiBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCBpbmRleC4gT3B0aW9uYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9IFRoZSBtb3N0IHJlY2VudGx5IHB1c2hlZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBDaXJjdWxhckFycmF5LnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24oIG9mZnNldCApIHtcclxuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgPyBvZmZzZXQgOiAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclsgVXRpbC5tb2QoIHRoaXMuaW5kZXgtMS1vZmZzZXQsIHRoaXMubGVuZ3RoICkgXTtcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDaXJjdWxhckFycmF5O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgQkFDS1NQQUNFOiAnYmFja3NwYWNlJyxcclxuICAgICAgICBUQUI6ICd0YWInLFxyXG4gICAgICAgIEVOVEVSOiAnZW50ZXInLFxyXG4gICAgICAgIFNISUZUOiAnc2hpZnQnLFxyXG4gICAgICAgIENUUkw6ICdjdHJsJyxcclxuICAgICAgICBBTFQ6ICdhbHQnLFxyXG4gICAgICAgIFBBVVNFX0JSRUFLOiAncGF1c2VicmVhaycsXHJcbiAgICAgICAgQ0FQU19MT0NLOiAnY2Fwc2xvY2snLFxyXG4gICAgICAgIEVTQzogJ2VzYycsXHJcbiAgICAgICAgUEFHRV9VUDogJ3BhZ2V1cCcsXHJcbiAgICAgICAgUEFHRV9ET1dOOiAncGFnZWRvd24nLFxyXG4gICAgICAgIEVORDogJ2VuZCcsXHJcbiAgICAgICAgSE9NRTogJ2hvbWUnLFxyXG4gICAgICAgIExFRlRfQVJST1c6ICdsZWZ0JyxcclxuICAgICAgICBVUF9BUlJPVzogJ3VwJyxcclxuICAgICAgICBSSUdIVF9BUlJPVzogJ3JpZ2h0JyxcclxuICAgICAgICBET1dOX0FSUk9XOiAnZG93bicsXHJcbiAgICAgICAgUFJJTlRfU0NSRUVOOiAncHJpbnRzY3JlZW4nLFxyXG4gICAgICAgIElOU0VSVDogJ2luc2VydCcsXHJcbiAgICAgICAgREVMRVRFOiAnZGVsZXRlJyxcclxuICAgICAgICBXSU5ET1dTOiAnd2luZG93cycsXHJcbiAgICAgICAgU0VMRUNUOiAnc2VsZWN0JyxcclxuICAgICAgICBTUEFDRV9CQVI6ICdzcGFjZScsXHJcbiAgICAgICAgTlVNX0xPQ0s6ICdudW1sb2NrJyxcclxuICAgICAgICBTQ1JPTExfTE9DSzogJ3Njcm9sbGxvY2snLFxyXG5cclxuICAgIH07XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBLZXlFbnVtcyA9IHJlcXVpcmUoJy4vS2V5RW51bXMnKTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJzgnOiBLZXlFbnVtcy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgJzknOiBLZXlFbnVtcy5UQUIsXHJcbiAgICAgICAgJzEzJzogS2V5RW51bXMuRU5URVIsXHJcbiAgICAgICAgJzE2JzogS2V5RW51bXMuU0hJRlQsXHJcbiAgICAgICAgJzE3JzogS2V5RW51bXMuQ1RSTCxcclxuICAgICAgICAnMTgnOiBLZXlFbnVtcy5BTFQsXHJcbiAgICAgICAgJzE5JzogS2V5RW51bXMuUEFVU0VfQlJFQUssXHJcbiAgICAgICAgJzIwJzogS2V5RW51bXMuQ0FQU19MT0NLLFxyXG4gICAgICAgICcyNyc6IEtleUVudW1zLkVTQyxcclxuICAgICAgICAnMzInOiBLZXlFbnVtcy5TUEFDRV9CQVIsXHJcbiAgICAgICAgJzMzJzogS2V5RW51bXMuUEFHRV9VUCxcclxuICAgICAgICAnMzQnOiBLZXlFbnVtcy5QQUdFX0RPV04sXHJcbiAgICAgICAgJzM1JzogS2V5RW51bXMuRU5ELFxyXG4gICAgICAgICczNic6IEtleUVudW1zLkhPTUUsXHJcbiAgICAgICAgJzM3JzogS2V5RW51bXMuTEVGVF9BUlJPVyxcclxuICAgICAgICAnMzgnOiBLZXlFbnVtcy5VUF9BUlJPVyxcclxuICAgICAgICAnMzknOiBLZXlFbnVtcy5SSUdIVF9BUlJPVyxcclxuICAgICAgICAnNDAnOiBLZXlFbnVtcy5ET1dOX0FSUk9XLFxyXG4gICAgICAgICc0NCc6IEtleUVudW1zLlBSSU5UX1NDUkVFTixcclxuICAgICAgICAnNDUnOiBLZXlFbnVtcy5JTlNFUlQsXHJcbiAgICAgICAgJzQ2JzogS2V5RW51bXMuREVMRVRFLFxyXG4gICAgICAgICc0OCc6ICcwJyxcclxuICAgICAgICAnNDknOiAnMScsXHJcbiAgICAgICAgJzUwJzogJzInLFxyXG4gICAgICAgICc1MSc6ICczJyxcclxuICAgICAgICAnNTInOiAnNCcsXHJcbiAgICAgICAgJzUzJzogJzUnLFxyXG4gICAgICAgICc1NCc6ICc2JyxcclxuICAgICAgICAnNTUnOiAnNycsXHJcbiAgICAgICAgJzU2JzogJzgnLFxyXG4gICAgICAgICc1Nyc6ICc5JyxcclxuICAgICAgICAnNjUnOiAnYScsXHJcbiAgICAgICAgJzY2JzogJ2InLFxyXG4gICAgICAgICc2Nyc6ICdjJyxcclxuICAgICAgICAnNjgnOiAnZCcsXHJcbiAgICAgICAgJzY5JzogJ2UnLFxyXG4gICAgICAgICc3MCc6ICdmJyxcclxuICAgICAgICAnNzEnOiAnZycsXHJcbiAgICAgICAgJzcyJzogJ2gnLFxyXG4gICAgICAgICc3Myc6ICdpJyxcclxuICAgICAgICAnNzQnOiAnaicsXHJcbiAgICAgICAgJzc1JzogJ2snLFxyXG4gICAgICAgICc3Nic6ICdsJyxcclxuICAgICAgICAnNzcnOiAnbScsXHJcbiAgICAgICAgJzc4JzogJ24nLFxyXG4gICAgICAgICc3OSc6ICdvJyxcclxuICAgICAgICAnODAnOiAncCcsXHJcbiAgICAgICAgJzgxJzogJ3EnLFxyXG4gICAgICAgICc4Mic6ICdyJyxcclxuICAgICAgICAnODMnOiAncycsXHJcbiAgICAgICAgJzg0JzogJ3QnLFxyXG4gICAgICAgICc4NSc6ICd1JyxcclxuICAgICAgICAnODYnOiAndicsXHJcbiAgICAgICAgJzg3JzogJ3cnLFxyXG4gICAgICAgICc4OCc6ICd4JyxcclxuICAgICAgICAnODknOiAneScsXHJcbiAgICAgICAgJzkwJzogJ3onLFxyXG4gICAgICAgICc5MSc6IEtleUVudW1zLldJTkRPV1MsXHJcbiAgICAgICAgJzkyJzogS2V5RW51bXMuV0lORE9XUyxcclxuICAgICAgICAnOTMnOiBLZXlFbnVtcy5TRUxFQ1QsXHJcbiAgICAgICAgJzk2JzogJzAnLFxyXG4gICAgICAgICc5Nyc6ICcxJyxcclxuICAgICAgICAnOTgnOiAnMicsXHJcbiAgICAgICAgJzk5JzogJzMnLFxyXG4gICAgICAgICcxMDAnOiAnNCcsXHJcbiAgICAgICAgJzEwMSc6ICc1JyxcclxuICAgICAgICAnMTAyJzogJzYnLFxyXG4gICAgICAgICcxMDMnOiAnNycsXHJcbiAgICAgICAgJzEwNCc6ICc4JyxcclxuICAgICAgICAnMTA1JzogJzknLFxyXG4gICAgICAgICcxMDYnOiAnKicsXHJcbiAgICAgICAgJzEwNyc6ICcrJyxcclxuICAgICAgICAnMTA5JzogJy0nLFxyXG4gICAgICAgICcxMTAnOiAnLicsXHJcbiAgICAgICAgJzExMSc6ICcvJyxcclxuICAgICAgICAnMTEyJzogJ2YxJyxcclxuICAgICAgICAnMTEzJzogJ2YyJyxcclxuICAgICAgICAnMTE0JzogJ2YzJyxcclxuICAgICAgICAnMTE1JzogJ2Y0JyxcclxuICAgICAgICAnMTE2JzogJ2Y1JyxcclxuICAgICAgICAnMTE3JzogJ2Y2JyxcclxuICAgICAgICAnMTE4JzogJ2Y3JyxcclxuICAgICAgICAnMTE5JzogJ2Y4JyxcclxuICAgICAgICAnMTIwJzogJ2Y5JyxcclxuICAgICAgICAnMTIxJzogJ2YxMCcsXHJcbiAgICAgICAgJzEyMic6ICdmMTEnLFxyXG4gICAgICAgICcxMjMnOiAnZjEyJyxcclxuICAgICAgICAnMTQ0JzogS2V5RW51bXMuTlVNX0xPQ0ssXHJcbiAgICAgICAgJzE0NSc6IEtleUVudW1zLlNDUk9MTF9MT0NLLFxyXG4gICAgICAgICcxODYnOiAnOicsXHJcbiAgICAgICAgJzE4Nyc6ICc9JyxcclxuICAgICAgICAnMTg4JzogJywnLFxyXG4gICAgICAgICcxODknOiAnLScsXHJcbiAgICAgICAgJzE5MCc6ICcuJyxcclxuICAgICAgICAnMTkxJzogJy8nLFxyXG4gICAgICAgICcxOTInOiAnYCcsXHJcbiAgICAgICAgJzIxOSc6ICdbJyxcclxuICAgICAgICAnMjIwJzogJ1xcXFwnLFxyXG4gICAgICAgICcyMjEnOiAnXScsXHJcbiAgICAgICAgJzIyMic6ICdcXCcnXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKSxcclxuICAgICAgICBLZXlzID0gcmVxdWlyZSgnLi9LZXlzJyksXHJcbiAgICAgICAgS2V5RW51bXMgPSByZXF1aXJlKCcuL0tleUVudW1zJyksXHJcbiAgICAgICAgS2V5TWFwID0gcmVxdWlyZSgnLi9LZXlNYXAnKSxcclxuICAgICAgICBTaGlmdE1hcCA9IHJlcXVpcmUoJy4vU2hpZnRNYXAnKSxcclxuICAgICAgICBDaXJjdWxhckFycmF5ID0gcmVxdWlyZSgnLi9DaXJjdWxhckFycmF5JyksXHJcbiAgICAgICAgU0VRVUVOQ0VfVElNRU9VVCA9IDgwMCxcclxuICAgICAgICBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIID0gNjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncyBhcmUgcmVjb2duaXplZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlJZHMgLSBUaGUga2V5IGlucHV0IGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGtleSBpZHMgYXJlIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja0tleUlkcyggZnVuY3Rpb25OYW1lLCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIGVyciA9IGZhbHNlO1xyXG4gICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgIGlmICggIUtleXNbIGtleUlkIF0gKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIgKyBrZXlJZCArIFwiJyB0byAnXCIgKyBmdW5jdGlvbk5hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJyBpcyBub3QgYSByZWNvZ25pemVkIGV2ZW50IHR5cGUsIGNvbW1hbmQgaWdub3JlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgZXJyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIHJlY29nbml6ZWQgYXMgYSBrZXkgc2VxdWVuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IC0gVGhlIGlucHV0IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgaW5wdXQgaXMgYSBrZXkgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzU2VxdWVuY2VJbnB1dCggaW5wdXQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnNwbGl0KCcgJykubGVuZ3RoID4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIHNlcXVlbmNlIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlcXVlbmNlS2V5IC0gVGhlIHNlcXVlbmNlIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNlcXVlbmNlKCBzZXF1ZW5jZUtleSApIHtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VLZXkuc3BsaXQoJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgaXMgcmVjb2duaXplZCBhcyBhIGtleSBjb21iaW5hdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBpbnB1dCBpcyBhIGtleSBjb21iaW5hdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNDb21iaW5hdGlvbklucHV0KCBpbnB1dCApIHtcclxuICAgICAgICByZXR1cm4gKCBpbnB1dC5sZW5ndGggPiAxICkgPyBpbnB1dC5zcGxpdCgnKycpLmxlbmd0aCA+IDEgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIGNvbWJpbmF0aW9uIGtleSBpbnRvIHRoZSBpbmRpdmlkdWFsIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBrZXkgaWRzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNvbWJvS2V5LnNwbGl0KC9cXCtcXCtcXCt8XFwrXFwrLyksXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIC8vIG15IGxhY2sgb2YgcmVnZXgga25vd2xlZGdlIGlzIHNoYW1lZnVsXHJcbiAgICAgICAgaWYgKCB0ZW1wLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgIHRlbXAuZm9yRWFjaCggZnVuY3Rpb24oIHQsIGkgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHQubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaSA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goICcrJyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCggdC5zcGxpdCgnKycpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpICE9PSB0ZW1wLmxlbmd0aC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCggJysnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjb21ib0tleS5zcGxpdCgnKycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBzZXF1ZW5jZSBrZXkgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgYmluZHMgdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VxdWVuY2VLZXkgLSBUaGUgc2VxdWVuY2Uga2V5IHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRUeXBlcyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkU2VxdWVuY2UoIGtleWJvYXJkLCBzZXF1ZW5jZUtleSwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleUlkcyA9IHBhcnNlU2VxdWVuY2UoIHNlcXVlbmNlS2V5ICksXHJcbiAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlib2FyZC5zZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcztcclxuICAgICAgICAvLyBjaGVjayBpbnB1dFxyXG4gICAgICAgIGlmICggY2hlY2tLZXlJZHMoICdLZXlib2FyZC5vbicsIGtleUlkcyApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXF1ZW5jZSBlbnRyeSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdID0gc2VxdWVuY2VzWyBzZXF1ZW5jZUtleSBdIHx8IHtcclxuICAgICAgICAgICAga2V5czoga2V5SWRzLFxyXG4gICAgICAgICAgICBsYXN0S2V5OiBrZXlJZHNbIGtleUlkcy5sZW5ndGggLSAxXSwgLy8gc3RvcmUgdGhlIGxhc3Qga2V5IG9mIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYWxsYmFja3MgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0uY2FsbGJhY2tzO1xyXG4gICAgICAgIC8vIGJpbmQgY2FsbGJhY2sgdW5kZXIgdGhlIHByb3ZpZGVkIGV2ZW50c1xyXG4gICAgICAgIGV2ZW50VHlwZXMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudFR5cGUgXSA9IGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gfHwgW107XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzZXF1ZW5jZSBrZXkgdW5kZXIgZWFjaCBrZXkgZm9yIHRoZSBldmVudFxyXG4gICAgICAgICAgICBrZXlJZHMuZm9yRWFjaCggZnVuY3Rpb24oIGtleUlkICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbIGtleUlkIF0gPSBrZXlzWyBrZXlJZCBdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5LnNlcXVlbmNlcyA9IGtleS5zZXF1ZW5jZXMgfHwge307XHJcbiAgICAgICAgICAgICAgICBrZXkuc2VxdWVuY2VzWyBldmVudFR5cGUgXSA9IGtleS5zZXF1ZW5jZXNbIGV2ZW50VHlwZSBdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBrZXkuc2VxdWVuY2VzWyBldmVudFR5cGUgXS5pbmRleE9mKCBzZXF1ZW5jZUtleSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5zZXF1ZW5jZXNbIGV2ZW50VHlwZSBdLnB1c2goIHNlcXVlbmNlS2V5ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc2VxdWVuY2Uga2V5IGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXF1ZW5jZUtleSAtIFRoZSBzZXF1ZW5jZSBrZXkgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZXF1ZW5jZSgga2V5Ym9hcmQsIHNlcXVlbmNlS2V5LCBldmVudFR5cGVzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VTZXF1ZW5jZSggc2VxdWVuY2VLZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlcyA9IGtleWJvYXJkLnNlcXVlbmNlcyxcclxuICAgICAgICAgICAgc2VxdWVuY2UgPSBzZXF1ZW5jZXNbIHNlcXVlbmNlS2V5IF0gfHwge30sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IHNlcXVlbmNlLmNhbGxiYWNrcztcclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGNhbGxiYWNrcyBkb24ndCBleGlzdCBmb3Igc2VxdWVuY2VcclxuICAgICAgICBpZiAoICFjYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmluZCBjYWxsYmFjayB1bmRlciB0aGUgcHJvdmlkZWQgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRDYWxsYmFja3MgPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICBpZiAoIGV2ZW50Q2FsbGJhY2tzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRDYWxsYmFja3Muc3BsaWNlKCBldmVudENhbGxiYWNrcy5pbmRleE9mKCBjYWxsYmFjayApLCAxICk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgZXZlbnQsIHJlbW92ZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIGlmICggZXZlbnRDYWxsYmFja3MubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaWYgbm8gbW9yZSBjYWxsYmFja3MgZm9yIHRoZSBzZXF1ZW5jZSwgZGVsZXRlIHRoZSBzZXF1ZW5jZVxyXG4gICAgICAgIC8vIGFuZCByZW1vdmUgc2VxdWVuY2UgZnJvbSBhbGwga2V5c1xyXG4gICAgICAgIGlmICggVXRpbC5pc0VtcHR5KCBzZXF1ZW5jZS5jYWxsYmFja3MgKSApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHNlcXVlbmNlc1sgc2VxdWVuY2VLZXkgXTtcclxuICAgICAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBzZXF1ZW5jZSwgcmVtb3ZlIGZyb20ga2V5c1xyXG4gICAgICAgICAgICAgICAga2V5SWRzLmZvckVhY2goIGZ1bmN0aW9uKCBrZXlJZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMgPSBrZXlzWyBrZXlJZCBdLnNlcXVlbmNlc1sgZXZlbnRUeXBlIF07IC8vIHJlLWFzc2lnbmluZyBzZXF1ZW5jZXNcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXMuc3BsaWNlKCBzZXF1ZW5jZXMuaW5kZXhPZiggc2VxdWVuY2VLZXkgKSwgMSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgY29tYmluYXRpb24ga2V5IHRvIHRoZSBLZXlib2FyZCBvYmplY3QgYW5kIGJpbmRzXHJcbiAgICAgKiB0aGUgY2FsbGJhY2sgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbWJvS2V5IC0gVGhlIGNvbWJpbmF0aW9uIGtleSB0byBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZENvbWJpbmF0aW9uKCBrZXlib2FyZCwgY29tYm9LZXksIGV2ZW50VHlwZXMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlJZHMgPSBwYXJzZUNvbWJpbmF0aW9uKCBjb21ib0tleSApLFxyXG4gICAgICAgICAgICBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M7XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBrZXlJZHMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjcmVhdGUgY29tYmluYXRpb24gZW50cnkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgIGNvbWJvc1sgY29tYm9LZXkgXSA9IGNvbWJvc1sgY29tYm9LZXkgXSB8fCB7XHJcbiAgICAgICAgICAgIGtleXM6IGtleUlkcyxcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2FsbGJhY2tzID0gY29tYm9zWyBjb21ib0tleSBdLmNhbGxiYWNrcztcclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gPSBjYWxsYmFja3NbIGV2ZW50VHlwZSBdIHx8IFtdO1xyXG4gICAgICAgICAgICBjYWxsYmFja3NbIGV2ZW50VHlwZSBdLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgY29tYmluYXRpb24ga2V5IHVuZGVyIGVhY2gga2V5IGZvciB0aGUgZXZlbnRcclxuICAgICAgICAgICAga2V5SWRzLmZvckVhY2goIGZ1bmN0aW9uKCBrZXlJZCApIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzWyBrZXlJZCBdID0ga2V5c1sga2V5SWQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGtleS5jb21ib3MgPSBrZXkuY29tYm9zIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAga2V5LmNvbWJvc1sgZXZlbnRUeXBlIF0gPSBrZXkuY29tYm9zWyBldmVudFR5cGUgXSAgfHwgW107XHJcbiAgICAgICAgICAgICAgICBpZiAoIGtleS5jb21ib3NbIGV2ZW50VHlwZSBdIC5pbmRleE9mKCBjb21ib0tleSApID09PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5jb21ib3NbIGV2ZW50VHlwZSBdLnB1c2goIGNvbWJvS2V5ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgY29tYmluYXRpb24ga2V5IGZyb20gdGhlIEtleWJvYXJkIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZvciB0aGUgYXBwcm9wcmlhdGUgZXZlbnQgdHlwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21ib0tleSAtIFRoZSBjb21iaW5hdGlvbiBrZXkgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDb21iaW5hdGlvbigga2V5Ym9hcmQsIGNvbWJvS2V5LCBldmVudFR5cGVzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIga2V5SWRzID0gcGFyc2VDb21iaW5hdGlvbiggY29tYm9LZXkgKSxcclxuICAgICAgICAgICAga2V5cyA9IGtleWJvYXJkLmtleXMsXHJcbiAgICAgICAgICAgIGNvbWJvcyA9IGtleWJvYXJkLmNvbWJvcyxcclxuICAgICAgICAgICAgY29tYm8gPSBjb21ib3NbIGNvbWJvS2V5IF0gfHwge30sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNvbWJvLmNhbGxiYWNrcztcclxuICAgICAgICAvLyBleGl0IGVhcmx5IGlmIGVudHJ5IGRvZXNudCBldmVuIGV4aXN0IGZvciBjb21ib1xyXG4gICAgICAgIGlmICggIWNhbGxiYWNrcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudENhbGxiYWNrcyA9IGNhbGxiYWNrc1sgZXZlbnRUeXBlIF07XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRDYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudENhbGxiYWNrcy5zcGxpY2UoIGV2ZW50Q2FsbGJhY2tzLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBldmVudENhbGxiYWNrcy5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBpZiBubyBtb3JlIGNhbGxiYWNrcyBmb3IgdGhlIGNvbWJvLCBkZWxldGUgdGhlIGNvbWJvXHJcbiAgICAgICAgLy8gYW5kIHJlbW92ZSBjb21ibyBmcm9tIGFsbCBrZXlzXHJcbiAgICAgICAgaWYgKCBVdGlsLmlzRW1wdHkoIGNvbWJvLmNhbGxiYWNrcyApICkge1xyXG4gICAgICAgICAgICBkZWxldGUgY29tYm9zWyBjb21ib0tleSBdO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBpbnN0YW5jZXMgb2YgdGhlIGNvbWJvLCByZW1vdmUgZnJvbSBrZXlzXHJcbiAgICAgICAgICAgIGV2ZW50VHlwZXMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zID0ga2V5c1sga2V5SWQgXS5jb21ib3NbIGV2ZW50VHlwZSBdOyAvLyByZS1hc3NpZ25pbmcgY29tYm9zXHJcbiAgICAgICAgICAgICAgICAgICAgY29tYm9zLnNwbGljZSggY29tYm9zLmluZGV4T2YoIGNvbWJvS2V5ICksIDEgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2FsbGJhY2sgdG8gdGhlIEtleWJvYXJkIG9iamVjdCBmb3IgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5SWQgLSBUaGUga2V5IGlkLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRUeXBlcyAtIFRoZSBldmVudCB0eXBlcyB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgdW5kZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWRkS2V5KCBrZXlib2FyZCwga2V5SWQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICkge1xyXG4gICAgICAgIHZhciBrZXlzID0ga2V5Ym9hcmQua2V5cyxcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgLy8gY2hlY2sgaW5wdXRcclxuICAgICAgICBpZiAoIGNoZWNrS2V5SWRzKCAnS2V5Ym9hcmQub24nLCBbIGtleUlkIF0gKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzID0ga2V5LmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAgICAgY2FsbGJhY2tzWyBldmVudFR5cGUgXSA9IGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gfHwgW107XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBjYWxsYmFjayBmcm9tIHRoZSBLZXlib2FyZCBvYmplY3QgZm9yIHRoZSBhcHByb3ByaWF0ZSBldmVudCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleUlkIC0gVGhlIGtleSBpZC5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50VHlwZXMgLSBUaGUgZXZlbnQgdHlwZXMgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVLZXkoIGtleWJvYXJkLCBrZXlJZCwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdIHx8IHt9LFxyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBrZXkuY2FsbGJhY2tzO1xyXG4gICAgICAgIC8vIGV4aXQgZWFybHkgaWYgZW50cnkgZG9lc250IGV2ZW4gZXhpc3QgZm9yIGtleVxyXG4gICAgICAgIGlmICggIWNhbGxiYWNrcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaW5kIGNhbGxiYWNrIHVuZGVyIHRoZSBwcm92aWRlZCBldmVudHNcclxuICAgICAgICBldmVudFR5cGVzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudENhbGxiYWNrcyA9IGNhbGxiYWNrc1sgZXZlbnRUeXBlIF07XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRDYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudENhbGxiYWNrcy5zcGxpY2UoIGV2ZW50Q2FsbGJhY2tzLmluZGV4T2YoIGNhbGxiYWNrICksIDEgKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIG1vcmUgY2FsbGJhY2tzIGZvciBldmVudCwgcmVtb3ZlIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgaWYgKCBldmVudENhbGxiYWNrcy5sZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxsIHRoZSBrZXlzIGluIHRoZSBjb21iaW5hdGlvbiBhcmVcclxuICAgICAqIG9mIHRoZSByZXF1aXJlZCBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbWJvIC0gVGhlIGNvbWJpbmF0aW9uIGVudHJ5LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGNvbWJpbmF0aW9uIGlzIHNhdGlzZmllZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXNDb21ib1NhdGlzZmllZCgga2V5Ym9hcmQsIGNvbWJvLCBldmVudFR5cGUgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICBrZXlJZHMgPSBjb21iby5rZXlzLFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2gga2V5IGluIHRoZSBjb21ib1xyXG4gICAgICAgIGZvciAoIGk9MDsgaTxrZXlJZHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIC8vIGtleSBpcyBndWFyZW50ZWVkIHRvIGV4aXN0IGlmIHRoZSBjb21ibyBleGlzdHNcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWRzW2ldIF07XHJcbiAgICAgICAgICAgIC8vIGEgXCJyZWxlYXNlXCIgY29tYm8gY2FuIG9ubHkgYmUgdHJpZ2dlcmVkIGlmIHRoZSBrZXlzIGhhZCBhbGxcclxuICAgICAgICAgICAgLy8gYmVlbiBkb3duIHRvZ2V0aGVyIGF0IG9uZSBwb2ludFxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJyZWxlYXNlXCIgJiYgKCAhY29tYm8ucHJlc3NlZCB8fCBrZXkuc3RhdGUgIT09IFwidXBcIiApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGEgXCJwcmVzc1wiIGNvbWJvIG9ubHkgbmVlZHMgYWxsIGtleXMgdG8gYmUgZG93biB0b2dldGhlclxyXG4gICAgICAgICAgICBpZiAoIGV2ZW50VHlwZSA9PT0gXCJwcmVzc1wiICYmIGtleS5zdGF0ZSAhPT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29tYm8gaXMgc3VjY2Vzc2Z1bCwgZmxhZyBzbyBpdCBkb2Vzbid0IHNwYW0gd2hlbiBoZWxkXHJcbiAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgLy8gZmxhZyB0aGF0IGFsbCBrZXlzIGhhdmUgYmVlbiBkb3duXHJcbiAgICAgICAgICAgIGNvbWJvLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBmbGFnXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb21iby5wcmVzc2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFsbCBjb21iaW5hdGlvbnMgdGhhdCBhcmUgYXR0YWNoZWQgdG8gdGhlIGtleS4gSWYgYW55IGFyZVxyXG4gICAgICogc2F0aXNmaWVkLCBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBjaGVjayBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIEtleWJvYXJkRXZlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICB2YXIgY29tYm9zID0ga2V5Ym9hcmQuY29tYm9zO1xyXG4gICAgICAgIGlmICggIWtleS5jb21ib3MgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVsZWFzZSBjb21iaW5hdGlvbiBldmVudHMgcmVxdWlyZSBwcmVzcyBjb21iaW5hdGlvbiBldmVudHMgdG9cclxuICAgICAgICAvLyBiZSB0cmFja2VkLCB0aGVyZWZvcmUgaWYgYSBwcmVzcyBldmVudCBvY2N1cnMgdGhhdCBpcyBwYXJ0IG9mIGFcclxuICAgICAgICAvLyBjb21iaW5hdGlvbiBpdCBNVVNUIGJlIHByb2Nlc3NlZCwgcmVnYXJkbGVzcyBpZiB0aGVyZSBpcyBhXHJcbiAgICAgICAgLy8gY2FsbGJhY2suXHJcbiAgICAgICAgaWYgKCBldmVudFR5cGUgPT09IFwicHJlc3NcIiApIHtcclxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcHJlc3MgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5wcmVzcyApIHtcclxuICAgICAgICAgICAgICAgIC8vIGZvciBldmVyeSBjb21ibyBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICBrZXkuY29tYm9zLnByZXNzLmZvckVhY2goIGZ1bmN0aW9uKCBwcmVzcyApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tYm8gPSBjb21ib3NbIHByZXNzIF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpc0NvbWJvU2F0aXNmaWVkKCBrZXlib2FyZCwgY29tYm8sIFwicHJlc3NcIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBjb21ibyBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggY29tYm8uY2FsbGJhY2tzLCBcInByZXNzXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgcmVsZWFzZSBjYWxsYmFja3MsIGlnbm9yZSBjYWxsYmFja3MgYXMgdGhpcyBpc24ndFxyXG4gICAgICAgICAgICAvLyBhIHJlbGVhc2UgZXZlbnQgYnV0IGlzIHJlcXVpcmVkIGZvciByZWxlYXNlIGV2ZW50c1xyXG4gICAgICAgICAgICBpZiAoIGtleS5jb21ib3MucmVsZWFzZSApIHtcclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgcmVsZWFzZSBldmVudHMgdG8gZmxhZyB0aGV5IGhhdmUgYmVlbiBwcmVzc2VkIHByaW9yXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgY29tYm8gaW4gdGhlIGtleVxyXG4gICAgICAgICAgICAgICAga2V5LmNvbWJvcy5yZWxlYXNlLmZvckVhY2goIGZ1bmN0aW9uKCByZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21ibyA9IGNvbWJvc1sgcmVsZWFzZSBdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgY29tYm8gYnV0IGRvbid0IGV4ZWN1dGUgYW55IGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgXCJwcmVzc1wiICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIHJlbGVhc2UgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgIGlmICgga2V5LmNvbWJvcy5yZWxlYXNlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGV2ZXJ5IGNvbWJvIGluIHRoZSBrZXlcclxuICAgICAgICAgICAgICAgIGtleS5jb21ib3MucmVsZWFzZS5mb3JFYWNoKCBmdW5jdGlvbiggcmVsZWFzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tYm8gPSBjb21ib3NbIHJlbGVhc2UgXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQ29tYm9TYXRpc2ZpZWQoIGtleWJvYXJkLCBjb21ibywgXCJyZWxlYXNlXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGtleXMgaW4gY29tYm8gc2F0aXNmeSBjb25kaXRpb25zLCBleGVjdXRlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGNvbWJvLmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdHdvIHRpbWVzdGFtcHMsIGFuZCByZXR1cm5zIHRydWUgaWYgdGhleSBvY2N1clxyXG4gICAgICogd2l0aGluIHRoZSB0aW1lb3V0IGludGVydmFsIGZyb20gZWFjaG90aGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmV2aW91c1RpbWVzdGFtcCAtIFRoZSBwcmV2aW91cyB0aW1lc3RtYXAuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wIC0gVGhlIHRpbWVzdG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhleSBhcmUgd2l0aGluIHRoZSB0aW1lb3V0IGludGVydmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1dpdGhpblRpbWVvdXQoIHByZXZpb3VzVGltZXN0YW1wLCB0aW1lc3RhbXAgKSB7XHJcbiAgICAgICAgdmFyIGRlbHRhO1xyXG4gICAgICAgIGlmICggIXByZXZpb3VzVGltZXN0YW1wICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsdGEgPSBwcmV2aW91c1RpbWVzdGFtcCAtIHRpbWVzdGFtcDtcclxuICAgICAgICByZXR1cm4gZGVsdGEgPCBTRVFVRU5DRV9USU1FT1VUO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbGwgdGhlIGtleXMgaW4gdGhlIHNlcXVlbmNlIGhhdmUgYmVlblxyXG4gICAgICogcHJlc3NlZCBvciByZWxlYXNlZCAoZGVwZW5kaW5nIG9uIHRoZSBldmVudCB0eXBlKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBoaXN0b3J5IC0gVGhlIGtleSBldmVudCBoaXN0b3J5IGFycmF5LlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5SWRzIC0gVGhlIHNlcXVlbmNlIGtleSBpZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzZXF1ZW5jZSBpcyBzYXRpc2ZpZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzU2VxdWVuY2VTYXRpc2ZpZWQoIGhpc3RvcnksIGtleUlkcyApIHtcclxuICAgICAgICB2YXIgcHJldmlvdXNUaW1lc3RhbXAsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlS2V5LFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGksIGo7XHJcbiAgICAgICAgLy8gZGVidWdDaXJjdWxhciggaGlzdG9yeSwga2V5SWRzLmxlbmd0aCs1ICk7XHJcbiAgICAgICAgLy8gZm9yIGVhY2gga2V5IGluIHRoZSBjb21ib1xyXG4gICAgICAgIGZvciAoIGk9MCwgaj0wOyBpPGtleUlkcy5sZW5ndGg7IGkrKywgaisrICkge1xyXG4gICAgICAgICAgICBzZXF1ZW5jZUtleSA9IGtleUlkc1sga2V5SWRzLmxlbmd0aC0xLWkgXTtcclxuICAgICAgICAgICAga2V5ID0gaGlzdG9yeS5iYWNrKCBqICk7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBzaGlmdCBrZXlzXHJcbiAgICAgICAgICAgIHdoaWxlICggc2VxdWVuY2VLZXkgIT09IFwic2hpZnRcIiAmJlxyXG4gICAgICAgICAgICAgICAga2V5ICYmXHJcbiAgICAgICAgICAgICAgICBrZXkua2V5SWQgPT09IFwic2hpZnRcIiApIHtcclxuICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgIGtleSA9IGhpc3RvcnkuYmFjayggaiApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNlZSBpZiBpdCBpcyB0aGUgY29ycmVjdCBzdGF0ZVxyXG4gICAgICAgICAgICBpZiAoICFrZXkgfHwgLy8gbm8ga2V5XHJcbiAgICAgICAgICAgICAgICAga2V5LmtleUlkICE9PSBzZXF1ZW5jZUtleSB8fCAvLyBoYXMgbm90IGJlZW4gcHJlc3NlZFxyXG4gICAgICAgICAgICAgICAgICFpc1dpdGhpblRpbWVvdXQoIHByZXZpb3VzVGltZXN0YW1wLCBrZXkudGltZXN0YW1wICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXNUaW1lc3RhbXAgPSBrZXkudGltZXN0YW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFsbCBzZXF1ZW5jZXMgdGhhdCBhcmUgYXR0YWNoZWQgdG8gdGhlIGtleS4gSWYgYW55IGFyZVxyXG4gICAgICogc2F0aXNmaWVkLCBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleWJvYXJkIC0gVGhlIEtleWJvYXJkIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlJZCAtIFRoZSBrZXkgaWQgZm9yIHRoZSBjdXJyZW50IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGNoZWNrIGZvci5cclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmRFdmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNoZWNrU2VxdWVuY2VzKCBrZXlib2FyZCwga2V5LCBrZXlJZCwgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICB2YXIgc2VxdWVuY2VzID0ga2V5Ym9hcmQuc2VxdWVuY2VzLFxyXG4gICAgICAgICAgICBoaXN0b3J5O1xyXG4gICAgICAgIGlmICgga2V5LnNlcXVlbmNlcyAmJiBrZXkuc2VxdWVuY2VzW2V2ZW50VHlwZV0gKSB7XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRUeXBlID09PSBcInByZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0ga2V5Ym9hcmQucHJlc3NIaXN0b3J5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IGtleWJvYXJkLnJlbGVhc2VIaXN0b3J5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZvciBldmVyeSBzZXF1ZW5jZSBpbiB0aGUga2V5XHJcbiAgICAgICAgICAgIGtleS5zZXF1ZW5jZXNbZXZlbnRUeXBlXS5mb3JFYWNoKCBmdW5jdGlvbiggc2VxS2V5ICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gc2VxdWVuY2VzWyBzZXFLZXkgXTtcclxuICAgICAgICAgICAgICAgIC8vIG9ubHkgY2hlY2sgc2VxdWVuY2UgaWYgdGhpcyBrZXkgaXMgdGhlIExBU1QgS0VZXHJcbiAgICAgICAgICAgICAgICBpZiAoIHNlcXVlbmNlLmxhc3RLZXkgPT09IGtleUlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIGlzU2VxdWVuY2VTYXRpc2ZpZWQoIGhpc3RvcnksIHNlcXVlbmNlLmtleXMgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGwga2V5cyBpbiBzZXF1ZW5jZSBzYXRpc2Z5IGNvbmRpdGlvbnMsIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBzZXF1ZW5jZS5jYWxsYmFja3MsIGV2ZW50VHlwZSwgZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgRE9NIGtleWJvYXJkIGV2ZW50IGludG8gdGhlIHJlbGV2YW50XHJcbiAgICAgKiBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBUaGUga2V5Ym9hcmQgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIGtleSBlbnVtZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSB7XHJcbiAgICAgICAgdmFyIGNoYXJDb2RlID0gZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZTtcclxuICAgICAgICByZXR1cm4gS2V5TWFwWyBjaGFyQ29kZSBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIGtleSBpZCBoYXMgYSBzaGlmdCBjb21wb25lbnQsIGlmIHRoZSBzaGlmdCBidXR0b25cclxuICAgICAqIGlzIGRvd24sIHJldHVybiB0aGUgc2hpZnQga2V5IGlkLiBPdGhlcndpc2UgcmV0dXJuIHRoZSBvcmlnaW5hbFxyXG4gICAgICoga2V5IGlkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkgLSBUaGUga2V5IG1hcCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5SWQgLSBUaGUga2V5IGlkIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc2hpZnRlZCBvciBvcmlnaW5hbCBrZXkgaWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNoaWZ0S2V5SWQoIGtleXMsIGtleUlkICkge1xyXG4gICAgICAgIHZhciBzaGlmdCA9IGtleXNbIEtleUVudW1zLlNISUZUIF07XHJcbiAgICAgICAgaWYgKCBzaGlmdCAmJiBzaGlmdC5zdGF0ZSA9PT0gXCJkb3duXCIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTaGlmdE1hcFsga2V5SWQgXSB8fCBrZXlJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSBwcmVzcyBldmVudCBieSBjaGFuZ2luZ1xyXG4gICAgICogdGhlIGtleSBzdGF0ZSBhbmQgZXhlY3V0aW5nIGJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5Ym9hcmQgLSBUaGUgS2V5Ym9hcmQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGtleSBwcmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmRLZXlQcmVzcygga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICBpZiAoICFrZXlJZCApIHtcclxuICAgICAgICAgICAgICAgIC8vIGtleSBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtleUlkID0gc2hpZnRLZXlJZCgga2V5cywga2V5SWQgKTtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1sga2V5SWQgXSA9IGtleXNbIGtleUlkIF0gfHwge307XHJcbiAgICAgICAgICAgIGtleS5zdGF0ZSA9IFwiZG93blwiO1xyXG4gICAgICAgICAgICBrZXlib2FyZC5wcmVzc0hpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBrZXlJZDoga2V5SWQsXHJcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcygga2V5LmNhbGxiYWNrcywgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgICAgICBjaGVja0NvbWJvcygga2V5Ym9hcmQsIGtleSwgXCJwcmVzc1wiLCBldmVudCApO1xyXG4gICAgICAgICAgICBjaGVja1NlcXVlbmNlcygga2V5Ym9hcmQsIGtleSwga2V5SWQsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGtleSByZWxlYXNlIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUga2V5IHN0YXRlIGFuZCBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlib2FyZCAtIFRoZSBLZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUga2V5IHJlbGVhc2UgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleWJvYXJkS2V5UmVsZWFzZSgga2V5Ym9hcmQgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgdmFyIGtleUlkID0gZ2V0S2V5Ym9hcmRLZXlJZCggZXZlbnQgKSxcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlib2FyZC5rZXlzLFxyXG4gICAgICAgICAgICAgICAga2V5O1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBwcm9jZXNzZWQgdGhlIGtleWRvd24gZXZlbnQsIHNvbWV0aW1lcyBkdWVcclxuICAgICAgICAgICAgLy8gdG8gZm9jdXMgaXNzdWVzICggd2luZG93cyBrZXksIHByaW50c2NyZWVuIGtleSwgZXRjIClcclxuICAgICAgICAgICAgLy8gd2UgbWlzcyB0aGUgJ2tleWRvd24nIGV2ZW50IGFuZCBvbmx5IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gdGhlICdrZXl1cCdcclxuICAgICAgICAgICAga2V5SWQgPSBzaGlmdEtleUlkKCBrZXlzLCBrZXlJZCApO1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzWyBrZXlJZCBdO1xyXG4gICAgICAgICAgICBpZiAoIGtleSAmJiBrZXkuc3RhdGUgPT09IFwiZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAga2V5LnN0YXRlID0gXCJ1cFwiO1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQucmVsZWFzZUhpc3RvcnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5SWQ6IGtleUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGtleS5jYWxsYmFja3MsIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tDb21ib3MoIGtleWJvYXJkLCBrZXksIFwicmVsZWFzZVwiLCBldmVudCApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tTZXF1ZW5jZXMoIGtleWJvYXJkLCBrZXksIGtleUlkLCBcInJlbGVhc2VcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBrZXlib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAY2xhc3MgS2V5Ym9hcmRcclxuICAgICAqIEBjbGFzc2Rlc2MgQSBrZXlib2FyZCBpbnB1dCBoYW5kbGluZyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEtleWJvYXJkKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29tYm9zID0ge307XHJcbiAgICAgICAgdGhpcy5zZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnByZXNzSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlSGlzdG9yeSA9IG5ldyBDaXJjdWxhckFycmF5KCBLRVlfSElTVE9SWV9CVUZGRVJfTEVOR1RIICk7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUga2V5IGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZEtleVByZXNzKCB0aGlzICkgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBoYW5kbGVLZXlib2FyZEtleVJlbGVhc2UoIHRoaXMgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgS2V5Ym9hcmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXQgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50VHlwZXMgLSBUaGUga2V5IGV2ZW50cyB0byBiaW5kIHRoZSBjYWxsYmFja3MgdG8uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dHMsIGNhbGxiYWNrLCBldmVudFR5cGVzICkge1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnS2V5Ym9hcmQub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdLZXlib2FyZC5vbicsIGlucHV0cyApO1xyXG4gICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9uJywgZXZlbnRUeXBlcyApO1xyXG4gICAgICAgIC8vIGZvciBlYWNoIGlucHV0LCBkZXRlcm1pbmUgdHlwZSBhbmQgc3RvcmUgYWNjb3JkaW5nbHlcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaW5wdXRzLmZvckVhY2goIGZ1bmN0aW9uKCBpbnB1dCApIHtcclxuICAgICAgICAgICAgaWYgKCBpc1NlcXVlbmNlSW5wdXQoIGlucHV0ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRTZXF1ZW5jZSggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlzQ29tYmluYXRpb25JbnB1dCggaW5wdXQgKSApIHtcclxuICAgICAgICAgICAgICAgIGFkZENvbWJpbmF0aW9uKCB0aGF0LCBpbnB1dCwgZXZlbnRUeXBlcywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZEtleSggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBLZXlib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dCAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRUeXBlcyAtIFRoZSBrZXkgZXZlbnRzIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tzIGZyb20uXHJcbiAgICAgKi9cclxuICAgIEtleWJvYXJkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjaywgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ0tleWJvYXJkLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ0tleWJvYXJkLm9mZicsIGlucHV0cyApO1xyXG4gICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ0tleWJvYXJkLm9mZicsIGV2ZW50VHlwZXMgKTtcclxuICAgICAgICAvLyBmb3IgZWFjaCBpbnB1dCwgZGV0ZXJtaW5lIHR5cGUgYW5kIHN0b3JlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgICAgIGlmICggaXNTZXF1ZW5jZUlucHV0KCBpbnB1dCApICkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU2VxdWVuY2UoIHRoYXQsIGlucHV0LCBldmVudFR5cGVzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpc0NvbWJpbmF0aW9uSW5wdXQoIGlucHV0ICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDb21iaW5hdGlvbiggdGhhdCwgaW5wdXQsIGV2ZW50VHlwZXMsIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVLZXkoIHRoYXQsIGlucHV0LCBldmVudFR5cGVzLCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBrZXkgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBtZW1iZXJvZiBLZXlib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBrZXlJZHMgLSBUaGUga2V5IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIHN0YXRlIG9mIHRoZSBwcm92aWRlZCBrZXlzLlxyXG4gICAgICovXHJcbiAgICBLZXlib2FyZC5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCBrZXlJZHMgKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSB0aGlzLmtleXMsXHJcbiAgICAgICAgICAgIHN0YXRlcyA9IHt9O1xyXG4gICAgICAgIGtleUlkcyA9IFV0aWwubm9ybWFsaXplSW5wdXRBcmdzKCAnS2V5Ym9hcmQucG9sbCcsIGtleUlkcyApO1xyXG4gICAgICAgIGtleUlkcy5mb3JFYWNoKCBmdW5jdGlvbigga2V5SWQgKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzWyBrZXlJZCBdO1xyXG4gICAgICAgICAgICBzdGF0ZXNbIGtleUlkIF0gPSBrZXkgPyBrZXkuc3RhdGUgOiAndXAnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBrZXlJZHMubGVuZ3RoID09PSAxID8gc3RhdGVzWyBrZXlJZHNbMF0gXSA6IHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIEtleU1hcCA9IHJlcXVpcmUoJy4vS2V5TWFwJyksXHJcbiAgICAgICAgU2hpZnRNYXAgPSByZXF1aXJlKCcuL1NoaWZ0TWFwJyksXHJcbiAgICAgICAgS2V5cyA9IHt9LFxyXG4gICAgICAgIGtleUNvZGU7XHJcblxyXG4gICAgZm9yICgga2V5Q29kZSBpbiBLZXlNYXAgKSB7XHJcbiAgICAgICAgS2V5c1sgS2V5TWFwWyBrZXlDb2RlIF0gXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICgga2V5Q29kZSBpbiBTaGlmdE1hcCApIHtcclxuICAgICAgICBLZXlzWyBTaGlmdE1hcFsga2V5Q29kZSBdIF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5cztcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBhIERPTSBtb3VzZSBldmVudCBpbnRvIHRoZSByZWxldmFudFxyXG4gICAgICogYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gVGhlIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBldmVudCBlbnVtZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0TW91c2VCdXR0b25JZCggZXZlbnQgKSB7XHJcbiAgICAgICAgc3dpdGNoICggZXZlbnQuYnV0dG9uICkge1xyXG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBcImxlZnRcIjtcclxuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gXCJtaWRkbGVcIjtcclxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSBidXR0b24gcHJlc3MgZXZlbnQgYnkgY2hhbmdpbmdcclxuICAgICAqIHRoZSBidXR0b24gc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VCdXR0b25QcmVzcyggYnV0dG9ucyApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uSWQgPSBnZXRNb3VzZUJ1dHRvbklkKCBldmVudCApLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uO1xyXG4gICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBidXR0b24gaW5mbyBvYmplY3QgZXhpc3RzXHJcbiAgICAgICAgICAgIGJ1dHRvbiA9IGJ1dHRvbnNbIGJ1dHRvbklkIF0gPSBidXR0b25zWyBidXR0b25JZCBdIHx8IHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zdGF0ZSA9IFwiZG93blwiO1xyXG4gICAgICAgICAgICBVdGlsLmV4ZWN1dGVDYWxsYmFja3MoIGJ1dHRvbi5jYWxsYmFja3MsIFwicHJlc3NcIiwgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBhIGJ1dHRvbiByZWxlYXNlIGV2ZW50IGJ5IGNoYW5naW5nXHJcbiAgICAgKiB0aGUgaW5wdXQgc3RhdGUgYW5kIGV4ZWN1dGluZyBib3VuZCBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJ1dHRvbnMgLSBUaGUgYnV0dG9uIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VCdXR0b25SZWxlYXNlKCBidXR0b25zICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b25JZCA9IGdldE1vdXNlQnV0dG9uSWQoIGV2ZW50ICksXHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSBidXR0b25zWyBidXR0b25JZCBdO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBwcm9jZXNzZWQgdGhlIGtleWRvd24gZXZlbnQsIHNvbWV0aW1lcyBkdWVcclxuICAgICAgICAgICAgLy8gdG8gZm9jdXMgaXNzdWVzICggd2luZG93cyBidXR0b24sIHByaW50c2NyZWVuIGJ1dHRvbiwgZXRjIClcclxuICAgICAgICAgICAgLy8gd2UgbWlzcyB0aGUgJ2tleWRvd24nIGV2ZW50IGFuZCBvbmx5IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gdGhlICdrZXl1cCdcclxuICAgICAgICAgICAgaWYgKCBidXR0b24gJiYgYnV0dG9uLnN0YXRlID09PSBcImRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggYnV0dG9uLmNhbGxiYWNrcywgXCJyZWxlYXNlXCIsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uc3RhdGUgPSBcInVwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBtb3VzZSBtb3ZlbWVudCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vdXNlIC0gVGhlIG1vdXNlIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKCBtb3VzZSApIHtcclxuICAgICAgICB2YXIgbGFzdFBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnRzIHNvbWV0aW1lcyBmaXJlIHdoZW4gYSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZCwgYSBtb3VzZW1vdmVcclxuICAgICAgICAgICAgLy8gc2hvdWxkIG9ubHkgcXVldWUgYW4gZXZlbnQgaWYgdGhlIHBvc2l0aW9uIGhhcyBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICAgICAgICAgIGlmICggbGFzdFBvc2l0aW9uICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID09PSBsYXN0UG9zaXRpb24ueCAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA9PT0gbGFzdFBvc2l0aW9uLnkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBsYXN0UG9zaXRpb24gKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2aW91c0NsaWVudFggPSBsYXN0UG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZpb3VzQ2xpZW50WSA9IGxhc3RQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFV0aWwuZXhlY3V0ZUNhbGxiYWNrcyggbW91c2UuY2FsbGJhY2tzLCBcIm1vdmVcIiwgZXZlbnQgKTtcclxuICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBtb3VzZSB3aGVlbCB3aGVlbCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vdXNlIC0gVGhlIG1vdXNlIGluZm9ybWF0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlTW91c2VXaGVlbCggbW91c2UgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgVXRpbC5leGVjdXRlQ2FsbGJhY2tzKCBtb3VzZS5jYWxsYmFja3MsIFwid2hlZWxcIiwgZXZlbnQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEgbW91c2Ugb2JqZWN0LlxyXG4gICAgICogQGNsYXNzIE1vdXNlXHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgbW91c2UgaW5wdXQgaGFuZGxpbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBhcmcgLSBUaGUgZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVycyB0by5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gTW91c2UoIGFyZyApIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuICAgICAgICB0aGlzLm1vdXNlID0ge307XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBhcmcgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBhcmcgfHwgZG9jdW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdlbmVyYXRlIGFuZCBhdHRhY2ggdGhlIGJ1dHRvbiBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgaGFuZGxlTW91c2VCdXR0b25QcmVzcyggdGhpcy5idXR0b25zICkgKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBoYW5kbGVNb3VzZUJ1dHRvblJlbGVhc2UoIHRoaXMuYnV0dG9ucyApICk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUoIHRoaXMubW91c2UgKSApO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBoYW5kbGVNb3VzZVdoZWVsKCB0aGlzLm1vdXNlICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIE1vdXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0cyAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnRUeXBlcyAtIFRoZSBidXR0b24gZXZlbnRzIHRvIGJpbmQgdGhlIGNhbGxiYWNrcyB0by4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKCBpbnB1dHMsIGNhbGxiYWNrLCBldmVudFR5cGVzICkge1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnTW91c2Uub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoXHJcbiAgICAgICAgICAgICdNb3VzZS5vbicsXHJcbiAgICAgICAgICAgIGlucHV0cyxcclxuICAgICAgICAgICAgWyAnbGVmdCcsJ21pZGRsZScsJ3JpZ2h0JywnbW92ZScsJ3doZWVsJyBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICB2YXIgbW91c2UgPSB0aGlzLm1vdXNlLFxyXG4gICAgICAgICAgICBidXR0b25zID0gdGhpcy5idXR0b25zO1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5wdXQgPT09IFwibW92ZVwiIHx8IGlucHV0ID09PSBcIndoZWVsXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3MgPSBtb3VzZS5jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0gPSBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBidXR0b25zWyBpbnB1dCBdID0gYnV0dG9uc1sgaW5wdXQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9uJywgZXZlbnRUeXBlcyApO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3MgPSBidXR0b24uY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50VHlwZSBdID0gYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0ucHVzaCggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZm9yIGEgc2V0IG9mIGlucHV0IGFuZCBldmVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTW91c2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaW5wdXRzIC0gVGhlIGlucHV0IGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudFR5cGVzIC0gVGhlIGJ1dHRvbiBldmVudHMgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja3MgZnJvbS4gT3B0aW9uYWwuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjaywgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ01vdXNlLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyhcclxuICAgICAgICAgICAgJ01vdXNlLm9mZicsXHJcbiAgICAgICAgICAgIGlucHV0cywgWyAnbGVmdCcsJ21pZGRsZScsJ3JpZ2h0JywnbW92ZScsJ3doZWVsJyBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICB2YXIgbW91c2UgPSB0aGlzLm1vdXNlLFxyXG4gICAgICAgICAgICBidXR0b25zID0gdGhpcy5idXR0b25zO1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXQgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5wdXQgPT09IFwibW92ZVwiIHx8IGlucHV0ID09PSBcIndoZWVsXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG1vdXNlLmNhbGxiYWNrcyAmJiBtb3VzZS5jYWxsYmFja3NbIGlucHV0IF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2UuY2FsbGJhY2tzWyBpbnB1dCBdLnNwbGljZSggbW91c2UuY2FsbGJhY2tzWyBpbnB1dCBdLmluZGV4T2YoIGNhbGxiYWNrICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBidXR0b25zWyBpbnB1dCBdID0gYnV0dG9uc1sgaW5wdXQgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMgPSBVdGlsLm5vcm1hbGl6ZUV2ZW50QXJncyggJ01vdXNlLm9mZicsIGV2ZW50VHlwZXMgKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGJ1dHRvbi5jYWxsYmFja3MgJiYgYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jYWxsYmFja3NbIGV2ZW50VHlwZSBdLnNwbGljZSggYnV0dG9uLmNhbGxiYWNrc1sgZXZlbnRUeXBlIF0uaW5kZXhPZiggY2FsbGJhY2sgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9sbCB0aGUgc3RhdGVzIG9mIHRoZSBwcm92aWRlZCBidXR0b24gaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBtZW1iZXJvZiBNb3VzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBidXR0b25JZHMgLSBUaGUgYnV0dG9uIGlkZW50aWZpY2F0aW9uIHN0cmluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgc3RhdGUgb2YgdGhlIHByb3ZpZGVkIGJ1dHRvbnMuXHJcbiAgICAgKi9cclxuICAgIE1vdXNlLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oIGJ1dHRvbklkcyApIHtcclxuICAgICAgICB2YXIgYnV0dG9ucyA9IHRoaXMuYnV0dG9ucyxcclxuICAgICAgICAgICAgc3RhdGVzID0ge307XHJcbiAgICAgICAgYnV0dG9uSWRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoXHJcbiAgICAgICAgICAgICdNb3VzZS5wb2xsJyxcclxuICAgICAgICAgICAgYnV0dG9uSWRzLFxyXG4gICAgICAgICAgICBbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnV0dG9uSWRzLmZvckVhY2goIGZ1bmN0aW9uKCBidXR0b25JZCApIHtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGJ1dHRvbnNbIGJ1dHRvbklkIF07XHJcbiAgICAgICAgICAgIHN0YXRlc1sgYnV0dG9uSWQgXSA9IGJ1dHRvbiA/IGJ1dHRvbi5zdGF0ZSA6ICd1cCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbklkcy5sZW5ndGggPT09IDEgPyBzdGF0ZXNbIGJ1dHRvbklkc1swXSBdIDogc3RhdGVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNlO1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgJ34nOiAnYCcsXHJcbiAgICAgICAgJyEnOiAnMScsXHJcbiAgICAgICAgJ0AnOiAnMicsXHJcbiAgICAgICAgJyMnOiAnMycsXHJcbiAgICAgICAgJyQnOiAnNCcsXHJcbiAgICAgICAgJyUnOiAnNScsXHJcbiAgICAgICAgJ14nOiAnNicsXHJcbiAgICAgICAgJyYnOiAnNycsXHJcbiAgICAgICAgJyonOiAnOCcsXHJcbiAgICAgICAgJygnOiAnOScsXHJcbiAgICAgICAgJyknOiAnMCcsXHJcbiAgICAgICAgJ18nOiAnLScsXHJcbiAgICAgICAgJysnOiAnPScsXHJcblxyXG4gICAgICAgICd7JzogJ1snLFxyXG4gICAgICAgICd9JzogJ10nLFxyXG4gICAgICAgICd8JzogJ1xcXFwnLFxyXG4gICAgICAgICc6JzogJzsnLFxyXG4gICAgICAgICdcIic6ICdcXCcnLFxyXG4gICAgICAgICc8JzogJywnLFxyXG4gICAgICAgICc+JzogJy4nLFxyXG4gICAgICAgICc/JzogJy8nLFxyXG5cclxuICAgICAgICAnYCc6ICd+JyxcclxuICAgICAgICAnMSc6ICchJyxcclxuICAgICAgICAnMic6ICdAJyxcclxuICAgICAgICAnMyc6ICcjJyxcclxuICAgICAgICAnNCc6ICckJyxcclxuICAgICAgICAnNSc6ICclJyxcclxuICAgICAgICAnNic6ICdeJyxcclxuICAgICAgICAnNyc6ICcmJyxcclxuICAgICAgICAnOCc6ICcqJyxcclxuICAgICAgICAnOSc6ICcoJyxcclxuICAgICAgICAnMCc6ICcpJyxcclxuICAgICAgICAnLSc6ICdfJyxcclxuICAgICAgICAnPSc6ICcrJyxcclxuXHJcbiAgICAgICAgJ1snOiAneycsXHJcbiAgICAgICAgJ10nOiAnfScsXHJcbiAgICAgICAgJ1xcXFwnOiAnfCcsXHJcbiAgICAgICAgJzsnOiAnOicsXHJcbiAgICAgICAgJyc6ICdcIicsXHJcbiAgICAgICAgJywnOiAnPCcsXHJcbiAgICAgICAgJy4nOiAnPicsXHJcbiAgICAgICAgJy8nOiAnPycsXHJcblxyXG4gICAgfTtcclxuXHJcbn0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuL1V0aWwnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byBoYW5kbGUgYSB0b3VjaCBldmVudCBieSBleGVjdXRpbmcgYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0b3VjaCAtIFRoZSB0b3VjaCBhY3Rpb24gaW5mb3JtYXRpb24gb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiAtIFRoZSBhY3Rpb24gaWRlbnRpZmljYXRpb24gc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaEFjdGlvbiggdG91Y2gsIGFjdGlvbiApIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB0b3VjaFsgYWN0aW9uIF0gPSB0b3VjaFsgYWN0aW9uIF0gfHwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0b3VjaFsgYWN0aW9uIF0uY2FsbGJhY2tzLmZvckVhY2goIGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCBldmVudCApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIGEgdG91Y2ggb2JqZWN0LlxyXG4gICAgICogQGNsYXNzIFRvdWNoXHJcbiAgICAgKiBAY2xhc3NkZXNjIEEgdG91Y2ggaW5wdXQgaGFuZGxpbmcgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBUb3VjaCgpIHtcclxuICAgICAgICB0aGlzLnRvdWNoID0ge307XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYW5kIGF0dGFjaCB0aGUgYnV0dG9uIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCBcInN0YXJ0XCIgKSwgZmFsc2UgKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNoZW5kXCIsIGhhbmRsZVRvdWNoQWN0aW9uKCB0aGlzLnRvdWNoLCBcImVuZFwiICksIGZhbHNlICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGNhbmNlbFwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJjYW5jZWxcIiApLCBmYWxzZSApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hsZWF2ZVwiLCBoYW5kbGVUb3VjaEFjdGlvbiggdGhpcy50b3VjaCwgXCJsZWF2ZVwiICksIGZhbHNlICk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgaGFuZGxlVG91Y2hBY3Rpb24oIHRoaXMudG91Y2gsIFwibW92ZVwiICksIGZhbHNlICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBsaXN0ZW5lciBmb3IgYSBzZXQgb2YgaW5wdXQgYW5kIGV2ZW50cy5cclxuICAgICAqIEBtZW1iZXJvZiBUb3VjaFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBpbnB1dHMgLSBUaGUgaW5wdXQgaWRlbnRpZmljYXRpb24gc3RyaW5ncy5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBUb3VjaC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIgdG91Y2gsXHJcbiAgICAgICAgICAgIGlucHV0LFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGlmICggVXRpbC5jaGVja0Z1bmN0aW9uQXJnKCAnVG91Y2gub24nLCBjYWxsYmFjayApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRzID0gVXRpbC5ub3JtYWxpemVJbnB1dEFyZ3MoICdUb3VjaC5vbicsXHJcbiAgICAgICAgICAgIGlucHV0cywgWyAnc3RhcnQnLCAnZW5kJywgJ2NhbmNlbCcsICdsZWF2ZScsICdtb3ZlJyBdICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dHNbaV07XHJcbiAgICAgICAgICAgIHRvdWNoID0gdGhpcy50b3VjaDtcclxuICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0gPSB0b3VjaFsgaW5wdXQgXSB8fCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBpbnB1dCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdG91Y2hbIGlucHV0IF0uY2FsbGJhY2tzLnB1c2goIGNhbGxiYWNrICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIHNldCBvZiBpbnB1dCBhbmQgZXZlbnRzLlxyXG4gICAgICogQG1lbWJlcm9mIFRvdWNoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGlucHV0cyAtIFRoZSBpbnB1dCBpZGVudGlmaWNhdGlvbiBzdHJpbmdzLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIFRvdWNoLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiggaW5wdXRzLCBjYWxsYmFjayApIHtcclxuICAgICAgICB2YXIgdG91Y2gsXHJcbiAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBpZiAoIFV0aWwuY2hlY2tGdW5jdGlvbkFyZyggJ1RvdWNoLm9mZicsIGNhbGxiYWNrICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dHMgPSBVdGlsLm5vcm1hbGl6ZUlucHV0QXJncyggJ1RvdWNoLm9mZicsXHJcbiAgICAgICAgICAgIGlucHV0cywgWyAnc3RhcnQnLCAnZW5kJywgJ2NhbmNlbCcsICdsZWF2ZScsICdtb3ZlJyBdICk7XHJcbiAgICAgICAgZm9yICggaT0wOyBpPGlucHV0cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dHNbaV07XHJcbiAgICAgICAgICAgIHRvdWNoID0gdGhpcy50b3VjaDtcclxuICAgICAgICAgICAgaW5kZXggPSB0b3VjaFsgaW5wdXQgXS5jYWxsYmFja3MuaW5kZXhPZiggY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgaWYgKCB0b3VjaFsgaW5wdXQgXSApIHtcclxuICAgICAgICAgICAgICAgIHRvdWNoWyBpbnB1dCBdLmNhbGxiYWNrcy5zcGxpY2UoIGluZGV4LCAxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gVG91Y2g7XHJcblxyXG59KCkpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHaXZlbiBhIHN0cmluZywgY29udmVydHMgaXQgdG8gbG93ZXJjYXNlIGFuZCByZXBsYWNlcyBhbGxcclxuICAgICAgICAgKiBzZXF1ZW50aWFsIHdoaXRlc3BhY2UgaW50byBhIHNpbmdsZSBzcGFjZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIG5vcm1hbGl6ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBub3JtYWxpemVkIHN0cmluZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxpemVTdHJpbmc6IGZ1bmN0aW9uKCBzdHIgKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIHdoaXRlc3BhY2UgdG8gYSBzaW5nbGUgc3BhY2UgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcc10vZywgXCIgXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyB0aGF0IGEgZnVuY3Rpb24gYXJndW1lbnQgaXMgaW5kZWVkIGEgZnVuY3Rpb24uIElmIGl0IGlzXHJcbiAgICAgICAgICogbm90LCBsb2cgdG8gdGhlIGNvbnNvbGUgYW5kIHJldHVybiB0cnVlLiBPdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZnVuY3Rpb24gaXMgaW52YWxpZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja0Z1bmN0aW9uQXJnOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBmdW5jICkge1xyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiQXJndW1lbnQgJ2NhbGxiYWNrJyB0byAnXCIrZnVuY3Rpb25OYW1lK1wiJyBpcyBub3Qgb2YgdHlwZSAnZnVuY3Rpb24nLCBjb21tYW5kIGlnbm9yZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyBhbmQgbm9ybWFsaXplcyB0aGUgJ2lucHV0JyBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gaW5wdXQgLSBUaGUgaW5wdXQgYXJndW1lbnQuXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gdmFsaWRJbnB1dCAtIFRoZSByZWNvZ25pemVkIGlucHV0LiBPcHRpb25hbC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGFycmF5IG9mIG5vcm1hbGl6ZWQgaW5wdXQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9ybWFsaXplSW5wdXRBcmdzOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lLCBpbnB1dHMsIHZhbGlkSW5wdXQgKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dHMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCAhKCBpbnB1dHMgaW5zdGFuY2VvZiBBcnJheSApICkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzID0gWyBpbnB1dHMgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnB1dHMuZm9yRWFjaCggZnVuY3Rpb24oIGlucHV0ICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlucHV0IGlzIG5vdCBhIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitpbnB1dCtcIicgdG8gJ1wiK2Z1bmN0aW9uTmFtZStcIicgaXMgbm90IG9mIHR5cGUgJ3N0cmluZycsIGFyZ3VtZW50IHJlbW92ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhbGlkSW5wdXQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWxpZElucHV0LmluZGV4T2YoIGlucHV0ICkgPT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBcmd1bWVudCAnXCIraW5wdXQrXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBhIHJlY29nbml6ZWQgaW5wdXQgdHlwZSwgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0cy5wdXNoKCB0aGF0Lm5vcm1hbGl6ZVN0cmluZyggaW5wdXQgKSApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIENoZWNrcyBhbmQgbm9ybWFsaXplcyB0aGUgJ2V2ZW50cycgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50cyAtIFRoZSBldmVudHMgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBhcnJheSBvZiBub3JtYWxpemVkIGlucHV0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vcm1hbGl6ZUV2ZW50QXJnczogZnVuY3Rpb24oIGZ1bmN0aW9uTmFtZSwgZXZlbnRUeXBlcyApIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZEV2ZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoICFldmVudFR5cGVzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcyA9IFsgJ3ByZXNzJyBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggISggZXZlbnRUeXBlcyBpbnN0YW5jZW9mIEFycmF5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudFR5cGVzID0gWyBldmVudFR5cGVzIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnRUeXBlcy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnRUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBldmVudFR5cGUgIT09ICdwcmVzcycgJiZcclxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgIT09ICdyZWxlYXNlJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBldmVudCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkFyZ3VtZW50ICdcIitldmVudFR5cGUrXCInIHRvICdcIitmdW5jdGlvbk5hbWUrXCInIGlzIG5vdCBhIHJlY29nbml6ZWQgZXZlbnQgdHlwZSwgYXJndW1lbnQgcmVtb3ZlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkRXZlbnRzLnB1c2goIHRoYXQubm9ybWFsaXplU3RyaW5nKCBldmVudFR5cGUgKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRFdmVudHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhlY3V0ZSB0aGUgZnVuY3Rpb25zIGluIHRoZSBjYWxsYmFja3Mgb2JqZWN0IHRoYXQgbWF0Y2ggdGhlXHJcbiAgICAgICAgICogcHJvdmlkZWQgZXZlbnQgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFja3MgLSBUaGUgY2FsbGJhY2tzIG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHR5cGUgc3RyaW5nLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIG5hdGl2ZSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZUNhbGxiYWNrczogZnVuY3Rpb24oIGNhbGxiYWNrcywgZXZlbnRUeXBlLCBldmVudCApIHtcclxuICAgICAgICAgICAgaWYgKCAhY2FsbGJhY2tzIHx8ICFjYWxsYmFja3NbIGV2ZW50VHlwZSBdICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1sgZXZlbnRUeXBlIF0uZm9yRWFjaCggZnVuY3Rpb24oIGNhbGxiYWNrICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsb3MgZnVuY3Rpb24gdGhhdCBzdXBwb3J0cyBuZWdhdGl2ZSBudW1iZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIFRoZSBudW1iZXIgdG8gbW9kdWxvLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG1vZHVsb3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVzdWx0aW5nIG51bWJlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBtb2Q6IGZ1bmN0aW9uKCBudW0sIG4gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoICggbnVtICUgbiApICsgbiApICUgbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBvYmplY3QgaGFzIG5vIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byB0ZXN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBoYXMga2V5cywgZmFsc2UgaWYgbm90LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyggb2JqICkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgS2V5Ym9hcmQ6IHJlcXVpcmUoJy4vS2V5Ym9hcmQnKSxcclxuICAgICAgICBNb3VzZTogcmVxdWlyZSgnLi9Nb3VzZScpLFxyXG4gICAgICAgIFRvdWNoOiByZXF1aXJlKCcuL1RvdWNoJylcclxuXHJcbiAgICB9O1xyXG5cclxufSgpKTtcclxuIl19
