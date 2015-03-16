(function () {

    "use strict";

    var KeyMap = require('./KeyMap'),
        ShiftMap = require('./ShiftMap'),
        Keys = {},
        keyCode;

    for ( keyCode in KeyMap ) {
        Keys[ KeyMap[ keyCode ] ] = true;
    }

    for ( keyCode in ShiftMap ) {
        Keys[ ShiftMap[ keyCode ] ] = true;
    }

    module.exports = Keys;

}());
