
var map = require('true-map');
function parse(url, routeHandle){
	
	var result = {};
	var params = new map();
	console.log(url);
	
	result.viewName = "index";		//defalut
	result.control = "indexControl";//defalut
	result.action = "indexAction";	//defalut
	result.actionName = "index";	//defalut
	result.params = params;
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
		arr[3].split('&').forEach(function(p){
			var m = p.split(/([\d\w_]*)\=(\S*)/);
			if(m.length == 4)
				params.set(m[1], m[2]);
		});
	}

	routeHandle(result);
}


module.exports.parse = parse;
