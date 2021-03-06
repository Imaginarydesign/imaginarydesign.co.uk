var gulp = require('gulp')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var prefix = require('gulp-autoprefixer')
var cp = require('child_process')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var minifyCSS = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var hashsum = require('gulp-hashsum')
var htmlmin = require('gulp-htmlmin')
var path = require('path')
// var imagemin    = require('gulp-imagemin');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild)
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done)
})

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload()
})

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['build', 'jekyll-build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    }
  })
})

gulp.task('build', ['sass', 'js', 'img', 'icons', 'html'])

/**
 * Minify html
 */
gulp.task('html', ['jekyll-build'], function () {
  gulp.src([
    '_site/*.html',
    '_site/*/*.html',
    // '!_site/demo/*/*.html',
    '_site/*/*/*.html',
    '_site/*/*/*/*.html'
  ])
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('_site/'))
    // .pipe(browserSync.reload({stream: true, once: true}))
})

/**
 * Compile files from src into both _site/assets/css, _site/assets/js (for live injecting) and assets (for future jekyll builds)
 */
gulp.task('sass', function () {
  gulp.src([
    'src/scss/*.scss'
  ])
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(hashsum({filename: './_data/cache_bust_css.yml', hash: 'md5'}))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('icons', function () {
  gulp.src('bower_components/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('_site/assets/fonts'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/fonts'))
})

gulp.task('js', function () {
  gulp.src([
    'bower_components/**/jquery/dist/jquery.js',
    'bower_components/**/bootstrap-sass/assets/javascripts/bootstrap.js',
    // 'bower_components/**/isotope/dist/isotope.pkgd.js',
    'bower_components/**/jribbble/dist/jribbble.min.js',
    'src/js/**/*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(hashsum({filename: './_data/cache_bust_js.yml', hash: 'md5'}))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/js'))
})

gulp.task('img', function () {
  gulp.src('src/images/**/*.+(png|jpeg|jpg|gif|svg)')
    // .pipe(imagemin())
    .pipe(gulp.dest('_site/assets/images'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/images'))
})

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch([
    '*.html',
    'resources/**/*',
    'reading/**/*',
    '_layouts/*.html',
    '_posts/*',
    'writing/**/*',
    '_resources/**/*',
    '_reading/**/*',
    '_includes/*'
  ], ['jekyll-rebuild'])
  gulp.watch('src/images/**/*.+(png|jpeg|jpg|gif|svg)', ['img'])
  gulp.watch('src/js/*.js', ['js'])
})

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'icons', 'watch'])
