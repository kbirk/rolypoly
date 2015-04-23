# rolypoly.js

[![Bower version](https://badge.fury.io/bo/rolypoly.svg)](http://badge.fury.io/bo/rolypoly) [![Build Status](https://travis-ci.org/kbirk/rolypoly.svg?branch=master)](https://travis-ci.org/kbirk/rolypoly) [![Coverage Status](https://coveralls.io/repos/kbirk/rolypoly/badge.svg)](https://coveralls.io/r/kbirk/rolypoly) [![Dependency Status](https://david-dm.org/kbirk/rolypoly.svg)](https://david-dm.org/kbirk/rolypoly)

A lightweight mouse and keyboard input library.

### Installation

Requires [bower](http://bower.io/).

```bash
bower install rolypoly
```

### Usage

Create a keyboard object:

```javascript
var keyboard = new rolypoly.Keyboard();
```

Register input callbacks:

```javascript
// single keys
keyboard.on( 'a', function() {} );
keyboard.on( '@', function() {}, 'release' );
keyboard.on( 'enter', function() {} );

// combinations
keyboard.on( 'a+b+c', function() {} );
keyboard.on( 'g+enter', function() {}, ['press','release'] );

// sequences
keyboard.on( 'left down enter', function() {}, 'release' );
keyboard.on( 'a # esc', function() {} );

// multiple inputs
keyboard.on( ['a', 'a+b', 'a b c'], function() {} );
```

Poll input state:

```javascript
// poll for key state
keyboard.poll( 'a', function( upOrDown ) {
    console.log( "a is " + a );
})
keyboard.poll( ['a', 'b', 'c'], function( states ) {
    console.log( "a key is " + states.a );
    console.log( "b key is " + states.b );
    console.log( "c key is " + states.c );
});
```

Create mouse object:

```javascript
var mouse = new rolypoly.Mouse();
```

Register input callbacks:

```javascript
// bind movement events
mouse.on( 'move', function( e ) {
    console.log( e.clientX + ", " + e.clientY );
});

// bind key events
mouse.on( 'left', function() {} );
mouse.on( 'middle', function() {}, 'release');
mouse.on( 'right', function() {} );
```

Poll input state:

```javascript
// poll for button state
mouse.poll( 'left', function( upOrDown ) {
    console.log( "left button is " + a );
})
mouse.poll( ['left', 'middle', 'right'], function( states ) {
    console.log( "left button is " + states.left );
    console.log( "middle button is " + states.middle );
    console.log( "right button is " + states.right );
});
```
