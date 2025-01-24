var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('signin');
  });

  router.post('/submit', function (req, res) {
    const { email, password } = req.body;
    console.log('Signin form data:', { email, password });

    res.send('Signin successful!');
});

module.exports = router;

