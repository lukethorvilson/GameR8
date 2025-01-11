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

router
  .route("/logged")
  .get(authController.authorization, userController.getLoggedUser);

router.route("/:id").get(userController.getUserById);

router.route("/:id/ratings").get(userController.getUserRatings);

router
  .route("/followers/:userId")
  .get(authController.authorization, userController.getFollowers);

router
  .route("/following/:userId")
  .get(authController.authorization, userController.getFollowing)
  .post(authController.authorization, userController.postFollowing);

module.exports = router;
