( function() {
    "use strict";

    var assert = require('assert'),
        TestUtil = require('./TestUtil'),
        Mouse = require('../src/Mouse');

    beforeEach( function() {
        TestUtil.mockDocument();
    });

    afterEach( function() {
        TestUtil.unmockDocument();
    });

    describe('Mouse', function() {

        it('should only accept "press" and "release" button events', function() {
            var mouse = new Mouse();
            TestUtil.muteConsole();
            mouse.on( 'left', function() {}, 'press' );
            mouse.on( 'left', function() {}, 'release' );
            mouse.on( 'left', function() {}, 'error' );
            assert( true );
            TestUtil.unmuteConsole();
        });

        it('should only accept "left", "middle", and "right" buttons', function() {
            var mouse = new Mouse();
            TestUtil.muteConsole();
            mouse.on( 'left', function() {} );
            mouse.on( 'middle', function() {} );
            mouse.on( 'right', function() {} );
            mouse.on( 'error', function() {} );
            assert( true );
            TestUtil.unmuteConsole();
        });

        it('should provide previous position during "move" callback event object', function() {
            var mouse = new Mouse(),
                previous;
            mouse.on( 'move', function( event ) {
                previous = {
                    x: event.previousClientX,
                    y: event.previousClientY
                };
            });
            document.trigger( 'mousemove', { clientX: 50, clientY: 60 } );
            document.trigger( 'mousemove', { clientX: 55, clientY: 65 } );
            assert( previous.x === 50 && previous.y === 60 );
        });

        it('should only trigger a "move" if the mouse position changes', function() {
            var mouse = new Mouse(),
                count = 0;
            mouse.on( 'move', function( event ) {
                count++;
            });
            document.trigger( 'mousemove', { clientX: 50, clientY: 60 } );
            document.trigger( 'mousemove', { clientX: 50, clientY: 60 } );
            document.trigger( 'mousemove', { clientX: 50, clientY: 60 } );
            assert( count === 1 );
        });

        describe('#on()', function() {
            it('should register a callback function for "left", "middle", and "right" button input', function() {
                var mouse = new Mouse(),
                    count = 0;
                mouse.on( 'left', function() {
                    count++;
                }, 'press' );
                mouse.on( 'middle', function() {
                    count++;
                }, 'press' );
                mouse.on( 'right', function() {
                    count++;
                }, 'press' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mousedown', { button: 1 } );
                document.trigger( 'mousedown', { button: 2 } );
                assert( count === 3 );
            });
            it('should register a callback function for "move" input', function() {
                var mouse = new Mouse(),
                    sum = 0;
                mouse.on( 'move', function( event ) {
                    sum = event.clientX + event.clientY;
                });
                document.trigger( 'mousemove', { clientX: 50, clientY: 60 } );
                assert( sum === 50+60 );
            });
            it('should accept an array of inputs', function() {
                var mouse = new Mouse(),
                    count = 0;
                mouse.on( ['left', 'move'], function() {
                    count++;
                });
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mousemove', {} );
                assert( count === 2 );
            });
            it('should default button event type to "press"', function() {
                var mouse = new Mouse(),
                    count = 0;
                mouse.on( 'left', function() {
                    count++;
                });
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 1 );
            });
            it('should accept a single callback function as second argument', function() {
                var mouse = new Mouse(),
                    count = 0;
                mouse.on( 'left', function() {
                    count++;
                });
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 1 );
            });
            it('should accept a string event type as third argument', function() {
                var mouse = new Mouse(),
                    countA = 0,
                    countB = 0;
                mouse.on( 'left', function() {
                    countA++;
                }, 'press' );
                mouse.on( 'left', function() {
                    countB++;
                }, 'release' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( countA === 1 && countB === 1 );
            });
            it('should accept an array of event types as third argument', function() {
                var mouse = new Mouse(),
                    count = 0;
                mouse.on( 'left', function() {
                        count++;
                },  ['press', 'release'] );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 2 );
            });
            it('should ignore the registration if no key id is provided', function() {
                var mouse = new Mouse(),
                    count = 0;
                TestUtil.muteConsole();
                mouse.on();
                mouse.on( function() {
                    count++;
                });
                mouse.on( 'press' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 0 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the registration if no callback function is provided', function() {
                var mouse = new Mouse(),
                    count = 0;
                TestUtil.muteConsole();
                mouse.on( 'left' );
                mouse.on( 'left', 'press' );
                mouse.on( 'press' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 0 );
                TestUtil.unmuteConsole();
            });
            it('should return the object for chaining', function() {
                var mouse = new Mouse();
                assert( mouse === mouse.on( 'left', function() {} ) );
            });
            it('should return the object for chaining on error', function() {
                var mouse = new Mouse();
                TestUtil.muteConsole();
                assert( mouse === mouse.on( 'left', function() {} ) );
                assert( mouse === mouse.on( 'left' ) );
                assert( mouse === mouse.on( 'left', 'press' ) );
                assert( mouse === mouse.on( 'press' ) );
                assert( mouse === mouse.on( function() {}, 'press' ) );
                assert( mouse === mouse.on( function() {} ) );
                TestUtil.unmuteConsole();
            });
        });

        describe('#off()', function() {
            it('should remove a registered callback function for the provided input', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( 'left', callback );
                mouse.off( 'left', callback );
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 0 );
            });
            it('should accept a single input', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( 'left', callback );
                mouse.off( 'left', callback );
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 0 );
            });
            it('should accept an array of input', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( ['left', 'middle', 'move'], callback );
                mouse.off( ['left', 'middle', 'move'], callback );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mousedown', { button: 1 } );
                document.trigger( 'mousemove', {} );
                assert( count === 0 );
            });
            it('should default event type to "press"', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( 'left', callback );
                mouse.off( 'left', callback );
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 0 );
            });
            it('should accept a string event type as second argument', function() {
                var mouse = new Mouse(),
                    countA = 0,
                    countB = 0,
                    pressCallback = function() {
                        countA++;
                    },
                    releaseCallback = function() {
                        countB++;
                    };
                mouse.on( 'left', pressCallback, 'press' );
                mouse.on( 'left', releaseCallback, 'release' );
                mouse.off( 'left', pressCallback, 'press' );
                mouse.off( 'left', releaseCallback, 'release' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( countA === 0 && countB === 0 );
            });
            it('should accept an array of event types as second argument', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( 'left', callback, ['press', 'release'] );
                mouse.off( 'left', callback, ['press', 'release'] );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 0 );
            });
            it('should accept a single callback function as last argument', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                mouse.on( 'left', callback );
                mouse.off( 'left', callback );
                document.trigger( 'mousedown', { button: 0 } );
                assert( count === 0 );
            });
            it('should ignore the registration if no key id is provided', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                TestUtil.muteConsole();
                mouse.on( 'left', callback );
                mouse.off();
                mouse.off( callback );
                mouse.off( callback, 'press' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 1 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the registration if no callback function is provided', function() {
                var mouse = new Mouse(),
                    count = 0,
                    callback = function() {
                        count++;
                    };
                TestUtil.muteConsole();
                mouse.on( 'left', callback );
                mouse.off( 'left' );
                mouse.off( 'left', 'press' );
                mouse.off( 'press' );
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( count === 1 );
                TestUtil.unmuteConsole();
            });
            it('should ignore the command if the callback is not registered', function() {
                var mouse = new Mouse();
                assert( mouse === mouse.off( 'left', function() {} ) );
            });
            it('should return the object for chaining on success', function() {
                var mouse = new Mouse(),
                    callback = function() {};
                mouse.on( 'left', callback );
                assert( mouse === mouse.off( 'left', callback ) );
            });
            it('should return the object for chaining on error', function() {
                var mouse = new Mouse(),
                    callback = function() {};
                TestUtil.muteConsole();
                assert( mouse === mouse.off( 'left', callback ) );
                assert( mouse === mouse.off( 'left' ) );
                assert( mouse === mouse.off( 'left', 'press' ) );
                assert( mouse === mouse.off( 'press' ) );
                assert( mouse === mouse.off( callback, 'press' ) );
                assert( mouse === mouse.off( callback ) );
                TestUtil.unmuteConsole();
            });
        });
        describe('#poll()', function() {
            it('should return "down" if the key has been pressed and not released', function() {
                var mouse = new Mouse();
                document.trigger( 'mousedown', { button: 0 } );
                assert( mouse.poll( 'left' ) === 'down' );
            });
            it('should return "up" if the key has never been pressed', function() {
                var mouse = new Mouse();
                assert( mouse.poll( 'left' ) === 'up' );
            });
            it('should return "up" if the key has been pressed and subsequently released', function() {
                var mouse = new Mouse();
                document.trigger( 'mousedown', { button: 0 } );
                document.trigger( 'mouseup', { button: 0 } );
                assert( mouse.poll( 'left' ) === 'up' );
            });
            it('should return a string if provided a string as input', function() {
                var mouse = new Mouse();
                assert( typeof mouse.poll( 'left' ) === 'string' );
            });
            it('should return an array if provided an array as input', function() {
                var mouse = new Mouse();
                assert( mouse.poll( ['left', 'middle'] ) instanceof Array );
            });
        });
    });

}());
