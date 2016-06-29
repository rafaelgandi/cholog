/*
	See: https://www.terlici.com/2014/08/25/best-practices-express-structure.html
	See: https://gist.github.com/lancejpollard/1398757
	// How to uninstall a module //
	See: http://stackoverflow.com/questions/13066532/how-to-uninstall-npm-modules-in-node-js
*/
// See: https://gist.github.com/branneman/8048520	
global.__base = __dirname;
global._m = function (_mod) {
	return __base + '/app/' + _mod;
};
var express = require('express'), // See: http://expressjs.com/
	config = require('./app/config'),
	wasabi = require('./app/wasabi/base'),
	path = require('path'),
	app = express();
	
function Boot() {
	this.IPADDRESS = config.server.ipaddress();
	this.PORT = config.server.port();
}

Boot.prototype.runMiddlewares =  function () {
	var bodyParser = require('body-parser');
	// See: http://expressjs.com/en/guide/using-middleware.html
	app.set('view engine', 'ejs'); // See: http://ejs.co/
	app.set('views', __dirname + '/app/views');	
	// See: http://expressjs.com/en/starter/static-files.html
	app.use(express.static(path.resolve(__dirname, 'app/public')));
	// See: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
	return this;
};

Boot.prototype.setUpVariables = function () {
	var LOCALHOST = '127.0.0.1';
	//  Set the environment variables we need.
	if (this.IPADDRESS == LOCALHOST) {
		//  Log errors on OpenShift but continue w/ 127.0.0.1 - this
		//  allows us to run/test the app locally.
		console.warn('No OPENSHIFT_NODEJS_IP var, using ' + this.IPADDRESS);
	};
	return this;
}


Boot.prototype.setRoutes = function () {
	var Routes = require('./app/routes');
	new Routes(app).init();		
	return this;
};

Boot.prototype.startServer = function () {
	var _this = this;
	app.listen(this.PORT, this.IPADDRESS, function () {
	  console.log('Current app listening on port ' + _this.PORT);
	  console.log('Environment: ' + app.get('env'));
	  console.log('Dir Name: ' + __dirname);
	  //console.log('Dir Name 2: ' + path.resolve(__dirname, 'app/public'));
	});
	return this;
};

// Run
new Boot()
.setUpVariables()
.runMiddlewares()
.setRoutes()
.startServer();