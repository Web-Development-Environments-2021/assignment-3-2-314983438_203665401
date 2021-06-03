var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const admin_utils = require("./utils/admin_utils");
const players_utils = require("./utils/players_utils");
const games_utils = require("./utils/games_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  try{
  if (req.session && req.session.user_id) {
    const admin= await admin_utils.getadmin();//get assosiation man user
    if(admin.username==req.session.username){// if logged in user is association man
      next();
    }
      else{
        res.status(403).send("you are not the admin");
    }
  }
  else{
      res.status(403).send("you don't have access");
  }
  }
  catch(error){
    next(error);
}
}

);

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


  router.post("/AddReferee", async (req, res, next) => {
    try {
      const games = await DButils.execQuery(
        "SELECT * FROM dbo.Games"
      );
      if (!(games.find((x) => x.game_id == req.body.game_id)))
        throw { status: 404, message: "Game not found" };
  
      // const gamereferee = await DButils.execQuery(
      //     `SELECT referee FROM dbo.Games WHERE game_id = '${req.body.game_id}' `
      // )[0];


      // if (gamereferee != null)
      //   throw { status: 409, message: "Referee already assigned to game" };
  
  
      await DButils.execQuery(
        `UPDATE dbo.Games SET referee = ('${req.body.referee}') WHERE game_id = ('${req.body.game_id}')`
      );
      res.status(200).send('The referee was successfully assigned');;
    } catch (error) {
      next(error);
    }
  });


  router.post("/AddEvent", async (req, res, next) => {
    try {
      const games = await DButils.execQuery(
        "SELECT * FROM dbo.Games"
      );
      if (!(games.find((x) => x.game_id == req.body.game_id)))
        throw { status: 404, message: "Game not found" };

      await DButils.execQuery(
        `INSERT INTO dbo.Events VALUES ('${req.body.type}', '${req.body.date}', '${req.body.minuteOfGame}', 
         '${req.body.game_id}', '${req.body.player_id}' ,'${req.body.description}')`
      );
      res.status(200).send('The event was successfully added');;
    } catch (error) {
      next(error);
    }
  });

  router.post("/AddScore", async (req, res, next) => {
    try {
      const games = await DButils.execQuery(
        "SELECT * FROM dbo.Games"
      );
      if (!(games.find((x) => x.game_id == req.body.game_id)))
        throw { status: 404, message: "Game not found" };

      await DButils.execQuery(
        `UPDATE dbo.Games SET homeTeamScore = ('${req.body.homeTeamScore}'), awayTeamScore = ('${req.body.awayTeamScore}') WHERE game_id = ('${req.body.game_id}')`
      );
      res.status(200).send('The score was successfully added');;
    } catch (error) {
      next(error);
    }
  });


  module.exports = router;