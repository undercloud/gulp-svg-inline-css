"use strict";

var through = require('through2'),
	xml2js = require('xml2js'),
	_ = require('underscore'),
	parser = new xml2js.Parser(),
	builder = new xml2js.Builder();

_.trim = require('underscore.string/trim');

var SVGColorizer = {
	style: '',
	tags: ['path','rect','circle','ellipse','line','polyline','polygon','g','text'],
	normalizeKey: function(key) {
		return _.escape(key.replace(/[A-Z]/g, function(letter){
			return '-' + letter.toLowerCase();
		}));
	},
	normalizeValue: function(value) {
		return _.escape(value);
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

		return _.trim(style, [' ', ';']);
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

module.exports = function(options) {
	options = options || {}
	options.style = options.style || {}

	return through.obj(function(file, encoding, done) {
		var content = file.contents.toString('utf-8'),
			parser = new xml2js.Parser(),
			builder = new xml2js.Builder();

		builder.options.renderOpts.pretty = false;

		parser.parseString(content, function(err,data){
			SVGColorizer.inline(options.style)

			data = SVGColorizer.read(data)

			content = builder.buildObject(data).replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','');
			//new Buffer("Hello World").toString('base64')
			file.contents = new Buffer(content);

			return done(null, file);
		});
	})
}
