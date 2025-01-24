// routes/user.js
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
const { getCollection } = require('../models/db');

// GET / => render login
router.get('/', (req, res) => {
  res.render('login');
});

// POST /login => verify user, store session, redirect
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = getCollection('users');

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid email or password');
    }

    // If valid, store user ID in session
    req.session.userId = user._id;
    req.session.userName = user.name; // optional, for convenience

    // Redirect to the index
    return res.redirect('/index');
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
