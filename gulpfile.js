( function() {

    "use strict";

    var gulp = require('gulp'),
        source;

    function bundle( b, output ) {
        source = source || require('vinyl-source-stream');
        return b.bundle()
            .on( 'error', function( e ) {
                console.log( e );
            })
            .pipe( source( output ) )
            .pipe( gulp.dest( 'build' ) );
    }

    function bundleMin( b, output ) {
        var buffer = require('vinyl-buffer'),
            uglify = require('gulp-uglify');
        source = source || require('vinyl-source-stream');
        return b.bundle()
            .on( 'error', function( e ) {
                console.log( e );
            })
            .pipe( source( output ) )
            .pipe( buffer() )
            .pipe( uglify() )
            .pipe( gulp.dest( 'build' ) );
    }

    function build( root, output, minify, watch ) {
        var watchify = require('watchify'),
            browserify = require('browserify'),
            b = browserify( './src/api.js', {
                debug: !minify,
                standalone: 'rolypoly'
            });
        if ( watch ) {
            b = watchify( b );
            b.on( 'update', function( ids ) {
                bundle( b, output );
                console.log("\nWatch detected changes to: ");
                for ( var i=0; i<ids.length; ids++ ) {
                   console.log( '\t'+ids[i] );
                }
                console.log('Updating build');
            });
        }
        if ( minify ) {
            return bundleMin( b, output );
        } else {
            return bundle( b, output );
        }
    }

    function handleError( err ) {
        console.log( err.toString() );
        this.emit('end');
    }

    gulp.task('clean', function () {
        var del = require('del');
        del([ 'build/*']);
    });

    gulp.task('lint', function() {
        var jshint = require('gulp-jshint');
        return gulp.src( [ './src/**/*.js',
                './examples/**/*.js',
                '!./examples/vendor/*.js' ] )
            .pipe( jshint() )
            .pipe( jshint('.jshintrc') )
            .pipe( jshint.reporter('jshint-stylish') );
    });

    gulp.task('test', function() {
        var istanbul = require('gulp-istanbul'),
            mocha = require('gulp-mocha');
        return gulp.src( [ './src/*.js' ] )
            .pipe( istanbul( { includeUntested: false } ) ) // Covering files
            .on( 'finish', function () {
                gulp.src( [ './test/*.js' ] )
                    .pipe( mocha( { reporter: 'list' } )
                        .on( 'error', handleError) ) // print mocha error message
                    .pipe( istanbul.writeReports() ); // Creating the reports after tests runned
            });
    });

    gulp.task('build-min-js', [ 'clean' ], function() {
        return build( './src/api.js', 'rolypoly.min.js', true, false );
    });

    gulp.task('build-js', [ 'clean' ], function() {
        return build( './src/api.js', 'rolypoly.js', false, false );
    });

    gulp.task('build', [ 'build-js', 'build-min-js' ], function() {
    });

    gulp.task('watch', function() {
        return build( './src/api.js', 'rolypoly.js', false, true );
    });

    gulp.task('serve', [ 'watch' ], function() {
        var express = require( 'express' ),
            bodyParser = require( 'body-parser' ),
            app = express();
        app.use( bodyParser.json() ); // support JSON-encoded bodies
        app.use( bodyParser.urlencoded({ extended: false }) ); // support URL-encoded bodies
        app.use( express.static( __dirname ) );
        app.listen( 8080, function() {
            console.log( 'Listening on port %d', 8080 );
        });
    });

    gulp.task('default', [ 'serve' ], function() {
    });

}());
