var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");

// search team by id
router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  let team_details = [];
  try {
    const team_details = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
    //adding games to team
    const games = await DButils.execQuery(
      `SELECT * FROM dbo.Games WHERE homeTeamId = '${req.params.teamId}' OR awayTeamId = '${req.params.teamId}' `
    );
    res.send(team_details.concat(games));
  } catch (error) {
    next(error);
  }
});

// search team by name
router.get("/SearchTeamByName/:teamName", async (req, res, next) => {
  let team_details = [];
  try {
    const team_details = await team_utils.getTeamInfoByName(req.params.teamNAME);
    if (team_details.length > 0){
      res.status(200).send(team_details);
    }
    else{
      res.status(404).send('Team not found');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
