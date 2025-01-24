var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
const { getCollection } = require('../models/db');

// Render the register page => GET /register
router.get('/', (req, res) => {
  res.render('register');
});

// Handle signup form => POST /register/submit
router.post('/submit', async (req, res) => {
  const { name, email, password } = req.body;
  const usersCollection = getCollection('users');

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await usersCollection.insertOne({ name, email, password: hashedPassword });

    // Redirect to index after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Failed to register user.');
  }
});

module.exports = router;
 