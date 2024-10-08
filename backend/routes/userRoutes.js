const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authenticationController");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/logged").get(authController.authorization, userController.getLoggedUser)

module.exports = router;
