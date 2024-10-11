const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const authenticationController = require("../controllers/authenticationController")

router
  .route("/")
  .get(ratingController.getAllRatings)
  .post(authenticationController.authorization, postRating);

module.exports = router;
