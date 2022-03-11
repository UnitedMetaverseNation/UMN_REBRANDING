"use strict";

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    terser = require('gulp-terser'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

// Static server
gulp.task('browser-sync', function() {
    var files = [
        'assets/sass/*.scss',
        'assets/js/*.js',
        '*.html',
    ];

    browserSync.init(files, {
        proxy: 'http://localhost:8888/nation-html.loc/',
        notify: false
    });
});

gulp.task('sass', function () {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('assets/js/scripts.js')
        .pipe(babel())
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('watch', function () {
    gulp.watch('assets/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('assets/js/scripts.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'scripts', 'browser-sync'));
