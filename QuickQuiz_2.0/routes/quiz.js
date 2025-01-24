var express = require('express');
var axios = require("axios");
const he = require('he');
var router = express.Router();

let question_set = [];
let score = 0;
token =null;

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}


async function genquest(amount=10,category=9,difficulty="easy",){
    const baseURL = "https://opentdb.com/api.php";
    const type = "multiple";
    
     var response = await axios.get(
                baseURL,
                {
                    params: {
                        amount: amount,
                        category: category,
                        difficulty: difficulty,
                        type: type,
                    }
                }
            );
           
        
            
              
            let temp=response.data.results;
            let tempL= temp.length;
            
            for(let i=0;i<tempL;i++){
            let temp=response.data.results[i];
            temp.incorrect_answers.push(temp.correct_answer);

            temp.incorrect_answers = shuffleArr(temp.incorrect_answers);

            temp.correct_answer = String.fromCharCode(65 + temp.incorrect_answers.indexOf(temp.correct_answer));
            }
            
            const temp_set = temp.map(item => ({
                question: he.decode(item.question),
                A: he.decode(item.incorrect_answers[0]),
                B: he.decode(item.incorrect_answers[1]),
                C: he.decode(item.incorrect_answers[2]),
                D: he.decode(item.incorrect_answers[3]),
                answer: he.decode(item.correct_answer)
            }));



        
    return temp_set;
        
}
  
// Get questions from the Trivia API; Ensuring when the user resets they are served a new batch of questions 

router.get('/', async function(req, res) {

    const current_question = 0;
    score = 0; 
    const time = Date.now();

    //if statment to see which to run
    question_set=await genquest();
    res.render('quiz', { question_set, current_question, score, time });
});



// POST route to handle "Next Question"
router.post('/:index', (req, res) => {
    const current_question = parseInt(req.params.index, 10);
    const userAns = req.body.answer; 
    const timepassed = parseInt(req.body.time, 10);

    // Check if the user's answer is correct
    if (userAns && userAns === question_set[current_question].answer) {
        score = score + 1;
    }
    
    const next_question = current_question + 1;

    if (next_question < question_set.length) {
        res.render('quiz', { question_set, current_question: next_question, score, time:Date.now() - timepassed * 1000 });
    } else {
        const mins = Math.floor(timepassed / 60);
        const secs = timepassed % 60;
        const fTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        res.redirect(`/results?score=${score}&time=${fTime}`);
    }
});


module.exports = router;
