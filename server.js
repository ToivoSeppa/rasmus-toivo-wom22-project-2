const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./routes/services')
const PORT = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use(express.json())

app.get('/services', db.getServices)
app.post('/services', db.postServices)
/*app.patch('/services/:id', db.patchServices)
app.delete('/services/:id', db.deleteServices)*/



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})