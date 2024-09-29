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
    const {firstName, lastName, email, username, password, passwordCheck} = req.body
    const fullName = `${firstName} ${lastName}`
    const newUser = await User.create({fullName, email, username, password})
    res.status(201).json({
        status: "success",
        data: {
            newUser
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