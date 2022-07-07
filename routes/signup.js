var express = require('express');
var router = express.Router();

router.get('/agree', function(req, res, next) {
  res.render('signup/agree', { title: '회원가입' });
});

module.exports = router;
