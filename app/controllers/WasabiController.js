var util = require('util'),	
	wasabi = require(_m('wasabi/base')),
	xplog = require(_m('wasabi/xplog')),
	jetpack = require('fs-jetpack'),
	BaseController = require(_m('controllers/BaseController'));

function WasabiController(app) {
	BaseController.call(this);
	this.app = app
}

WasabiController.prototype.getLogs = function (req, res) {
	var logFile = __base + '/app/storage/debug.log';
	jetpack.readAsync(logFile).then(function (logs) {
		// See: http://expressjs.com/en/4x/api.html#res.type
		res.type('text/plain');
		res.send(logs);
	});
};
module.exports = WasabiController;