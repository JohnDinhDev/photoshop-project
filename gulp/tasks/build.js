import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import del from 'del'
import usemin from 'gulp-usemin'
import rev from 'gulp-rev'
import cssnano from 'gulp-cssnano'
import uglify from 'gulp-uglify'

import { create } from 'browser-sync'
const browserSync = create()

gulp.task('previewDist', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    })
})

gulp.task('deleteDistFolder', ['icons'], () => {
    return del('./docs')
})

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
    const pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
    ]
return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'))
})

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*', '!./app/assets/images/*-i.jpg'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'))
})

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
    gulp.start('usemin')
})

gulp.task('usemin', ['styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [() => rev(), () => cssnano()],
        js: [() => rev(), () => uglify()]
    }))
    .pipe(gulp.dest('./docs'))
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'])