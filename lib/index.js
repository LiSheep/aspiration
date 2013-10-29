var http = require('http')
,	colors = require('colors')
,	fs = require('fs')
,	path = require('path');

var router = require('./router')
,	viewrender = require("./viewrender")
,	dao = require('./dao');

function startServer(ip, port, webRoot){
	console.log("server starting at "+ip+":"+port);
	
	var root = webRoot
	,	webRoot = path.join(root, "view")+"/"
	,	ctrlRoot = path.join(root,"control")+"/"
	,	daoRoot = path.join(root,"dao")+"/"
	,	jdbcRoot = path.join(root,"jdbc")+"/";

	http.createServer(function(req, res){		
		router.parse(req.url, function(result){
			try{
				var control = require(ctrlRoot + result.control);
				// console.log(ctrlRoot + result.control);
				// var render = new viewRender(webRoot+result.viewName+"/"+result.viewHTML)
				var render = new viewrender(webRoot+result.viewName+"/"+result.viewHTML);
				console.log('control.'+result.action+'(req, res, render)');
				eval('control.'+result.action+'(req,res, render)');
			}
			catch(e){
				console.log(e.toString());
			}
		});
	}).listen(port, ip);
	
	console.log("server started success");
}


module.exports.startServer = startServer;
module.exports.dao = dao;