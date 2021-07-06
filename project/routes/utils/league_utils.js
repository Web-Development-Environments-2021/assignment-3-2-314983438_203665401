const axios = require("axios");
const DButils = require("./DButils");
const team_utils = require("./team_utils")
const games_utils = require("./games_utils")
const LEAGUE_ID = 501;


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

  let closesetGame = await games_utils.NextGameInLeague();
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
