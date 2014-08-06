var gulp = require('gulp'),
    connect = require('gulp-connect'),
    bowerFiles = require('main-bower-files'),
    inject = require("gulp-inject"),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

// inject bower packages into index.html
gulp.task('bower-install', function(){
    gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./'))
})

// connect web server
gulp.task('connect', function(){
    connect.server({
        root: [__dirname],
        livereload: true
    })
})

// reload index.html
gulp.task('htmlReload', function(){
    gulp.src('./index.html').pipe(connect.reload())
})

// reload js files
gulp.task('jsReload', function(){
    gulp.src('./angular-morrisjs.js').pipe(connect.reload())
})

// watch files for changes
gulp.task('watch', function(){
    gulp.watch([
        './index.html',
        'angular-morrisjs.js'
    ], ['htmlReload', 'jsReload'])	// run reload onchange
})

// Concatenate & Minify JS Files
gulp.task('build', function() {
    return gulp.src('angular-morrisjs.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Build complete.' }));
});

// register default tasks
gulp.task('default', [
    'bower-install',
    'connect',
    'watch'
])
