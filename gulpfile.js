var gulp = require('gulp');
var console = require('console');
var del = require('del');
var webserver = require('gulp-webserver');

gulp.task('clean', function() {
    console.log('removing dest/**/*')
    del.sync('dest');
});

gulp.task('build', ['copySrc', 'copyLibs']);

gulp.task('copyLibs', function(){
    gulp.src(['bower_components/**/*.css', 'bower_components/**/*.js', 'bower_components/**/*.map', '!bower_components/angular/index.js'])
        .pipe(gulp.dest('dest/scripts'));
});

gulp.task('copySrc', function(){
    gulp.src('src/**/*')
        .pipe(gulp.dest('dest'));
});


// more options.. cant get it working :(  
gulp.task('webserver', function() {
  var port = 2001; //a space odyssey
  console.log('server started')
  gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      path: 'dest',
      fallback:'index.html',
      port: port
    }));
});
  console.log('server finished')
});

gulp.task('watch', function() {
    console.log('watching...');
    var watcher = gulp.watch('src/**/*', ['copySrc']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});

gulp.task('default', ['clean', 'build', 'webserver', 'watch']);
