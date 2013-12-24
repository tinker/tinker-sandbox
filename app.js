'use strict';

var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	config = require('./lib/config'),
	argv = require('optimist').argv,
	decode = require('base64').decode,
	flow = require('finally'),
	compilers = require('./lib/compilers');

if (!config.load(__dirname + '/config.json')){
	console.log('Failed to load config file');
	process.exit(1);
}

var app = express()
	.engine('html', cons.swig)
	.set('view engine', 'html')
	.set('views', __dirname + '/views')
	.use(express.static(__dirname + '/public'))
	.use(express.bodyParser());

if (app.settings.env == 'development'){
	swig.setDefaults({cache: false});
}

app.post('/', function(req, res){
	var tinker = req.body.tinker,
		locals = {};

	flow(
		function(){
			compilers[tinker.markup.mode](decode(tinker.markup.body), this.done);
		},
		function(){
			compilers[tinker.style.mode](decode(tinker.style.body), this.done);
		},
		function(){
			compilers[tinker.behavior.mode](decode(tinker.behavior.body), this.done);
		}
	).finally(function(error, html, css, js){
		if (error){
			console.log(error);
		}
		locals.tinker = {
			code: {
				html: html,
				css: css,
				js: js
			}
		};
		res.render('index', locals);
	});
});

var port = parseInt(argv.p, 10) || config.port || 3001;
app.listen(port, function(){
	console.log('Listening on port %d', port);
});

