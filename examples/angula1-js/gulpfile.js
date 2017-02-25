'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();


var config = {
    baseDirs : "./src"
};
///////////////


gulp.task('serve', function () {
    startBrowserSync(["./", config.baseDirs ]);
});

//////////////////////

function startBrowserSync(serverRoot) {

    console.log('Starting BrowserSync on port ' + 8010 + ' for ' + serverRoot);

    var options = {
        //proxy: 'localhost:' + port,
        port: 8010,
        ws: true,
        server: {
            baseDir: serverRoot
        },
        reloadDelay: 2000
    };

    browserSync.init(options);

}
