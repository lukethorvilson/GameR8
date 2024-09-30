const sequelize = require("../db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./userModel");
const Rating = require("./ratingModel");

const UserRatingLikes = sequelize.define(
  "UserReviewLikes",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: id,
      },
    },
    ratingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Rating,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

User.belongsToMany(Rating, { through: UserRatingLikes, as: "LikedRatings" });
Rating.belongsToMany(User, { through: UserRatingLikes, as: "RatingLikes" });

module.exports = UserRatingLikes;
