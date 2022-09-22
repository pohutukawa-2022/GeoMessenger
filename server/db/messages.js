const connection = require('./connection')

function getMessage(db = connection) {
  let input = { lat: -36.8645, long: 174.7765 }
  const r = 0.0005
  return db('messages')
    .whereBetween('lat', [input.lat - r, input.lat + r])
    .whereBetween('long', [input.long - r, input.long + r])
    .select('msg')
    .then((messages) => console.log(messages))
}

module.exports = {
  getMessage,
}

getMessage(connection)
