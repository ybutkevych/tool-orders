// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace'), webserver = require('gulp-webserver'), less = require('gulp-less');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: '../node_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'components/app/app',
            'components/nav-bar/nav-bar',
            'components/sidebar/sidebar',
            'components/wizard/wizard',
            'pages/home/home',
            'pages/toolOrders/toolOrders',
            'pages/order/order',
            'pages/settings/settings',
            'pages/help/help',
            'pages/newOrder/newOrder',
            'helpers/localStorageProvider'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
            // 'about-page': [ 'pages/about/about' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Transpiles less -> css and minifies, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('less', function(){
    return gulp.src('./src/less/styles.less')
        .pipe(less({compress: true}))
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('devLess', function () {
   return gulp.src('./src/less/styles.less')
       .pipe(less())
       .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
       .pipe(concat('styles.css'))
       .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function(){
    gulp.watch([
        './src/**/*.less',
        './src/components/**/*.less',
        './src/pages/**/*.less'
    ], ['devLess']);
});


// Moves the bootstrap fonts to the dist-folder
gulp.task('fonts', function(){
   return gulp.src('./node_modules/bootstrap/fonts/*', { base: './node_modules/bootstrap/components-bootstrap/' })
       .pipe(gulp.dest('./dist/fonts'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'less': 'styles.css?' + Date.now(),
            'js': 'scripts.js?' + Date.now()
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'less',  'fonts'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

// Sets up a webserver with live reload for development
gulp.task('webserver', function () {
    gulp.src('')
        .pipe(webserver({
            livereload : true,
            port : 8053,
            directoryListing : true,
            open : 'http://localhost:8050/src/index.html'
        }));
});
