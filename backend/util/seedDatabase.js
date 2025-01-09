const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function passwordHashHelper(passwords) {
  const saltRounds = 12;
  const hashedPasswords = await Promise.all(
    passwords.map(async (password) => {
      return await bcrypt.hash(password, saltRounds);
    })
  );
  return hashedPasswords;
}

async function seedDatabase() {
  const passwords = ["password01", "password02", "password03", "password04"];
  try {
    const hashedPasswords = await passwordHashHelper(passwords);
    console.log(hashedPasswords)
    await User.bulkCreate([
      {
        fullName: "Luke Skywalker",
        username: "luke_skywalker",
        email: "lukeskywalker@gmail.com",
        password: hashedPasswords[0],
      },
      {
        fullName: "Darth Vader",
        username: "darth_vader",
        email: "darthvader@gmail.com",
        password: hashedPasswords[1],
      },
      {
        fullName: "Princess Leia",
        username: "princess_leia",
        email: "pricessleia@gmail.com",
        password: hashedPasswords[2],
      },
      {
        fullName: "Han Solo",
        username: "han_solo",
        email: "hansolo@gmail.com",
        password: hashedPasswords[3],
      },
      {
        fullName: "Darth Revan",
        username: "darth_revan",
        email: "revan@gmail.com",
        password: hashedPasswords[3],
      },
      {
        fullName: "Darth Plagueis",
        username: "darth_plagueis",
        email: "plag@gmail.com",
        password: hashedPasswords[3],
      },
    ]);
    console.log("Test Users created");
  } catch (err) {
    console.log("Error creating test users:", err.message);
  }
}

module.exports = seedDatabase;
