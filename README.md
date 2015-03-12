# rolypoly.js

> A lightweight mouse and keyboard input library.

### Motivation



### Building

Requires [node](http://nodejs.org/).

To download dependencies:
```bash
npm install
```

To compile the project to `rolypoly.js` and `rolypoly.min.js` in the `build/` directory:
```bash
npm run build
```

### Keyboard Usage
```javascript
var keyboard = new rolypoly.Keyboard();

// single keys
keyboard.on( 'a', function() { console.log( 'Pressed a'); });
keyboard.on( '@', function() { console.log( 'Pressed !'); });
keyboard.on( 'enter', function() { console.log( 'Pressed enter'); });

// combinations
keyboard.on( 'a+b+c', function() { console.log( 'Pressed a and b and c'); });
keyboard.on( 'a+!+up', function() { console.log( 'Pressed a and ! and up'); });

// sequences
keyboard.on( 'a b c', function() { console.log( 'Pressed a then b then c'); });
keyboard.on( 'a # esc', function() { console.log( 'Pressed a then # then esc'); });

// multiple inputs
keyboard.on( ['a', 'a+b', 'a b c'], function() {
    console.log( 'Pressed one of the three');
});

// bind on key press, release, or both
keyboard.on( 'a', function() { console.log( 'Pressed a'); }, 'press' );
keyboard.on( 'a+b+c', function() {
    console.log( 'Pressed a and b, then released both');
}, 'release' );
keyboard.on( 'a b', function() {
    console.log( 'Released a and then released b');
}, 'release' );
keyboard.on( 'a', function() {
    console.log( 'Pressed or released a');
}, ['press', 'release'] );

// poll for key state
keyboard.poll( 'a', function( upOrDown ) {
    console.log( "a is " + a );
})
keyboard.poll( ['a', 'b', 'c'], function( upOrDown ) {
    console.log( "a key is " + upOrDown[0] );
    console.log( "b key is " + upOrDown[1] );
    console.log( "c key is " + upOrDown[2] );
});
```

### Mouse Usage
```javascript
var mouse = new rolypoly.Mouse();

// bind movement events
mouse.on( 'move', function( e ) {
    console.log( e.clientX + ", " + e.clientY );
});

// bind key events
mouse.on( 'left', function() { console.log( 'Pressed left button'); });
mouse.on( 'middle', function() { console.log( 'Released middle button'); }, 'release');
mouse.on( 'right', function() { console.log( 'Pressed right button'); });

// poll for button state
mouse.poll( 'left', function( upOrDown ) {
    console.log( "left button is " + a );
})
mouse.poll( ['left', 'middle', 'right'], function( upOrDown ) {
    console.log( "left button is " + upOrDown[0] );
    console.log( "middle button is " + upOrDown[1] );
    console.log( "right button is " + upOrDown[2] );
});
```
