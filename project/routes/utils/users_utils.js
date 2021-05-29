const DButils = require("./DButils");

async function markGameAsFavorite(user_id, game_id) {
  let gameids = await getFavoriteGames(user_id);
  //console.log(gameids[0].game_id);
  for (let i = 0; i < gameids.length; i++) {
    if (gameids[i].game_id == game_id){
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
  return games_ids;
}

exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
