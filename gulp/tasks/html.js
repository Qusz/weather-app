import gulp from 'gulp';
import conf from '../gulpconfig.js';
import replace from 'gulp-replace';

export function html() {
  const source = conf.path.html;
  return gulp.src(source)
    .pipe(gulp.dest(conf.dest.dist))
    .pipe(conf.require.browsersync.stream());
}

export function htmlDev() {
  const source = conf.path.html;
  return gulp.src(source)
    .pipe(conf.require.changed(source))
    .pipe(gulp.dest(conf.dest.public))
    .pipe(conf.require.browsersync.stream());
}

export function replaceRefs() {
  return gulp.src([`${conf.dest.dist}/index.html`])
    .pipe(replace('./main.css', './main.min.css'))
    .pipe(replace('./main.js', './main.min.js'))
    .pipe(gulp.dest(conf.dest.dist));
}