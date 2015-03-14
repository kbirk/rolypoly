(function () {

    "use strict";

    var Util = require('./Util');

    /**
     * A simple circular array that is allocated to a fixed size.
     * When elements are pushed beyond its allocated length, they
     * will instead overwrite exsting indices.
     *
     * @param {number} length - The length of the array.
     */
    function CircularArray( length ) {
        this.buffer = new Array( length );
        this.length = length;
        this.index = 0;
    }

    /**
     * Push an element to the current index of the array.
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
     *
     * @param {number} offset - An offset from the current index. Optional.
     */
    CircularArray.prototype.back = function( offset ) {
        offset = offset ? offset : 0;
        return this.buffer[ Util.mod( this.index-1-offset, this.length ) ];
    };

    module.exports = CircularArray;

}());
