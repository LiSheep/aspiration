var fs = require('fs');

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
			'Content-Type': 'text/html'
		});
		res.end(JSON.stringify(data)+"\0");
	}
}


module.exports = viewrender;