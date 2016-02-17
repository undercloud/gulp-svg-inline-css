"use strict";

var assert = require('assert'),
	svg = require('../svg.js');

describe('svg', function(){
	describe('#normalizeKey', function() {
		it('should return dasherized key', function() {
			assert.equal('stroke-width', svg.normalizeKey('strokeWidth'));
		});
	});

	describe('#normalizeValue', function() {
		it('should return escaped value', function() {
			assert.equal('&lt;&gt;&#x27;&quot;', svg.normalizeValue('<>\'"'))
		});
	});

	describe('#genName', function() {
		it('should return file name without extension', function() {
			assert.equal('diamonds', svg.genName({path: '/paht/to/svg/diamonds.svg'}))
		})
	});

	describe('#genPath', function() {
		it('should return new name for processed file', function() {
			assert.equal('/path/to/svg/diamonds.css', svg.genPath({path: '/path/to/svg/diamonds.svg'}))
		})
	});
})