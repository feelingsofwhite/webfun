var gulp = require('gulp');
var console = require('console');
var del = require('del');
var connect = require('gulp-connect');
var open = require('gulp-open');

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
        .pipe(gulp.dest('dest'))
        .pipe(connect.reload());
});


gulp.task('connect', function() {
  var port = 2001; //a space odyssey
  console.log('server started')
  connect.server({
    root: 'dest',
    livereload: true,
    port: port
  });
});

gulp.task('launch', function(){
  console.log('launching browser')
  var options = {
    url: 'http://localhost:2001'
    //app: 'google-chrome'
  }
  gulp
    .src('src/index.html')  //src works, dest doesn't :(
    .pipe(open('', options));
}) 
gulp.task('watch', function() {
    console.log('watching...');
    var watcher = gulp.watch('src/**/*', ['copySrc']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});

gulp.task('default', ['clean', 'build', 'connect', 'launch', 'watch']);
