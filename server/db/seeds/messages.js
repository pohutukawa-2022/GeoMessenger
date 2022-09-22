exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        { id: 1, lat: -36.8645, long: 174.7766, msg: 'hello from couch' },
        { id: 2, lat: -36.8647, long: 174.77652, msg: 'Hello from pantry' },
        { id: 3, lat: -36.8645, long: 174.7765, msg: 'Hello from yoga' },
      ])
    })
}
