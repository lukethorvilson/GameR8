const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

router
  .route("/")
  .get(ratingController.getAllRatings)
  .post(ratingController.postRating);

module.exports = router;
