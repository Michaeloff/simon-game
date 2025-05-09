import browserSync from 'browser-sync';

const bs = browserSync.create();

bs.init({
  proxy: 'http://localhost:3000',  // Proxy your Express server
  port: 3001,                     // Browsersync runs on a different port
  files: ['public/**/*.*'],       // Watch front-end files for changes
  open: false,                    // Don’t automatically open the browser
  notify: false                   // Don’t show notification on browser reload
});