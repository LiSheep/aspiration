var colors = require("colors");

var myjdbc = require("./myjdbc");

var dao = {
	update:_update,
	select:_select,
	count:_count
}

//resultHandle(changedRows)
function _update(sql, args, resultHandle){
	myjdbc.exequery(sql, args, function(err, rows){
		if(err){
			console.log(err.toString().red);
			resultHandle(0)
			return;
		}
		resultHandle(rows.changedRows);
	});
}

//resultHandle(result) result == null if error
function _select(sql, args, resultHandle){
	myjdbc.exequery(sql, args, function(err, result){
		if(err){
			console.log(err.toString().red);
			resultHandle(null);
			return;
		}
		resultHandle(result);
	});
}

// resultHandle(counts) if error = -1
function _count(sql, args, resultHandle){
	myjdbc.exequery(sql, args, function(err, result){
		if(err){
			console.log(err.toString().red);
			resultHandle(-1);
		}
		resultHandle(result[0]);
	});

}

module.exports = dao;