const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/database");
const seedDatabase = require("./util/seedDatabase");
// error handler

// setup app
const app = express();
require("dotenv").config();

const AppError = require("./util/appError");
const globalErrorHandler = require("./controllers/errorController");
// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Routers
const userRouter = require("./routes/userRoutes");
const ratingRouter = require("./routes/ratingRoutes");
const gameRouter = require("./routes/gameRoutes");
const postRouter = require("./routes/postRoutes");

// ROUTE MOUNTS
// app.use("/api/v1/games", gameRouter);
app.use("/gamer8/api/v1/users", userRouter);
app.use("/gamer8/api/v1/ratings", ratingRouter);
app.use("/gamer8/api/v1/games", gameRouter);
app.use("/gamer8/api/v1/posts", postRouter)

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
app.use("/gamer8/api", limiter);

// global error handler
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server.`, 404));
});

// EXPRESS's error handling middleware
app.use(globalErrorHandler);

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("DB synced");
    await seedDatabase();
  })
  .catch((err) => {
    console.log("Error syncing the database:", err.message);
  });

module.exports = app;
