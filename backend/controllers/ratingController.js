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
  try {
    const { title, description, rating } = req.body;
    if (!rating) {
      throw new Error("Rating not defined on game!");
    }
    const newRating = await Rating.create({ title, description, rating });
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
