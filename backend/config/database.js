const { Sequelize } = require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');
const POSTGRES_PASSWORD = process.env.NODE_POSTGRES_PASSWORD;
const POSTGRES_USERNAME = process.env.NODE_POSTGRES_USERNAME;
const POSTGRES_DATABASE = process.env.NODE_POSTGRES_DATABASE;

const sequelize = new Sequelize(
  {
    host: "localhost",
    dialect: String,
    database: POSTGRES_DATABASE,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
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