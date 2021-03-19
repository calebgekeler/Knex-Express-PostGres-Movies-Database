const { where } = require("../db/connection");
const knex = require("../db/connection");
const { reviews } = require("./movies.controller");

function list(){
  const result = knex("movies").select("*");
  return result;
}

function isShowing(){
  const result = knex("movies as m")
    .select("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({"mt.is_showing": true});
    //console.log(result)
  return result;
}

function read(id){
  const result = knex("movies")
    .select("*")
    .where({movie_id: id})
    .first();
  return result;
}

function getTheaters(id){
  const result = knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .where({"m.movie_id": id});
  return result;
}

function getReviews(id){
  let reviewsByMovieId = knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .where({"m.movie_id": id})
    .join("critics as c")
    .select(
      "r.*",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name",
    )
    
    
  reviewsByMovieId.critic = knex("critics")
    .select("*")
  

  return reviewsByMovieId;
}

module.exports = {
  list,
  isShowing,
  read,
  getTheaters,
  getReviews,
};