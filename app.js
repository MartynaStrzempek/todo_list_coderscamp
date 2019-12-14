/** NEW */
var cons = require('consolidate');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser")


/** NEW */
var mongo = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
/** NEW */
/*app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));*/

//test
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var toDo = [
  "test 1",
  "test2"
]

app.get("/", function(req, res){
  res.render("index.ejs", {toDo: toDo})
});



//submit route
app.post("/newtodo", function(req, res){
  console.log("item added");
  var item = req.body.item;
  toDo.push(item);
  res.redirect("/");
})

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.listen(3001, function(){
  console.log("serwer connected")
})

//end
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error.ejs');
});

module.exports = app;
