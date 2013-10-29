var myjdbc = require('../lib/myjdbc');


// myjdbc.exequery("select * from user where userName = ? ", ['1'], function(err, rows){
// 	if(err){
// 		console.log(err);
// 	}
// 	console.log(rows);
// });


var dao = require("../lib/dao");

// dao.update("update user SET userName = ?", ['3'], function(changedrows){

// });

// dao.select("select * from user where userName = ? ", ['3'],function(rows){
// 	console.log(rows);
// });

dao.select("select * from user where userName = ?",['3'], function(result){
	console.log(result);
});