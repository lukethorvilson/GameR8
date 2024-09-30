const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Routers
const userRouter = require("./routes/userRoutes");
const ratingRouter = require("./routes/ratingRoutes");
const gameRouter = require("./routes/gameRoutes");
const authRouter = require("./routes/authRoutes");

// setup app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();

// ROUTE MOUNTS
// app.use("/api/v1/games", gameRouter);
app.use("gamer8/api/v1/users", userRouter);
app.use("gamer8/api/v1/ratings", ratingRouter);
app.use("gamer8/api/v1/games", gameRouter);
app.use("gamer8/api/v1/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// only use logger when in development env
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

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
