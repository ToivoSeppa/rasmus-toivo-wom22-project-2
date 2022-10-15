const axios = require('axios')
const url = process.env.AZURE_URL
const jwt = process.env.JWT_TOKEN


const getCabins = async (request, response) => {

    console.log("Kör den?")

    /*axios.get(url, {
        headers: {
            'authorization': `Bearer ${jwt}`
        }
    })
    .then((res) => {
        console.log(res.data)
        response.status(200).json(res.data)
    })
    .catch((error) => {
        console.error(error)
    })*/

    var options = {
        method: 'GET',
    }
    fetch(url, options)
        .then(function (res) {
            return res.json()
        })
        .then(function (resJson) {
            response.status(200).json(resJson)
        })

}
module.exports = {
    getCabins
}