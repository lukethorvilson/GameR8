const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const Post = require("./postModel");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 500],
    },
  },
});

module.exports = Comment;
