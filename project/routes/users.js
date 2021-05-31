var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const games_utils = require("./utils/games_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM Users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with gameId and save this game in the favorites list of the logged-in user
 */
router.post("/favoriteGames", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const game_id = req.body.game_id;
    let exists = await users_utils.markGameAsFavorite(user_id, game_id);
    if (exists == 1){
      res.status(409).send("favorite Game already exist in user favorite games");
    }
    else if (exists == 0)
    {
      res.status(201).send("The game successfully saved as favorite");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites games that were saved by the logged-in user
 */
router.get("/favoriteGames/", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const games_ids = await users_utils.getFavoriteGames(user_id);
    const results = await games_utils.getGameDetails(games_ids);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
