import gulp from 'gulp'
import modernizr from 'gulp-modernizr'

gulp.task('modernizr', () => {
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
        'options': [
            'setClasses'
        ]
    }))
    .pipe(gulp.dest('./app/temp/scripts'))
})