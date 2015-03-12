( function() {

    var _document,
        _log;

    module.exports = {

        mockDocument: function() {
            if ( !_document ) {
                _document = global.document;
                global.document = {
                    addEventListener: function( eventType, callback ) {
                        document.listeners = document.listeners || {};
                        document.listeners[ eventType ] = document.listeners[ eventType ] || [];
                        document.listeners[ eventType ].push( callback );
                    },
                    trigger: function( eventType, event ) {
                        event.type = eventType;
                        event.which = event.keyCode;
                        if ( document.listeners ) {
                            var listeners = document.listeners[ eventType ],
                                i;
                            if ( listeners ) {
                                for ( i=0; i<listeners.length; i++ ) {
                                    listeners[i]( event );
                                }
                            }
                        } else {
                            console.log( "no listener for " + eventType );
                        }
                    }
                };
            }
        },

        clearDocument: function() {
            if ( _document ) {
                global.document.listeners = {};
            }
        },

        unmockDocument: function() {
            if ( _document ) {
                global.document = _document;
                _document = null;
            }
        },

        muteConsole: function() {
            if ( !_log ) {
                _log = console.log;
                console.log = function() {};
            }
        },

        unmuteConsole: function() {
            if ( _log ) {
                console.log = _log;
                _log = null;
            }
        }

    }
}());

/*
function triggerKeyEvent( eventType, keyCode ) {

    "use strict";

    function isChrome() {
        // this is spoofable, but it is only used for unit testing
        // so spoof away
        if ( navigator.userAgent.indexOf("Chrome") != -1 ) {
            return true;
        }
        return false;
    }

    var event = document.createEvent('KeyboardEvent');

    if ( isChrome() ) {
        // chrome hack
        Object.defineProperty( event, 'keyCode', {
                    get : function() {
                        return this.keyCodeVal;
                    }
        });
        Object.defineProperty( event, 'which', {
                    get : function() {
                        return this.keyCodeVal;
                    }
        });
    }
    if ( event.initKeyboardEvent ) {
        event.initKeyboardEvent( eventType, true, true, document.defaultView, false, false, false, false, keyCode, keyCode );
    } else {
        event.initKeyEvent( eventType, true, true, document.defaultView, false, false, false, false, keyCode, 0 );
    }
    event.keyCodeVal = keyCode;

    console.log("Dispatching '"+ eventType +"' event for " + keyCode );

    document.dispatchEvent( event );
}
*/
