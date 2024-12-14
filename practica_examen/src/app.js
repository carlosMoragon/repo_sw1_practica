var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
//var usersRouter = require('./routes/users');

var app = express();

app.use(
  session({
      secret: 'mi_secreto', // Cambia esto por algo más seguro
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Cookie expira en 60 segundos
  })
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "Práctica de examen";
app.locals.cookies = false;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', check_login, indexRouter);
app.use('/chat', restricted, check_login, chatRouter);
app.use('/login', check_login, loginRouter);
//app.use('/users', usersRouter);

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}
function check_login(req, res, next) {
  res.locals.islog = req.session.user ? true : false;
  if(req.session.user){
    res.locals.username = req.session.user.username;
  }else{
    res.locals.username = null;
  }
  
  next();
}

app.post('/savecookie', (req, res) => {
  req.session.cookies = true;

  app.locals.cookies = req.session.cookies;

  res.json({message: "cookies saved"});
  console.log("COOKIES SAVED");

  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
