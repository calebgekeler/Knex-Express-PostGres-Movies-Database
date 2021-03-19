const knex = require("../db/connection");

function list(){
  const allJoined = knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
  const result = allJoined
    .select(
      "t.*",
      "m.movie_id as movies:movie_id",
      "m.title as movies:title",
      "m.runtime_in_minutes as movies:runtime_in_minutes",
      "m.rating as movies:rating",
    )

  return result;
}

module.exports = {list};