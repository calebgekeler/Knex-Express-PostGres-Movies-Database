
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table)=>{
    table.increments("movie_id").primary();
    table.string("title", 1000).notNullable();
    table.integer("runtime_in_minutes").notNullable();
    table.string("rating", 1000).notNullable();
    table.string("description", 1000).notNullable();
    table.string("image_url", 1000).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};
