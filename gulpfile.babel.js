import gulp from 'gulp';

import { html, htmlDev, replaceRefs } from './gulp/tasks/html.js';
import { css, cssDev } from './gulp/tasks/css.js';
import { js, jsDev } from './gulp/tasks/js.js';
import { assets, assetsDev } from './gulp/tasks/assets.js';
import { minImgage } from './gulp/tasks/images.js';
import { browserSync } from './gulp/tasks/browsersync.js';
import { watchFiles } from './gulp/tasks/watch.js';
import { hashing } from './gulp/tasks/hashing.js';



export const dev = gulp.series(
  htmlDev, 
  jsDev, 
  cssDev, 
  assetsDev, 
  gulp.parallel(
    watchFiles, 
    browserSync
  )
);

export const build = gulp.series(
  gulp.parallel(
    html, 
    js, 
    css, 
    assets
  ),
  replaceRefs,
  hashing,
  minImgage
);