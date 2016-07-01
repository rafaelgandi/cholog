var util = require('util'),
	wasabi = require(_m('wasabi/base')),
	path = require('path');

function BaseController(app) {
	this.app = app;
	console.log('!!!!!!!!!! from base controller !!!!!!!!!!');
}

BaseController.prototype.info = function (req, res) {
	//console.log(util.inspect(req));
	//console.log(util.inspect(req.headers));
	//console.log(util.inspect(req.params));
	//console.log(util.inspect(req.query));
	res.render('info', {
		title: 'Node Information',
		dirname: path.resolve(__dirname),
		filename: __filename,
		originalUrl: req.originalUrl,
		method: req.method,
		expressEnv: this.app.get('env'),
		url: wasabi.getUrl(req),
		fullUrl: wasabi.getCurrentFullUrl(req),
		basePath: __base,
		app: this.app
	});
}

BaseController.prototype.notFound404 = function (req, res) {
	// See: http://expressjs.com/en/starter/faq.html
	// See: http://expressjs.com/en/guide/using-middleware.html
	res.status(404).render('404', {
		title: '404 nothing found'
	});
};

BaseController.prototype.testing = function () {
	return this.app;
};

module.exports = BaseController;