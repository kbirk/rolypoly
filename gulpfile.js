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

    function build( root, output, minify ) {
        var browserify = require('browserify'),
            b = browserify( './src/api.js', {
                debug: !minify,
                standalone: 'rolypoly'
            });
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
        return gulp.src( './src/**/*.js' )
            .pipe( jshint() )
            .pipe( jshint('.jshintrc') )
            .pipe( jshint.reporter('jshint-stylish') );
    });

    gulp.task('test', function() {
        var istanbul = require('gulp-istanbul'),
            mocha = require('gulp-mocha');
        return gulp.src( './src/*.js' )
            .pipe( istanbul( { includeUntested: false } ) ) // Covering files
            .on( 'finish', function () {
                return gulp.src( [ './test/*.js' ] )
                    .pipe( mocha( { reporter: 'list' } )
                        .on( 'error', handleError) ) // print mocha error message
                    .pipe( istanbul.writeReports() ); // Creating the reports after tests runned
            });
    });

    gulp.task('test-on-travis', [ 'test' ], function() {
        var coveralls = require('gulp-coveralls');
        return gulp.src('./coverage/lcov.info')
            .pipe( coveralls() );
    });

    gulp.task('build-min-js', [ 'clean' ], function() {
        return build( './src/api.js', 'rolypoly.min.js', true );
    });

    gulp.task('build-js', [ 'clean' ], function() {
        return build( './src/api.js', 'rolypoly.js', false );
    });

    gulp.task('build', [ 'build-js', 'build-min-js' ], function() {
    });

    gulp.task('default', [ 'build' ], function() {
    });

}());
