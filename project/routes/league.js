var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const DButils = require("./utils/DButils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.post("/AddGame", async (req, res, next) => {
  try {
    if (req.body.homeTeamId == req.body.awayTeamId)
      res.status(404).send('A team cannot play againts itself');
    await DButils.execQuery(
      `INSERT INTO dbo.Games VALUES ('${req.body.date}', '${req.body.homeTeamId}', '${req.body.awayTeamId}', 
      '${req.body.homeTeamScore}', '${req.body.awayTeamScore}', '${req.body.stadium}')`
    );
    res.status(200).send('The game was successfully added');;
  } catch (error) {
    next(error);
  }
});

router.post("/AddReferee", async (req, res, next) => {
  try {
    const games = await DButils.execQuery(
      "SELECT * FROM dbo.Games"
    );

    if (!(games.find((x) => x.game_id == req.body.game_id)))
      throw { status: 404, message: "Game not found" };

    if (games.find((x) => x.referee != null))
      throw { status: 409, message: "Referee already assigned to game" };


    await DButils.execQuery(
      `UPDATE dbo.Games SET referee = ('${req.body.referee}') WHERE game_id = ('${req.body.game_id}')`
    );
    res.status(200).send('The referee was successfully assigned');;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
