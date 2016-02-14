# gulp-svg-inline-css

Colorize, styling SVG icons and converting into base64-encoded data URI strings

##Basic usage
```JavaScript
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	svg = require('gulp-svg-inline-css');

gulp.task('style-svg', function() {
    gulp.src('/path/to/*.svg')
        .pipe(svg({
        	style: {
        		fill: '#FF4081'
        	}
        }))
        .pipe(concat('sprites.css'))
        .pipe(gulp.dest('styles/'));
})
```

##Styling

##Class names
