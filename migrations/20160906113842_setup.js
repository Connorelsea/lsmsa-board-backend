
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable("users", function(table) {
      table.increments()
      table.string("name_first")
      table.string("name_last")
      table.string("username")
      table.string("password")
      table.timestamps()
    })

  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users")
  ])
}
