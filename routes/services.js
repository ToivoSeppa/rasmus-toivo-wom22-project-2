require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })
  

const getServices = async (request, response) => {
    
    const text = 'SELECT * FROM services'

    try {
        const res = await pool.query(text)
        //console.log(res)
        response.status(200).json(res.rows)
    } catch (error) {
        console.log(error.message)
    }
}


const postServices = async (request, response) => {
    const { servicetype, price } = request.body

    const text = 'INSERT INTO services(servicetype, price) VALUES($1, $2) RETURNING *'
    const values = [servicetype, price]

    try {
        const res = await pool.query(text, values)
        //console.log(res)
        response.status(201).send(`User added with ID: ${res.rows[0].id}`)
        
    } catch (error) {
        console.log(error.message)
    }
  }

module.exports = {
    getServices,
    postServices,
    //patchServices,
    //deleteServices,
  }