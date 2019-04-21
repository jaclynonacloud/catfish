/* https://www.typescriptlang.org/docs/handbook/gulp.html */
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var uglify = require('gulp-uglify');
var tsify = require('tsify');
var fancy_log = require("fancy-log");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};


// var watchedBrowserify = browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['src/main.ts'],
//     cache: {},
//     packageCache: {}
// }).plugin(tsify);

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
    paths: []
}).plugin(tsify));

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('public'));
});

// function bundle() {
//     return watchedBrowserify
//         .transform('babelify', {
//             presets: ['es2015'],
//             extensions: ['.ts']
//         })
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('public/js'));
// }
function bundle() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));
}

// gulp.task("default", gulp.series(gulp.parallel('copy-html'), bundle));
// gulp.task("default", gulp.watch('src/**/*.ts', gulp.series(gulp.parallel('copy-html'), bundle)));
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", fancy_log);


exports.watch = () => {
    gulp.watch('src/**/*.ts', gulp.series(gulp.parallel('copy-html'), bundle))
}