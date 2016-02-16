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

	});

	describe('#genPath', function() {

	});
})