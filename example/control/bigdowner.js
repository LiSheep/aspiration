
var fs = require('fs')
, http = require('http')
, mime = require('mime');

var opt = {
	flags:'r'//,
	//encoding:'utf-8',
};

var count = 0;	//下载个数计数器
function downer(){
 	this.getCount = function(){
 		return count;
 	}
 	this._addCount= function(){
 		++count;
 	}
 	this._subCount = function(){
 		--count;
 	}
 }

 // callback(err)
 downer.prototype.down = function (path, wstream, filename, opt, callback){
	
	var that = this;
	
	var buffsize = 1024*300;
	var speed = 1024*300;
	var countLimit = 0;

	if(callback == null || 'function' != typeof callback){
		callback = function(err){console.log(err);}
	}
	

	if(opt != null){

		buffsize = (opt.buffsize || buffsize);
		speed = (opt.speed || speed);
		if(speed < buffsize){
			buffsize = speed;
		}
		countLimit = (opt.countLimit) || countLimit;
	}
	if(count >= countLimit ){
		callback("nocount");
		return;
	}

	fs.open(path, 'r', function(err, fd){
		if(err){
			// console.log(err);
			callback(err);
			return;
		}

		//error handle.
		wstream.on('close',function(){//用户中断
			that._subCount();
			clearInterval(id);
			fs.close(fd);
			// console.log("wstream close");
		});
		that._addCount();

		var id = 0;
		fs.fstat(fd, function(err, stats){
			if(err){
				callback(err);
				return;
			}
			var filesize = stats.size;
			
			var httphead = {
				'Content-Type':mime.lookup(path)+';charset=utf8',
				'Content-Length':filesize,
				'Content-Disposition': getDisposition(filename)
			}

			var position = 0;
			wstream.writeHead(200, httphead);
			
			var buff = new Buffer(buffsize);
			id = setInterval(function(){
				var quta = speed;
				// console.log("interval begin...speed:"+speed+"buffersize:"+buffsize);
				while(quta){
					var tag = 0;	//是否下载完成
					// console.log("write to: "+fd+" quta: "+quta+" position: "+position);
					bytesRead = fs.readSync(fd, buff, 0, buff.length, null);
					wstream.write(buff);
					position += bytesRead;
					quta -= bytesRead;
					if(bytesRead < buff.length){
						wstream.end();
						fs.close(fd);
						that._subCount();
						clearInterval(id);
						break;
					}
				}
			}, 1000);	//end setInterval
		});		//end fstat
		
	});

}



function getSize(path){
	return fs.statSync(path).size;
}

function getDisposition(filename){
	return "attachment;filename*=UTF-8''"+encodeURIComponent(filename);
}

function getCount(){
	return count;
}

function readConfig(){
	var data = fs.readFileSync(__dirname+'/config.json');
	var	myConfig = JSON.parse(data);
	return myConfig;
}

module.exports = downer;
