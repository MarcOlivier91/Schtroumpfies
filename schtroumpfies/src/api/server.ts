const express = require('express')
const app = express()
const cors = require('cors')
const database = require('./config/database')

// Instantiation du serveur
app.use(cors({ origin: true, credentials: true }))


database.connection()
app.use(express.json())

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(3000, () => console.log('Server started.'))

