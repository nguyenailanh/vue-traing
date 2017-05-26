'use strict';

import gulp, { series, parallel } from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';


import { src, des } from './config/paths';
import wpConfig from './config/webpack';
import bsConfig from './config/browser-sync';

const task = {
  bundle() {
    return gulp
      .src(src + '**/*.jsx')
      .pipe(webpackStream(wpConfig, webpack))
      // .on( 'error', handleErrors )
      .pipe(gulp.dest(des))
      .pipe(browserSync.stream());
  },

  server() {
    browserSync(bsConfig);

    gulp.watch(src, task.bundle);
  }
};

gulp.task('default', gulp.series(task.bundle, task.server));
