const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
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
  watch("./src/*.html", serveHtml);
  watch("./src/**/*.scss", serveSass);
};

/** 
 * Сборка проекта (перемещение файлов из папки public и html файлов) 
 */
function build() {
  src('./src/*.html').pipe(dest("./dist/"));
  src("./public/**/*").pipe(dest("./dist"));
}

/**
 * Отслеживание изменений в html файлах
 */
function serveHtml() {
  return src('./src/*.html')
    .pipe(dest("./dist/"))
    .pipe(browserSync.stream());
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
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    // Перемещение полученнного файла в продуктовую папку
    .pipe(dest("./dist/css"))
    // Запуск автообносления browserSync
    .pipe(browserSync.stream());
};

exports.serve = bs;