const axios = require("axios");
const url = 'https://dog.ceo/api/breeds/image/random';

const fetchDogs = async ( url ) => {
    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });
    if ( status >= 400 ) {
        console.log('uh oh');
        throw new Error(statusText);
    }
    return data;

};

module.exports = {

    fetchDogs: () => {  
        console.log('getting data');
        return fetchDogs(url);
    }
}
