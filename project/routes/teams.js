var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");

// search team by id
router.get("/SearchTeamById/:teamId", async (req, res, next) => {
  let team_details = [];
  try {
    const team_details = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
    //adding games to team
    const futuregames = await DButils.execQuery(
      `SELECT * FROM dbo.Games WHERE (homeTeamId = '${req.params.teamId}' OR awayTeamId = '${req.params.teamId}') AND date > GETDATE() `
    );
    const pastgames = await DButils.execQuery(
      `SELECT * FROM dbo.Games WHERE (homeTeamId = '${req.params.teamId}' OR awayTeamId = '${req.params.teamId}') AND date < GETDATE() `
    );
    res.send({team_details,futuregames,pastgames});
  } catch (error) {
    next(error);
  }
});

// search team by name
router.get("/SearchTeamByName/:teamName", async (req, res, next) => {
  let team_details = [];
  req.session.lastsearch = req.params.teamName;
  try {
    const team_details = await team_utils.getTeamInfoByName(req.params.teamName);
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
