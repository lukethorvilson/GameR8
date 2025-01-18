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
exports.createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, username, password, passwordCheck } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !passwordCheck
  ) {
    return next(new AppError("All fields are required!", 400));
  }
  const fullName = `${firstName} ${lastName}`;
  const newUser = await User.create({ fullName, email, username, password });
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

/**
 *
 */
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

/**
 * Gets all the ratings a single user has posted to a specific game.
 */
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

/**
 * Get the followers of a user.
 */
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

/**
 * Get the users that the logged in user is following.
 */
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

/**
 * Adds user to the following association of the logged in user.
 */
exports.postFollowing = catchAsync(async (req, res, next) => {
  // get the logged user and the user being followed
  const { id } = req.user; // get logged user id
  const { userId: followedId } = req.params; // get user id of user being followed

  // check if user is logged in, if not, return error
  if (!id) {
    console.log("No user id");
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }
  // internal server error if there is no user id to follow
  if (!followedId) {
    console.log("No user id for user being followed");
    return next(new AppError("No user id provided to follow", 500));
  }

  // get users
  const loggedUser = await User.findByPk(+id); // get logged user
  const targetUser = await User.findByPk(+followedId); // get user being followed

  // if either user is not found, return error
  if (!targetUser || !loggedUser) {
    return next(
      new AppError("Oops! There was an error following this user!", 404)
    );
  }

  // add the user to the logged user's following list
  await loggedUser.addFollowing(targetUser); // add the user to the logged user's following list
  const updatedFollowers = await targetUser.getFollowers(); // get updated following list of logged user

  return res.status(201).json({
    status: "success",
    data: {
      updatedFollowers,
    },
  });
});

/**
 * Removes a logged user from following a user.
 */
exports.removeFollowing = catchAsync(async (req, res, next) => {
  // get the logged user and the user being followed
  const { id } = req.user; // get logged user id
  const { userId: followedId } = req.params; // get user id of user being followed

  // check if user is logged in, if not, return error
  if (!id) {
    return next(
      new AppError(
        "Unauthorized action, must be logged in to perform this action.",
        403
      )
    );
  }
  // internal server error if there is no user id to follow
  if (!followedId) {
    return next(new AppError("No user id provided to follow", 500));
  }

  // get users
  const loggedUser = await User.findByPk(+id);
  const targetUser = await User.findByPk(+followedId);

  if (!targetUser || !loggedUser) {
    return next(new AppError("Error following this user!", 404));
  }

  // add the user to the logged user's following list
  await loggedUser.removeFollowing(targetUser);
  const updatedFollowers = await targetUser.getFollowers();

  return res.status(201).json({
    status: "success",
    data: {
      updatedFollowers,
    },
  });
});
