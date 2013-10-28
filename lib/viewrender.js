var fs = require('fs');

function viewrender(vdir){
	this.viewDir = vdir;
	this.getView = function(res){
		fs.readFile(this.viewDir, function(err, data){
			
			if(err){
				console.log(err);
			}else{
				res.end(data);
			}
		});
		
	},
	this.getJson = function(res, data){
		res.end(JSON.stringify(data))
	}
}


module.exports = viewrender;