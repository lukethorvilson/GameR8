const User = require("../models/userModel");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.JWT_COOKIE_EXPIRES_IN
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  // Removes password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password, passwordCheck } =
      req.body;
    const fullName = `${firstName} ${lastName}`;
    const newUser = await User.create({ fullName, email, username, password });
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: {
        err,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, email, password } = req.body;

  // check existance of password or user/email
  if (!username || !email || !password) {
    throw new Error("Please provide email/username and password!");
    return;
  }

  // check if user exists && password is correct
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect email/username or password! Please try again!");
    return;
  }

  createSendToken(user, 200, res);
};
