const DButils = require("./DButils");

async function markGameAsFavorite(user_id, game_id) {
  //check if the game exist
  const games_ids = await DButils.execQuery(
    `select * from Games where game_id='${game_id}'`
  );
  if (games_ids.length == 0)
    return 2;


  let gameids = await getFavoriteGames(user_id);
  //console.log(gameids[0].game_id);

  //check if the game already in the favorite games table of the user
  for (let i = 0; i < gameids.length; i++) {
    if (gameids[i] == game_id){
      return 1;
  }
};
  await DButils.execQuery(
    `insert into FavoriteGames values ('${user_id}',${game_id})`
  );
  
  return 0;
}

async function getFavoriteGames(user_id) {
  const games_ids = await DButils.execQuery(
    `select game_id from FavoriteGames where user_id='${user_id}'`
  );

  let games_ids_array = [];
    games_ids.map((element) => games_ids_array.push(element.game_id)); //extracting the games ids into array
  return games_ids_array;
}

exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
