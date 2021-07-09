const { DateTime } = require("mssql");
const DButils = require("./DButils");
const team_utils = require("./team_utils")


async function getGameDetails(games_ids_array) {
    let promises = [];
    games_ids_array.map((id) =>
      promises.push(
        DButils.execQuery(`SELECT * FROM dbo.Games WHERE game_id = '${id}' AND date > GETDATE()`)
      )
    );
    let games_info = await Promise.all(promises);
    let games = [].concat(...games_info);
    //return only 3 games
    if (games.length <= 3)
        return games;
    else
      return games.slice(0,4);
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
    const { game_id, date, homeTeamId, awayTeamId, stadium, referee, homeTeamScore, awayTeamScore } = game;

    return {
      game_id: game_id,
      date: date,
      homeTeamId: homeTeamId,
      awayTeamId: awayTeamId,
      stadium: stadium,
      referee: referee,
      homeTeamScore: homeTeamScore,
      awayTeamScore: awayTeamScore
    };
  });
}

async function GetPastGames() {
    const games = await DButils.execQuery(
      `SELECT TOP 3 * FROM Games WHERE date < GETDATE()
      ORDER BY date `
    );
    let games_with_events = GamesData(games);
    // let events_games = [];
    for (let i=0;i<games_with_events.length;i++){
      let game_id = games_with_events[i].game_id;
      const game_events = await DButils.execQuery(`SELECT * FROM Events WHERE game_id ='${game_id}'`);
      // events_games.push([games[i]]);
      games_with_events[i].events = []
      for (let j = 0;j<game_events.length;j++){
        // events_games[i].push(game_event[j]);
        games_with_events[i].events.push(game_events[j]);

      }
    }
    return games_with_events;

}


async function GetFutureGames() {
  const games = await DButils.execQuery(
    `SELECT TOP 3 * FROM Games WHERE date > GETDATE()
    ORDER BY date `
  );
  let respond = GamesData(games);
  console.log(respond);
  return respond;

}

exports.getGameDetails = getGameDetails;
exports.NextGameInLeague = NextGameInLeague;
exports.GetAllGames = GetAllGames;
exports.GetPastGames = GetPastGames;
exports.GetFutureGames = GetFutureGames;