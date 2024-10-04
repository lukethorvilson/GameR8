const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController")

router.route("/search/:search").get(gameController.getSearchGames)
router.route("/id/:gameId").get(gameController.getGameById)

module.exports = router