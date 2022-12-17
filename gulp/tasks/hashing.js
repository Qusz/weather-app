import gulp from 'gulp';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import revdel from 'gulp-rev-delete-original';

import conf from '../gulpconfig.js';

export function hashing() {
  return gulp.src(`${conf.dest.dist}/**/*.{css,js}`)
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.src('dist/**/*.html'))
    .pipe(revRewrite())
    .pipe(gulp.dest('dist'));
} 