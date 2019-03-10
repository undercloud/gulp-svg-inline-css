"use strict";

var _ = require('underscore'),
	path = require('path');

_.trim = require('underscore.string/trim');

module.exports = {
	style: '',
	tags: ['path','rect','circle','ellipse','line','polyline','polygon','g','text'],
	normalizeKey: function(key) {
		return _.escape(key.replace(/[A-Z]/g, function(letter) {
			return '-' + letter.toLowerCase();
		}));
	},
	normalizeValue: function(value) {
		return _.escape(value);
	},
	genName: function(file) {
		return path.basename(
			file.path,
			path.extname(file.path)
		);
	},
	genPath: function(file) {
		return path.dirname(file.path) + path.sep + this.genName(file) + '.css';
	},
	buildContent: function(file, options, content) {
		content = content.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','');
		content = (
			(
				(typeof options.className === 'function')
				? options.className(this.genName(file))
				: _.sprintf(options.className, this.genName(file))
			) + ' {\n' + 
			'  background-image: url(\'data:image/svg+xml;' + options.encoding + ',' + new Buffer(content).toString(options.encoding) + '\');\n' +
			'}\n'
		);

		return content;
	},
	inline: function(style) {
		var thisis = this;
		this.style = ((function(object){
			var set = [];
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					set.push(thisis.normalizeKey(key) + ':' + thisis.normalizeValue(object[key].toString()));
				}
			}

			return set;
		})(style)).join(';');
	},
	addStyle: function(style) {
		style = style || '';
		style += this.style;

		return _.trim(style, [' ', ';', '\n', '	']);
	},
	read: function(obj, tag){
		if (_.isObject(obj) || _.isArray(obj)) {
			for (var x in obj) {
				if (obj.hasOwnProperty(x)) {
					if (x === '$') {
						if (_.contains(this.tags, tag)) {	
							obj[x].style = this.addStyle(obj[x].style);
						}
					} else {
						obj[x] = this.read(obj[x], _.isArray(obj) ? tag : x);
					}
				}
			}
		}

		return obj;
	}
}
