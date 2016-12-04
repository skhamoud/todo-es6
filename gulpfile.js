var gulp = require('gulp');
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var autoprefixer= require('gulp-autoprefixer');
// not working due to version probably try reinstalling


//======================================
// Files 
//=====================================

let basePath = './';
let src = {
  sass : basePath + 'sass/' ,
  js : basePath + "js/"
};
let public = basePath + 'public/';

// ====================================
//  tasks
// ====================================

// Deals with styles tasks and then reloads with browser-sync
gulp.task("styles", function () {
  return gulp.src(src.sass + "main.+(sass|scss)")
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer())
.pipe(gulp.dest(public))
.pipe(browserSync.reload({stream:true}));
});

// Serve files from base directory
gulp.task('serve', ['styles'], function(){
  browserSync.init({
    server: {
      baseDir: public
    }
  });
})


// watches files and manually reloads after html files change
gulp.task('watch' ,()=> {
    gulp.watch(src.sass , ['styles']);
    gulp.watch(public + "*.js").on('change', reload);
    gulp.watch('./**/*.html').on('change', reload);
})
gulp.task("default", ["watch",'serve']);