var fs = require('fs');
var colors = require('colors')
function viewrender(vdir){
	this.viewDir = vdir;
	this.getView = function(res){
		fs.readFile(this.viewDir, function(err, data){
			if(err){
				res.writeHead(404,{
					'Content-Type': 'text/html'
				});
				console.log(err);
			}else{
				res.writeHead(200,{
					'Content-Type': 'text/html'
				});
				res.end(data);
			}
		});
	},
	this.getJson = function(res, data){
		res.writeHead(200,{
			'Content-Type': 'text/json'
		});
		res.end(JSON.stringify(data));
	},
	this.getOthers = function(res, dir){
		console.log(dir);
		fs.readFile(dir, function(err, data){
			if(err){
				console.log(err.red);
			}else{
				res.writeHead(200);
				res.end(data);
			}
		});
	}
}

viewrender.getPublicPage = function(res, page){
	// TODO: public page need propertites config
}


module.exports = viewrender;