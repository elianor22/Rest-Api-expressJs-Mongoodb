var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv')

// import third Party
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')

// import Router
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const categoryRouter = require('./src/routes/category')
const itemRouter = require('./src/routes/item')

var app = express();

// using cors
app.use(cors())


dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD)

// connect to mongodb
mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("connect mongodb Success");
  }
);

// use multer

// const fileStorege = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// app.use(
//   multer({ storage: fileStorege, fileFilter: fileFilter }).single("photo")
// );


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, )));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter)
app.use('/item', itemRouter)

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
