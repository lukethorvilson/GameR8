const express = require("express");
const router = express.Router();
const postController = require("./../controllers/postController");
const authenticationController = require("./../controllers/authenticationController");

router
  .route("/")
  .get(postController.getPosts)
  .post(authenticationController.authorization, postController.createPost);

module.exports = router;
