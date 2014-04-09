'use strict';

var sass = require('node-sass');

/**
 * Convert scss to css
 * @param {String} input
 * @param {Function} callback
 */
module.exports = function(input, callback){
	sass.render({
		data: input,
		success: function(output){
			callback(null, output);
		},
		error: function(error){
			callback(error);
		}
	});
};
