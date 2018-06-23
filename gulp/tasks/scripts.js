import gulp from 'gulp'
import webpack from 'webpack'

gulp.task('scripts', ['modernizr'], (callback) => {
    webpack(require('../../webpack.config.js'), (err, stats) => {

        err ? console.log(err.toString()) :
        console.log(stats.toString())
        callback()
    })
})