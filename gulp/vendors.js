'use strict';

var outputFolder = './www/lib';


var gulp = require('gulp');

var bowerFiles = require('main-bower-files');
var queue = require('streamqueue');
var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var filesort = require('gulp-angular-filesort');

/**
 * Vendors
 */
  gulp.task('vendors', function() {
    var files = bowerFiles();
    var vendorJs = fileTypeFilter(files, 'js');
    var vendorCss = fileTypeFilter(files, 'css');
    var q = new queue({
        objectMode: true
    });
    if (vendorJs.length) {
        q.queue(gulp.src(vendorJs).pipe(dist('js', 'vendors')));
    }
    if (vendorCss.length) {
        q.queue(gulp.src(vendorCss).pipe(dist('css', 'vendors')));
    }
    return q.done();
});

  /**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */

function dist(ext, name, opt) {
    opt = opt || {};
    return lazypipe()
        .pipe(concat, name + '.' + ext)
        .pipe(gulp.dest, outputFolder)
        .pipe(ext === 'js' ? uglify : minifyCss)
        .pipe(gulp.dest, outputFolder)();
}

function fileTypeFilter(files, extension) {
    var regExp = new RegExp('\\.' + extension + '$');
    return files.filter(regExp.test.bind(regExp));
}
