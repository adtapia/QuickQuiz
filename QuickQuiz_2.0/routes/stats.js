// routes/stats.js
const express = require('express');
const router = express.Router();
//const { getUserById } = require('../utils/userdata');

// Adjust path as needed, e.g. '../utils/userdata' or './userdata'

// GET /stats
// Display the logged-in user's quiz history
router.get('/', async (req, res) => {
  if (!req.session.user) {
    // Must be logged in
    return res.redirect('/login');
  }

  try {
    // Load the user via userdata.js
    const user = await getUserById(req.session.user._id);
    if (!user) {
      return res.redirect('/login');
    }

    // Sort scores by newest date first (optional)
    if (user.scores && user.scores.length) {
      user.scores.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Render stats.ejs with the user's name & scores
    res.render('stats', {
      name: user.username,
      scores: user.scores || []
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
