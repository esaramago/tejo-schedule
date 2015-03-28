var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cmq = require('gulp-combine-media-queries'),
    minifycss = require('gulp-minify-css'),
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



gulp.task('watch', function() {
    gulp.watch('css/sass/*.scss', ['styles']);
});

gulp.task('default', ['watch'], function() {

});
