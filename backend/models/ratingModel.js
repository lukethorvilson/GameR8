const { Sequelize, DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel");

const Rating = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 8,
    },
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  author: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Name of the table in the database
      key: "id", // Primary key in the Users table
    },
    onDelete: "CASCADE", // Optional: Deletes ratings if the user is deleted
  },
});

Rating.belongsTo(User, {
  onDelete: "NO ACTION",
  foreignKey: "userId",
});

User.hasMany(Rating, {
  onDelete: "CASCADE",
  foreignKey: "userId",
});

module.exports = Rating;
