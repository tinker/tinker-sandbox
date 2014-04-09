'use strict';

var jade = require('jade');

/**
 * Convert jade to html
 * @param {String} input
 * @param {Function} callback
 */
module.exports = function(input, callback){
	jade.render(input, callback);
};
