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
  helpful: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    set(value) {
      let currentArray = this.getDataValue("helpful") || [];
      if (!currentArray.includes(value)) {
        this.removeFromOtherFields(value);
        // Create a new array with the added value
        this.setDataValue("helpful", [...currentArray, +value]);
      }
    },
    defaultValue: [],
    allowNull: false,
  },
  unhelpful: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    set(value) {
      let currentArray = this.getDataValue("unhelpful") || [];
      if (!currentArray.includes(value)) {
        this.removeFromOtherFields(value);
        // Create a new array with the added value
        this.setDataValue("unhelpful", [...currentArray, +value]);
      }
    },
    defaultValue: [],
    allowNull: false,
  },
  detailed: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    set(value) {
      let currentArray = this.getDataValue("detailed") || [];
      if (!currentArray.includes(value)) {
        this.removeFromOtherFields(value);
        // Create a new array with the added value
        this.setDataValue("detailed", [...currentArray, +value]);
      }
    },
    defaultValue: [],
    allowNull: false,
  },
  entertaining: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    set(value) {
      let currentArray = this.getDataValue("entertaining") || [];
      if (!currentArray.includes(value)) {
        this.removeFromOtherFields(value);
        // Create a new array with the added value
        this.setDataValue("entertaining", [...currentArray, +value]);
      }
    },
    defaultValue: [],
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

Rating.prototype.removeFromOtherFields = (value) => {
  // Remove value from helpful
  let helpfulArray = this.getDataValue("helpful") || [];
  this.setDataValue(
    "helpful",
    helpfulArray.filter((item) => item !== +value)
  );

  // Remove value from unhelpful
  let unhelpfulArray = this.getDataValue("unhelpful") || [];
  this.setDataValue(
    "unhelpful",
    unhelpfulArray.filter((item) => item !== +value)
  );

  // Remove value from detailed
  let detailedArray = this.getDataValue("detailed") || [];
  this.setDataValue(
    "detailed",
    detailedArray.filter((item) => item !== +value)
  );

  // Remove value from entertaining
  let entertainingArray = this.getDataValue("entertaining") || [];
  this.setDataValue(
    "entertaining",
    entertainingArray.filter((item) => item !== +value)
  );
};

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
