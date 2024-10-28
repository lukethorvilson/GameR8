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

//Associations
User.hasMany(PostLike);
PostLike.belongsTo(User);

Post.hasMany(PostLike);
PostLike.belongsTo(Post);

module.exports = PostLike;
