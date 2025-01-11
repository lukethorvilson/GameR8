const Rating = require("../models/ratingModel");
const User = require("../models/userModel");
const handlerFactory = require("./handlerFactory");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

/**
 * This method gets all the users in the database. If theres a search or limit query, it will be added to the query.
 */
exports.getAllUsers = handlerFactory.getAll(User, ["fullName", "username"]);

/**
 *
 * @param {*} req send the body of the request used for creating the user based on info in the body.
 * @param {*} res send the response back to the client with the new user created.
 */
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

exports.getFollowers = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }

  const { userId } = req.params;
  if (!userId) {
    return next(new AppError("Error retrieving users followers!", 400));
  }

  const user = await User.findByPk(+userId);
  const followers = await user.getFollowers();

  return res.status(200).json({
    status: "success",
    data: {
      followers,
    },
  });
});

exports.getFollowing = catchAsync(async (req, res, next) => {
  // get ID of logged in user
  const { id } = req.user;
  if (!id) {
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }

  // get id of user to get following data from
  const { userId } = req.params;
  if (!userId) {
    return next(new AppError("User id not provided", 400));
  }

  const user = await User.findByPk(+userId);
  const following = await user.getFollowing();

  console.log(following);
  return res.status(200).json({
    status: "success",
    data: {
      following,
    },
  });
});

exports.postFollowing = catchAsync(async (req, res, next) => {
  // get the logged user and the user being followed
  const { id } = req.user;
  const { id: followedId } = req.body?.userId;

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
