const { DateTime } = require("mssql");
const DButils = require("./DButils");
const team_utils = require("./team_utils")


async function getGameDetails(games_ids_array) {
    let promises = [];
    games_ids_array.map((id) =>
      promises.push(
        DButils.execQuery(`SELECT * FROM dbo.Games WHERE game_id = '${id}'`)
      )
    );
    let games_info = await Promise.all(promises);
    return games_info;
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

async function GetAllGames() {
  const games = await DButils.execQuery(`SELECT * FROM Games`);
  let respond = GamesData(games);
  return respond;
}

function GamesData(games) {
  //let homeaway = await team_utils.getTeamInfoByid(closesetGame[0].awayTeamId);
  return games.map((game) => {
    const { date, homeTeamId, awayTeamId, stadium } = game;

    return {
      date: date,
      homeTeamId: homeTeamId,
      awayTeamId: awayTeamId,
      stadium: stadium,
    };
  });
}

async function GetPastGames() {
    const games = await DButils.execQuery(
      `SELECT TOP 3 * FROM Games WHERE date < GETDATE()
      ORDER BY date `
    );
    let events_games = [];
    for (let i=0;i<games.length;i++){
      let game_id = games[i].game_id;
      const game_event = await DButils.execQuery(`SELECT * FROM Events WHERE game_id ='${game_id}'`);
      events_games.push([games[i]]);
      for (let j = 0;j<game_event.length;j++){
        events_games[i].push(game_event[j]);
      }
    }
      return events_games;

}


async function GetFutureGames() {
  const games = await DButils.execQuery(
    `SELECT TOP 3 * FROM Games WHERE date > GETDATE()
    ORDER BY date `
  );
  let respond = GamesData(games);
  return respond;

}

exports.getGameDetails = getGameDetails;
exports.NextGameInLeague = NextGameInLeague;
exports.GetAllGames = GetAllGames;
exports.GetPastGames = GetPastGames;
exports.GetFutureGames = GetFutureGames;