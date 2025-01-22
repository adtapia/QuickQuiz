var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  const score = parseInt(req.query.score, 10) || 0; 
  res.render('results', { score }); 
});



module.exports = router;