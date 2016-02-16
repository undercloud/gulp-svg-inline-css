"use strict";

var through = require('through2'),
	xml2js = require('xml2js'),
	path = require('path'),
	clc = require('cli-color'),
	svg = require(__dirname + '/svg.js'),
	_ = require('underscore'),
	parser = new xml2js.Parser(),
	builder = new xml2js.Builder();

_.trim = require('underscore.string/trim');
_.sprintf = require('underscore.string/sprintf');

if(typeof Object.isset != 'function'){
	Object.isset = function(ns, g){
		var chain = ns.split('.'),
			root = g || scope;

		for(var i=0, l=chain.length; i<l; i++){
			if(typeof root[chain[i]] === "undefined"){
				return false;
			}

			root = root[chain[i]];
		}

		return true;
	};
}

module.exports = function(options) {
	options = options || {};
	options.style = options.style || {};
	options.className = options.className || '.icon.%s';
	options.raw = options.raw || false;

	return through.obj(function(file, encoding, done) {

		var content = file.contents.toString('utf-8'),
			parser = new xml2js.Parser(),
			builder = new xml2js.Builder();

		builder.options.renderOpts.pretty = false;

		parser.parseString(content, function(error, data) {
			if (error !== null) {
				console.error(
					clc.red(
						_.sprintf(
							'Cannot process file %s - %s', 
							file.path,
							error
						)
					)
				);

				file.contents = null;

				return done(null, file);
			}

			svg.inline(options.style);

			data = svg.read(data);

			if (Object.isset('width', options)) {
				if (Object.isset('svg.$', data)) {
					data.svg.$.width = options.width;
				}
			}

			if (Object.isset('height', options)) {
				if (Object.isset('svg.$', data)) {
					data.svg.$.height = options.height;
				}
			}

			content = builder.buildObject(data);

			if (options.raw === false) {
				content = svg.buildContent(file, options, content);
				file.path = svg.genPath(file);
			}

			file.contents = new Buffer(content);

			return done(null, file);
		});
	})
}