var environments = require('../env.json'),
	env = (function () {
		var dir = __dirname;
		if (dir.indexOf('cholo.git') > -1) {
			return environments['local'];
		}
		else if (dir.indexOf('/app-root/') > -1) {
			return environments['dev'];
		}
	})();

var config = {
	server: {
		// Openshift Account 
		// https://www.openshift.com/
		// un: rafaelgandi@gmail.com 
		// pw: ******** <-- the usual
		// See: https://blog.openshift.com/run-your-nodejs-projects-on-openshift-in-two-simple-steps/
		port: function () { return process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8888; },		
		ipaddress: function () { return process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; } 
	}
};
module.exports = config;