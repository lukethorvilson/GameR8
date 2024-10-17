const Rating = require("../models/ratingModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getAllRatings = catchAsync(async (req, res) => {
  let ratings;
  if (req.query?.gameId) {
    ratings = await Rating.findAll({
      where: {
        gameId: req.query.gameId,
      },
    });
  } else {
    console.log("here");
    ratings = await Rating.findAll();
  }

  if (ratings || ratings?.length >= 0) {
    res.status(200).json({
      status: "success",
      results: ratings.length,
      body: {
        ratings,
      },
    });
  }
});

exports.postRating = catchAsync(async (req, res, next) => {
  // first get the user from the req object
  const { user } = req;
  // checking if the user exists, if not then the user must not be autheniticated
  if (!user || !user?.id) {
    return next(
      new AppError(
        "Please authenticate before making a rating to this game! Thank you!",
        401
      )
    );
  }
  // get the rating, check for at least the rating number(minimum req for rating a game)
  const { title, description, rating, gameId, gameName } = req.body;
  if (!rating || !gameId) {
    return next(
      new AppError(
        "Please make sure to submit a R8 score with your game rating. Thank you!",
        400
      )
    );
  }
  const userRatingCount = await Rating.count({
    where: {
      userId: user.id,
      gameId: gameId,
    },
  });
  console.log(userRatingCount);
  if (userRatingCount > 0) {
    return next(
      new AppError("User already has a rating under this game!", 400)
    );
  }
  // create the new rating if the data received is valid
  const newRating = await Rating.create({
    title,
    description,
    rating,
    userId: user.id,
    gameId,
    gameName,
    author: user.username,
  });
  console.log(newRating);
  // send new rating back
  res.status(201).json({
    status: "success",
    body: {
      newRating,
    },
  });
});
