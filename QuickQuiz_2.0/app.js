var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const { connectToDB } = require('./models/db');

var indexRouter = require('./routes/index'); // Home route
var quizRouter = require('./routes/quiz'); // Quiz route
var resultsRouter = require('./routes/results');
var userRouter = require('./routes/user');
var signupRouter = require('./routes/signup');


var app = express();
(async () => {
  try {
    await connectToDB();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to start database:', error);
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// In app.js
app.use('/routes', express.static(path.join(__dirname, 'routes')));


// Define routes
app.use('/', indexRouter); // Home route
app.use('/quiz', quizRouter); // Quiz route
app.use('/results', resultsRouter);
app.use('/user', userRouter);
app.use('/signup', signupRouter);

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

//

module.exports = app;
