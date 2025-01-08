const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FriendRequest = sequelize.define("FriendRequest", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
  },
  recipientId: {
    type: DataTypes.INTEGER,
  }
});
