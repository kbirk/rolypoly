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
