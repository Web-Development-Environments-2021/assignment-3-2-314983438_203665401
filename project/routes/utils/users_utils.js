const DButils = require("./DButils");

async function markGameAsFavorite(user_id, game_id) {
  let gameids = await getFavoriteGames(user_id);
  let exist = 0;
  console.log(gameids.length);
  gameids.forEach(element => {if (element == game_id){
    exist = 1;
  } });
  if (exist == 0){
  await DButils.execQuery(
    `insert into FavoriteGames values ('${user_id}',${game_id})`
  );
  }
}

async function getFavoriteGames(user_id) {
  const games_ids = await DButils.execQuery(
    `select game_id from FavoriteGames where user_id='${user_id}'`
  );
  return games_ids;
}

exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
