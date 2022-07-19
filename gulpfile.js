var gulp = require('gulp');
var fileinclude  = require('gulp-file-include');
var del = require('del');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var timestamp = (new Date()).getTime();

sass.compiler = require('node-sass');

gulp.task('clean', cb=>{
    del.sync(['dest/**/*' ]);
    cb()
});

gulp.task('fileinclude', cb=> {
    gulp.src(['src/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                time:timestamp
            },
        }))
        .pipe(gulp.dest('./dest'));
        cb()
});


gulp.task('copy',cb=> {
    gulp.src('src/lib/**/*')
        .pipe(gulp.dest('./dest'))
        cb()
});

gulp.task('copy:ico',cb=>{
    gulp.src('src/*.ico')
        .pipe(gulp.dest('./dest'))
        cb()
});

gulp.task('sass',cb=> {
    gulp.src('./sass/main/**/*.scss')
    // gulp.src('./sass/main/main.scss')
    .pipe(plumber())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ["last 15 versions"],
        cascade:false
    }))
    .pipe(sass())
      .pipe(cleanCSS())
      .pipe(gulp.dest('dest/css'));
    cb()
  });

gulp.task('task-name',gulp.parallel('sass','fileinclude','copy','copy:ico'));

// Watchers
gulp.task('watchs', cb=> {
    gulp.watch(['src/**/*.html','src/**/*.htm'],gulp.series('fileinclude'));
    gulp.watch('src/lib/js/*.js',gulp.series('copy'));
    gulp.watch('sass/**/*.scss',gulp.series('sass'));
    // gulp.watch('sass/main/main.scss',gulp.series('sass'));
    cb()
});


gulp.task('default', gulp.series('task-name', 'watchs'));