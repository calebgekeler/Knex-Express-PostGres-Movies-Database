
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table)=>{
    table.increments("theater_id").primary();
    table.string("name").notNullable();
    table.string("address_line_1").notNullable();
    table.string("address_line_2").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("zip").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("theaters");
};
