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
https://www.w3.org/TR/SVG/painting.html

##Class names
By default defined this mask ```.icon.%s``` where ```%s``` is file name without extension.
You can define your own rules for building class name's, just add ```className``` key into build options: 
```JavaScript
...
.pipe(svg({
	//bem like style
	className: '.icon.icon--%s:hover',
	style: {...}
))
...
```
