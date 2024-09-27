const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try{
    const {title, description, rating} = req.body
    if(!rating) {
        throw new Error("Rating not defined on game!")
    }
    const newRating = await Rating.create({title, description, rating})
    res.status(201).json({
        status: "success",
        data: {
            newRating
        }
    })
  }catch(err){
    res.status(400).json({
        status: "failed",
        message: {
            err
        }
    })
  }
};


exports