const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
function generateToken(userId) {
  const token = jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
  return token;
}

// Verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

router.post('/register', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => {
      res.send('Successfully registered');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(Object.values(err.errors).map((error) => error.message));
      } else {
        console.error(err);
        res.status(500).send('Error saving user');
      }
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error finding user');
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Compare hashed passwords
    if (bcrypt.compareSync(password, user.password)) {
      // Passwords match, generate JWT token
      const token = generateToken(user._id);
      res.send({ token });
    } else {
      // Passwords don't match
      return res.status(401).send('Invalid username or password');
    }
  });
});

router.get('/users', authenticateToken, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching users');
    }
    res.send(users);
  });
});


// DELETE /users/:id - Delete a user by ID
router.delete('/users/:id',authenticateToken, (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId, (err, deletedUser) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting user');
    }

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  });
});

router.put('/users/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  User.findByIdAndUpdate(userId, updatedUser, { new: true, runValidators: true }, (err, updatedUser) => {
    if (err && err.name === 'ValidationError') {
      return res.status(400).send(Object.values(err.errors).map((error) => error.message));
    }
    
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating user');
    }

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

  

    return res.send('Successfully updated');
  });
});


// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  req.userId = userId;
  next();
}

module.exports = router;
