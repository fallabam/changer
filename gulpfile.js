//gulp declarations
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    Server = require('karma').Server,
    webserver = require('gulp-webserver');

//tasks

//copy tasks
gulp.task('copy:app', function() {
  gulp.src(['src/index.html']).pipe(gulp.dest('dist/'));
  gulp.src(['src/**/*.js', '!src/**/*.spec.js']).pipe(gulp.dest('dist/src'));
  gulp.src('src/components/*.html').pipe(gulp.dest('dist/src/components/'));
});

gulp.task('copy:lib', function() {
  gulp.src('lib/angular/angular.min.js').pipe(gulp.dest('dist/lib/angular/'));
  gulp.src('lib/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('dist/lib/bootstrap/dist/css/'));
});

gulp.task('copy:favicon', function() {
  gulp.src('src/assets/*.ico').pipe(gulp.dest('dist/'));
});

//combine all copy tasks
gulp.task('copy', ['copy:app', 'copy:lib', 'copy:favicon']);

//clean task gets rid of old files in dist folder
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

//karma task to run the tests that we want to on the code
//setup for single run atm should be continuously watching ideally
gulp.task('karma:tdd', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

//webserver task to host the files
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver());
});

//run all of the tasks to generate a dist folder that will run
gulp.task('build', ['clean'], function() {
  gulp.start(['karma:tdd', 'copy', 'webserver']);
});
