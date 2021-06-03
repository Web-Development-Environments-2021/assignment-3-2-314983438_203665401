var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const games_utils = require("./utils/games_utils");
const DButils = require("./utils/DButils");


router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllGames", async (req, res, next) => {
  try {
    const games_details = await games_utils.GetAllGames();
    res.send(games_details);
  } catch (error) {
    next(error);
  }
});

router.get("/pastGames", async (req, res, next) => {
  try {
    const games_details = await games_utils.GetPastGames();
    res.send(games_details);
  } catch (error) {
    next(error);
  }
});

router.get("/futureGames", async (req, res, next) => {
  try {
    const games_details = await games_utils.GetFutureGames();
    res.send(games_details);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
