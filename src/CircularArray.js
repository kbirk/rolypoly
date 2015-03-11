(function () {

    "use strict";

    function mod( num, n ) {
        return ( ( num % n ) + n ) % n;
    }

    function CircularArray( length ) {
        this.buffer = new Array( length );
        this.length = length;
        this.index = 0;
    }

    CircularArray.prototype.push = function( data ) {
        this.buffer[ this.index ] = data;
        this.index = (this.index + 1) % this.length;
    };

    CircularArray.prototype.back = function( offset ) {
        return this.buffer[ mod( this.index-1-offset, this.length ) ];
    };

    module.exports = CircularArray;

}());
