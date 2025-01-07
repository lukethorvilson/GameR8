const { Sequelize } = require("sequelize");
const User = require("./models/userModel");
const POSTGRES_PASSWORD = process.env.NODE_POSTGRES_PASSWORD;
const POSTGRES_USERNAME = process.env.NODE_POSTGRES_USERNAME;
const POSTGRES_DATABASE = process.env.NODE_POSTGRES_DATABASE;

const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("DB synced");
    await User.bulkCreate([
      {
        fullName: "Luke Skywalker",
        username: "luke_skywalker",
        email: "lukeskywalker@gmail.com",
        password: "password01",
      },
      {
        fullName: "Darth Vader",
        username: "darth_vader",
        email: "darthvader@gmail.com",
        password: "password02",
      },
      {
        fullName: "Princess Leia",
        username: "princess_leia",
        email: "pricessleia@gmail.com",
        password: "password03",
      },
      {
        fullName: "Han Solo",
        username: "han_solo",
        email: "hansolo@gmail.com",
        password: "password04",
      },
    ]);
    console.log("Test Users created");
  })
  .catch((err) => {
    console.log("Error syncing the database:", err.message);
  });

module.exports = sequelize;
