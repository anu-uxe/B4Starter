const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


// Compile Sass, create sourcemaps & Browser sync

gulp.task('sass', function() {
    return gulp.src(['src/helpers/*.scss', 'src/partials/*.scss','src/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.stream());
});



// Move JS Files to public/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(['src/helpers/*.scss','src/partials/*.scss','src/styles.scss','src/pages/*.scss'], ['sass']);
    gulp.watch(['src/scripts/app.js'], ['scripts']);
    gulp.watch("public/*.html").on('change', browserSync.reload);

});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/line-awesome/dist/fonts/*')
    .pipe(gulp.dest('public/fonts'))
});

// Move Images to aseets/img
gulp.task('imgs', function() {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('public/assets/img'))
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/line-awesome/dist/css/line-awesome.min.css')
    .pipe(gulp.dest('public/styles'))
});

// Move scripts file to public/js
gulp.task('scripts', function() {
  return gulp.src('src/scripts/app.js')
    .pipe(gulp.dest('public/js'))
});

gulp.task('minify-css', function () {
    gulp.src('public/styles/styles.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/styles'));
});



gulp.task('default', ['js','serve', 'fonts','imgs','fa','scripts','minify-css']);
