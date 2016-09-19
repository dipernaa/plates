var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var ejsmin = require('gulp-minify-ejs');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var plato = require('gulp-plato');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var gulp = require('gulp');

var paths = {
  test: {
    src: 'app/**/*.js',
    unit: 'test/*.js'
  },
  src: {
    js: 'src/js/*.js',
    scss: 'src/scss/*.scss',
    ejs: 'src/views/*.ejs',
    images: 'src/images/*',
    fonts: 'bower_components/bootstrap/fonts/*',
    partials: 'src/views/partials/*.ejs'
  },
  dist: {
    js: 'dist/js',
    scss: 'dist/css',
    ejs: 'dist/views',
    images: 'dist/images',
    fonts: 'dist/fonts',
    partials: 'dist/views/partials'
  }
};

gulp.task('test', ['test:unit', 'test:plato'], function() {
  process.nextTick(function() {
    process.exit(0);
  });
});

gulp.task('test:unit', function(cb) {
  gulp.src([paths.test.src])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src([paths.test.unit])
        .pipe(mocha({timeout: 7500}))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('test:plato', function() {
  return gulp.src('app/**/*.js')//, 'server.js')
    .pipe(plato('report', {
      jshint: {
        options: {
          strict: true
        }
      },
      complexity: {
        trycatch: true
      }
    }));
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    // .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
})

gulp.task('styles', function() {
  return gulp.src(paths.src.scss)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist.scss));
});

gulp.task('views', function() {
  return gulp.src(paths.src.ejs)
    .pipe(plumber())
    .pipe(ejsmin())
    .pipe(gulp.dest(paths.dist.ejs));
});

gulp.task('partials', function () {
  return gulp.src(paths.src.partials)
    .pipe(plumber())
    .pipe(ejsmin())
    .pipe(gulp.dest(paths.dist.partials));
});

gulp.task('images', function() {
  return gulp.src(paths.src.images)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.js, ['scripts']);
  gulp.watch(paths.src.scss, ['styles']);
  gulp.watch(paths.src.ejs, ['views']);
  gulp.watch(paths.src.images, ['images']);
  gulp.watch(paths.src.partials, ['partials']);
  gulp.watch(paths.src.fonts, ['fonts']);
});

gulp.task('build', function() {
  runSequence('clean', ['scripts', 'styles', 'views', 'partials', 'images', 'fonts']);
});
gulp.task('default', ['build', 'watch']);