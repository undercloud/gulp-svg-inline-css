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

module.exports = function(options) {
	options = options || {};
	options.style = options.style || {};
	options.className = options.className || '.icon.%s';

	return through.obj(function(file, encoding, done) {

		var content = file.contents.toString('utf-8'),
			parser = new xml2js.Parser(),
			builder = new xml2js.Builder();

		builder.options.renderOpts.pretty = false;

		parser.parseString(content, function(error, data){
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

			content = builder.buildObject(data);
			content = svg.buildContent(file, options, content);

			file.contents = new Buffer(content);
			file.path = svg.genPath(file);

			return done(null, file);
		});
	})
}