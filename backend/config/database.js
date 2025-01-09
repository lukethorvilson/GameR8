const { Sequelize } = require("sequelize");
require("dotenv").config();

const POSTGRES_PASSWORD = process.env.NODE_POSTGRES_PASSWORD;
const POSTGRES_USERNAME = process.env.NODE_POSTGRES_USERNAME;
const POSTGRES_DATABASE = process.env.NODE_POSTGRES_DATABASE;
const POSTGRES_HOST = process.env.NODE_POSTGRES_HOST;
const POSTGRES_PORT = process.env.NODE_POSTGRES_PORT;

const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    dialect: "postgres",
  }
);

async function authenticateDB() {
  console.log("Connecting to the database...");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

authenticateDB();

module.exports = sequelize;
