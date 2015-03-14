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
         *
         *
         */ 
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
