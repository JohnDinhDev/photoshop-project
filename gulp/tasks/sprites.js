import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import rename from 'gulp-rename'
import del from 'del'
import svg2png from 'gulp-svg2png'

const config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: () => {
                    return (sprite, render) => {
                        return render(sprite).split('.svg').join('.png')
                    }
                }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', () => {
    return del(['./app/temp/sprite', './app/assets/images/sprites'])
})

gulp.task('createSprite', ['beginClean'], () => {
    return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'))
})

gulp.task('createPngCopy', ['createSprite'], () => {
    return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'))
})

gulp.task('copySpriteGraphic', ['createPngCopy'], () => {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'))
})

gulp.task('copySpriteCSS', ['createSprite'], () => {
    return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'))
})

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () => {
    return del('./app/temp/sprite')
})

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'])

