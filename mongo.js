var MongoClient=require('mongodb').MongoClient,settings=require('./settings');

//var mongoose = require('mongoose');

MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
if(err){
return console.dir(err);
}






console.log("connect db");

});

// Modelの定義
var UserSchema = new mongoose.Schema({
     email    : String,
     password  : String
     },{collection: 'info'});

exports.User = db.model('User', UserSchema);
