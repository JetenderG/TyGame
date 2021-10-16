var express = require('express');
var router = express.Router();
let factRoute = require("./api/factRoutes")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/api", factRoute);

module.exports = router;
