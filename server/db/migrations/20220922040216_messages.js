exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.integer('lat')
    table.integer('long')
    table.string('msg')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
