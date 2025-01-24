var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');


//register page (signin)
router.get('/', function(req, res) {
  res.render('signup');
});

//handle signup form
router.post('/submit', async (req, res) => {
  const usersCollection = getCollection('users');

  try {
    
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          console.log('Invalid input:', req.body);
          return res.status(400).send('All fields are required.');
      }
  
      const result = await usersCollection.insertOne({ name, email, password });
      console.log('User successfully inserted:', result);

      res.status(201).send('Signup successful!');
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send('Failed to save user to the database.');
  }
});

module.exports = router;
