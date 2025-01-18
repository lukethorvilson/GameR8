const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biography: {
      type: DataTypes.STRING,
      validate: {
        max: 500,
        min: 0,
      },
      allowNull: false,
      defaultValue: "No GameR8 biography yet...",
    },
    favoriteGames: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      defaultValue: [],
      validate: {
        maxLength(value) {
          if (value.length > 5) {
            throw new Error("You can only have up to 5 favorite games");
          }
        },
      },
    },
    links: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {"facebook": "", "twitter": "", "instagram": "", "twitch": "", "youtube": ""},
    },
  },
  {
    indexes: [{
      unique: true,
      fields: ["username"],
    }, {
      unique: true,
      fields: ["email"],
    },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const saltRounds = 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const saltRounds = 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

module.exports = User;
