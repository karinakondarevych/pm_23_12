const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');

const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
};
const serverOption = {
    livereload: true,
    open: true,
};

gulp.task('clean', function(done) { // видалення dist
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/').pipe(clean());
    }
    done();
})

gulp.task('html', function() { // html
    return gulp.src('./src/*.html').pipe(fileInclude(fileIncludeSetting)).pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() { // scss у css
    return gulp.src('./src/scss/*.scss').pipe(sass()).pipe(gulp.dest('./dist/css/'));
});

gulp.task('imagemin', function() { // мінімізація фото
    return gulp.src('./src/img/**/*').pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('./dist/img/'));
})

gulp.task('server', function() { // запуск серверу
    return gulp.src('./dist/').pipe(server(serverOption));
});

gulp.task('watch', function() { // спостереження за змінами
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/html/**/*.html', gulp.series('html'));
    gulp.watch('./src/img/**/*', gulp.series('imagemin'));
})

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'imagemin'), gulp.parallel('server', 'watch')));