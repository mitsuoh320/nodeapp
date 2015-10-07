
//setteings
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session =require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');
var app = express();
var methodovr=require('method-override');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/images')));



app.use(methodovr('_method'));



//ログイン機能
app.use(session({
	secret: 'secret',
	//store
	store: new MongoStore({
        db: 'session',
        host: 'localhost',
	clear_interval: 60 * 60
       	}),

       cookie: {
        httpOnly: false,  
   	maxAge: new Date(Date.now() + 60 * 60 * 1000)	
       }

})); //追加

var loginCheck = function(req, res, next) {
	    if(req.session.user){
        console.log('next');
  	//Node特有の書き方、ルーティングが一致する処理に引き渡す
	next();
     }else{ 
      	console.log('logincheck done');
	     res.redirect('/login');
      // res.render('login');
     }
};


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



//ルーティング設定
app.get('/login',post.login);
app.get('/',loginCheck, post.index);
app.get('/posts/:id([0-9]+)',post.show);
app.post('/useradd',post.useradd);
app.get('/posts/new',post.newtips);
app.post('/posts/create',post.create);
app.get('/posts/:id/edit',post.edit);
app.put('/posts/:id',post.update);
app.delete('/posts/:id',post.destroy);

//ログアウト
app.get('/logout', function(req, res){
	  req.session.destroy();
	    console.log('deleted sesstion');
	   // res.render('login');
	  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen("3000");

module.exports = app;
