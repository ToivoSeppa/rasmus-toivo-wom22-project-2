const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbServices = require('./routes/services')
const dbOrders = require('./routes/orders')
const dbCabins = require('./routes/cabins')
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

app.use('/static', express.static(__dirname + '/public'))

app.get('/services', dbServices.getServices)
app.post('/services', dbServices.postServices)
app.patch('/services/:id', dbServices.patchServices)
app.delete('/services/:id', dbServices.deleteServices)

app.get('/orders', dbOrders.getOrders)
app.post('/orders', dbOrders.postOrders)
app.patch('/orders/:id', dbOrders.patchOrders)
app.delete('/orders/:id', dbOrders.deleteOrders)

app.get('/cabins', dbCabins.getCabins)



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})