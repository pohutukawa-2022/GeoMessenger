const connection = require('./connection')

function getMessage(input, db = connection) {
  const lat = Number(input.lat)
  const long = Number(input.long)
  console.log(lat, long)
  const r = 0.05
  return db('messages')
    .whereBetween('lat', [lat - r, lat + r])
    .whereBetween('long', [long - r, long + r])
    .select('msg')
}

module.exports = {
  getMessage,
}

// terminal lat: '-36.8692362162736', long: '174.7473588339253
// DB    -36.8645,                  174.7766

// long: 174.7473588339253, lat: -36.8692362162736

//  return db('messages')
// .whereBetween('lat', [input.lat - r, input.lat + r])
// .whereBetween('long', [input.long - r, input.long + r])
// .select('msg')
// }
