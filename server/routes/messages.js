const express = require('express')
// const checkJwt = require('../auth0')
const db = require('../db/messages')

const router = express.Router()

module.exports = router

// /api/v1/messages?lat=-36.8645&long=174.7765

router.get('/', async (req, res) => {
  const input = req.query
  console.log(input)

  try {
    const msg = await db.getMessage(input)
    res.json({ msg })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
