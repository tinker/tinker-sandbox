'use strict';

var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	decode = require('base64').decode;

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
	var locals = {};
	locals.tinker = {
		code: {
			html: decode(req.body.tinker.markup.body),
			css: decode(req.body.tinker.style.body),
			js: decode(req.body.tinker.behavior.body)
		}
	};
	res.render('index', locals);
});

app.listen(4001, function(){
	console.log('Listening on port 4001');
});

