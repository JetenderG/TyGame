var express = require('express');
var router = express.Router();


router.get("/facts", (req, res,next) => {

    res.json(data = {sentence : "Hello this is working out fine"})
});


module.exports = router