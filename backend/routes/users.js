const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const md5 = require('md5');


/* GET users listing. */
router.post('/register', function(req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(403).send({
        message:
          err.message || "this email already has an account."
      });
    else res.status(200).send('User created successfully.');
  });
});


module.exports = router;
