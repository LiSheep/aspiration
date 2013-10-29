
var dao = require('../../lib/dao');

var docDao = {
	getAllList:_getAllList
}

//resHandle(res)
function _getAllList(resHandle){
	
	dao.select("select * from s_user", null, function(res){
		resHandle(res);
	});	

}

module.exports = docDao;