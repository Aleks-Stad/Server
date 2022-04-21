const express = require("express");
const router = express.Router();
const path = require("path");
const gameController = require('../controller/gameController')

router.use("/",
    express.static(path.resolve("pages/main")));
router.use("/result",
    express.static(path.resolve("pages/result")));

router.route('/api/game')
    .post((req, res) => {
        gameController.finishGame(req, res);
    })
    .get((req, res) => {
        gameController.gamesResult(req, res);
    })
    .delete((req, res) => {
        gameController.deleteGames(req, res);
    })

module.exports = router;