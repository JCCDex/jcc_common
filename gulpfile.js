const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

gulp.task('eslint', function () {
    return gulp.src(['src/index.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('lib/'))
})


gulp.task('watch', function () {
    gulp.watch(['src/js/index.js'], ['eslint']);
});

gulp.task('default', gulp.parallel('eslint'));
gulp.task('dev', gulp.parallel('eslint', 'watch'));