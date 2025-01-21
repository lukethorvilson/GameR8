const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./userModel");
const Comment = require("./commentModel");
const Post = require("./postModel");
const Rating = require("./ratingModel");
const PostLike = require("./likeModel");
const Reply = require("./replyModel");

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
PostLike.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "NO ACTION",
}); // A like belongs to a user
PostLike.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
  onDelete: "NO ACTION",
}); // A like belongs to a post
User.hasMany(PostLike, {
  foreignKey: "userId",
  as: "postLikes",
  onDelete: "CASCADE",
}); // A user has many likes
Post.hasMany(PostLike, {
  foreignKey: "postId",
  as: "postLikes",
  onDelete: "CASCADE",
}); // A post has many likes

/**
 * Comments to User and Post associations
 * User has many comments where a comment has one user
 * Post has many comments where a comment has one post
 */
//Associations
// One to Many

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "NO ACTION",
});
Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
  onDelete: "NO ACTION",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE",
});
Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
  onDelete: "CASCADE",
});

/**
 * Reply to Comment associations
 * Comment has many replies where a reply has one comment
 * User has many replies where a reply has one user
 */
Reply.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "NO ACTION",
});
Reply.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
  onDelete: "NO ACTION",
});

User.hasMany(Reply, {
  foreignKey: "userId",
  as: "replies",
  onDelete: "CASCADE",
});
Comment.hasMany(Reply, {
  foreignKey: "commentId",
  as: "replies",
  onDelete: "CASCADE",
});

/**
 * Follow Associations Many-to-Many
 * User has many followers and followers follow many users
 */
User.belongsToMany(User, {
  as: "Followers",
  through: "Follows",
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  as: "Following",
  through: "Follows",
  foreignKey: "followerId",
  otherKey: "followingId",
});

console.log("Models associated successfully!");

module.exports = { User, Post, PostLike, Comment, Rating, sequelize };
