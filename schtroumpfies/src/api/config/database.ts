const mongoose = require('mongoose')

const connection = () => {
  mongoose.connect(
    'mongodb+srv://MarcoSOS:mdpbasede@restapi.hmv96.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true}
  )

  const db = mongoose.connection
  db.on('error', (e: any) => console.error(e))
  db.once('open', () => console.log('DATABASE CONNECTION : OK'))
}

module.exports = { connection }
