const axios = require("axios").default;




axios.get("/api/facts")
    .then(res =>{
        console.log(res)
        return res.data
    })
    .catch(err =>{
        console.log(err)
    })