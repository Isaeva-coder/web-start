const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
function bs() {
  build();
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch("./dist/*.html").on('change', browserSync.reload);
  watch("./src/**/*.scss", serveSass);
  watch("./src/js/*.js").on('change', browserSync.reload);
};

function build() {
  src('./src/*.html')
    .pipe(dest("./dist/"))

  src("./public/**/*")
    .pipe(dest("./dist"))
}

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./src/sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS({ debug: true }))
      .pipe(dest("./dist/css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;