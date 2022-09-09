var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");

// import third Party
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


// import middleware
const authJwt = require("./src/middleware/auth/jwt")
const errorHandler = require("./src/middleware/auth/errorHandler")

// import Router
var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/adminRoutes/users");
const categoryRouter = require("./src/routes/adminRoutes/category");
const productRouter = require("./src/routes/adminRoutes/product");
const orderRouter = require("./src/routes/adminRoutes/order")

var app = express();




dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

// connect to mongodb
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("connect mongodb Success");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(authJwt())
app.use(errorHandler)

app.use(express.static(path.join(__dirname)));

// Router
app.use("/", indexRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order",orderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
