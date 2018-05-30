/* eslint-env node */

var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var eslint = require('gulp-eslint')

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'lint'], function () {
	browserSync.init({
		server: './'
	})

	gulp.watch('./scss/*.scss', ['sass'])
	gulp.watch('./*.html').on('change', browserSync.reload)
	gulp.watch('./js/**/*.js', ['lint'])
})

gulp.task('lint', function () {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['**/*.js', '!node_modules/**'])
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint())
	// eslint.format() outputs the lint results to the console.
	// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
	// To have the process exit with an error code (1) on
	// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError())
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src('./scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
})

gulp.task('default', ['serve'])
