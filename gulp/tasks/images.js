import gulp from 'gulp';
import conf from '../gulpconfig.js';
import imagemin from 'gulp-imagemin';


export function minImgage() {
  const source = conf.path.assets;
  
  return gulp.src(source)
    .pipe(imagemin())
    .pipe(gulp.dest(conf.dest.distAssets));
}