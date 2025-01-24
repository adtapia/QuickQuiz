// routes/stats.js
var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const { getCollection } = require('../models/db');

router.get('/', async (req, res) => {
  // User must be logged in
  if (!req.session.userId) {
    return res.status(401).send('Please log in to view your stats.');
  }

  const quizResults = getCollection('quizResults');
  const userId = new ObjectId(req.session.userId); // Convert session ID to an ObjectId

  try {
    // 1. User’s quiz attempts pipeline
    const userAttemptsPipeline = [
      { $match: { userId } },
      { $sort: { playedAt: -1 } }, // newest first
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          _id: 0,
          score: 1,
          playedAt: 1,
          'userInfo.name': 1
        }
      }
    ];

    const userAttempts = await quizResults.aggregate(userAttemptsPipeline).toArray();

    // 2. Global leaderboard pipeline (top 5)
    const leaderboardPipeline = [
      { $sort: { score: -1, playedAt: 1 } }, // highest score first, earliest date for tie
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          _id: 0,
          userId: 1,
          score: 1,
          playedAt: 1,
          'userInfo.name': 1
        }
      }
    ];

    const globalLeaderboard = await quizResults.aggregate(leaderboardPipeline).toArray();

    // 3. Render stats page
    res.render('stats', { userAttempts, globalLeaderboard });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).send('Server error while fetching stats');
  }
});

module.exports = router;
