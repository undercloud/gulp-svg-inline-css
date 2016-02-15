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
        		fill: '#E08283'
        	}
        }))
        .pipe(concat('sprites.css'))
        .pipe(gulp.dest('styles/'));
})
```

##Styling
Just add ```key: value``` pairs like this
```JavaScript
...
.pipe(svg({
	style: {
		fill: '#E08283',
		stroke: '#674172',
		strokeWidth: 1
	}
}))
...
```
All available style options you can found at https://www.w3.org/TR/SVG/painting.html

\*```camelCase``` keys will be transformed into ```dash-splitted```<br>
\** inline style will be added for all elements in this list  ```path,rect,circle,ellipse,line,polyline,polygon,g,text```

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

##Optimize SVG
For optimizing and compress use ```gulp-svgmin```  https://www.npmjs.com/package/gulp-svgmin
```JavaScript
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	svgmin = require('gulp-svgmin'),
	svg = require('gulp-svg-inline-css');

gulp.task('style-svg', function() {
    gulp.src('/path/to/*.svg')
    	.pipe(svgmin())
        .pipe(svg({
        	style: {
        		fill: '#E08283'
        	}
        }))
        .pipe(concat('sprites.css'))
        .pipe(gulp.dest('styles/'));
})
```
