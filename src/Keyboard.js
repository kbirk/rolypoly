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
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addSequence( keyboard, sequenceKey, events, callback ) {
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
        events.forEach( function( event ) {
            callbacks[ event ] = callbacks[ event ] || [];
            callbacks[ event ].push( callback );
            // add the sequence key under each key for the event
            keyIds.forEach( function( keyId ) {
                var key = keys[ keyId ] = keys[ keyId ] || {};
                key.sequences = key.sequences || {};
                key.sequences[ event ] = key.sequences[ event ] || [];
                if ( key.sequences[ event ].indexOf( sequenceKey ) === -1 ) {
                    // don't add duplicates
                    key.sequences[ event ].push( sequenceKey );
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
     * @param {Array} events - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeSequence( keyboard, sequenceKey, events, callback ) {
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
        events.forEach( function( event ) {
            var eventCallbacks = callbacks[ event ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ event ];
                }
            }
        });
        // if no more callbacks for the sequence, delete the sequence
        // and remove sequence from all keys
        if ( Util.isEmpty( sequence.callbacks ) ) {
            delete sequences[ sequenceKey ];
            events.forEach( function( event ) {
                // if there are no more instances of the sequence, remove from keys
                keyIds.forEach( function( keyId ) {
                    sequences = keys[ keyId ].sequences[ event ]; // re-assigning sequences
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
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addCombination( keyboard, comboKey, events, callback ) {
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
        events.forEach( function( event ) {
            callbacks[ event ] = callbacks[ event ] || [];
            callbacks[ event ].push( callback );
            // add the combination key under each key for the event
            keyIds.forEach( function( keyId ) {
                var key = keys[ keyId ] = keys[ keyId ] || {};
                key.combos = key.combos || {};
                key.combos[ event ] = key.combos[ event ]  || [];
                if ( key.combos[ event ] .indexOf( comboKey ) === -1 ) {
                    // don't add duplicates
                    key.combos[ event ].push( comboKey );
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
     * @param {Array} events - The event types to unregister the callback from.
     * @param {Function} callback - The callback function.
     */
    function removeCombination( keyboard, comboKey, events, callback ) {
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
        events.forEach( function( event ) {
            var eventCallbacks = callbacks[ event ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ event ];
                }
            }
        });
        // if no more callbacks for the combo, delete the combo
        // and remove combo from all keys
        if ( Util.isEmpty( combo.callbacks ) ) {
            delete combos[ comboKey ];
            // if there are no more instances of the combo, remove from keys
            events.forEach( function( event ) {
                keyIds.forEach( function( keyId ) {
                    combos = keys[ keyId ].combos[ event ]; // re-assigning combos
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
     * @param {Array} events - The event types to register the callback under.
     * @param {Function} callback - The callback function.
     */
    function addKey( keyboard, keyId, events, callback ) {
        var keys = keyboard.keys,
            key = keys[ keyId ] = keys[ keyId ] || {};
        // check input
        if ( checkKeyIds( 'Keyboard.on', [ keyId ] ) ) {
            return;
        }
        // bind callback under the provided events
        events.forEach( function( event ) {
            var callbacks = key.callbacks = key.callbacks || {};
            callbacks[ event ] = callbacks[ event ] || [];
            callbacks[ event ].push( callback );
        });
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
            key = keys[ keyId ] || {},
            callbacks = key.callbacks;
        // exit early if entry doesnt even exist for key
        if ( !callbacks ) {
            return;
        }
        // bind callback under the provided events
        events.forEach( function( event ) {
            var eventCallbacks = callbacks[ event ];
            if ( eventCallbacks ) {
                eventCallbacks.splice( eventCallbacks.indexOf( callback ), 1 );
                // if no more callbacks for event, remove the array
                if ( eventCallbacks.length === 0 ) {
                    delete callbacks[ event ];
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
     * @param {Array|String} events - The key events to bind the callbacks to.
     */
    Keyboard.prototype.on = function( input, callback, events ) {
        if ( Util.checkFunctionArg( 'Keyboard.on', callback ) ) {
            return this;
        }
        input = Util.normalizeInputArgs( 'Keyboard.on', input );
        events = Util.normalizeEventArgs( 'Keyboard.on', events );
        // for each input, determine type and store accordingly
        var that = this;
        input.forEach( function( entry ) {
            if ( isSequenceInput( entry ) ) {
                addSequence( that, entry, events, callback );
            } else if ( isCombinationInput( entry ) ) {
                addCombination( that, entry, events, callback );
            } else {
                addKey( that, entry, events, callback );
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
     * @param {Array|String} events - The key events to remove the callbacks from.
     */
    Keyboard.prototype.off = function( input, callback, events ) {
        if ( Util.checkFunctionArg( 'Keyboard.off', callback ) ) {
            return this;
        }
        input = Util.normalizeInputArgs( 'Keyboard.off', input );
        events = Util.normalizeEventArgs( 'Keyboard.off', events );
        // for each input, determine type and store accordingly
        var that = this;
        input.forEach( function( entry ) {
            if ( isSequenceInput( entry ) ) {
                removeSequence( that, entry, events, callback );
            } else if ( isCombinationInput( entry ) ) {
                removeCombination( that, entry, events, callback );
            } else {
                removeKey( that, entry, events, callback );
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
