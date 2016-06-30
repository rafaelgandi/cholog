// See: http://expressjs.com/en/guide/routing.html

var wasabi = require(_m('wasabi/base')),
	path = require('path'),
	NamedRouter = require('named-routes'); // See: https://github.com/alubbe/named-routes

function Routes(app) {
	this.app = app;
	this.router = new NamedRouter();
	this.router.extendExpress(this.app);
	this.router.registerAppHelpers(this.app);
}

Routes.prototype.route = function (_name) {
	return this.app.namedRoutes.build(_name);
};

Routes.prototype.init = function () {
	// NOTE: you can also separate your routes.
	// See: http://expressjs.com/en/4x/api.html#router
	this.app.all('/', 'home', wasabi.controller('ChologController@home', this.app));
	this.app.all('/info', 'info', wasabi.controller('BaseController@info', this.app));
	this.app.post('/save', 'save', wasabi.controller('ChologController@save', this.app));
	this.app.all('/wasabi/get/logs', 'wasabi_get_logs', wasabi.controller('WasabiController@getLogs', this.app));
	// Set 404 here //
	this.app.use(wasabi.controller('BaseController@notFound404', this.app));
};

module.exports = Routes;