const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables synced!");
  })
  .catch((err) => {
    console.log("Error syncing the database:", err);
  });

module.exports = sequelize;
