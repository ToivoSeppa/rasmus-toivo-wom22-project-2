const https = require('axios');
const url = process.env.AZURE_URL;


const getCabins = async (request, response) => {

    try {
        //request.headers.authorization = process.env.JWT_TOKEN;
        const { data } = await https.get(url);
        console.log(data);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getCabins
  }