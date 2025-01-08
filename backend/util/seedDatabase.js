const User = require("../models/userModel");

async function seedDatabase() {
  try {
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
  } catch (err) {
    console.log("Error creating test users:", err.message);
  }
}