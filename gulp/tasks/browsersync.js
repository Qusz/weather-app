import conf from '../gulpconfig.js';

export function browserSync() {
  conf.require.browsersync.init({
      server: {
          baseDir: conf.dest.public
      },
      port: 3008
  });
}