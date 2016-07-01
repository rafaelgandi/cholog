var jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack 

var xplog = function (_msg, _data) {
	var nl = "\n",
		data = {},
		MESSAGE = '',
		date = new Date(),
		time = [
			[date.getFullYear(),date.getMonth(), date.getDate()].join('-'),		
			[date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
		].join(' ');
	data.msg = _msg.trim();
	if (typeof _data == 'object') {
		if (!! _data.req) {
			data.uri = _data.req.originalUrl;
			data.method = _data.req.method;
			data.ip = _data.req.ip;
		}
		if (!! _data.filename) { data.filename = _data.filename; }
	}	
	else { data.filename = _data; }
	MESSAGE = nl + 'INFO - ' + time + ' --> ' + JSON.stringify(data);
	console.log(MESSAGE);
	jetpack.append(xplog.logFile, MESSAGE, {
		mode: '777'
	});
};

xplog.logFile = __base + '/app/storage/debug.log';

module.exports = xplog;