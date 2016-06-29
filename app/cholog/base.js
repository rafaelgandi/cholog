var jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack

function Base() {
	this.chologFile = __base + '/app/storage/cholog.txt';
	jetpack.file(this.chologFile, {
		mode: '777'
	});
}

Base.prototype.getNotes = function (_callback) {
	var read = jetpack.readAsync(this.chologFile);
	read.then(_callback);
};

Base.prototype.saveNotes = function (_notes, _callback) {
	var save = jetpack.writeAsync(this.chologFile, _notes, {
		atomic: true
	});
	save.then(_callback);
};

module.exports = new Base();