const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mklfzixy',
  host: '128.214.253.167',
  database: 'mklfzixy',
  password: 'c7e93b21b9fd332d66a0',
  port: 5432,
})

pool.connect()




app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json())


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})