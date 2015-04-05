var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cmq = require('gulp-combine-media-queries'),
    minifycss = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    rename = require("gulp-rename"),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');


gulp.task('styles', function() {

    return gulp.src(['css/sass/main.scss'])

        .pipe(plumber())

        .pipe(sass({
            style: 'expanded',
            onError: function(err) {
                return notify({
                    title: "Erro no sass"
                }).write(err);
            }
        }))
        .pipe(gulp.dest('css'))

        .pipe(cmq({
            log: false
        }))
        .pipe(gulp.dest('css'))

        //.pipe(minifycss())
        //.pipe(gulp.dest('css'))

        .pipe(notify({
            title: "Gulp sass",
            message: 'Compilado com sucesso!'
        }))

});


gulp.task('file-include', function() {
    gulp.src(['templates/*.tpl'])

        .pipe(plumber())

        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))

        .pipe(rename(function (path) {
            path.extname = ".html"
        }))

        .pipe(gulp.dest('./'))

        .pipe(notify({
            title: "File include",
            message: "fileInclude task completed!"
        }));
});


gulp.task('watch', function() {
    gulp.watch('css/sass/*.scss', ['styles']);
    gulp.watch(['templates/*.tpl', 'templates/includes/*.tpl'], ['file-include']);
});

gulp.task('default', ['watch'], function() {

});
