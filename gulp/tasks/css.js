import gulp from 'gulp'
import conf from '../gulpconfig.js';

import gulpSass from 'gulp-sass';
import sassImport from 'sass';

import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';

const sass = gulpSass(sassImport);



export function css() {
  const source = conf.path.sassMain;
  return gulp.src(source)
      .pipe(sass())
      .pipe(autoprefixer({
          cascade: false
      }))
      .pipe(conf.require.rename({
          extname: '.min.css'
      }))
      .pipe(cssnano())
      .pipe(gulp.dest(conf.dest.dist))
      .pipe(conf.require.browsersync.stream());
}

export function cssDev() {
  const source = conf.path.sassMain;
  return gulp.src(source)
      .pipe(conf.require.changed(source))
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest(conf.dest.public))
      .pipe(conf.require.browsersync.stream());
}