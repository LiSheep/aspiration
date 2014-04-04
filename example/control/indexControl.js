var fs = require('fs');

var docService = require('../service/docService');

//index/index.html
//result is the object of router's reuslt(include the control, service, params)
function indexAction(req, res, view, result){
	console.log(result.params);
	//view.getView(res);
}

//index/json
function jsonAction(req, res, view, result){
	docService.getAllList(function(data){
		view.getJson(res, data);
	});
}

module.exports.indexAction = indexAction;
module.exports.jsonAction = jsonAction;