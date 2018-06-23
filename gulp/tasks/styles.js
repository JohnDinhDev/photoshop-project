import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssvars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssImport from 'postcss-import'
import mixins from 'postcss-mixins'
import hexrgba from 'postcss-hexrgba'

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, hexrgba, nested, autoprefixer]))
        .on('error', function (errorInfo) {
            console.log(errorInfo.toString())
            this.emit('end')
        })
        .pipe(gulp.dest('./app/temp/styles'))
})