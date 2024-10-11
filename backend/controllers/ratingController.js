const Rating = require("../models/ratingModel");

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json({
      status: "success",
      results: ratings.length,
      data: {
        ratings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.postRating = async (req, res) => {
  // first get the user from the req object
  const { user } = req;
  // checking if the user exists, if not then the user must not be autheniticated
  if (!user || !user?.id) {
    res.status(401).json({
      status: "failed",
      message:
        "Please authenticate before making a rating to this game! Thank you!",
    });
  }
  // get the rating, check for at least the rating number(minimum req for rating a game)
  const { title, description, rating, gameId } = req.body;
  if (!rating) {
    res.status(400).json({
      status: "failed",
      message:
        "Please make sure to submit a R8 score with your game rating. Thank you!",
    });
  }
  try {
    const newRating = await Rating.create({
      title,
      description,
      rating,
      userId: user.id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newRating,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
