var express = require('express');
var router = express.Router();
const fs = require("fs");

const path = "../questions.json";

let question_set = [];
let score = 0;

function readUserDB() {
    let data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}

// Fill question_set with unique random questions
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


router.get('/', function(req, res) {
    const current_question = 0;
    score = 0; 
    res.render('quiz', { question_set, current_question, score });
});

// POST route to handle "Next Question"
router.post('/quiz/:index', (req, res) => {
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

        res.redirect(`/result?score=${score}`);
    }
});

// Goes to Results page
router.get('/result', (req, res) => {
    const score = req.query.score; 
    res.render('result', { score });
});

module.exports = router;
