"use strict";

const associateModels = (models) => {
  const { User, Rating, Post, Comment, PostLike } = models;

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
   */
  //Associations
  User.hasMany(Comment, {
    onDelete: "CASCADE",
  });
  Comment.belongsTo(User, {
    onDelete: "NO ACTION",
  });

  Post.hasMany(Comment, {
    onDelete: "CASCADE",
  });
  Comment.belongsTo(Post, {
    onDelete: "NO ACTION",
  });
};

module.exports = associateModels;
