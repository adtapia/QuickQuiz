var express = require('express');
var router = express.Router();

// GET /index => Render the Index/Home page
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
