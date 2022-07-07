const express = require('express');
const db = require('../lib/db');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async (req, res) => {
  db.get('users').push(req.body).write();
  res.redirect('/signin');
});

module.exports = router;
