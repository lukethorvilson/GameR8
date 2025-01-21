const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reply = sequelize.define("Reply", {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "User",
        key: "id",
      }
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Comment",
        key: "id",
    },
  },
});

module.exports = Reply;