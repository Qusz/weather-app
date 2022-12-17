import gulp from 'gulp';

import conf from '../gulpconfig.js';

import { htmlDev } from './html.js';
import { cssDev } from './css.js';
import { jsDev } from './js.js';
import { assetsDev } from './assets.js';



export function watchFiles() {
  gulp.watch(conf.path.html, htmlDev);
  gulp.watch(conf.path.sass, cssDev);
  gulp.watch(conf.path.js, jsDev);
  gulp.watch(conf.path.assets, assetsDev);
}
