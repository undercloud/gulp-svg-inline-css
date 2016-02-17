# gulp-svg-inline-css

Colorize, styling SVG icons and converting into base64-encoded data URI strings

##Install
```npm install gulp-svg-inline-css```

##Basic usage
```js
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
```js
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
All available style options you can find at https://www.w3.org/TR/SVG/painting.html

\*```camelCase``` keys will be transformed into ```dash-splitted```<br>
\** inline style will be added for all elements in this list  ```path,rect,circle,ellipse,line,polyline,polygon,g,text```

##Class names
By default defined this mask ```.icon.%s``` where ```%s``` is file name without extension.
You can define your own rules for building class name's, just add ```className``` key into build options: 
```js
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
```js
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

##Rasterize SVG
If you add param `raw: true`, plugin just add styles without base64 encoding and css transforms.
Options `heigth` and `width` avail for image scaling.
Here simple example how you can rasterize svg icons and save as `png` files
```js
var gulp = require('gulp'),
  svgmin = require('gulp-svgmin'),
  raster = require('gulp-raster'),
  rename = require('gulp-rename'),
  svg = require('gulp-svg-inline-css');

gulp.task('inline-svg', function() {
  gulp.src('*.svg')
    .pipe(svgmin())
    .pipe(svg({
      raw: true,
      width: 48,
      height: 48,
      style: {
        fill: '#E08283'
      }
    }))
    .pipe(raster())
    .pipe(rename({
      extname: '.png'
    }))
    .pipe(gulp.dest('processed/'));
});
```