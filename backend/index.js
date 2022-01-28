const express = require('express')
var cors = require('Cors')
const connectToMongo = require('./db');
connectToMongo();



const app = express()
app.use(express.json())
app.use(cors())


// ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


const port = 5000
app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})


