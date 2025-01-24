var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // NEW: for session handling
require("dotenv").config();
const { connectToDB } = require('./models/db');

// Routers
var userRouter = require('./routes/user');
var quizRouter = require('./routes/quiz');
var resultsRouter = require('./routes/results');
var registerRouter = require('./routes/register');
var indexRouter = require('./routes/index');
var statsRouter = require('./routes/stats'); // NEW
var loginRouter = require('./routes/login');

var app = express();

// Initialize DB
(async () => {
  try {
    await connectToDB();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to start database:', error);
  }
})();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// NEW: Configure express-session
app.use(
  session({
    secret: 'someSuperSecretKey',  // Replace with an actual secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set secure: true if using HTTPS
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/', userRouter);           // Login and user routes at '/'
app.use('/index', indexRouter);     // Index page
app.use('/register', registerRouter);
app.use('/quiz', quizRouter);
app.use('/results', resultsRouter);
app.use('/stats', statsRouter);     // NEW: Stats route
app.use('/login', loginRouter);

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
