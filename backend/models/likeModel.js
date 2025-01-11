const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostLike = sequelize.define("PostLike", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = PostLike;
