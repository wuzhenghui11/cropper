var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var os = require('os');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//获得电脑IP地址
var getIPAddress = function(){
  var interfaces = os.networkInterfaces();
  for(var i in interfaces){
    var iface =interfaces[i];
    for(var l = 0; l  < iface.length; l++){
      var alias = iface[l];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}
console.log("server running at http://" + getIPAddress() + ":3000 ---express" );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 不使用HTML
// app.set('view engine', 'ejs');
// 自定义后缀名 改成.html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', routes);
app.use('/users', users);
app.use('/getData', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
