var gulp = require('gulp');
var console = require('console');

gulp.task('build', ['copySrc', 'copyLibs']);

gulp.task('copyLibs', function(){
    gulp.src(['bower_components/**/*.css', 'bower_components/**/*.js', 'bower_components/**/*.map', '!bower_components/angular/index.js'])
        .pipe(gulp.dest('dest/scripts'));
});

gulp.task('copySrc', function(){
    gulp.src('src/**/*')
        .pipe(gulp.dest('dest'));
});

gulp.task('default', function() {
  // place code for your default task here
  console.info('hello from gulp world');

});

