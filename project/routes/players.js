var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");


// search players by name
router.get("/searchplayerbyname/:playerName", async (req, res, next) => {
  let players_list =[];
    try {
        const players_list = await players_utils.getPlayerByName(req.params.playerName);
        if (players_list.length > 0){
          res.status(200).send(players_list);
        }
        else{
          res.status(404).send('Player not found');
        }
      } catch (error) {
        next(error);
      }
  });

// all players in leage 271
router.get("/allplayers/:playerName", async (req, res, next) => {
  let players_list =[];
    try {
        const players_list = await players_utils.getallplayers(req.params.playerName);
        if (players_list.length > 0){
          res.status(200).send(players_list);
        }
        else{
          res.status(404).send('Player not found');
        }
      } catch (error) {
        next(error);
      }
  });

module.exports = router;
