
var bigdowner = require('./bigdowner');
var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'file', filename: '/root/nodefs/nodefs.log', category: 'nodefs' }
  ]
});

var logger = log4js.getLogger('nodefs');

function downAction(req, res, view, result){
	var date = result.params.date 	  //时间
	,	fname = result.params.fname   //文件目录存储的名字
	,	rname = result.params.rname;  //文件下载保存的名字

	if(date && rname && fname){
		var downer = new bigdowner();
		downer.down("/node/"+date+"/"+fname, res,  rname, {countLimit:10, speed:7168000, buffsize:7168000}, 
			function(err){
				if(err == "nocount"){
					view.getView(res);
					return;
				}else if(err.code == 'ENOENT'){
					res.end("no such file");
				}else{
					logger.error(err);
				}
		});
	}
	else{
		res.end("未指定要下载的文件");
	}

}

function countAction(req, res, view, result){
	var d = new bigdowner
	var data = {count:d.getCount()}
	view.getJson(res, data);
}

module.exports.downAction = downAction;
module.exports.countAction = countAction;
