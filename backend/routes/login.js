var express = require('express');
var jwt = require('jsonwebtoken')
var md5 = require('md5');
const User = require('../models/user.model');

var router = express.Router();

router.post('/', function(req, res, next) {
  User.findByEmail(req.body.email, (err, data) => {
    if (data && md5(req.body.password) === data.password) {
      const user = {
        id: data.id,
        email: data.email,
      }
      const token = jwt.sign({user}, 'secretkey');
      res.send({ token });
    } else {
      res.sendStatus(403);
    }
  })
  
});

function verifyToken(req, res, next) {
  if (req.path == '/login' || req.path == '/users/register') return next();
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, 'secretkey', (err, authData)=> {
        if (err) {
          console.log('err', err)
          res.sendStatus(403);
        }
        else {
          req.userId = authData.user.id;
          next();
        }
    })
  } else {
      console.log('token not available')
      res.sendStatus(403);
  }
}

module.exports = { router, verifyToken };
