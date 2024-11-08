const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel");
const Post = require("./postModel");

const PostLike = sequelize.define("PostLike", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = PostLike;
