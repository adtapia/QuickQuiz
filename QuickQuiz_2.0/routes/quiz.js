var express = require('express');
var router = express.Router();
const fs = require("fs");

const path = "./questions.json";

let question_set = [];
let score = 0;

function readUserDB() {
    let data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}

// Fill question_set with unique random questions
function genset(){
    
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

router.get('/', function(req, res) {
    const current_question = 0;
    score = 0; 
    question_set=genset()

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
