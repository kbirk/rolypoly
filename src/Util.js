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
