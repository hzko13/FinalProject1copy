/* installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();

// creata a user model instance
let userModel = require('../models/user');
let user = userModel.User;

// config mongoDB
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to DB URI 

mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', (e) => console.log(`Ran into an unhandled error: ${e}`));
mongoDB.once('open', ()=> {
  console.log('connected to the MongoDB');})

// set-up Express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))

// serialize and deserialize the user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//initialize flash
app.use(flash());



const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const booksRouter = require('../routes/book');


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter); // localhost:3000
app.use('/users', usersRouter); // localhost:3000/users
app.use('/book-list', booksRouter);

// catch 404 and forward to error 
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
  res.render('error',
  {
    title:"Error"
  }
  );
});

module.exports = app;
