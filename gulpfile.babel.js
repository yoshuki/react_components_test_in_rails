'use strict';

import del from 'del';
import gulp from 'gulp';
import {coffee, espower, mocha, react, rename, util} from './gulp_plugins.js';

let paths = {
  components_dir: '../app/assets/javascripts/components/',
  test_dir: './test/',
  transformed_components_dir: './transformed_components/',
  powered_test_dir: './powered_test/',
};

gulp.task('default', ['test']);

gulp.task('clean', () => {
  del([paths.transformed_components_dir, paths.powered_test_dir])
});

gulp.task('coffee_components', () => {
  return gulp.src(paths.components_dir + '*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(rename({extname: '.jsx'}))
    .pipe(gulp.dest(paths.transformed_components_dir));
});

gulp.task('react_components', ['coffee_components'], () => {
  return gulp.src(paths.transformed_components_dir + '*.jsx')
    .pipe(react())
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest(paths.transformed_components_dir));
});

gulp.task('power_tests', ['react_components'], () => {
  return gulp.src(paths.test_dir + '*_test.js')
    .pipe(react({es6module: true}))
    .pipe(espower())
    .pipe(gulp.dest(paths.powered_test_dir));
});

gulp.task('test', ['power_tests'], () => {
  gulp.src(paths.powered_test_dir + '*_test.js')
    .pipe(mocha().on('error', util.log));
});
