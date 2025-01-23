var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

router.get('/', function(req, res, next) {
  res.redirect("/signup");
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
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
