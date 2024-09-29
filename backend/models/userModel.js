const sequelize = require("../db");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likedReviews: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    get() {
      return this.getDataValue("likedReviews").split(",");
    },
    set(val) {
      this.setDataValue("likedReviews", val.join(","));
    },
  },
  dislikedReviews: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    get() {
      return this.getDataValue("dislikedReviews").split(",");
    },
    set(val) {
      this.setDataValue("dislikedReviews", val.join(","));
    },
  },
});

module.exports = User;
