import gulp from 'gulp'
import watch from 'gulp-watch'
import { create } from 'browser-sync'
const browserSync = create()

gulp.task('watch', () => {

    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    })

    watch('./app/index.html', () => {
        browserSync.reload()
    })

    watch('./app/assets/styles/**/*.css', () => {
        gulp.start('cssInject')
    })

    watch('./app/assets/scripts/**/*.js', () => {
        gulp.start('scriptsRefresh')
    })
})

gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream())
})

gulp.task('scriptsRefresh', ['scripts'], () => {
    browserSync.reload()
})