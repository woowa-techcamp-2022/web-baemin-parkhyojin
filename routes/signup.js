var express = require('express');
var router = express.Router();

router.get('/agree', function(req, res, next) {
  res.render('signup/agree/index');
});

router.get('/phone', function(req, res, next) {
  res.render('signup/phone');
});

router.get('/detail', function(req, res, next) {
  res.render('signup/detail');
});

module.exports = router;
