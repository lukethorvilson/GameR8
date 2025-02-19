const { Sequelize, DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post", {
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
      len: [1, 2500],
    },
  },
  likesDisabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  commentsDisabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  author: {
    type: STRING,
    allowNull:false,
    defaultValue: ""
  }
});

module.exports = Post;