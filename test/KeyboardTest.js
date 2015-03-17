( function() {
    "use strict";

    var assert = require('assert'),
        TestUtil = require('./TestUtil'),
        Keyboard = require('../src/Keyboard');

    beforeEach( function() {
        TestUtil.mockDocument();
    });

    afterEach( function() {
        TestUtil.unmockDocument();
    });

    describe('Keyboard', function() {

        it('should only accept "press" and "release" key events', function() {
            var keyboard = new Keyboard();
            TestUtil.muteConsole();
            keyboard.on( 'a', function() {}, 'press' );
            keyboard.on( 'a', function() {}, 'release' );
            keyboard.on( 'a', function() {}, 'error' );
            assert( true );
            TestUtil.unmuteConsole();
        });

        it('should only accept recognized keys', function() {
            var keyboard = new Keyboard();
            TestUtil.muteConsole();
            keyboard.on( 'a', function() {} );
            keyboard.on( 'b+c+d', function() {} );
            keyboard.on( 'a shift escape', function() {} );
            keyboard.on( [ '1+3+error', 'a b error', '2', 4, 'error', {}, [] ], function() {} );
            keyboard.off( [ '1+3+error', 'a b error', '2', 4, 'error', {}, [] ], function() {} );
            assert( true );
            TestUtil.unmuteConsole();
        });

        it('should register callbacks for single key press events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            assert( count === 1 );
        });

        it('should register callbacks for single key release events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a', function() {
                count++;
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            assert( count === 1 );
        });

        it('should not process a "release" event unless it has processed a preceeding "press" event', function() {
            var keyboard = new Keyboard(),
                count = 0;
            document.trigger( 'keyup', { keyCode: 65 } );
            keyboard.on( 'a', function() {
                count++;
            }, 'release' );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            assert( count === 1 );
        });

        it('should accept shifted key states automatically', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( '!', function() {
                count++;
            }, 'press' );
            keyboard.on( ['!','!+@'], function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keydown', { keyCode: 50 } );
            assert( count === 3 );
        });

        it('should ignore non-shifted key states when shift is down', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( '!', function() {
                count++;
            }, 'press' );
            keyboard.on( '2', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keydown', { keyCode: 50 } );
            assert( count === 1 );
        });

        it('should register callbacks for simultaneous key combination press events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+b+c', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            assert( count === 1 );
        });

        it('should register callbacks for simultaneous key combination release events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+b+c', function() {
                count++;
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 66 } );
            document.trigger( 'keyup', { keyCode: 67 } );
            assert( count === 1 );
        });

        it('should ignored duplicate keys when registering callbacks for simultaneous key combination events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+a+b+c+c+c', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            assert( count === 1 );
        });

        it('should support "+" characters in simultaneous key combination events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+++b+c', function() {
                count++;
            }, 'press' );
            keyboard.on( '+++a+b+c', function() {
                count++;
            }, 'press' );
            keyboard.on( 'a+b+c++', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 107 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            assert( count === 3 );
        });

        it('should support shifted keys in simultaneous key combination events, if the shifted keys are pressed last', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+b+!', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            assert( count === 1 );
        });

        it('should not support shifted keys in simultaneous key combination events, if the shifted keys are not pressed last', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+2+!', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keydown', { keyCode: 50 } );
            assert( count === 0 );
        });

        it('should ingore simultaneous key combination release events if all keys have not been down simultaneously', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a+b+c', function() {
                count++;
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            document.trigger( 'keyup', { keyCode: 66 } );
            document.trigger( 'keyup', { keyCode: 67 } );
            assert( count === 0 );
        });

        it('should register callbacks for sequential key press events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a b c', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            assert( count === 1 );
        });

        it('should register callbacks for sequential key release events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a b c', function() {
                count++;
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 66 } );
            document.trigger( 'keydown', { keyCode: 67 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 66 } );
            document.trigger( 'keyup', { keyCode: 67 } );
            assert( count === 1 );
        });

        it('should support shifted keys in sequential key press events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a ! @ a !', function() {
                count++;
            }, 'press' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keydown', { keyCode: 50 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            assert( count === 1 );
        });

        it('should support shifted keys in sequential key release events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'a ! @ a !', function() {
                count++;
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 49 } );
            document.trigger( 'keydown', { keyCode: 50 } );
            document.trigger( 'keyup', { keyCode: 50 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 49 } );
            assert( count === 1 );
        });

        it('should support the "shift" key in sequential key press events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'shift ! shift a', function() {
                count++;
            }, 'press' );
            // shortcut sequence
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            // full sequence
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 16 } ); // optional
            document.trigger( 'keydown', { keyCode: 16 } ); // optional
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            assert( count === 2 );
        });

        it('should support the "shift" key in sequential key release events', function() {
            var keyboard = new Keyboard(),
                count = 0;
            keyboard.on( 'shift ! shift a', function() {
                count++;
            }, 'release' );
            // shortcut sequence
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            // full sequence
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 49 } );
            document.trigger( 'keyup', { keyCode: 16 } ); // optional
            document.trigger( 'keydown', { keyCode: 16 } ); // optional
            document.trigger( 'keyup', { keyCode: 16 } );
            document.trigger( 'keydown', { keyCode: 65 } );
            document.trigger( 'keyup', { keyCode: 65 } );
            assert( count === 2 );
        });

        it('should ignore sequential key events if they occur too far apart in time', function( done ) {
            var keyboard = new Keyboard();
            keyboard.on( 'a b', function() {
                assert( false );
            }, 'release' );
            document.trigger( 'keydown', { keyCode: 65 } );
            setTimeout( function() {
                document.trigger( 'keydown', { keyCode: 66 } );
                done();
            }, 1000 );
        });

        describe('#on()', function() {
            it('should register a callback function for the provided input', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 1 );
            });
            it('should accept a single input', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 1 );
            });
            it('should accept an array of input', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( ['a', 'b', 'c'], function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 3 );
            });
            it('should accept a input sequences', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a b c', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 1 );
            });
            it('should accept a input combinations', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a+b+c', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 1 );
            });
            it('should default event type to "press"', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 1 );
            });
            it('should accept a single callback function as second argument', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a', function() {
                    count++;
                });
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 1 );
            });
            it('should accept a string event type as third argument', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    released = false;
                keyboard.on( 'a', function() {
                    count++;
                }, 'press' );
                keyboard.on( 'a', function() {
                    released = true;
                }, 'release' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count && released );
            });
            it('should accept an array of event types as third argument', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                keyboard.on( 'a', function() {
                    count++;
                },  ['press', 'release'] );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 2 );
            });
            it('should ignore un recognized key ids', function() {

            });
            it('should ignore the registration if no key id is provided', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                TestUtil.muteConsole();
                keyboard.on();
                keyboard.on( function() {
                    count++;
                });
                keyboard.on( 'press' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 0 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the registration if no callback function is provided', function() {
                var keyboard = new Keyboard(),
                    count = 0;
                TestUtil.muteConsole();
                keyboard.on( 'a' );
                keyboard.on( 'a', 'press' );
                keyboard.on( 'press' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 0 );
                TestUtil.unmuteConsole();
            });
            it('should return the object for chaining on success', function() {
                var keyboard = new Keyboard();
                assert( keyboard === keyboard.on( 'a', function() {} ) );
            });
            it('should return the object for chaining on error', function() {
                var keyboard = new Keyboard();
                TestUtil.muteConsole();
                assert( keyboard === keyboard.on( 'a', function() {} ) );
                assert( keyboard === keyboard.on( 'a' ) );
                assert( keyboard === keyboard.on( 'a', 'press' ) );
                assert( keyboard === keyboard.on( 'press' ) );
                assert( keyboard === keyboard.on( function() {}, 'press' ) );
                assert( keyboard === keyboard.on( function() {} ) );
                TestUtil.unmuteConsole();
            });
        });
        describe('#off()', function() {
            it('should remove a registered callback function for the provided input', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a', callback );
                keyboard.off( 'a', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 0 );
            });
            it('should accept a single input', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a', callback );
                keyboard.off( 'a', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 0 );
            });
            it('should accept an array of input', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( ['a', 'b', 'c'], callback );
                keyboard.off( ['a', 'b', 'c'], callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 0 );
            });
            it('should accept a input sequences', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a b c', callback );
                keyboard.off( 'a b c', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 0 );
            });
            it('should accept a input combinations', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a+b+c', callback );
                keyboard.off( 'a+b+c', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keydown', { keyCode: 66 } );
                document.trigger( 'keydown', { keyCode: 67 } );
                assert( count === 0 );
            });
            it('should default event type to "press"', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a', callback );
                keyboard.off( 'a', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 0 );
            });
            it('should accept a single callback function as second argument', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a', callback );
                keyboard.off( 'a', callback );
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( count === 0 );
            });
            it('should accept a string event type as third argument', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    released = false,
                    pressCallback = function() {
                        count++;
                    },
                    releaseCallback = function() {
                        released = true;
                    };
                keyboard.on( 'a', pressCallback, 'press' );
                keyboard.on( 'a', releaseCallback, 'release' );
                keyboard.off( 'a', pressCallback, 'press' );
                keyboard.off( 'a', releaseCallback, 'release' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( !count && !released );
            });
            it('should accept an array of event types as third argument', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                keyboard.on( 'a', callback, ['press', 'release'] );
                keyboard.off( 'a', callback, ['press', 'release'] );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 0 );
            });
            it('should ignore the unregistration if no key id is provided', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                TestUtil.muteConsole();
                keyboard.on( 'a', callback );
                keyboard.off();
                keyboard.off( callback );
                keyboard.off( callback, 'press' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 1 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the unregistration if no callback function is provided', function() {
                var keyboard = new Keyboard(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                TestUtil.muteConsole();
                keyboard.off( 'a b c', callback );
                keyboard.off( 'a+b+c', callback );
                keyboard.off( 'a', callback );
                keyboard.on( 'a', callback );
                keyboard.off( 'a' );
                keyboard.off( 'a', 'press' );
                keyboard.off( 'press' );
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( count === 1 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the command if the callback is not registered', function() {
                var keyboard = new Keyboard();
                assert( keyboard === keyboard.off( 'a', function() {} ) );
                assert( keyboard === keyboard.off( 'a b c', function() {} ) );
                assert( keyboard === keyboard.off( 'a+b+c', function() {} ) );
            });
            it('should return the object for chaining on success', function() {
                var keyboard = new Keyboard(),
                    callback = function() {};
                keyboard.on( 'a', callback )
                assert( keyboard === keyboard.off( 'a', callback ) );
            });
            it('should return the object for chaining on error', function() {
                var keyboard = new Keyboard(),
                    callback = function() {};
                keyboard.on( 'a', callback );
                TestUtil.muteConsole();
                assert( keyboard === keyboard.off( 'a', callback ) );
                assert( keyboard === keyboard.off( 'a' ) );
                assert( keyboard === keyboard.off( 'a', 'press' ) );
                assert( keyboard === keyboard.off( 'press' ) );
                assert( keyboard === keyboard.off( callback, 'press' ) );
                assert( keyboard === keyboard.off( callback ) );
                TestUtil.unmuteConsole();
            });
        });
        describe('#poll()', function() {
            it('should return "down" if the key has been count and not released', function() {
                var keyboard = new Keyboard();
                document.trigger( 'keydown', { keyCode: 65 } );
                assert( keyboard.poll( 'a' ) === 'down' );
            });
            it('should return "up" if the key has never been count', function() {
                var keyboard = new Keyboard();
                assert( keyboard.poll( 'a' ) === 'up' );
            });
            it('should return "up" if the key has been count and subsequently released', function() {
                var keyboard = new Keyboard();
                document.trigger( 'keydown', { keyCode: 65 } );
                document.trigger( 'keyup', { keyCode: 65 } );
                assert( keyboard.poll( 'a' ) === 'up' );
            });
            it('should return a string if provided a string as input', function() {
                var keyboard = new Keyboard();
                assert( typeof keyboard.poll( 'a' ) === 'string' );
            });
            it('should return an array if provided an array as input', function() {
                var keyboard = new Keyboard();
                assert( keyboard.poll( ['a', 'b'] ) instanceof Array );
            });
        });
    });

}());
