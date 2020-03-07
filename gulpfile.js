const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

/**
 * Запуск локального статического сервера +
 * отслеживание scss/html файлов
 */
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

/** 
 * Сборка проекта (перемещение файлов из папки public и html файлов) 
 */
function build() {
  src('./src/*.html')
    .pipe(dest("./dist/"))

  src("./public/**/*")
    .pipe(dest("./dist"))
}

/**
 * Компилирование sass в css + автоматическое добавление
 * в браузер
 */
function serveSass() {
  return src("./src/sass/**/*.scss")
      // Преобразование sass/scss в css
      .pipe(sass())
      // Добавление вендорных автопрефиксов
      .pipe(autoprefixer({ cascade: false }))
      // Минификация преобразованного css файла
      .pipe(cleanCSS({ debug: true }))
      // Перемещение полученнного файла в продуктовую папку
      .pipe(dest("./dist/css"))
      // Запуск автообносления browserSync
      .pipe(browserSync.stream());
};

exports.serve = bs;