var fs = require('fs');

var docService = require('../service/docService');

//index/index.html
function indexAction(req, res, view){
	view.getView(res);
}

//index/json
function jsonAction(req, res, view){
	docService.getAllList(function(data){
		view.getJson(res, data);
	});
}

module.exports.indexAction = indexAction;
module.exports.jsonAction = jsonAction;