const axios = require("axios");
module.exports={

    get:async function(username){
        const {data} = await axios.get("http://autentificacion_api:8080/login/"+username);
        return data[0]; 
    }
}