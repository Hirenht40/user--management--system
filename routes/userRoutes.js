const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
      .then(() => {
        res.send('Successfully registered');
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const errorMessages = Object.values(err.errors).map((error) => error.message);
          res.status(400).send({ error: errorMessages });
        } else {
          console.error(err);
          res.status(500).send('Error saving user');
        }
      });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error finding user');
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    res.redirect('/users');
  });
});

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching users');
    }
    res.send(users);
  });
});

module.exports = router;
