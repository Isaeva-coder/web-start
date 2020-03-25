const { src, dest, watch } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
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
  serveImage();
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
  src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest("./dist/"));
  src("./public/**/*").pipe(dest("./dist"));
}

/**
 * Отслеживание изменений в html файлах
 */
function serveHtml() {
  return src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest("./dist/"))
    .pipe(browserSync.stream());
}

/**
 * Отслеживание изменений в js файлах
 */
function serveJs() {
  return src([
      'src/js/**/*', 
      '!src/js/jquery.fancybox.min.js',
      '!src/js/wow.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

/**
 * Минификация изображений для продуктвой сборки
 */
function serveImage() {
  return src('src/img/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest('dist/img'));
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