var express = require('express');
var router = express.Router();
const fs = require("fs");

const path = "../../client/data/questions.json";

let question_set = [];
let score = 0;

// Function to read the questions database
function readUserDB() {
    let data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}

//fills question_set with unique random questions
try {
    let userDB = readUserDB();
    let max = userDB.length;
    let q_num = 0;
    let temp = null;

    while (question_set.length < 10) {
        temp = Math.floor(Math.random() * max);
        if (!question_set.includes(temp)) {
            question_set[q_num] = userDB[temp];
            q_num++;
        }
    }
} catch (err) {
    console.error('Error reading file:', err);
}


// GET quiz route
router.get('/', function(req, res, next) {
    const current_question = 0;
    res.render('quiz', { question_set, current_question, score });
});


router.get('/next/:index', (req, res) => {
    const current_question = parseInt(req.params.index, 10);
    const userAns = req.query.answer; 

    // Check if the users answer is correct
    if (userAns && userAns === question_set[current_question].correctAnswer) {
        score++; 
    }

    const next_question = current_question + 1;

    if (next_question < question_set.length) {
        res.render('quiz', { question_set, current_question: next_question, score });
    } else {
      //if we finish all the questions we want to go to the result page
        res.redirect(`/result?score=${score}`);
    }
});

// Results page
router.get('/result', (req, res) => {
  const score = req.query.score; 
  res.render('result', { score });
});

module.exports = router;
