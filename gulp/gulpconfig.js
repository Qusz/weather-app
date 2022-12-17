import rename from 'gulp-rename';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';

export default {
  path: {
    html: './src/index.html',
    sass: './src/sass/**/*',
    sassMain: './src/sass/main.scss',
    js: './src/js/**/*',
    assets: './src/assets/**/*'
  },
  dest: {
    public: './public',
    publicAssets: './public/assets',
    dist: './dist',
    distAssets: './dist/assets'
  },
  require: {
    rename: rename,
    changed: changed,
    browsersync: browserSync,
    sourcemaps: sourcemaps,
  }
}