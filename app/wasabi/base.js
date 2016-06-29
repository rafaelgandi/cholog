var path = require('path');

function Wasabi() {}

Wasabi.prototype.controller = function (_nameAndMethod, app) {
	var parts = _nameAndMethod.trim().split('@'),
		Controller = require(__base + '/app/controllers/' + parts[0].trim()),
		instance;		
	return function (req, res, next) {
		instance = new Controller(app);	
		instance[parts[1].trim()](req, res, next);
	}
};

Wasabi.prototype.getUrl = function (_req) {
	// See: http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
	return _req.protocol + '://' + _req.get('Host').replace(/\/$/, '');
	//return _req.protocol + '://' + _req.hostname.replace(/\/$/, ''); // <-- Does not include the port
};

Wasabi.prototype.getCurrentFullUrl = function (_req) {
	return this.getUrl(_req) + _req.originalUrl;
};

module.exports = new Wasabi;