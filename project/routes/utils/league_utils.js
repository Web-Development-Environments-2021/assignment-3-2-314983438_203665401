const axios = require("axios");
const DButils = require("./DButils");
const team_utils = require("./team_utils")
const LEAGUE_ID = 271;


async function NextGameInLeague() {
  try{
    // const games = await DButils.execQuery("SELECT * FROM dbo.Games");
    // let currentTime = Date.now();
    // if (games.length>0){
    //   let closesetGame = games[0];
    //   for (let i=1;i<games.length;i++){
    //       if (games[i].date < closesetGame.date && games[i].date > currentTime)
    //         closesetGame = games[i].date;
    //   }
    // }
    // return closesetGame;
    const game = await DButils.execQuery(
     // "SELECT TOP 1 * FROM dbo.Games ORDER BY date DESC"
      `SELECT TOP 1 * FROM Games WHERE date > GETDATE()
      ORDER BY date `
    );
    return game;

  }
  catch (error) {
    next(error);
  }
}


async function getLeagueDetails() {
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  const stage = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/stages/${league.data.data.current_stage_id}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );

  let closesetGame = await NextGameInLeague();
  //console.log(closesetGame[0].homeTeamId);
  let hometeam = await team_utils.getTeamInfoByid(closesetGame[0].homeTeamId);
  let homeaway = await team_utils.getTeamInfoByid(closesetGame[0].awayTeamId);

  return {
    league_name: league.data.data.name,
    current_season_name: league.data.data.season.data.name,
    current_stage_name: stage.data.data.name,
    // next game details should come from DB
    next_game_date: closesetGame[0].date,
    next_game_hometeam: hometeam,
    next_game_homeaway: homeaway,
  };
}
exports.getLeagueDetails = getLeagueDetails;
exports.NextGameInLeague = NextGameInLeague;