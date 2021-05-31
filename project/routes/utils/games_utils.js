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
    const game = await DButils.execQuery(
      `SELECT TOP 1 * FROM Games WHERE date > GETDATE()
      ORDER BY date `
    );
    return game;

  }
  catch (error) {
    next(error);
  }
}

  

exports.getGameDetails = getGameDetails;
exports.NextGameInLeague = NextGameInLeague;
