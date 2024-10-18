const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const authenticationController = require("../controllers/authenticationController");

router
  .route("/")
  .get(ratingController.getAllRatings)
  .post(authenticationController.authorization, ratingController.postRating);

// update the specified category category of a specific rating
router
  .route("/:ratingId/:gameId/:feedback/add")
  .patch(
    authenticationController.authorization,
    ratingController.updateFeedback
  );

module.exports = router;
