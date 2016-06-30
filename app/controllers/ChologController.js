var util = require('util'),	
	wasabi = require(_m('wasabi/base')),
	xplog = require(_m('wasabi/xplog')),
	BaseController = require(_m('controllers/BaseController')),
	ChologBase = require(_m('cholog/base'));

function ChologController(app) {
	BaseController.call(this);
	this.app = app	
}	
// See: https://nodejs.org/docs/latest/api/util.html#util_util_inherits_constructor_superconstructor	
// See: http://metaduck.com/08-module-pattern-inheritance.html
util.inherits(ChologController, BaseController);

ChologController.prototype.home = function (req, res) {
	var _this = this;
	ChologBase.getNotes(function (notes) {
		//console.log(notes);
		res.render('index', {
			title: 'Cholog hoooray!',
			app: _this.app,
			fullUrl: wasabi.getUrl(req),
			notes: notes
		});
		//xplog('Get notes!!!', arguments.callee);
	});
	
}

ChologController.prototype.save = function (req, res) {
	// See: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
	ChologBase.saveNotes(req.body['notes'], function () {
		xplog('A save happened', {
			filename: __filename,
			req: req
		});
		res.json({
			success: true
		});
	});	
}

module.exports = ChologController;