/*
 _   _                     _                 _ 
| | | |                   | |               | |
| |_| | ___  _   _        | |__   ___  _   _| |
|  _  |/ _ \| | | |       | '_ \ / _ \| | | | |
| | | | (_) | |_| |_ _ _  | | | | (_) | |_| |_|
\_| |_/\___/ \__, (_|_|_) |_| |_|\___/ \__, (_)
              __/ |                     __/ |  
             |___/                     |___/  Gumiho 
*/
var jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack
var config = require(_m('config'));
var Pusher = require('pusher');

function Base() {
	this.chologFile = __base + '/app/storage/cholog.txt';
	jetpack.file(this.chologFile, {
		mode: '777'
	});	
	this.pusher = new Pusher(config.realtime.pusher);
}

Base.prototype.getNotes = function (_callback) {
	var read = jetpack.readAsync(this.chologFile);
	read.then(_callback);		
};

Base.prototype.saveNotes = function (_notes, _callback) {
	var save = jetpack.writeAsync(this.chologFile, _notes, {
			atomic: true
		}),
		_this = this;
	save.then(function () {
		_this.pusher.trigger(config.realtime.channel, 'save', {
			notes: _notes
		});
		_callback();
	});
};

module.exports = new Base();