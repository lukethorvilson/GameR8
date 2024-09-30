const express = require("express");
const router = express.Router();

const authController = require("../controllers/authenticationController")

router.route("/register").post(authController.register)

module.exports = router;