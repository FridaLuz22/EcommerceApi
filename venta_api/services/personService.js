const axios = require("axios");
module.exports={

    get:async function(dni){
        const {data} = await axios.get("http://person_api:8080/people/"+dni);
        return data[0]; 
    }
}