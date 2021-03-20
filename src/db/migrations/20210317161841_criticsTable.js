
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) =>{
    table.increments("critic_id").primary();
    table.string("preferred_name", 1000).notNullable();
    table.string("surname", 1000).notNullable();
    table.string("organization_name", 1000).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};
