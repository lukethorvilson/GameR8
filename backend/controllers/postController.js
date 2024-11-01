const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const Post = require("./../models/postModel");
const User = require("./../models/userModel");
const handlerFactory = require("./../controllers/handlerFactory");

exports.getPosts = handlerFactory.getAll(Post);

exports.createPost = catchAsync(async (req, res, next) => {
  console.log("Creating new post...");
  const post = req.body;
  const { user } = req;
  if (!post) {
    return next(new AppError("Bad request: POST: Post", 404));
  }

  if (!user) {
    return next(
      new AppError(
        "Forbidden Access: User not logged in or doesn't exist.",
        403
      )
    );
  }
  // all logic in creating a new post
  const loggedUser = await User.findByPk(user?.id);
  const newPost = await Post.create(post);
  await newPost.setUser(loggedUser);
  await newPost.save();

  res.status(201).json({
    status: "success",
    data: {
      newPost,
    },
  });
});
