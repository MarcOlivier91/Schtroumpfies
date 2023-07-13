export {}
const mongoose = require('mongoose')
require('dotenv').config()

const connection = () => {
  mongoose.connect(
    process.env.DB_URL,
    {useNewUrlParser: true}
  )

  const db = mongoose.connection
  db.on('error', (e: any) => console.error(e))
  db.once('open', () => console.log('DATABASE CONNECTION : OK'))
}

module.exports = { connection }
