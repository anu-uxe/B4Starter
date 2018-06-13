const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const cssmin        = require('gulp-cssmin');
const rename        = require('gulp-rename');
const sourcemaps    = require('gulp-sourcemaps');


// // Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(["src/**/*.scss"], ['sass']);
    gulp.watch("src/**/*.js", ['js']);
    gulp.watch("public/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(["src/**/*.scss"],['sass'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("public/styles"))
        .pipe(browserSync.stream());
});

// Move JS Files to public/js
gulp.task('js', function() {
    return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "src/scripts/*.js","node_modules/popper.js/dist/umd/popper.min.js"],["js"])
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});



// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src("node_modules/line-awesome/dist/fonts/*")
    .pipe(gulp.dest("public/fonts"))
});

// Move Images to aseets/img
gulp.task('imgs', function() {
  return gulp.src("src/img/*")
    .pipe(gulp.dest("public/assets/img"))
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src("node_modules/line-awesome/dist/css/line-awesome.min.css")
    .pipe(gulp.dest("public/styles"))
});

gulp.task('minify-css', function () {
    gulp.src("public/styles/styles.css")
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("public/styles"));
});



gulp.task('default', ['js','serve', 'fonts','imgs','fa','minify-css']);