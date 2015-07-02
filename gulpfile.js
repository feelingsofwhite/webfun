var gulp = require('gulp');
var console = require('console');
var del = require('del');
var connect = require('gulp-connect');
var open = require('open');
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function() {
    console.log('removing dest/**/*')
    del.sync('dest');
});

gulp.task('build', ['copySrc', 'copyLibs', 'less']);

gulp.task('copyLibs', function(){
    gulp.src(['bower_components/**/*.css', 'bower_components/**/*.js', 'bower_components/**/*.map', '!bower_components/angular/index.js'])
        .pipe(gulp.dest('dest/scripts'));
});

gulp.task('copySrc', function(){
    gulp.src('src/**/*')
        .pipe(gulp.dest('dest'))
        .pipe(connect.reload());
});

gulp.task('less', function(){
    gulp.src('src/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({            
        }))
        .pipe(sourcemaps.write('./')) //don't write map inline, write them to external files
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
  console.log('launching browser');
  open('http://localhost:2001');
}) 

gulp.task('watch', function() {
    console.log('watching...');
    var logevent = function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
    var watcher = gulp.watch('src/**/*', ['copySrc']).on('change', logevent);
    var watcher = gulp.watch('src/**/*.less', ['less']).on('change', logevent);
    

});

gulp.task('default', ['clean', 'build', 'connect', 'launch', 'watch']);
