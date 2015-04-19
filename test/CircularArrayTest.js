(function() {

    "use strict";

    var assert = require('assert'),
        CircularArray = require('../src/CircularArray');

    describe('CircularArray', function() {
        describe('#on()', function() {
            it('should accept a length parameter', function() {
                var length = 10,
                    array = new CircularArray( length );
                assert( array.length === length );
            });
            it('should default to a length of 256 if none is provided', function() {
                var array = new CircularArray();
                assert( array.length === 256 );
            });
        });
        describe('#push()', function() {
            it('should add an element to the next index increment', function() {
                var array = new CircularArray();
                array.push( 0 );
                array.push( 1 );
                assert( array.back() === 1 );
                assert( array.back( 1 ) === 0 );
            });
            it('should overwrite existing elements on overflow', function() {
                var length = 10,
                    allocations = 20,
                    array = new CircularArray( length ),
                    i;
                for ( i=0; i<allocations; i++ ) {
                    array.push( i );
                }
                for ( i=0; i<length; i++ ) {
                    assert( array.back( i ) === allocations - i - 1 );
                }
            });
        });
        describe('#back()', function() {
            it('should return the most recently added element', function() {
                var array = new CircularArray();
                array.push( 0 );
                array.push( 1 );
                assert( array.back() === 1 );
            });
            it('should accept an offset from the most recently added element', function() {
                var length = 10,
                    allocations = 20,
                    array = new CircularArray( length ),
                    i;
                for ( i=0; i<allocations; i++ ) {
                    array.push( i );
                }
                for ( i=0; i<length; i++ ) {
                    assert( array.back( i ) === allocations - i - 1 );
                }
            });
        });
    });

}());
