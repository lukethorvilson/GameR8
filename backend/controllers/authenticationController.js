const User = require("../models/userModel");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password, passwordCheck } =
      req.body;
    if (password !== passwordCheck) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords do not match",
      });
    }
    const fullName = `${firstName} ${lastName}`;
    const newUser = await User.create({ fullName, email, username, password });
    if (newUser) {
      res.status(201).json({
        status: "success",
        body: {
          message: `Welcome to GameR8 ${newUser.fullName}!`,
        },
      });
    }
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

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send(400).json({
      status: "failed",
      message: "Incorrect username/email or password! Please try again!",
    });
  }

  const accessToken = jwt.sign({user: user.username}, process.env.NODE_JWT_SECRET, {
    expiresIn: process.env.NODE_JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({user: user.username}, process.env.NODE_JWT_REFRESH_SECRET);
  refreshTokens.push(refreshToken);

  res.status(200).json({ accessToken, refreshToken });
};

exports.logout = (req, res) => {
  const {refreshToken} = req.body;
  if(!refreshToken) {
    return res.sendStatus(400);
  }

  const index = refreshTokens.indexOf(refreshToken);
  if(index !== -1) {
    refreshTokens.splice(index, 1);
  }
  res.sendStatus(204);
}

const authenticationMiddleware = (req, res, next) => {
  // get the token from the header to verify
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // verify the token and if correct return the user in the request
  jwt.verify(token, process.env.NODE_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.NODE_JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

const generateNewToken = (req, res) => {
  const { refreshToken } = req.body;
  // if refresh token doesn't exist return error status
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.NODE_JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ username: user.username }, process.env.NODE_JWT_SECRET, {
      expiresIn: process.env.NODE_JWT_EXPIRES_IN,
    });
    res.send(201).json({ accessToken });
  });
};

// app.get("/protected", authenticationMiddleware, (req, res) => {
//   res
//     .status(200)
//     .json({ message: "You are authorized to access this resource" });
// });
