var fs = require('fs');


//index/index.html
function indexAction(req, res, view){

	res.writeHead(200);
	view.getView(res);

}

function jsonAction(req, res, view){
	res.writeHead(200);
	var data = {"name":"ltc","age":20};
	view.getJson(res, data);
}

module.exports.indexAction = indexAction;
module.exports.jsonAction = jsonAction;