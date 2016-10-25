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
		// pw: ********* <-- the usual
		// See: https://blog.openshift.com/run-your-nodejs-projects-on-openshift-in-two-simple-steps/
		port: function () { return process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8888; },		
		ipaddress: function () { return process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; } 
	},
	
	realtime: {
		// https://dashboard.pusher.com
		// un: rafael@sushidigital.com.au
		// pw: lea****123
		pusher: {
			appId: '225006',
			key: 'c1972e8943792cb40206',
			secret: '18ddb562f9d735e03936',
			encrypted: true
		},
		channel: 'cholog'
	},
	
	dropbox: {
		appKey: 'epboops64g6zctu',
		appSecret: 'trd6zo0a0renaq1',
		accessToken: 'g3V5-J5idpsAAAAAAAAA36YxR5636jEVjxYkrh3lUgkykmEeUPW-IzEWgeVcOggU'
	}
};
module.exports = config;