var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
// make a static server to avoid CORS issues
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// detect any changes
gulp.task('watch', function(){
    // return gulp.watch(['*.html','src/**/*.js','*.css']) for when we have multiple folders within src
	return gulp.watch(['*.html','views/*.html','src/*.js','*.css'])
		.on('change', browserSync.reload);
});
gulp.task('default', ['serve','watch']);
