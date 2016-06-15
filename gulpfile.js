'use strict';

const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();

const vinylify = require('factor-vinylify');
const browserify = require('browserify');

// styles dependencies
const nib = require('nib');
const cssimport = require('postcss-import');
const cssnano = require('cssnano');

// config
const config = {
  views: {
    src: ['views/**/*'],
  },
  styles: {
    src: ['static/src/styles/**/*.styl'],
    dest: 'static/dist/styles',
  },
  scripts: {
    srcPath: 'static/src/scripts',
    dest: 'static/dist/scripts',
    entries: [
      'bundle.jsx',
    ],
    outputs: [
      'bundle.js',
    ],
  },
  images: {
    src: ['static/src/images/**/*'],
    dest: 'static/dist/images',
  },
  fonts: {
    src: ['static/src/fonts/**/*'],
    dest: 'static/dist/fonts',
  },
};

config.scripts.src = [path.join(config.scripts.srcPath, '/**/*.js'), path.join(config.scripts.srcPath, '/**/*.jsx')];

// fonts
gulp.task('fonts', () => {
  gulp.src(config.fonts.src)
  .pipe($.changed(config.fonts.dest))
  .pipe(gulp.dest(config.fonts.dest))
  .pipe(browserSync.stream())
});

gulp.task('watch-fonts', () => {
  gulp.watch([config.fonts.src], ['fonts']);
});

// styles
gulp.task('styles', () => {
  const processors = [cssimport, cssnano];
  gulp.src(config.styles.src)
  .pipe($.stylus({ use: [nib()] }))
  .on('error', $.util.log)
  .pipe($.postcss(processors))
  .on('error', $.util.log)
  .pipe(gulp.dest(config.styles.dest))
  .pipe(browserSync.stream())
});

gulp.task('watch-styles', () => {
  gulp.watch([config.styles.src], ['styles']);
});

// javascript
gulp.task('scripts', () => {
  browserify({
    entries: config.scripts.entries,
    basedir: config.scripts.srcPath
  }).plugin(vinylify, {
    outputs: config.scripts.outputs,
    common: config.scripts.common,
  })
  .transform('babelify', {
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread'],
  })
  //.transform('uglifyify')
  .bundle()
  .on('error', function (err) {
    $.util.log(err.toString());
    this.emit("end");
  })
  .pipe(gulp.dest(config.scripts.dest))
  .pipe(browserSync.stream())
});

gulp.task('watch-scripts', () => {
  gulp.watch([config.scripts.src], ['scripts']);
});

// images
gulp.task('images', () => {
  gulp.src(config.images.src)
  .pipe(gulp.dest(config.images.dest))
  .pipe(browserSync.stream())
});

gulp.task('watch-images', () => {
  gulp.watch([config.images.src], ['images']);
});

// tasks
gulp.task('build', ['fonts', 'styles', 'scripts', 'images']);
gulp.task('watch', ['watch-fonts', 'watch-styles', 'watch-scripts', 'watch-images']);

gulp.task('nodemon', (cb) => {

  let started = false;

  return $.nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['static/**/*'],
  }).on('start', () => {
    if (!started) {
      cb();
      started = true; 
    } 
  }).on('restart', () => {
    setTimeout(() => browserSync.reload(), 1000);
  });
});

gulp.task('dev', ['build', 'watch', 'nodemon'], () => {
  let options = {
    proxy: 'localhost:3000',
    files: config.views.src,
    port: 5000,
    open: false,
  };
  if (process.env.VIRTUAL_HOST)
    options.socket = { domain: process.env.VIRTUAL_HOST };
  browserSync.init(options);
});

gulp.task('default', ['build']);

