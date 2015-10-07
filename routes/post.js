
//モデルの読み込み
var model = require('../model.js'),
	    User  = model.User;


var allpost=[
	{title:'title1',body:'body1'},
	{title:'title2',body:'body2'},
	{title:'title3',body:'body3'}
	];




/*ログイン機能*/



exports.login = function(req, res){
	var email    = req.query.email;
	var password = req.query.password;
	var query = { "email": email, "password": password };
	
	//Userテーブルの中で合致するものを検索	
	User.find(query, function(err, data){
	if(err){
       console.log(err);
          }           
	if(data == ""){
	console.log('not logined');	
	

	//res.render('login');
	
	//res.render('test');

	res.render('quickstart');
	}else{
           req.session.user = email;
	   console.log('exp login');
	   res.redirect('/');
      }	
});
};

/*ユーザー登録機能*/
exports.useradd = function(req, res){
	 var newUser = new User(req.body);
	 newUser.save(function(err){
		 if(err){console.log(err);
			 res.redirect('back');
	        }else{
	          res.redirect('/');
          }
        });
};


exports.index=function(req,res){
console.log("index");
res.render('posts/index',{allpost:allpost});
console.log(req.session.user);
};


exports.show=function(req,res){
console.log("show");
res.render('posts/show',{post:allpost[req.params.id]});
};

exports.edit=function(req,res){
res.render('posts/edit',{post:allpost[req.params.id],id:req.params.id});
};

exports.update=function(req,res){
//console.log("VVV update");

allpost[req.body.id]={
	title: req.body.title,
	body: req.body.body
	};
console.log("update");
//res.render('posts/new');
res.redirect('/');
};


exports.newtips=function(req,res){
res.render('posts/new');
};


exports.create=function(req,res){
/*var post ={
title :req.body.title,
body:req.body.body
};
*/
//allpost.push(post);
allpost.push({title:req.body.title,body:req.body.body});
//res.render('posts/create');//,{post:allpost[allpost.length-1]});
res.redirect('/');//,{allpost:allpost});
};



exports.destroy=function(req,res){
//console.log("VVV update");

allpost.splice(req.body.id,1);
console.log("destory done...");
//res.render('posts/new');
res.redirect('/');
};



/*
export.create=function(req,res){
res.render('index');

}

export.=function(req,res){
res.render('index');

}

*/
