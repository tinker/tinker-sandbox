'use strict';

module.exports = {
	// markup
	html: require('./noop'),
	jade: require('./jade'),

	// style
	css: require('./noop'),
	scss: require('./scss'),

	// behavior
	js: require('./noop'),
	coffeescript: require('./coffeescript')
};
