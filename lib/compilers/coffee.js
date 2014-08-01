'use strict';

var CoffeeScript = require('coffee-script');

/**
 * Convert coffeescript to js
 * @param {String} input
 * @param {Function} callback
 */
module.exports = function(input, callback){
	var compiledCode = CoffeeScript.compile(input, {
		bare: true
	});
	callback(null, compiledCode);
};
