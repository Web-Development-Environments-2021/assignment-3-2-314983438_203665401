const DButils = require("./DButils");

async function markGameAsFavorite(user_id, game_id) {
  await DButils.execQuery(
    `insert into FavoriteGamess values ('${user_id}',${game_id})`
  );
}

async function getFavoriteGames(user_id) {
  const games_ids = await DButils.execQuery(
    `select game_id from FavoriteGamess where user_id='${user_id}'`
  );
  return games_ids;
}

exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
