import gulp from 'gulp';

import conf from '../gulpconfig.js';

import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rollup from 'gulp-better-rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import depsOrder from 'gulp-deps-order';



export function js() {
  const source = conf.path.js;
  return gulp.src(source)
      .pipe(depsOrder())
      .pipe(
        rollup({ 
          plugins: [
            babel(), 
            resolve(), 
            commonjs()
          ] 
        }, 'umd')
      )
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(conf.require.rename({
          extname: '.min.js'
      }))
      .pipe(gulp.dest(conf.dest.dist))
}

export function jsDev() {
  const source = conf.path.js;
  return gulp.src(source)
      .pipe(conf.require.changed(source))
      .pipe(conf.require.sourcemaps.init())
      .pipe(depsOrder())
      .pipe(
        rollup({ 
          plugins: [
            babel(), 
            resolve(), 
            commonjs()
          ] 
        }, 'umd')
      )
      .pipe(concat('main.js'))
      .pipe(conf.require.sourcemaps.write())
      .pipe(gulp.dest(conf.dest.public))
      .pipe(conf.require.browsersync.stream());
}