var gulp        = require('gulp');
var gutil       = require('gulp-util');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var jeet        = require('jeet');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync').create();

//compass error
var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

// Static Server + watching stylus/html files
gulp.task('serve', ['stylus'], function() {

    browserSync.init({
       proxy: "localhost:1337/weather"
    });

    gulp.watch("src/styl/**/*.styl", ['stylus']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch("src/img/**/*.png", ['img']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);

//minificando js
gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});

//stylus
gulp.task('stylus', function(){
    gulp.src('src/styl/*.styl')
        .pipe(stylus({
            use: [nib(), jeet()],
            compress: true
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

//imagens
// gulp.task('img', function(){
//     return gulp.src('src/img/*')
//         .pipe(imagemin({
//             progressive: true,
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('build/img'));
// })