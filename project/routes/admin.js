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
  if (req.session && req.session.user_id && (req.username === req.session.username)) {
    DButils.execQuery("SELECT user_id,username FROM Users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401).send("you are not the admin!");
  }
});

router.post("/AddGame", async (req, res, next) => {
    try {
      if (req.body.homeTeamId == req.body.awayTeamId)
        res.status(404).send('A team cannot play againts itself');
      await DButils.execQuery(
        `INSERT INTO dbo.Games VALUES ('${req.body.date}', '${req.body.homeTeamId}', '${req.body.awayTeamId}', 
         '${req.body.stadium}', '${req.body.referee}' ,'${req.body.homeTeamScore}', '${req.body.awayTeamScore}')`
      );
      res.status(200).send('The game was successfully added');;
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;