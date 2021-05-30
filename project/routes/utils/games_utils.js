const { DateTime } = require("mssql");
const DButils = require("./DButils");

async function getGameDetails(games_ids_array) {
    let promises = [];
    games_ids_array.map((id) =>
      promises.push(
        DButils.execQuery(`SELECT * FROM dbo.Games WHERE game_id = '${id}'`)
      )
    );
    return promises;
}


async function NextGameInLeague() {
  try{
    const games = await DButils.execQuery("SELECT * FROM dbo.Games");
    let currentTime = new DateTime();
    if (games.length>0){
      let closesetGame = games[0];
      for (let i=1;i<games.length;i++){
          if (games[i].date < closesetGame.date && games[i].date > currentTime)
            closesetGame = games[i].date;
      }
    }
    return closesetGame;

  }
  catch (error) {
    next(error);
  }
}

  

exports.getGameDetails = getGameDetails;
