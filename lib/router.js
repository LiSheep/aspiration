
// var map = require('true-map');

var murl = require('url');


function parse(url, routeHandle){
	
	var result = {};
	
	result.viewName = "index";		//defalut
	result.control = "indexControl";//defalut
	result.action = "indexAction";	//defalut
	result.actionName = "index";	//defalut
	result.params = {};
	//deal url	
	regx = /(?:\/)([\w\d_]*){0,1}(?:\/){0,1}([\w\d_]*){0,1}(?:\?){0,1}([\S]*){0,1}/;

	var arr = regx.exec(url); 

	if(arr[1] != undefined){
		result.viewName = arr[1];
		result.viewHTML = arr[1]+".html";
		result.control = arr[1]+"Control";
	}
	if(arr[2] != undefined){
		result.action = arr[2]+"Action";
		result.actionName = arr[2];
	}
	if(arr[3] != undefined){		
		result.params = murl.parse(url, true).query;
	}

	routeHandle(result);
}


module.exports.parse = parse;
