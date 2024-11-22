const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const fs = require('fs');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
};

gulp.task('clean', function(done) { // видалення dist
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/').pipe(clean());
    }
    done();
})

gulp.task('html', function() { // html
    return gulp.src('./src/*.html').pipe(fileInclude(fileIncludeSetting)).pipe(gulp.dest('./dist')).pipe(browserSync.stream());
});

gulp.task('sass', function() { // scss у css
    return gulp.src('./src/scss/*.scss').pipe(sass()).pipe(gulp.dest('./dist/css/')).pipe(browserSync.stream());
});

gulp.task('images', function() { // копіювання фото
    return gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img/')).pipe(browserSync.stream());
});

gulp.task('js', function() { // js
    return gulp.src('./src/js/*.js').pipe(uglify()).pipe(gulp.dest('./dist/js/'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: true,
        notify: false
    });

    // Налаштування спостереження
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/img/**/*', gulp.series('images'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'js', 'images'), 'server'));