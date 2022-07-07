const express = require('express');
const db = require('../lib/db');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  db.get('users').push(req.body).write();
  res.redirect('/signin');
});

router.post('/signin', (req, res) => {
  const {email, password} = req.body;
  const match = db.get('users').find({email, password}).value();
  if(match){
    db.get('sessions').remove({userEmail: email}).write();
    const sessionId = getSessionId(10);
    db.get('sessions').push({id: sessionId, userEmail: email}).write();
    res.append('Set-Cookie', `SESSION_ID=${sessionId} Path=/; HttpOnly`)
    res.redirect('/');
    return;
  }
  res.status(404).send('일치하는 로그인 정보가 없습니다.')
});

const getSessionId = (len) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLen = characters.length;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLen));
    }
    return result;
}

module.exports = router;
