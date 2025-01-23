var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');


//register page (signin)
router.get('/signin', (req, res) =>{
  res.render("signin");
});

//register page (signup)
router.get('/signup', (req, res) =>{
  res.render("signup");
});



router.post("/signup/submit", async (req, res) => {
  const usersCollection = getCollection('users');
  try {
    await usersCollection.insertOne(req.body);
  } catch(e) {
    res.status(500).send("Failed to save to db.")
  }
  
});

router.post("/signin/submit", (req, res) => {

});

module.exports = router;
