const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const LEAGUE_ID = "271";


async function getTeamInfoByName(team_name) {
    let team_details = [];
    const team = await axios.get(`${api_domain}/teams/search/${team_name}`, {
      params: {
        api_token: process.env.api_token,
      },
    });
    team.data.data.map((team1) =>
    team_details.push( {
        //id: player.player_id,
        team_name: team1.name,
        team_logo: team1.logo_path,
      })
  );
  return team_details;
  }

  exports.getTeamInfoByName = getTeamInfoByName;
