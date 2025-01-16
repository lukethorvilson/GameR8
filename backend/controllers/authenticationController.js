const User = require("../models/userModel");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const validator = require("validator");
const Sequelize = require("sequelize");
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
    console.log("error in email error!");
    return next(
      new AppError(
        "The email you are using is not of correct format. Please retry with a different email of correct format. Thank you!",
        400
      )
    );
  }
  // check if the username is alphanumeric(letters and numbers only)
  if (!username || !validator.isAlphanumeric(username)) {
    console.log("Username error");
    return next(
      new AppError(
        "The username you are using contains bad characters. Characters: Aa-Zz, and numbers: 0-9 are permitted. Please try again, thank you!",
        400
      )
    );
  }

  // password
  if (password !== passwordCheck || !validator.isStrongPassword(password)) {
    return next(
      new AppError(
        "Please make sure password is at is strong, (8 characters long, at least one lower/uppercase letter each, and contains a number and special character) and that it matches the password check!",
        400
      )
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
    return res.status(201).json({
      status: "success",
      message: `Welcome to GameR8 ${newUser.fullName}!`,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  // check existance of password or user/email
  if (!usernameOrEmail || !password) {
    return next(
      new AppError("Please provide email/username and password!", 400)
    );
  }

  // check if user exists with username or email provided (email/username is unique) should only return one user
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
  });

  // compare the password to the correct password for
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log("Incorrect username/email or password! Please try again!");
    return next(
      new AppError(
        "Incorrect username/email or password! Please try again!",
        401
      )
    );
  }

  // if everything is okay, sign and send the token to the client
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.NODE_JWT_SECRET,
    {
      expiresIn: process.env.NODE_JWT_EXPIRES_IN,
    }
  );

  // send the token as a http cookie to the client
  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
    })
    .status(200)
    .json({
      status: "success",
      message: `Login successful! Welcome to GameR8, ${user.fullName}!`,
    });
});

exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  // no token available send (403: forbidden)
  if (!token) {
    
    return res
      .status(403)
      .json({ status: "error", message: "An authorization error occured!" });
  }
  const data = jwt.verify(token, process.env.NODE_JWT_SECRET); // verify the token with the secret to retrieve auth data
  req.user = { id: data.id, username: data.username }; // store the data in the request object for later use
  return next(); // move to the next middleware
};

exports.logout = (req, res) => {
  // check for a user access token in the cookies
  if (!req.cookies.access_token) {
    return res.status(403).json({
      status: "error",
      message:
        "You are not authorized to perform this action: Logout. Please refresh and try again!",
    });
  }

  // clear the cookie
  res.clearCookie("access_token");

  // send a success message
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful!" });
};
