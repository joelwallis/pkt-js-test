const path = require('path')
const gulp = require('gulp')
const concat = require('gulp-concat')

const conf = {
  tasks: {
    html: {
      src: path.join(__dirname, 'src', '*.html')
    },
    css: {
      src: path.join(__dirname, 'src/assets/css/*'),
      output: 'build.css'
    },
    js: {
      src: path.join(__dirname, 'src/assets/js/*'),
      output: 'build.js'
    }
  },
  buildDir: path.join(__dirname, 'build')
}

gulp.task('build', ['build:html', 'build:css', 'build:js'])
gulp.task('watch', function () {
  gulp.watch([
    conf.tasks.html.src,
    conf.tasks.css.src,
    conf.tasks.js.src
  ], ['build:html', 'build:css', 'build:js'])
})

// $ npm run build:html
gulp.task('build:html', function () {
  gulp.src(conf.tasks.html.src)
    .pipe(gulp.dest(conf.buildDir))
})
// $ npm run watch:html
gulp.task('watch:html', function () {
  gulp.watch(conf.tasks.html.src, ['build:html'])
})

// $ npm run build:css
gulp.task('build:css', function () {
  gulp.src(conf.tasks.css.src)
    .pipe(concat(conf.tasks.css.output))
    .pipe(gulp.dest(conf.buildDir))
})
// $ npm run watch:css
gulp.task('watch:css', function () {
  gulp.watch(conf.tasks.css.src, ['build:css'])
})

// $ npm run build:js
gulp.task('build:js', function () {
  gulp.src(conf.tasks.js.src)
    .pipe(concat(conf.tasks.js.output))
    .pipe(gulp.dest(conf.buildDir))
})
// $ npm run watch:js
gulp.task('watch:js', function () {
  gulp.watch(conf.tasks.js.src, ['build:js'])
})

// $ gulp
gulp.task('default', ['build'])