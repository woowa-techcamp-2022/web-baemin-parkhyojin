var express = require('express');
var router = express.Router();

router.get('/agree', function(req, res, next) {
  res.render('signup/agree', { title: '회원가입' });
});

router.get('/phone', function(req, res, next) {
  res.render('signup/phone', { title: '회원가입' });
});

router.get('/detail', function(req, res, next) {
  res.render('signup/detail', { title: '회원가입' });
});

module.exports = router;
