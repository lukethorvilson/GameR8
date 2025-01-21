const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostLike = sequelize.define("PostLike", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Post",
      key: "id",
  },
}});

module.exports = PostLike;
