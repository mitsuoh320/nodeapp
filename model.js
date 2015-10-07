

//var MongoClient=require('mongodb').MongoClient,settings=require('./settings');

var mongoose = require('mongoose');


// settings で設定したdbに接続
/*MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
	if(err){
		return console.dir(err);
	}
	console.log("connect db");

});

//console.log('dbs='+mdb);

mdb.open(function(err, mdb) {
var db=mdb.db(settings.db);
var scm=db.collection('info',function(err){
	console.log(settings.db);


	if(err){
		console.log('ERROER');

	}
	else{
	console.log('SUCCESS');

	}
});
});

*/
// dbの作成
var url = 'mongodb://localhost/user';

//connectionをはる
var db  = mongoose.createConnection(url, function(err, res){
	console.log(url);
	if(err){
		console.log('Error connected: ' + url + ' - ' + err);

	}else{
		console.log('Success connected: ' + url);
	}
});


// Modelの定義
var UserSchema = new mongoose.Schema({
	email    : String,
	password  : String
},{collection: 'info'});
//User→mongooseのインスタンス名、collection名ではない

exports.User = db.model('Users', UserSchema);

//var con=conn.model('Users');


