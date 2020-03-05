const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./sass/*.scss")
      .pipe(sass())
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;