require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5000
// middleware
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/facebook', (req, res) => {
  res.send('withrifat')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
