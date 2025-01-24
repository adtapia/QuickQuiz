// routes/results.js
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  const score = parseInt(req.query.score, 10) || 0;
  const total = parseInt(req.query.total, 10) || 10;
  res.render('results', { score, total });
});

module.exports = router;
