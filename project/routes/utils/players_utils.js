const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const LEAGUE_ID = "271";

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}


function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { player_id, fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      player_id: player_id,
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}



  async function getPlayerByName(player_name) {
    let player_ids_list = [];
    const player_list = await axios.get(
      `${api_domain}/players/search/${player_name}`,
      {
        params: {
          api_token: process.env.api_token,
          include: "team.league", // there is the league id
        },
      });
      let str = player_name.split(" ");
      //console.log(str[1]);
      //console.log(str.length);
      player_list.data.data.map((player) =>
        {
          // only 1 name
          if (str.length == 1)
          {
            if (player.team != null && player.team.data.league != null && player.team.data.league.data.id == LEAGUE_ID)
              {
              player_ids_list.push
              ( 
                {
                  id: player.player_id,
                  fullname: player.fullname,
                  teamName: player.team.data.name,
                  position: player.position_id,
                  image_url: player.image_path,
                  Common_name: player.common_name,
                  nationality: player.nationality,
                  birthdate: player.birthdate,
                  birthcountry: player.birthcountry,
                  height: player.height,
                  weight: player.weight,
                }
              );
              }
            }

            //2 names
            else if (player.team != null && player.team.data.league != null && player.team.data.league.data.id == LEAGUE_ID && str.length == 2 && player.firstname == str[0] && player.lastname == str[1])
            {
              player_ids_list.push
              ( 
                {
                  id: player.player_id,
                  fullname: player.fullname,
                  teamName: player.team.data.name,
                  position: player.position_id,
                  image_url: player.image_path,
                  Common_name: player.common_name,
                  nationality: player.nationality,
                  birthdate: player.birthdate,
                  birthcountry: player.birthcountry,
                  height: player.height,
                  weight: player.weight,
                }
              );
            }
        }
      
    );
      return player_ids_list;
  }


// get player by id
async function getPlayerById(player_id) {
  let player_info = [];
  const player = await axios.get(`${api_domain}/players/${player_id}`,
    {
      params: {
        api_token: process.env.api_token,
        //include: "team.league", // there is the league id
      },
    });
    player_info.push({
      //id: player.player_id,
      fullname: player.data.data.fullname,
      image_url: player.data.data.image_path,
      nationality: player.data.data.nationality,
      birthdate: player.data.data.birthdate,
      birthcountry: player.data.data.birthcountry,
      height: player.data.data.height,
      weight: player.data.data.weight,
    });
  
  return player_info;
}



  // leagueid = 1981 search james
  async function getallplayers(player_name) {
    let player_ids_list = [];
    const player_list = await axios.get(
      `${api_domain}/players/search/${player_name}`,
      {
        params: {
          api_token: process.env.api_token,
          include: "team.league", // there is the league id
        },
      });
      player_list.data.data.map((player) =>{
      if (player.team != null && player.team.data.league != null /*&& player.team.data.league.data.id == 271*/)
       {
          player_ids_list.push(player)
       }
      }
    );
      
      return player_ids_list;
  }

exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerByName = getPlayerByName;
exports.getallplayers = getallplayers;
exports.getPlayerById = getPlayerById;

