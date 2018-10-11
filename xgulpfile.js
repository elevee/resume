var gulp = require('gulp');

gulp.task('js', function(){
    return gulp.src('src/*.js')
        .pipe(gulp.dest('lib/build.js'));
});

gulp.task('default', ['js']);