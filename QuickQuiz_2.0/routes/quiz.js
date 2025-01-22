var express = require('express');
var axios = require("axios");
var router = express.Router();

let question_set = [];
let score = 0;


// Get questions from the Trivia API; Ensuring when the user resets they are served a new batch of questions 

router.get('/', async function(req, res) {
    const current_question = 0;
    score = 0; 
    question_set=

    res.render('quiz', { question_set, current_question, score });
});

// POST route to handle "Next Question"
router.post('/:index', (req, res) => {
    const current_question = parseInt(req.params.index, 10);
    const userAns = req.body.answer; 

    // Check if the user's answer is correct
    if (userAns && userAns === question_set[current_question].answer) {
        score = score + 1;
    }
    
    const next_question = current_question + 1;

    if (next_question < question_set.length) {
        res.render('quiz', { question_set, current_question: next_question, score });
    } else {

        res.redirect(`/results?score=${score}`);
    }
});


router.get('/result', (req, res) => {
  const score = req.query.score; 
  res.render('result', { score });
});

module.exports = router;
