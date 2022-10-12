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
  

const getOrders = async (request, response) => {
    
    const text = 'SELECT * FROM orders ORDER BY id ASC'

    try {
        const res = await pool.query(text)
        //console.log(res)
        response.status(200).json(res.rows)
    } catch (error) {
        console.log(error.message)
    }
}


const postOrders = async (request, response) => {
    const { date, cabin, servicetype } = request.body

    const text = 'INSERT INTO orders(date, cabin, servicetype) VALUES($1, $2, $3) RETURNING *'
    const values = [date, cabin, servicetype]

    try {
        const res = await pool.query(text, values)
        //console.log(res)
        response.status(201).send(`Order added with ID: ${res.rows[0].id}`)
        
    } catch (error) {
        console.log(error.message)
    }
}

const patchOrders = async (request, response) => {
  const id = request.params.id

  console.log(request.body)

  const { date, cabin, servicetype } = request.body

  const values = [date, cabin, servicetype, id]
  const text = 'UPDATE orders SET date = $1, cabin = $2, servicetype = $3 WHERE id = $4'

  try {
    const res = await pool.query(text, values)
    //console.log(res)
    response.status(200).send(`Order modified with ID: ${id}`)
  } catch (error) {
    console.log(error.message)
  }

  
}

const deleteOrders = async (request, response) => {
  const id = request.params.id

  try {
    const res = await pool.query('DELETE FROM orders WHERE id = $1', [id])
    console.log(res);
    response.status(200).send(`Order deleted with ID: ${id}`)
  } catch (error) {
    
  }
}

module.exports = {
    getOrders,
    postOrders,
    patchOrders,
    deleteOrders,
  }