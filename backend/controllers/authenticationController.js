const User = require("../models/userModel");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const validator = require("validator");
const refreshTokens = [];

// Helpful Links and attributions
// https://dev.to/tonieng/introduction-to-authentication-and-authorization-using-json-web-tokens-in-nodejs-p4a#:~:text=1%20Create%20a%20login%20route%20in%20your%20Node.js,JWT%20back%20to%20the%20client%20as%20a%20response.

exports.createTokens = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.NODE_JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.NODE_JWT_SECRET,
      { expiresIn: process.env.NODE_JWT_EXPIRES_IN }
    );
    res.json({ accessToken });
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, username, password, passwordCheck } =
    req.body;

  if (!email || !validator.isEmail(email)) {
    return next(
      new AppError(
        "The email you are using is not of correct format. Please retry with a different email of correct format. Thank you!",
        400
      )
    );
  }
  if (!username || !validator.isAlphanumeric(username)) {
    return next(
      new AppError(
        "The username you are using contains bad characters. Characters: Aa-Zz, and numbers: 0-9 are permitted. Please try again, thank you!",
        400
      )
    );
  }
  if (password !== passwordCheck) {
    return next(
      new AppError("Please use matching passwords to register! Thank you!", 400)
    );
  }

  const existingUserCount = await User.count({
    where: {
      // Check if either the email or username matches
      [Sequelize.Op.or]: [{ email: email }, { username: username }],
    },
  });
  if (existingUserCount > 0) {
    return next(
      new AppError(
        "The username or email already has an associated account. Please try again with a different username or email. Thank you!",
        409
      )
    );
  }

  const fullName = `${firstName} ${lastName}`;
  const newUser = await User.create({ fullName, email, username, password });
  if (newUser) {
    res.status(201).json({
      status: "success",
      message: `Welcome to GameR8 ${newUser.fullName}!`,
    });
  }
});

exports.login = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  // check existance of password or user/email
  if (!usernameOrEmail || !password) {
    throw new Error("Please provide email/username and password!");
  }

  // check if user exists && password is correct
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
  });

  // compare the password to the correct password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: "failed",
      message: "Incorrect username/email or password! Please try again!",
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.NODE_JWT_SECRET,
    {
      expiresIn: process.env.NODE_JWT_EXPIRES_IN,
    }
  );
  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production" ? true : false,
      path: "/",
    })
    .status(200)
    .json({
      status: "success",
      message: `Login successful! Welcome ${user.fullName}!`,
    });
};

exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log("💥ERROR: Token wasn't accessable!");
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.NODE_JWT_SECRET);
    req.user = { id: data.id, username: data.username };
    return next();
  } catch (err) {
    console.log("💥Error: Error setting the data and verifying the token.");
    return res.sendStatus(403);
  }
};

exports.logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ status: "success", message: "Logout successful!" });
};
