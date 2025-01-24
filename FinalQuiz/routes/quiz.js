// routes/quiz.js
var express = require('express');
var axios = require('axios');
var he = require('he');
var router = express.Router();
const { getCollection } = require('../models/db');
const { ObjectId } = require('mongodb'); // Import ObjectId constructor

let question_set = [];
let score = 0;

// Shuffle helper
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
  }
  return arr;
}

// Fetch questions from Trivia API
async function genquest(amount = 10, category = 9, difficulty = 'easy') {
  const baseURL = 'https://opentdb.com/api.php';
  const type = 'multiple';

  try {
    const response = await axios.get(baseURL, {
      params: { amount, category, difficulty, type },
    });
    const data = response.data.results;

    const temp_set = data.map(item => {
      const answers = shuffleArr([...item.incorrect_answers, item.correct_answer]);
      return {
        question: he.decode(item.question),
        A: he.decode(answers[0]),
        B: he.decode(answers[1]),
        C: he.decode(answers[2]),
        D: he.decode(answers[3]),
        // Convert correct answer text into A/B/C/D
        answer: String.fromCharCode(65 + answers.indexOf(item.correct_answer)),
      };
    });
    return temp_set;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

// GET /quiz => Start a new quiz
router.get('/', async (req, res) => {
  score = 0;
  question_set = await genquest();
  const current_question = 0;

  res.render('quiz', { question_set, current_question, score });
});

// POST /quiz/:index => Process answer or end quiz
router.post('/:index', async (req, res) => {
  const current_question = parseInt(req.params.index, 10);
  const userAns = req.body.answer;

  // Check correctness
  if (userAns && userAns === question_set[current_question].answer) {
    score++;
  }

  const next_question = current_question + 1;
  if (next_question < question_set.length) {
    // Render next question
    return res.render('quiz', {
      question_set,
      current_question: next_question,
      score,
    });
  } else {
    // Quiz finished
    const total = question_set.length;
    const userId = req.session.userId; // Must be logged in

    // Save quiz result
    if (userId) {
      const quizResults = getCollection('quizResults');
      try {
        await quizResults.insertOne({
          userId: new ObjectId(userId),  // Use "new" to construct a valid ObjectId
          score,
          playedAt: new Date(),
        });
      } catch (err) {
        console.error('Error saving quiz result:', err);
      }
    }

    // Redirect to results page
    return res.redirect(`/results?score=${score}&total=${total}`);
  }
});

module.exports = router;
