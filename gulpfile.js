var gulp = require('gulp');
var babel = require('gulp-babel');
var exec = require('exec-chainable');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

gulp.task('build', function () {
    return gulp.src('src/index.es6')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log('error with stream', err);
                this.emit( 'end' );
            }
        }))
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('run', ['build'], function (cb) {
    exec('node ./lib/index').then(function (stdout) {
        gutil.log(stdout);
        cb();
    });
});

gulp.task('watch', function () {
    gutil.log('Watch yourself.');

    var glob = 'src/**/*.es6';

    return gulp.watch(glob, ['run'])
});


gulp.task('default', ['run', 'watch']);
