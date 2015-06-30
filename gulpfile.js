var gulp = require('gulp');
var console = require('console');
var del = require('del');

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

gulp.task('watch', function() {
    console.log('watching...');
    var watcher = gulp.watch('src/**/*', ['copySrc']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});

gulp.task('default', ['clean', 'build', 'watch']);
