const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('hello', (done) => {
  console.log('Hello world');
  done();
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});