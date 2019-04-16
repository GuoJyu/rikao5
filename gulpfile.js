const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const webserver = require('gulp-webserver');
const mincss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
//编译sass
gulp.task('sass', () => {
        return gulp.src('.src/scss/**/*.scss')
            .pipe(sass())
    })
    //压缩html
gulp.task('htmls', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
});
gulp.task('watching', () => {
    return gulp.watch(['.src/scss/**/*.scss', './src/js/**/*.js'], gulp.series('sass', 'devJS', 'htmls'))
})
gulp.task('server', () => {
    return gulp.src('./dist')
        .pipe(webserver({
            prot: 8080,
            livereload: true,
            middleware(req, res, next) {
                let { pathname, query } = url.parse(req, res, next)
                if (pathname === '/favicon.ico') {
                    return res.end('')
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
            }
        }))
})
gulp.task('zipjs', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
})
gulp.task('zipcss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(mincss())
})
gulp.task('bulid', gulp.parallel('htmlmin', 'zipjs'))