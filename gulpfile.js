// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');

// Move new or changed HTML files
gulp.task('htmlpage', function() {
    gulp.src('./src/**/*.html')
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'));
});

// JShint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        //.pipe(jshint.reporter('default'));
});

// Minify image task
gulp.task('imagemin', function() {
    gulp.src('./src/images/**/*')
        .pipe(changed('./dist/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

// JS concat, strip debug and minify task
gulp.task('scripts', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(concat('main-min.js'))
        .pipe(stripDebug())
        //.pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

// Compile SASS, autoprefix css and minify css
gulp.task('styles', function() {
    gulp.src('./src/styles/main.scss')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            includePaths: ['styles'].concat(neat),
            style: 'expanded',
        }))
        .pipe(autoprefixer('last 2 versions'))
        //.pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
});

// Automate all gulp tasks
gulp.task('default', ['htmlpage', 'imagemin', 'jshint', 'scripts', 'styles'], function() {
    // Watch for HTML changes
    gulp.watch('./src/**/*.html', function() {
        gulp.start('htmlpage');
    });
    // Watch for JS changes
    gulp.watch('./src/scripts/*.js', function() {
        gulp.start('jshint', 'scripts');
    });
    // Watch for CSS changes
    gulp.watch('./src/styles/*.scss', function() {
        gulp.start('styles');
    });
});
