const { Sequelize } = require("sequelize");
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
  .then(() => {
    console.log("Database & tables synced!");
  })
  .catch((err) => {
    console.log("Error syncing the database:", err);
  });

module.exports = sequelize;
