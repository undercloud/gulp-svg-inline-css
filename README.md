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

Convert icons
<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTExLjggMWMtMS42ODIgMC0zLjEyOSAxLjM2OC0zLjc5OSAyLjc5Ny0wLjY3MS0xLjQyOS0yLjExOC0yLjc5Ny0zLjgtMi43OTctMi4zMTggMC00LjIgMS44ODItNC4yIDQuMiAwIDQuNzE2IDQuNzU4IDUuOTUzIDggMTAuNjE2IDMuMDY1LTQuNjM0IDgtNi4wNTAgOC0xMC42MTYgMC0yLjMxOS0xLjg4Mi00LjItNC4yLTQuMnoiIHN0eWxlPSJmaWxsOiMyODI4MjgiLz48L3N2Zz4=">

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
