const associateModels = require("./../config/associate");
const User = require("./userModel");
const Rating = require("./ratingModel");
const Post = require("./postModel");
const Comment = require("./commentModel");
const PostLike = require("./likeModel");

const models = { User, Rating, Post, Comment, PostLike };

associateModels(models);
