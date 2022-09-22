const connection = require('./connection')

function getMessage(input, db = connection) {
  const r = 0.0005
  return db('messages')
    .whereBetween('lat', [input.lat - r, input.lat + r])
    .whereBetween('long', [input.long - r, input.long + r])
    .select('msg')

}

module.exports = {
  getMessage,
}

// let input = { lat: -36.8645, long: 174.7765 }
