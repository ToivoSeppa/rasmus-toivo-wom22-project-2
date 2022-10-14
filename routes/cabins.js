const axios = require('axios')
const url = process.env.AZURE_URL
const jwt = process.env.JWT_TOKEN


const getCabins = async (request, response) => {

    console.log("Kör den?")

    try {
        const data = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ` + jwt
            }
        })
        console.log(data)
        response.status(200).json(data.rows)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCabins
  }