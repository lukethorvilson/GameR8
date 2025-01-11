const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = require("./userModel");
const Comment = require("./commentModel");
const Post = require("./postModel");
const Rating = require("./ratingModel");
const PostLike = require("./likeModel");

/**
 * Ratings and User associations
 */
Rating.belongsTo(User, {
  onDelete: "NO ACTION",
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Rating, {
  onDelete: "CASCADE",
  foreignKey: "userId",
  as: "ratings",
});
/////////////////////////////////

/**
 * User to posts associations
 */
User.hasMany(Post, {
  onDelete: "CASCADE",
});
Post.belongsTo(User, {
  onDelete: "NO ACTION",
});
//////////////////////////////////

/**
 * User to like association, and Post to Like association
 */
//Associations
User.hasMany(PostLike);
PostLike.belongsTo(User);
Post.hasMany(PostLike);
PostLike.belongsTo(Post);

/**
 * Comments to User and Post associations
 * User has many comments where a comment has one user
 * Post has many comments where a comment has one post
 */
//Associations
// One to Many
User.hasMany(Comment, {
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  onDelete: "NO ACTION",
});

// One to Many
Post.hasMany(Comment, {
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
  onDelete: "NO ACTION",
});

/**
 * Follow Associations Many-to-Many
 * User has many followers and followers follow many users
 */
User.belongsToMany(User, {
  as: "Followers",
  through: "Follows",
  foreignKey: "followedId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  as: "Following",
  through: "Follows",
  foreignKey: "followedId",
  otherKey: "followerId",
});

console.log("Models associated successfully!")

module.exports = { User, Post, PostLike, Comment, Rating, sequelize };
