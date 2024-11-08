const Rating = require("../models/ratingModel");
const User = require("../models/userModel");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

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
  try {
    const { firstName, lastName, email, username, password, passwordCheck } =
      req.body;
    const fullName = `${firstName} ${lastName}`;
    const newUser = await User.create({ fullName, email, username, password });
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: {
        err,
      },
    });
  }
};

exports.getLoggedUser = async (req, res) => {
  const { id, username } = req.user;
  if (!id || !username) {
    return res.status(401).json({
      status: "failed",
      message: "You must login before accessing this page!",
    });
  }
  try {
    const user = await User.findByPk(+id);
    if (user) {
      user.password = undefined;
    }
    res.status(200).json({
      status: "success",
      body: {
        user,
      },
    });
  } catch (err) {}
};

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(new AppError("Bad Request: User was not specified.", 400));

  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) return next(new AppError("User not found!", 404));

  user.password = undefined;

  return res.status(200).json({
    status: "success",
    body: {
      user,
    },
  });
});

exports.getUserRatings = catchAsync(async (req, res, next) => {
  const { byDate, limit } = req.query;
  const { id } = req.params;
  let user;
  if (limit) {
    user = await User.findByPk(id, {
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [
            "id",
            "rating",
            "title",
            "description",
            "gameId",
            "createdAt",
            "gameName",
          ],
          limit: Number(limit),
        },
      ],
    });
  } else {
    user = await User.findByPk(id, {
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [
            "id",
            "rating",
            "title",
            "description",
            "gameId",
            "createdAt",
            "gameName",
          ],
        },
      ],
    });
  }

  if (!user) return next(new AppError("No user found with ratings", 404));

  res.status(200).json({
    status: "success",
    body: {
      ratings: user.ratings,
    },
  });
});

exports.getUserFollowers = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }

  const user = await User.findByPk(+id);
  const followers = await user.getFollowers();

  return res.status(200).json({
    status: "success",
    data: {
      followers,
    },
  });
});

exports.postFollowed = catchAsync(async (req, res, next) => {
  // get the logged user and the user being followed
  const { id } = req.user;
  const { id: followedId } = req.params;

  if (!id) {
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }
  // get users
  const loggedUser = await User.findByPk(+id);
  const targetUser = await User.findByPk(+followedId);

  if (!targetUser || !loggedUser) {
    return next(new AppError("Error following this user!", 404));
  }

  await loggedUser.addFollowed(targetUser);
  const newFollowed = await loggedUser.getFollowed();

  return res.status(201).json({
    status: "success",
    data: {
      newFollowed,
    },
  });
});
