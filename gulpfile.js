const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

/**
 * Запуск локального статического сервера +
 * отслеживание scss/html файлов
 */
function bs() {
  build();
  serveSass();
  serveJs();
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch("./src/*.html", serveHtml);
  watch("./src/sass/**/*", serveSass);
  watch("./src/js/**/*", serveJs);
};

/** 
 * Сборка проекта (перемещение файлов из папки public и html файлов) 
 */
function build() {
  src('./src/*.html').pipe(dest("./dist/"));
  src("./public/**/*").pipe(dest("./dist"));
  src("./src/js/*.min.js").pipe(dest("./dist"));
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
 * Отслеживание изменений в js файлах
 */
function serveJs() {
  return src(['src/js/**/*.js',  '!src/js/**/*.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

/**
 * Компилирование sass в css + автоматическое
 * добавление в браузер
 */
function serveSass() {
  return src("./src/sass/style.sass")
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

exports.default = bs;