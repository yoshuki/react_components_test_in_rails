'use strict';

import del from 'del';
import gulp from 'gulp';
import {coffee, espower, mocha, react, rename, util} from './gulp_plugins.js';

let paths = {
  components_dir: '../app/assets/javascripts/components/',
  test_dir: './test/',
  module_sources: [
    './node_modules/react-redux/dist/react-redux.min.js',
    './node_modules/redux/dist/redux.min.js'
  ],
  modules_dir: '../app/assets/javascripts/modules/',
  transformed_components_dir: './transformed_components/',
  powered_test_dir: './powered_test/'
};

gulp.task('default', ['test:clean']);

gulp.task('deploy_modules', () => {
  gulp.src(paths.module_sources)
    .pipe(gulp.dest(paths.modules_dir));
});

gulp.task('test:clean', () => {
  del([paths.transformed_components_dir, paths.powered_test_dir]);
});

gulp.task('test:coffee_components', () => {
  return gulp.src(paths.components_dir + '*.js.jsx.coffee')
    .pipe(coffee({bare: true}))
    .pipe(rename({extname: ''}))
    .pipe(gulp.dest(paths.transformed_components_dir));
});

gulp.task('test:react_components', ['test:coffee_components'], () => {
  return gulp.src(paths.transformed_components_dir + '*.js.jsx')
    .pipe(react())
    .pipe(rename({extname: ''}))
    .pipe(gulp.dest(paths.transformed_components_dir));
});

gulp.task('test:power_tests', ['test:react_components'], () => {
  return gulp.src(paths.test_dir + '*_test.js')
    .pipe(react({es6module: true}))
    .pipe(espower())
    .pipe(gulp.dest(paths.powered_test_dir));
});

gulp.task('test:prepare', ['test:power_tests'], () => {
});

gulp.task('test:run', ['test:prepare'], () => {
  gulp.src(paths.powered_test_dir + '*_test.js')
    .pipe(mocha().on('error', util.log));
});
