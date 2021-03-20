
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table)=>{
    table.increments("review_id").primary();
    table.text("content").notNullable();
    table.integer("score").notNullable();
    table.integer("critic_id").references("critic_id").inTable("critics");
    table.integer("movie_id").references("movie_id").inTable("movies");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};
