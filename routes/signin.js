var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signin/index');
});

module.exports = router;
