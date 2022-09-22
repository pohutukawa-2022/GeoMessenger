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


