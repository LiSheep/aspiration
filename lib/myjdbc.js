var mysql = require('mysql');

var _pool = null;

var myjdbc = {
	exequery:_exequery,
}

function getPool(){
	if(!_pool){
			console.log("mysql pool init...");
			_pool = mysql.createPool({
			user:"root",
			password:"root",
			host:"172.18.99.196",
			database:"team1956",
			insecureAuth: true
		});
	}
	return _pool;
}

//getResult(err, result)
function _exequery(sql, args, getResult){
	getPool().getConnection(function(err, connection){
		if(err){
			getResult(err);
			connection.release();
			return;
		}		
		var query = connection.query(sql, args, function(err, rows){
			getResult(null, rows);
			connection.release();
		});
		// console.log(query.sql);
	});
}

module.exports = myjdbc;