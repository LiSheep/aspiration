var fs = require('fs');

function indexAction(req, res, view, result){

	res.writeHead(200);
	fs.readFile(__dirname+"/fav.ico", function(err, data){
		if(err){
			console.log(err);
			return;
		}
		res.end(data);
	});

}

module.exports.indexAction = indexAction;