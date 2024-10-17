const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel");

const Rating = sequelize.define("Rating", {
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
  gameName: {
    type: DataTypes.STRING,
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
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Name of the table in the database
      key: "id", // Primary key in the Users table
    },
  },
});

Rating.belongsTo(User, {
  onDelete: "NO ACTION",
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Rating, {
  onDelete: "CASCADE",
  foreignKey: "userId",
  as: "ratings",
});

module.exports = Rating;
