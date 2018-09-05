const gulp = require('gulp');
const connect = require('gulp-connect');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const nunjucks = require('gulp-nunjucks-html');
const htmlbeautify = require('gulp-html-beautify');
const imagemin = require('gulp-imagemin');

gulp.task('connect', () => {
	connect.server({
		host: '0.0.0.0',
		port: 1337,
		livereload: true,
		root: '../dist'
	});
});

gulp.task('html', () => {
	gulp.src(['pages/*.html'])
		.pipe(nunjucks({
			searchPaths: ['blocks']
		}))
		.pipe(htmlbeautify({
			indent_with_tabs: true
		}))
		.pipe(gulp.dest('../dist'))
		.pipe(connect.reload());
});

gulp.task('scss', () => {
	gulp.src('scss/init.scss')
		.pipe(scss().on('error', scss.logError))
		.pipe(scss({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('../dist/css'))
		.pipe(connect.reload());
});

gulp.task('js', () => {
	gulp.src(['js/jquery.min.js', 'js/modal-video.min.js', 'js/*.js'])
		.pipe(concat('bundle.js'))
		.pipe(minify())
		.pipe(gulp.dest('../dist/js'))
		.pipe(connect.reload());
});

gulp.task('img', () => {
	gulp.src('images/*')
		.pipe(imagemin([], {}))
		.pipe(gulp.dest('../dist/images'))
		.pipe(connect.reload());
});

gulp.task('font', () => {
	gulp.src('fonts/*')
		.pipe(gulp.dest('../dist/fonts'));
});

gulp.task('watch', () => {
	gulp.watch('pages/*.html', ['html']);
	gulp.watch('blocks/*.html', ['html']);
	gulp.watch('scss/*.scss', ['scss']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('fonts/*', ['font']);
	gulp.watch('images/*', ['img']);
});

gulp.task('default', ['connect', 'watch', 'html', 'scss', 'js', 'img', 'font']);