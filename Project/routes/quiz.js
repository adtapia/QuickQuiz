var express = require('express');
var router = express.Router();
const fs = require('fs');

const path = './questions.json';

let question_set = [];
let score = 0;

/** Read the questions from the JSON file */
function readUserDB() {
  let data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}

/** Generate a set of 10 unique random questions */
function genset() {
  let userDB = readUserDB();
  let max = userDB.length;
  let questionSet = [];
  let temp;

  while (questionSet.length < 10) {
    temp = Math.floor(Math.random() * max);
    if (!questionSet.includes(userDB[temp])) {
      questionSet.push(userDB[temp]);
    }
  }
  return questionSet;
}

/** GET /quiz */
router.get('/', function (req, res) {
  const current_question = 0;
  score = 0;
  question_set = genset();
  // Render the first question
  res.render('quiz', {
    question_set,
    current_question,
    score,
  });
});

/** POST /quiz/:index (handle the user's answer and move to next question) */
router.post('/:index', (req, res) => {
  const current_question = parseInt(req.params.index, 10);
  const userAns = req.body.answer;

  // Check if the user's answer is correct
  if (userAns && userAns === question_set[current_question].answer) {
    score += 1;
  }

  const next_question = current_question + 1;

  if (next_question < question_set.length) {
    // Render the next question
    res.render('quiz', {
      question_set,
      current_question: next_question,
      score,
    });
  } else {
    // All questions answered—redirect to results
    // Make sure the route below is GET /quiz/result
    res.redirect(`/quiz/result?score=${score}`);
  }
});

/** GET /quiz/result */
router.get('/result', (req, res) => {
  const finalScore = req.query.score;
  res.render('result', { score: finalScore });
});

module.exports = router;
