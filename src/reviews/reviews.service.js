const knex = require("../db/connection");


function read(id){
  return knex("reviews")
    .select("*")
    .where({review_id: id})
    .first();
}

function update(update){
  let updateResult =  knex("reviews as r")
    .select("*")
    .where({review_id: update.review_id})
    .update(update, "*")
  return updateResult;
}

function queryAfterUpdate(id){
  return knex("reviews as r")
    .where({"r.review_id": id})
    .join("critics as c")
    //.where("c.critic_id", "r.critic_id")
    .select(
      "r.*",
      "r.created_at",
      "r.updated_at",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name",
    )
    .first();
}

function destroy(id){
  return knex("reviews").where({review_id: id}).del();
}

module.exports ={
  read,
  update,
  queryAfterUpdate,
  delete: destroy,
}